---
layout: post
title: "Find network hosts with nmap"
date: "2009-09-30"
comments: true
categories:
  - "Code"
tags:
  - "networking"
description: I had some fun this morning when the headless box that I'm ssh'ing into to do test app runs randomly changed IP address.  My goal was to find it on the netw
metaKeywords: networking
draft: false
---

I had some fun this morning when the headless box that I'm ssh'ing into to do test app runs randomly changed IP address.  My goal was to find it on the network from my local box.  To my rescue: a cool tool called nmap.

<!--more-->

nmap, according to the man page, is a network exploration tool and security/port scanner.  Basically, I only ran it in a few forms.  But, on the man page, there are many, many options listed. 

To use a ping broadcast and find the hosts on the subnet:

```bash
# determine local box IP address and assuming subnet mask 255.255.255.0:
ifconfig

# ping all hosts in range (* = 1-255)
nmap -sP 10.109.16.*

# output will look like this:
Host 10.109.16.141 appears to be up.
...
Nmap done: 256 IP addresses (12 hosts up) scanned in 0.93 seconds
```

For some reason, and if someone knows how to enable this please let me know, my remote box wasn't advertising its hostname, so I wanted to look specifically at the ssh port to see if it was open.  To do this, I used a new option and had to run as root:

```bash
# IP protocol scan, looking at port 22 (default ssh)
sudo nmap -sO 10.109.16.* -p22
```

Note that if you don't include the -p option, this could take some time.  Also, the -sO option is a capital "oh", not a zero.

So, sweet stuff, eh.  Now you can see who else on your network has unsecured ports. :)

  
