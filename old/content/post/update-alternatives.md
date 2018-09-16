---
layout: post
title: "Update Alternatives"
date: "2008-11-27"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "ubuntu"
description: It's important to understand what libraries, utilities, engines and so on that are used by your Ubuntu Linux OS.  It's easy to tell if you only have on opti
metaKeywords: java, ubuntu
draft: false
---

It's important to understand what libraries, utilities, engines and so on that are used by your Ubuntu Linux OS.  It's easy to tell if you only have on option -- of course, it uses the only thing available.  But if there are multiple options, which does it use?  In general, the default;  Here's how to set it.

This is similar to the Set Default Applications dialog in Windows XP. 

<!--more-->

It's important to understand what libraries, utilities, engines and so on that are used by your Ubuntu Linux OS.  It's easy to tell if you only have on option -- of course, it uses the only thing available.  But if there are multiple options, which does it use?  In general, the default;  Here's how to set it.

This is similar to the Set Default Applications dialog in Windows XP.  

Type:

```bash
update-alternates --config [press tab, tab]
```

For me, this asked me if I wanted to see all 120 possibilities.  These possibilities represent the full set of options on libraries, utilities, engines, and so on that you have the ability to change the default of.

One that was important for me upon first installing Ubuntu was to change the version of Java that the OS used as default.  After installing my new version of Java, I ran this:

```bash
sudo update-alternates --config java
```

Then, I chose #2, java-6-sun, and life has been good ever since.  At one point, I also had reason to change my totem movie player engine (--config totem).

Linux is great for ultimate control!

<strong>UPDATE:</strong>

I ran into an interesting problem where I was getting a java.lang.UnsupportedClassVersionError when trying to run a .java file that I had compiled.  This error is generated when the source is built for a different JDK than it's run in, so make sure that both 'java' and 'javac' are configured to target the same version of Java.

  
