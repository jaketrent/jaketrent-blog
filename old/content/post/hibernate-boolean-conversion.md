---
layout: post
title: "Hibernate Boolean Conversion"
date: "2008-10-09"
comments: true
categories:
  - "Code"
tags:
  - "hibernate"
  - "jpa"
  - "orm"
description: The object-relational mapping world of JPA and Hibernate has made a lot of things really nice and easy.  As with any framework of this sort, however, it bec
metaKeywords: hibernate, jpa, orm
draft: false
---

The object-relational mapping world of JPA and Hibernate has made a lot of things really nice and easy.  As with any framework of this sort, however, it becomes frustrating when the pieces that are supposed to provide magic ease of development do not work as expected.  The frustration is only exacerbated when the docs are skimpy.

Type conversions usually happen automatically in JPA, but possibly due to some databases incredibly not having implemented boolean fields yet (Oracle and pre-5.0 MySQL), an extra bit of help in conversion is needed.

<!--more-->

The object-relational mapping world of JPA and Hibernate has made a lot of things really nice and easy.  As with any framework of this sort, however, it becomes frustrating when the pieces that are supposed to provide magic ease of development do not work as expected.  The frustration is only exacerbated when the docs are skimpy.

Type conversions usually happen automatically in JPA, but possibly due to some databases incredibly not having implemented boolean fields yet (Oracle and pre-5.0 MySQL), an extra bit of help in conversion is needed.

The mechanism for showing that a conversion will need to be manually specified is this annotation:

```java
@Type(type="[type here]")
private Boolean active;
```

In your database, if you store your boolean values as 'Y' or 'N', then you will want to use this:

```java
@Type(type="yes_no")
private Boolean active;
```

In your database, if you store your boolean values as '1' or '0', then you will want to use this:

```java
@Type(type="boolean")
private Boolean active;
```

In your database, if you store your boolean values as 'T or 'F', then you will want to use this:

```java
@Type(type="true_false")
private Boolean active;
```

Note that these solutions are Hibernate-dependent, and not sticking with the general standard of JPA.  Too bad JPA doesn't provide something like this (as of now, anyway)!

After much searching, I found this <a href="http://www.hibernate.org/hib_docs/reference/en/html/mapping-types.html">doc</a> that you may find useful.

If you want a Java logic-specific (but more portable) solution, you could try this:

```java
@Basic
private Character active;

public Boolean getActive() {
    if (active == null) return null;
    return active == 'Y' ? Boolean.TRUE : Boolean.FALSE;
}

public void setActive(Boolean active) {
    if (active == null) {
      this.active = null;
    } else {
      this.active = active == true ? 'Y' : 'N';
    }
}
```


  
