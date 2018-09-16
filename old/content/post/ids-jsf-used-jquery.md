---
layout: post
title: "Id's from JSF, used in jQuery"
date: "2008-11-22"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "jquery"
  - "jsf"
description: For our view layer on our current project at work, we use JSF/Facelets + some jQuery goodness.  I have found that at some times these two tech's have a hard
metaKeywords: javascript, jquery, jsf
draft: false
---

For our view layer on our current project at work, we use JSF/Facelets + some jQuery goodness.  I have found that at some times these two tech's have a hard time working with each other.  I ocassionally have problems with the id's.  Here's a nice little way to guarantee you id's are awesome.

<!--more-->

For our view layer on our current project at work, we use JSF/Facelets + some jQuery goodness.  I have found that at some times these two tech's have a hard time working with each other.  I ocassionally have problems with the id's.  Here's a nice little way to guarantee you id's are awesome.

On the job, we're lucky enough to have designers hand us high-fidelity prototypes with jQuery often in place to do some fancy shmancy stuff.  It doesn't often work to port this html straight to jsf and drop in jsf components.  

Why?  Because jsf loves to prepend id's with parent element id's.  For instance, h:commandButton's are going to get their id's prepended with the id of the parent h:form.  Blast!  So, we have to adjust the id's.  

The second problem is that the parent id and the original id are now separated by a colon.  jQuery doesn't like the colon's using the usual id-based selector:

```js
$("#formid:myid").doSomething();
```

To get around the colon in id problem, use the attribute selector for id:

```js
$("[@id=formid:myid]").doSomething();
```

Voila!  (said like Chris K.)

  
