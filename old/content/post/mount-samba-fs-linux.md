---
layout: post
title: "Mount Samba FS on Linux"
date: "2009-09-21"
comments: true
categories:
  - "Code"
tags:
  - "networking"
  - "samba"
  - "storage"
description: Have you ever wanted to map to a remote drive or mount a samba share on Linux?  The commands a really easy, and they're chronicled here.
metaKeywords: networking, samba, storage
draft: false
---

Have you ever wanted to map to a remote drive or mount a samba share on Linux?  The commands a really easy, and they're chronicled here.

<!--more-->

First, grab Samba:

```bash
sudo apt-get install smbfs
```

Then use smbmount

```bash
sudo smbmount //remote/path/ /local/mount/path/ -o username=[user]
```

Behind -o, you can specify a number of comma-separated options.  To connect to the remote FS that I desired, I just needed the username specified.  Once you execute the smbmount, you may get a "Password:" prompt.  Make sure that you're not hopelessly entering your sudo password, as this is probably the password for the FS.

A good resource for this whole process is <a href="http://www.stevens.edu/itwiki/cgi-bin/wiki/index.php/Linux_Map_a_Network_Drive">on this wiki</a>, or you can do a

```bash
/sbin/mount.cifs --help
```
  
