---
layout: post
title: "Use Java Reflection to Get Field w/ Accessor"
date: "2009-02-20"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "reflection"
description: Java is about objects.  Reflection is about knowing things about those objects generally without have specific fields and methods in hand.  I must get to on
metaKeywords: java, reflection
draft: false
---

Java is about objects.  Reflection is about knowing things about those objects generally without have specific fields and methods in hand.  I must get to one of those field values via its accessor, allowing me to keep the fields private and abstracted away... of course, until I start unit testing.  Here's one method...

<!--more-->

In our application, we use a jsf converter that converts the string representation of the a jpa-managed object into the object proper.  

The required format of this string is thus:

```
fully.qualified.class.name:primarykey
```

I don't want to override the toString() method because we use it for other things.  And, I don't want to have to create some method to return this formatted string to me in <strong>every</strong> class that I might want to call this on.  So, I created a util method to do this for me.
    
```java
public static String getEntityConverterString(Object o) {
   String retval = null;
   if (o != null) {
      String id = null;
      for (Field f : o.getClass().getDeclaredFields()) {
      if (f.isAnnotationPresent(Id.class)) {
         String getterName = "get" + StringUtils.capitalize(f.getName());
         for (Method m : o.getClass().getDeclaredMethods()) {
         if (m.getName().equals(getterName)) {
            try {
            Object idObj = m.invoke(o, null);
            if (idObj != null) {
               id = idObj.toString();
               break;
            }
            } catch (IllegalAccessException e) {
            throw new RuntimeException("Cannot find appropriate accessor for @Id field ");
            } catch (InvocationTargetException e) {
            throw new RuntimeException("Exception thrown w/in accessor");
            }
         }
         }
         break;
      }
      }
      retval = o.toString().split("@")[0] + ":" + id;
   }
   return retval;
}
```

The only stipulation to this working is that the class follows the JavaBean naming convention standard of "get" + capitalized field name following.  Oh, and one more: this is only designed for @Entity's with one @Id field (no composite key).

This method goes through all fields, finds the one with the javax.persistence.Id interface annotation, then tries to find a matching accessor method.  If it is found, it is executed, the value of the id field is given, finally to be used to create the specially formatted string.

  
