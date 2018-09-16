---
layout: post
title: "Parameterized States in Webflow"
date: "2009-10-08"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "spring"
  - "webflow"
description: My first experience with <a href="http://www.springsource.org/webflow" target="_blank">Spring Webflow</a> is on a project that uses Webflow 1.0.5.  So far, 
metaKeywords: java, spring, webflow
draft: false
---

My first experience with [Spring Webflow](http://www.springsource.org/webflow) is on a project that uses Webflow 1.0.5.  So far, I'm impressed.  Apparently, Webflow 2 offers even more incredible awesomeness, but thusfar I would put my webflow experience over that of my previous couple years in Seam.  (I was just waiting for a chance to abandon that library anyway.)  

<!--more-->

A few quick observations based on my limited Webflow exposure:  Conversation control seems more granular.  Starting subflows (sub-conversations) is very easy and clean up well after themselves.  Webflow keeps flow/nav all in related webflow xml, which are clearly hierarchical and separated.  Webflow also seems to have a clearer and easier-to-follow syntax in its xml.

In my 2 days on this project with Webflow, I saw what I thought looked like a fair amount of duplicate xml code in the *-flow.xml files.  This smell led me to perservere on a better solution.  Thus, recorded here, is my method for creating a reusable state that has behavior specific to the code that is using it.  Specifically, for a view-state that navs to an action-state, that action-state's back/error transition can know how to return to the state that just invoked it.

Here's the view-state:

```xml
<view-state id="startingView" view="/start.xhtml">
  <transition on="return" to="processReturn">
      <set attribute="returningFrom" value="${'startingView'}" scope="flash"></set>
  </transition>
</view-state>
```


And the action-state:

```xml
<action-state id="processReturn">
  <bean-action bean="service" method="saveAndReturn">
      <method-result name="saveSuccessful" scope="flash"></method>
  </bean-action>
  <transition on="${flashScope.saveSuccessful}" to="backToIndex"></transition>
  <transition on="${!flashScope.saveSuccessful}" to="${flashScope.returningFrom}"></transition>
</action-state>
```

So, when the transition in the view for "return" is hit, we save an attribute in the flash scope, which is maintained over redirects in the flow, the value being the id of the view-state from which we're coming.  When we get to the action-state, if we find that our action was unsuccessful, we grab the attribute from the flash scope and transition back to that view-state with the given id.  Thus, we don't have to have a separate action-state for each view-state that might want to use similar functionality because we have parameterized the specific data/functionality.

Note: I had to use the ${'literal'} syntax for the attribute value.  I'm not sure if this is a quirk of Webflow 1 or my project.

Viva la Webflow.  That, or just write SOUIT apps!

  
