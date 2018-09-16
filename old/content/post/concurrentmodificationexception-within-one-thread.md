---
layout: post
title: "ConcurrentModificationException Within One Thread"
date: "2009-05-12"
comments: true
categories:
  - "Code"
tags:
  - "concurrency"
  - "java"
description: I at first thought it odd that a ConcurrentModificationException could be thrown w/in the context of a single Thread.  But, what do you know, it can!  And I
metaKeywords: concurrency, java
draft: false
---

I at first thought it odd that a ConcurrentModificationException could be thrown w/in the context of a single Thread.  But, what do you know, it can!  And I seem to be getting better at writing code that does!

<!--more-->

As a part of a recent hack, I wanted to remove a certain element from a list.  As I was iterating over the list, I tried to find an object that met a certain criteria and then remove it, as follows:

```java
void removeStuff() {
   List<Recipient> list = service.populateList();
   for (Recipient r : list) {
      if (r.getProperty().equals(searchProperty)) {
         list.remove(r);
      }
   }
}
```

Unfortunately, this will throw the ConcurrentModificationException.  From the said Exception's JavaDoc:

"Note that this exception does not always indicate that an object has been concurrently modified by a different thread. If a single thread issues a sequence of method invocations that violates the contract of an object, the object may throw this exception. For example, if a thread modifies a collection directly while it is iterating over the collection with a fail-fast iterator, the iterator will thow this exception."

Perfect.  That too-aptly describes my miserable attempts.  So, it sounds like I just have to wait until iteration is complete to then attempt modification.  So, a quick fix might look something like this:

```java
void removeStuff() {
   List<Recipient> list = service.populateList();
   Recipient toRemove = null;
   for (Recipient r : list) {
     if (r.getProperty().equals(searchProperty)) {
         toRemove = r;
      }
   }
   list.remove(toRemove);
}
```


Interestingly, and it was true in this case, the JavaDoc also states: "ConcurrentModificationException  should be used only to detect bugs."

#### Update

My friend, Steve, found a better way to do this inline w/o the exception that employs a manual iterator:

```java
Beaner beaner = null;
Iterator iter = list.iterator();
while (iter.hasNext()){
   beaner = (Beaner) iter.next();
   if (beaner.getType() == 3){
       iter.remove();
   }
}
```
  
