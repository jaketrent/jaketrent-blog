---
layout: post
title: "Change hostname on Ubuntu"
date: "2010-01-04"
comments: true
categories:
  - "Code"
tags:
  - "linux"
  - "networking"
  - "ubuntu"
description: When you setup your computer at the time of your initial Ubuntu installation, you assign your computer a hostname.  In my case, I gave it a hostname and the
metaKeywords: linux, networking, ubuntu
draft: false
---

When you setup your computer at the time of your initial Ubuntu installation, you assign your computer a hostname.  In my case, I gave it a hostname and then later wanted to change it to something else.  This is accomplished in two easy steps.  

<!--more-->

First, 

```bash
sudo emacs /etc/hostname
```

, and overwrite the hostname with the new hostname.  This will make it so the correct name is show when running the hostname command. Second, 

```bash
sudo emacs /etc/hosts
```

, and overwrite the hostname here.  This will allow you to use sudo successfully and network applications to run.  This was done on Ubuntu 9.10 (Karmic).

  
