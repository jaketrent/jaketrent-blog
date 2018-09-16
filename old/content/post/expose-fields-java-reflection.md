---
layout: post
title: "Expose Fields via Java Reflection"
date: "2009-06-08"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "reflection"
  - "unit-testing"
description: For unit testing purposes, I often want to set field values in objects so that I can setup for the test conditions.  One of most annoying things about testi
metaKeywords: java, reflection, unit-testing
draft: false
---

For unit testing purposes, I often want to set field values in objects so that I can setup for the test conditions.  One of most annoying things about testing is the urge to change code design for just the sake of testing -- especially if it's in a way that is considered less safe, like exposing elements or lessening accessibility.  (This is not to say that trying to test code can reveal certain code smells and prompt refactoring).  I, myself, have a number of setter methods with this comment prepended: "// for test only comments".  Stinkers!  Well, sometimes enough becomes enough.  So, here's a way to set any field on an object w/o exposing it.  This is done via reflection.

<!--more-->

```java
import java.lang.reflect.Field;
    
/**
 * @author: jtsnake
 * @date: "Jun"
 */
public class ReflectionUtil {
    
  /**
   * Gets the value of the field on the given object
   * @param obj the object with the field being examined
   * @param name the name of the field in the object
   * @param < T > will return the field type w/o static casting
   * @return the field value
   * @throws NoSuchFieldException thrown if can't find field
   * @throws IllegalAccessException thrown if the field isn't accessible (shouldn't be a problem w/ setAccessible(true))
   */
  public static < T > T getFieldValue(Object obj, String name) throws NoSuchFieldException, IllegalAccessException {
      Field field = findField(obj.getClass(), name);
      field.setAccessible(true);
      return (T) field.get(obj);
  }
  
  /**
   * Set the value of the field on a given object
   * @param obj the object with the field to set value on
   * @param name name of the field in the object
   * @param value the value to set on the field
   * @throws NoSuchFieldException thrown if can't find the field
   * @throws IllegalAccessException thrown if the field isn't accessible (shouldn't be a problem w/ setAccessible(true))
   */
  public static void setFieldValue(Object obj, String name, Object value) throws NoSuchFieldException, IllegalAccessException {
      Field field = findField(obj.getClass(), name);
      field.setAccessible(true);
      field.set(obj, value);
  }
  
  /**
   * Helper method to find the field in the class
   * @param clzz class type of the object
   * @param name name of the field
   * @return the java.lang.reflect.Field
   * @throws NoSuchFieldException thrown if method recurses to java.lang.Object w/o finding the field by the given name
   */
  static Field findField(Class clzz, String name) throws NoSuchFieldException {
      Field field = null;
      try {
          field = clzz.getDeclaredField(name);
      } catch (NoSuchFieldException e) {
          if (clzz.getSuperclass() != null) {
              field = ReflectionUtil.findField(clzz.getSuperclass(), name);
          } else {
              throw e;
          }
      }
      return field;
  }
}
```
  
