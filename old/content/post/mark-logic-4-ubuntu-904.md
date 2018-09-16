---
layout: post
title: "Mark Logic 4 on Ubuntu 9.04"
date: "2009-06-04"
comments: true
categories:
  - "Code"
tags:
  - "linux"
  - "marklogic"
  - "ubuntu"
description: Mark Logic Server seems to be the latest, greatest in content serve-up.  At least it is generating a lot of excitement at the LDS Church, where it's being u
metaKeywords: linux, marklogic, ubuntu
draft: false
---

Mark Logic Server seems to be the latest, greatest in content serve-up.  At least it is generating a lot of excitement at the LDS Church, where it's being used for new content-centric apps/sites.  Being caught in the wave of awesome, I was interested in getting it running in my favorite dev environment: Ubunutu-flavored Linux.

It wasn't bad at all.  In fact, it was accomplished in almost as few steps as installing Apache or Tomcat.  Except, after this installation, full XML xquery'age is now possible!  Here are the steps, slightly elongated by the fact that all Mark Logic-supported Unix systems are rpm-based.

<!--more-->

Here are the steps, ya'll:

```bash
# Get the package
wget http://developer.marklogic.com/download/binaries/4.0/MarkLogic-4.0-5.i686.rpm
    
# Get the rpm -> deb converter
sudo apt-get install alien
    
# Convert the package
sudo alien MarkLogic-4.0.5.i686.rpm
    
# Install the package
sudo dpkg -i MarkLogic-4.0.6.i686.deb
    
# Supposedly, this dir is also important
sudo mkdir /var/lock/subsys
    
# Try to start the server -- most likely this will fail
sudo /etc/init.d/MarkLogic start
    
# Here, I got this error:
#   MarkLogic: /opt/MarkLogic/bin/MarkLogic: error while loading shared
#   libraries: libbteuclid.so.6.0.1: cannot open shared object file: No such file or directory
    
# If needed, the the latest, unstable shared library (at own risk)
wget http://ftp.us.debian.org/debian/pool/main/l/lsb/lsb-base_3.2-22_all.deb
    
# Install the shared lib
sudo dpkg -i lsb-base_3.2-22_all.deb
    
# Start for real this time
sudo /etc/init.d/MarkLogic start
    
# Access your server and download a license key
firefox http://localhost:8001 &
```


You can also look for newer packages [here](http://developer.marklogic.com/download/).

Here's the [lsb-base page](http://packages.debian.org/unstable/lsb-base) for further investigation of this shared library awesomeness.

  
