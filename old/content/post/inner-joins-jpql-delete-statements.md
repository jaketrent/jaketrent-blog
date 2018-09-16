---
layout: post
title: "Inner Joins in JPQL Delete Statements "
date: "2009-04-29"
comments: true
categories:
  - "Code"
tags:
  - "hibernate"
  - "hql"
  - "jpa"
  - "jpql"
description: I'm working on a project that utilizes JPA/Hibernate as its ORM.  I was writing a few named queries for an JPQL/HQL delete and was getting an SQLGrammarExce
metaKeywords: hibernate, hql, jpa, jpql
draft: false
---

I'm working on a project that utilizes JPA/Hibernate as its ORM.  I was writing a few named queries for an JPQL/HQL delete and was getting an SQLGrammarException.  I soon found out that I couldn't use inner joins on a delete statement, even at the SQL level.  Here's the query transformation:

<!--more-->

I originally had this query:

```java
@NamedQuery(name = Queue.REMOVE_ROWS_OF_EARLY_RELEASE_REASON,
   query = "delete from Queue q " +
           "where  q.enabledMember = :enabledMember " +
           "and    q.letter.eventReason.event.type = :eventType " +
           "and    q.letter.eventReason.reason = :reason ")
```


It had to evolve to this:

```java
@NamedQuery(name = Queue.REMOVE_ROWS_OF_EARLY_RELEASE_REASON,
   query = "delete from Queue q " +
           "where q in (select sq from Queue sq " +
           "            where  sq.enabledMember = :enabledMember " +
           "            and    sq.letter.eventReason.event.type = :eventType " +
           "            and    sq.letter.eventReason.reason = :reason )"
```


The only solution that I could think of in order to keep the filter that I need was to use a subquery.  Anyone know of any other awesome solutions?

  
