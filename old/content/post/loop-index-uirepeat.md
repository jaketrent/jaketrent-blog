---
layout: post
title: "Loop Index in ui:repeat"
date: "2009-02-20"
comments: true
categories:
  - "Code"
tags:
  - "a4j"
  - "facelets"
  - "jsf"
description: Sometimes it's useful to know what the invariant value is for your loop within a facelets loop.  I use ui:repeat a lot, but have seen <a href="http://aprila
metaKeywords: a4j, facelets, jsf
draft: false
---

Sometimes it's useful to know what the invariant value is for your loop within a facelets loop.  I use ui:repeat a lot, but have seen <a href="http://aprilandjake.com/content/jsf-wont-submit-null-uirepeat/">some problems</a> with it in the past.   If you want to get the loop index for your ui:repeat, you may be disappointed.  Basically, it requires that you use a different looping mechanism.  A nice alternative is the a4j:repeat, which offers the same functionality, plus more awesomeness...

<!--more-->

Enough talk, let's fight:

```jsp
<a4j:repeat var="email" id="repeatid" rowKeyVar="idx"
         value="#{collection}">
   #{idx},
</a4j:repeat>
```

If you loop four times, you should get 1,2,3,4,.

Another point of interest on these loops:

If you have jsf components within this a4j:repeat and need to know their exact id, the id on the loop will help this id be more predictable and readable.  For instance, in this situation:

```jsp
<h:form id="formid">
   <ui:repeat id="repeatid">
      <h:inputText id="textid" />
   </ui:repeat>
</h:form>
```

The id of the h:inputText component would be formid:repeatid:textid.  This is nice to know if you're trying to select dom elements by id in javascript.

  
