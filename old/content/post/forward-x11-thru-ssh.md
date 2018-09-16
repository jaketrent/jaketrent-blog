---
layout: post
title: "Forward X11 Thru SSH"
date: "2009-09-22"
comments: true
categories:
  - "Code"
tags:
  - "ssh"
  - "xserver"
description: SSH is a great protocol that allows secure connections to remote systems.  It's easy to use, gives you terminal access to the system in question and allows 
metaKeywords: ssh, xserver
draft: false
---

SSH is a great protocol that allows secure connections to remote systems.  It's easy to use, gives you terminal access to the system in question and allows you to function as you would were you at the machine itself -- in the terminal.  But, if you want to see actual windows, thru a GUI window management system like Gnome, for instance, you need to enable <a href="http://en.wikipedia.org/wiki/X11">X11</a> forwarding.  

<!--more-->

You have to configure the server (remote box) and the client (you).

For server, install and run the sshd daemon:

```bash
sudo apt-get install ssh-server;
sudo /etc/init.d/ssh restart
```

Then adjust the server config:

```bash
sudo emacs /etc/ssh/ssh_config;
# add/modify this line to read...
ForwardX11   yes
```

For the client, install and run ssh:

```bash
sudo apt-get install ssh;
ssh [remote-host-ip] -X
```

The -X option will enable the X11 forwarding.  Now, try to pop something in a window.  (eg, emacs &, xclock &, nautilus &).  

  
