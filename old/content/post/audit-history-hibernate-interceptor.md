---
layout: post
title: "Audit History with Hibernate Interceptor"
date: "2008-10-20"
comments: true
categories:
  - "Code"
tags:
  - "hibernate"
  - "java"
  - "orm"
description: Our goal is to create a history audit tool that fires automatically, tracks only selected fields, categorizes those fields, and saves old vs. new data.
metaKeywords: hibernate, java, orm
draft: false
---

Our goal is to create a history audit tool that fires automatically, tracks only selected fields, categorizes those fields, and saves old vs. new data.

We'll cover interceptor config, data types, dependency Injection, and alternate EntityListeners.

The one option that I found that met all these requirements was the Hibernate Interceptor.  There may be better alternatives for you if your requirements differ.

<!--more-->

The interceptor configuration:

<h3>persistence.xml</h3>
You'll find many docs that exist online showing how to configure Hibernate Interceptors.  Virtually none described anything that I had available to me.  In this app, we don't control the SessionFactory or Session's, the two most popular methods of registering your Interceptor.  We only configure the EntityManagerFactory.  I found only one <a href="http://www.hibernate.org/hib_docs/entitymanager/reference/en/html/configuration.html">doc</a> that describes the property available.  Here it is implemented:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="http://java.sun.com/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_1_0.xsd"
	version="1.0">
	<persistence-unit name="com.jtsnake.tracker" transaction-type="JTA">
		<!-- ... model objects listed ... -->
		<class>com.jtsnake.tracker.model.Person</class>
        <exclude-unlisted-classes/>
        <properties>
            <property name="hibernate.ejb.interceptor" value="com.jtsnake.tracker.util.HistoryInterceptor" />
        </properties>
	</persistence-unit>
</persistence>
```

<h3>HistoryInterceptor.java</h3>

You'll want to notice a few things:
<ul>
<li>The 'instanceof Historical' is merely an optimization (see below).</li>
<li>FacesContext is required as a workaround for dependency injection.  I couldn't get Spring to auto-inject dependencies as normally done in other classes.  If anyone knows another way, please <a href="#commentform">let me know</a>, because I don't like this method.  All of these dependencies were defined as spring beans elsewhere.  You'll only have available to you what you would have on a JSF page via EL, as seen in the "#{springBean}" expressions.</li>
<li>You may not need to save all of this data, which means that you could simplify the logic in this class.</li>
<li>I could not do a regular entity object .save() for the history entry.  It wasn't available.  I had to make a direct table insert.  I did try the JPA method, however, but I kept getting the SequenceGenerator to fire, selecting nextval's again and again, but the history record was never written.  I, therefore, fell back on direct table insertion.</li>
<li>One thing that tripped me up was the SimpleJdbcTemplate.  Previously, I have just used the JdbcTemplate.  Here, you don't have to specify <a href="http://java.sun.com/j2se/1.5.0/docs/api/java/sql/Types.html">Types</a>, but you'll want to make sure that the types (that will be determined automagically by the platform) of the objects you use for parameters in your insert  map strictly to the database column types.  A useful doc was found <a href="http://java.sun.com/j2se/1.5.0/docs/guide/jdbc/getstart/mapping.html">here</a>.</li>
</ul>

```java
package com.jtsnake.tracker.util;

import org.hibernate.CallbackException;
import org.hibernate.EmptyInterceptor;
import org.hibernate.type.Type;
import com.jtsnake.tracker.model.Historical;
import com.jtsnake.tracker.model.PieceOfHistory;
import com.jtsnake.tracker.model.HistoryChangeType;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcTemplate;
import org.springframework.dao.DataAccessException;

import javax.el.ValueExpression;
import javax.faces.context.FacesContext;
import javax.persistence.Column;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.Date;

public class HistoryInterceptor extends EmptyInterceptor {

    @Override
    public boolean onFlushDirty(Object entity, Serializable id, Object[] currentState, Object[] previousState, String[] propertyNames, Type[] types) throws CallbackException {

        if (entity instanceof Historical) {

            FacesContext fc = FacesContext.getCurrentInstance();

            if(fc == null) {
                throw new RuntimeException("No FacesContext available. HistoryInterceptor currently only works in faces requests.");
            }

            ValueExpression jdbcVe = fc.getApplication().getExpressionFactory().createValueExpression(fc.getELContext(), "#{simpleJdbcTemplate}", SimpleJdbcTemplate.class);
            final SimpleJdbcTemplate simpleJdbcTemplate = (SimpleJdbcTemplate) jdbcVe.getValue(fc.getELContext());

            ValueExpression txVe = fc.getApplication().getExpressionFactory().createValueExpression(fc.getELContext(), "#{transactionTemplate}", TransactionTemplate.class);
            TransactionTemplate transactionTemplate = (TransactionTemplate) txVe.getValue(fc.getELContext());

			/** ... more dependencies ... */

            for (Field f : entity.getClass().getDeclaredFields()) {
                if (f.isAnnotationPresent(PieceOfHistory.class)) {
                    String fieldName = f.getName();
                    for (int i = 0; i < propertyNames.length; ++i) {
                        if (propertyNames[i].equals(fieldName)) {
                            if (isChanged(currentState[i], previousState[i]))  {
                                HistoryChangeType type = f.getAnnotation(PieceOfHistory.class).type();
                                saveHistoryEntry(simpleJdbcTemplate,
                                                 transactionTemplate,
                                                 getNullSafeString(previousState[i]),
                                                 getNullSafeString(currentState[i]),
                                                 username,
                                                 type.toString(),
                                                 getColumnName(f),
                                                 type.getDefaultMessage(),
                                                 getNullSafeLong(personId));
                            }
                        }
                    }
                }
            }

        }

        return false;
    }


    String getColumnName(Field f) {
        String colName = f.getName();
        if (f.isAnnotationPresent(Column.class)) {
            colName = f.getAnnotation(Column.class).name();
        }
        return colName;
    }

    boolean isChanged(Object currentState, Object previousState) {
        return (previousState == null && currentState != null) // nothing to something
            || (previousState != null && currentState == null) // something to nothing
            || (previousState != null && !previousState.equals(currentState)); // something to something else
    }

    String getNullSafeString(Object obj) {
        return obj != null ? obj.toString() : "NULL";
    }

    Long getNullSafeLong(Long l) {
        return l != null ? l : 0L;
    }

    void saveHistoryEntry(final SimpleJdbcTemplate simpleJdbcTemplate,
                          TransactionTemplate transactionTemplate,
                          final String oldValue,
                          final String newValue,
                          final String username,
                          final String changeType,
                          final String columnName,
                          final String changeMessage,
                          final Long personId) {
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {

	@Override
	public void doInTransactionWithoutResult(TransactionStatus status) {
               java.sql.Date date = new java.sql.Date(new Date().getTime());
               simpleJdbcTemplate.update(
                    "insert into mssw.person_history " +
                        "(           person_id " +
                        ",           modified_date " +
                        ",           username " +
                        ",           type " +
                        ",           msg " +
                        ",           old " +
                        ",           new " +
                        ",           col_name " +
                        ") values (  ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8 ) ",
                        personId, date, username, changeType, changeMessage, oldValue, newValue, columnName);
            }
	});
    }

}
```

The interceptor uses some other classes and interfaces to do it's work:  The check for Historical interface is only an optimization, allowing the code inside to only spin on modifications to classes of interest and not all changes.

<h3>Historical.java</h3>
```java
package com.jtsnake.tracker.model;

public interface Historical {
    // marker interface only
}
```

The PieceOfHistory interface (don't you love the names based on cliche's) is to mark those fields that need to have their changes tracked:

<h3>PieceOfHistory.java</h3>
```java
package com.jtsnake.tracker.model;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface PieceOfHistory {
    HistoryChangeType type();
}
```

Important pieces of data are marked in the entity models.  Here's one: Person.java.  Here, you can see that the preferredFirstName field was marked with the PieceOfHistory interface, where the type (a HistoryChangeType to show category) of change is specified.

<h3>Person.java</h3>
```java
package com.jtsnake.tracker.model;

@Entity
@Table(name="person")
@SuppressWarnings("serial")
public class Person implements Serializable, Historical {

	@Id
	@Column(name="id")
	private Long id;

    @Length(max = 255, message = "Preferred first name length must be between 0 and 255.")
    @Column(name = "pref_first")
    @PieceOfHistory(type = HistoryChangeType.PREFERRED_NAME_CHANGE)
    private String preferredFirstName;

    /** ... other fields ... */
```

Categorizations are made according a previously determined enum type:

<h3>HistoryChangeType.java</h3>
```java
package com.jtsnake.tracker.model;

public enum HistoryChangeType {

    PREFERRED_NAME_CHANGE,
    TYPE,
    STATUS;
}
```

There it is!  That's all, and you've got one snappin' audit history tracker.

I would only go the Hibernate Interceptor route if you need the old vs. new values.  All other requirements can be met through the less-complicated and more available JPA EntityListeners.



  
