---
layout: post
title: "Arrays.asList returns immutable List"
date: "2009-04-29"
comments: true
categories:
  - "Code"
tags:
  - "java"
description: I was having problems doing operations on a java.util.List object returned by Arrays.asList() method call.   The specific exception was a java.lang.Unsuppor
metaKeywords: java
draft: false
---

I was having problems doing operations on a java.util.List object returned by Arrays.asList() method call.   The specific exception was a java.lang.UnsupportedOperationException.  I soon found out why this was a problem.

<!--more-->

I like to use Arrays.asList as a nice one-line List creation tool.  But, it turns out that many operations, such as add() and remove() are unusable on the List that is returned.  The List returned is actually of type java.util.Arrays$ArrayList, a private static inner class of Arrays.  

I was seeing this stack trace:

```java
java.lang.UnsupportedOperationException
   at java.util.AbstractList.remove(AbstractList.java:172)
   at com.jtsnake.test.LettersBean.loadLetterOptions(LettersBean.java:554)
   at com.jtsnake.test.LettersBeanTest.testLoadLetterOptions(LettersBeanTest.java:974)
```


So, if removals are something you want to do, this won't work:


```java
List <LetterOption> list = Arrays.asList(new LetterOption());
list.remove(0);
```

Instead, you'll have to resort to the old-fashioned multi-liner:

```java
List <LetterOption> list = new ArrayList < LetterOption > ();
list.add(new LetterOption());
list.remove(0);
    
```
I guess if you want flexible lists, you'll have to use Python after all.

  
