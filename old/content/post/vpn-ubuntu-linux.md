---
layout: post
title: "VPN on Ubuntu Linux"
date: "2008-11-23"
comments: true
categories:
  - "Code"
tags:
  - "linux"
  - "ubuntu"
  - "vpn"
description: It is one of the nicest things to be able to work remotely.  Almost all my jobs have allowed this.  My current job allows it on a limited basis as well.  It
metaKeywords: linux, ubuntu, vpn
draft: false
---

It is one of the nicest things to be able to work remotely.  Almost all my jobs have allowed this.  My current job allows it on a limited basis as well.  It's even more attractive an option now that I have a nice desk chair at home, for which I currently long, because I'm currently typing up this post from a 2nd grader mini-chair while I wait for my lovely wife, April.

Remote working goodness is just a few shell commands away via Cisco VPN in Linux!

<!--more-->

It is one of the nicest things to be able to work remotely.  Almost all my jobs have allowed this.  My current job allows it on a limited basis as well.  It's even more attractive an option now that I have a nice desk chair at home, for which I currently long, because I'm currently typing up this post from a 2nd grader mini-chair while I wait for my lovely wife, April.

Currently, in order to work from home, I'm required to connect to the VPN or virtual private network.  This effectively puts me on the network at work as though I was there.  On Windows, I used the Cisco client for VPN.  On Linux, I also use a Cisco client via the shell.

To download the client:

```bash
sudo apt-get install vpnc
```

This install comes with an example config file

```bash
# /etc/vpnc/example.conf
IPSec gateway < gateway >
IPSec ID < group-id >
IPSec secret < group-psk >
IKE Authmode hybrid
Xauth username < username >
Xauth password < password >
```

Copy it so you can do with it as you please:

```bash
cd /etc/vpnc; sudo cp example.conf myconfig.conf
```

Edits to the config file will be according to the spec of your own network.  In my case, I set an IP address for the gateway, specify the group-id, the group-psk, get rid of the 'IKE Authmod hybrid' line and remove the '< password >' so that it prompts for the password upon connecting.  For me, the gateway was different on the outside of the network compared to VPN'ing inside the network.  Ensure that you have an IP or alias that is recognized from where you're trying to connect.

To connect to the VPN, append your command with the name of the config file you wish to use:

```bash
sudo vpnc myconfig
```

Note, you can execute this from any directory in your path and not have to use the absolute path of the config file.

To disconnect, use this command, which effectively just kills the process -- nice!

```bash
sudo vpnc-disconnect
```

But whatever you do, just <a href="http://www.aprilandjake.com/content/intellij-8m1-ubuntu-8-ultimate-pleasure" />enjoy the pleasure</a> of developing with pleasure on the OS of pleasure in the chair of pleasure.  And they call this work!!

<h4>Update</h4>

Lately I've had problems with vpnc on Jaunty.  I keep getting this error when I try to start it up:

```bash
resolvconf: Error: /etc/resolv.conf must be a symlink
```

My buddy Steve gave me this solution:

```bash
sudo vpnc-disconnect
sudo ln -s /etc/resolvconf/run/resolv.conf /etc/resolv.conf
```

Try again, and you should be good.  This problem keeps coming back, however.  You might want to try writing a script to do it for you.  My friend Jeremy pointed me to <a href="https://bugs.launchpad.net/ubuntu/+source/network-manager/+bug/324233">this</a>.

  
