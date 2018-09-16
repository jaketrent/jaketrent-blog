---
layout: post
title: "Custom Exception Handling for AccessDeniedException"
date: "2012-01-06"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "spring"
  - "exception-handling"
description: Our app throws all sorts of exceptions.  Well, it doesn't usually.  It shouldn't normally.  Er... But, when it does we want to put in some handling so that 
metaKeywords: java, spring, exception-handling
draft: false
---

Our app throws all sorts of exceptions.  Well, it doesn't usually.  It shouldn't normally.  Er... But, when it does we want to put in some handling so that the app doesn't blow up in some unsuspecting user's face.  And even then, sometimes we want special handling for certain exceptions and make sure others are just caught.  And that's what we'll do with AccessDeniedException.

<!--more-->

The Simple Case
---------------

In the simple case, all exceptions that bubble up to the servlet container will just need to be caught and a user needs to get a nice view instead of stack trace shown to them.  There's a nice class called `SimpleMappingExceptionResolver` that does, in fact, resolve this.  Provide it with the mappings from exception types to views that you've created, and as exceptions surface, the user will be shown the views instead of the exceptions.  Here's the config:

```xml
<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
  <property name="exceptionMappings">
    <props>
      <prop key=".AccessDeniedException">errors/accessDenied</prop>
      <prop key=".DataAccessException">errors/dataAccessFailure</prop>
      <prop key=".TypeMismatchException">errors/resourceNotFound</prop>
      <prop key=".NoSuchRequestHandlingMethodException">errors/resourceNotFound</prop>
      <prop key=".MissingServletRequestParameterException">errors/resourceNotFound</prop>
    </props>
  </property>
  <property name="defaultErrorView" value="errors/generalError"/>
  <property name="warnLogCategory" value="com.rockycode"/>
</bean>
```

As it turns out, this is perfect for the simple case.  What if I want something special?  And when don't I?!

Custom HandlerExceptionResolver
-------------------------------

In my case, I want to catch `AccessDeniedException` just like all others, except I want to do some special checking of the user attributes who just go rejected via Spring Security.  This means I need a custom `HandlerExceptionResolver`.  And thankfully these things aren't all that complicated.  Something custom to handle our `AccessDeniedException` might be called `AccessDeniedExceptionResolver` and looks somewhat like this:

```java
public class AccessDeniedExceptionResolver implements HandlerExceptionResolver, Ordered {

  private int order;

  public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
    ModelAndView view = null;
    if (ex instanceof AccessDeniedException) {
      // super special handling lives here
      view = new ModelAndView("specialness");
    }
    return view;
  }

  // .. getters and setters ..
}
```

The `resolveException()` method is where the magic goes.  I only care about a certain type of exception, so I check for it and do special stuff.  If not, the `view` is returned as null with just falls through to the next resolver in line if there is one.  And blast it, we want one.  Let's just use our existing simple case resolver.


Setting up 2 ExceptionResolvers
-------------------------------

In `AccessDeniedExceptionResolver`, we implemented `Ordered`.  This shows priority in a potential string of resolvers.  We're going to setup our resolver for the specific case to be higher priority (lower number), remove the `AccessDeniedException` entry on `SimpleMappingExceptionResolver` and add an order property to it:

```xml
<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
  <property name="exceptionMappings">
    <props>
      <prop key=".DataAccessException">errors/dataAccessFailure</prop>
      <prop key=".TypeMismatchException">errors/resourceNotFound</prop>
      <prop key=".NoSuchRequestHandlingMethodException">errors/resourceNotFound</prop>
      <prop key=".MissingServletRequestParameterException">errors/resourceNotFound</prop>
    </props>
  </property>
  <property name="defaultErrorView" value="errors/generalError"/>
  <property name="warnLogCategory" value="com.rockycode"/>
  <property name="order" value="1"/>
</bean>

<bean class="com.rockycode.AccessDeniedExceptionResolver">
  <property name="order" value="0"/>
</bean>
```

Slap that config in your app context and sing for joy.  Now you can create as many custom handlers as you'd like and just string em up like clean laundry on the line.


  
