---
layout: post
title: "Java Reflection for methods with primitive params"
date: "2009-04-14"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "reflection"
  - "testng"
  - "unit-testing"
description: First-class objects are the norm in the code that I usually write and edit, but every now and then I run across a method with a primitive parameter.  I use 
metaKeywords: java, reflection, testng, unit-testing
draft: false
---

First-class objects are the norm in the code that I usually write and edit, but every now and then I run across a method with a primitive parameter.  I use EasyMock a lot in testing, and need to find these methods by reflection, this is how it's done...

<!--more-->

This code:

```java
@Test(groups = {"unit"})
public void testJunk() throws NoSuchMethodException {
  Method m = MyBean.class.getDeclaredMethod("test", Boolean.TYPE, Integer.TYPE, Integer.class);
  MyBean bean = createMock(MyBean.class, m);
  
}
```

will be able to find the method here:

```java
void test(boolean junk, int prim, Integer cl) {
  System.out.println("blast");
}
```

Notice, that object params use: Integer.class

Primitive params use: Integer.TYPE

The one other thing that bugs me with this reflection bit is the string representation of the test() method name.  So, when the test() method name changes to test2(), the unit test will break.  Blast!  Hence, the standard out message.

  
