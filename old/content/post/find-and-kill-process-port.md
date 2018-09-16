---
layout: post
title: "Find and Kill a Process on a Port"
date: "2012-06-20"
comments: true
categories:
  - "Code"
tags:
  - "bash"
description: Have you ever tried to start up a local dev server and attach it to a port only to find that the port says it's already in use.  Here's a quick way to find 
metaKeywords: bash
draft: false
---

Have you ever tried to start up a local dev server and attach it to a port only to find that the port says it's already in use.  Here's a quick way to find those zombies and kill 'em good.

<!--more-->

## Server Startup Messages

When you go to start your server, you get your annoying error message that just irks you.  If you're starting a Java server, it looks something like:

```bash
java.net.BindException: Address already in use localhost:8080
```

Or in node:

```bash
Error: listen EADDRINUSE
```

No matter the server, you're trying to start, there's something in your way, and it's going down.

## Finding the Perp

Once you find him, he's toast.  Open your terminal and query the problem port:
  
    > lsof -i tcp:8080

From the man file, lsof is:

> Lsof revision 4.84 lists on its standard output file information about files opened by processes

And the -i is showing you Internet addresses:

> This option selects the listing of files any of whose Internet address matches the  address specified in i.  If no address is specified, this option selects the listing of all Internet and x.25 (HP-UX) network files.

## Kill the process

Running the `lsof` command should return something like:

    COMMAND  PID    USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
    java    7135 jtsnake   46u  IPv4 0xffffff801a349c00      0t0  TCP *:http-alt (LISTEN)


That `PID` is the identifier you were looking for.  Now, run a handy:

```bash
> kill 7135 
```

to put the thing out of its misery.  

Just like a fire in the forest, now a new tree has a place to grow.  

  
