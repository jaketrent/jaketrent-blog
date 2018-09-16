---
layout: post
title: "Monitor Network Traffic with EtherApe"
date: "2009-01-05"
comments: true
categories:
  - "Code"
tags:
  - "networking"
description: I wanted to count packets coming back and forth while telnet'ing to test out some different email protocols on our mail server and found this nifty little u
metaKeywords: networking
draft: false
---

I wanted to count packets coming back and forth while telnet'ing to test out some different email protocols on our mail server and found this nifty little utility: it's called EtherApe.  Supposedly it's a clone of Etherman, which, if it has clones, probably costs money.  

<!--more-->

[EtherApe](http://picasaweb.google.com/lh/photo/jNWdHI8V5W1IIMh1W1NKYw?feat=embedwebsite"><img src="http://lh6.ggpht.com/_5XZCKcD6--c/SWKJm2hw0wI/AAAAAAAAFzU/F-nxmHF9gvk/s800/Screenshot-EtherApe-1.png)

EtherApe will regularly update (every few seconds) the cloud of endpoints on what I assume is the subnet.  You can see the number of packets in the different protocols that go across the network.  The more packets, the thicker the line.  It was fun to leave up all day.  

To get it, do a:

```bash
sudo apt-get install etherape
```

There will be a few libraries that are dependencies, but I forget which they are.

  
