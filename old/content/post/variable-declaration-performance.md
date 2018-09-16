---
layout: post
title: "Variable Declaration Performance"
date: "2009-09-02"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "performance"
description: Often when coding, we use a single local variable multiple times, overwriting the value many times.  It is considered good practice to move the variable out
metaKeywords: java, performance
draft: false
---

Often when coding, we use a single local variable multiple times, overwriting the value many times.  It is considered good practice to move the variable out of the looping overwrite and into the smallest scope of code that is run once.  But, this makes the code a little bit less concise.  So, how useful is it, anyway?  I wanted to run a few little tests and see if there's really a noticable difference in performance.  

<!--more-->

### Experiment

My primitive experiment was to create two different Java programs where I kept declaring the variable in one and where I declared it once and then assigned in multiple times in another.

```java
class TestDeclareOnce {
  public static void main(String[] args) {
    int x;
    for (int i = 0; i < Integer.parseInt(args[0]); ++i) {
        x = i;
    }
  }
}

class TestDeclareMany {
  public static void main(String[] args) {
    for (int i = 0; i < Integer.parseInt(args[0]); ++i) {
      int x = i;
    }
  }
}
```

And run like so:

```bash
java TestDeclareOnce [num-times-to-loop]
```

I wrote similar versions for java.util.List's, trying to determine whether or not constructing and assigning a larger object would change the pattern or not.  Of course, the declaration of an object is only a reference to somewhere in the heap, so I'm not sure what I was expecting, but I tried it all the same.  Those classes were very congruent in form to the first two, differing in this form:

```java
List list = new ArrayList(i);
```

One of my initial theories was that the Java compiler would optimize the difference away, making the byte code the same.  I diff'ed the resultant 2 bytecodes, however, and they are indeed different.

So, I instead ran these a few times and tried to determine the difference in time to completion.  I used the Unix 'time' function to record running time.  Who knows how accurate that is, but it was handy at the moment.

### Results

<a href="http://picasaweb.google.com/lh/photo/LvQyLtgitOy4XVWZYjX7LQ?feat=embedwebsite"><img src="http://lh6.ggpht.com/_5XZCKcD6--c/Sp6-v4GovRI/AAAAAAAAIWg/KlHJpd4HQsI/s400/VarDeclarationSpeedResults.png" /></a>

I didn't run this test many times and look for the average or mean, so there are some outliers here.  But, I think there's a fairly obvious, if not conclusive, pattern.  Defining a variable outside the loop makes a bigger difference the more times you loop.  Even then, some of the time the results are very close or even contradict the previous statement.  Data sets used here weren't very large either, so the difference is less drastic.  

The conclusion?  It's not going to make a big difference whether you declare your variable inside or outside the loop when dealing with a small number of loop iterations.  Here, small has been demonstrated to be up to 100 million.  There may be some situations in which it matters more.  What has been your experience?

  
