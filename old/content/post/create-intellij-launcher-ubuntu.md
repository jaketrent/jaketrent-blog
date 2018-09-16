---
layout: post
title: "Create an IntelliJ Launcher in Ubuntu"
date: "2011-06-20"
comments: true
categories:
  - "Code"
tags:
  - "intellij"
  - "linux"
  - "ubuntu"
description: IntelliJ IDEA is a great development environment.  I enjoy it very much.  It complements the OS of pleasure, Linux.
metaKeywords: intellij, linux, ubuntu
draft: false
---

IntelliJ IDEA is a great development environment.  I enjoy it very much.  It complements the OS of pleasure, Linux.  I mostly the Ubuntu distro or a derivative.  Here's a easy way to get yourself an IntelliJ launcher so you don't have to run the bin/idea.sh file if you don't want to.

<!--more-->

As a note:  I'm still using IntelliJ 10.0.3 on my Linux machine.  I was having some issues with 10.5 gobbling 100% CPU.  Bad juju.

Once you download the tar, open 'er up, and place it in your favorite spot for sweet IDEs on the filesystem, create a launcher.  If you're lucky enough to still be using Gnome and not Unity, right click on your version of the menu and select edit (pictured, Linux Mint, hence all the green):

![image](https://lh6.googleusercontent.com/-8Ls7ZWxGS3A/Tf-sKSQReUI/AAAAAAAAADw/PSBzRjJXNb4/s800/1-EditMenu.jpg)

The navigate to the Programming-related area, and select New Item:


Create your item:

![image](https://lh3.googleusercontent.com/-xRk91_xLdFY/Tf-sKmaxkaI/AAAAAAAAAD4/bE6JKGofBVE/s640/3-EnterItem.jpg)

The point here is to run the idea.sh file, but export JDK_HOME at the same time.  IntelliJ requires this to run.  It should also be noted that even at version 10.5 of IntelliJ, it still doesn't seem to like OpenJdk.  Hopefully that'll change soon, but for now, download Java 6.  Linux Mint nicely includes this in its PPAs, but you may not have that with other `Ubuntu derivatives <http://rockycode.com/blog/install-java-5-karmic-koala/#comment-51263136>`_.

My launcher looks like this:

```bash
/bin/sh -c "export JDK_HOME=/usr/lib/jvm/java-6-sun&&/usr/progs/idea10/bin/idea.sh"
```

Make sure to reference the 128-pixel IDEA logo in the <idea>/bin directory so your Gnome-Do will look large and crisp:

![image](https://lh5.googleusercontent.com/-ndkYKjiHNTI/Tf-sKmEfj-I/AAAAAAAAAD8/_zacFXJyyXM/s800/4-GnomeDo.jpg)


  
