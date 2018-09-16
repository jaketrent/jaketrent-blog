---
layout: post
title: "Hibernate's @Enumerated Annotation is Brittle"
date: "2009-02-23"
comments: true
categories:
  - "Code"
tags:
  - "hibernate"
  - "jpa"
  - "orm"
description: Hibernate's @Enumerated annotation seems much too brittle in the case of using it with EnumType.ORDINAL.   If you're using EnumType.STRING, I think it works
metaKeywords: hibernate, jpa, orm
draft: false
---

Hibernate's @Enumerated annotation seems much too brittle in the case of using it with EnumType.ORDINAL.   If you're using EnumType.STRING, I think it works beautifully.  This is because the annotation can use the name of the enum to make the mapping.  In the case of ORDINAL, the value of the enum is used.  This presents a couple problems...

<!--more-->

1. The enumeration has a 0th value place, so you need a PLACEHOLDER in your enum.
2. The enumeration values are contiguous, so your primary keys on the corresponding lookup table in the database must be as well.  

The second point is the one that seems most problematic.  If a lookup value becomes obsolete, it cannot be deleted.  If a sequence is used to generate the primary key value in the lookup table, it cannot skip a number without needing to put in extra placeholders equal to the amount of numbers skipped.

At least for me in my solution, to get around this problem I am putting the ENUM_NAME's in the database and in my mapping relating the table, replacing @Enumerated(EnumType.ORDINAL) and then using EnumType.STRING on the Entity representing the lookup table in order to link to my enum.

  
