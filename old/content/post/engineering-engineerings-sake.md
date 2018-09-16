---
layout: post
title: "Engineering for Engineering's Sake"
date: "2009-11-10"
comments: true
categories:
  - "Code"
tags:
  - "engineering"
description: Software engineers are sometimes very, very prone to making things more complex than they need to be.  In the engineer's mind, "complex" can be replaced wit
metaKeywords: engineering
draft: false
---

Software engineers are sometimes very, very prone to making things more complex than they need to be.  In the engineer's mind, "complex" can be replaced with the word "cool" (or some other amazing adjective).  Such a mind has gotten lost, has lost sight of the fact that there exists a most-efficient path from the problem to the solution.  Such a predicament is not uncommon -- probably because of something physically wrong in the engineer's mind;  And because a certain amount of tinkering is usually required to begin work toward a solution.  But, when one becomes enveloped in the problem and forgets about the priority of actually solving the problem, large, unrecognizable apparatus are concocted.  

<!--more-->

Here is one such example, found today in a Java project that I recommend my mission be to keep anonymous:

```java
public static boolean evaluateOrConditions(boolean ... conditions) {
  boolean valid = false;
  for (boolean b : conditions) {
      if (b) {
          valid = true;
          break;
      }
  }
  return valid;
}
```

I give you... [drum roll] ... the newly invented OR statement!   LOL!

  
