---
layout: post
title: "Hibernate Bind Variable in OrderBy Clause"
date: "2009-08-24"
comments: true
categories:
  - "Code"
tags:
  - "hibernate"
  - "jpa"
  - "orm"
description: I have spent mucho time trying to get some named parameters working in the "order by" clause of a dynamic sql query that I'm building.  The query isn't even
metaKeywords: hibernate, jpa, orm
draft: false
---

I have spent mucho time trying to get some named parameters working in the "order by" clause of a dynamic sql query that I'm building.  The query isn't even HQL/JPQL.  It's native.  And yet, it turns out that you cannot use bind variables, named or ordered, in an order by clause.  

<!--more-->

I was trying to do something like this:

```java
public class Service {
   @PersistenceContext
   private EntityManager em;
    
   public List<Object[]> search(String sortProperty) {
      Query q = em.createNativeQuery("select col from table order by :sortProperty");
      q.setParameter("sortProperty", sortProperty);
      return q.getResultList();   
   }
}
```

This will yield something awesome, like this:

```java
java.sql.SQLException: ORA-01745: invalid host/bind variable name
```


Seriously, the only way I've found around this is append, similar to this:

```java
/* ... */
Query q = em.createNativeQuery("select col from table order by " + sortProperty);
/* ... */
```

Just make sure you've got something scrubbing the data coming in.

Any better suggestions?

  
