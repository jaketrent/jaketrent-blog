---
layout: post
title: "Crystal Reports in Ubuntu Linux"
date: "2008-11-07"
comments: true
categories:
  - "Code"
tags:
  - "crystal-reports"
  - "linux"
  - "ubuntu"
description: All over the net, there are questions asked about running Crystal Reports in Linux.  This isn't a solution for running Crystal in Linux per se, but running 
metaKeywords: crystal-reports, linux, ubuntu
draft: false
---

All over the net, there are questions asked about running Crystal Reports in Linux.  This isn't a solution for running Crystal in Linux per se, but running Crystal as lightweight as possible on a Linux host machine.  This means, run a VM, install Crystal, and use a small Oracle client.

<!--more-->

All over the net, there are questions asked about running Crystal Reports in Linux.  This isn't a solution for running Crystal in Linux per se, but running Crystal as lightweight as possible on a Linux host machine.  This means, run a VM, install Crystal, and use a small Oracle client.

My VM of choice is VirtualBox.  It runs smoothly, is equal in its non-performance to other VM's, and has some cool features.  For a little how to on how to install VirtualBox on Ubuntu, look <a href="http://aprilandjake.com/content/virtual-box-ubuntu-linux/">here</a>.  Be sure to install Windows XP on your VM, as that's the only environment I know of that Crystal is actually runnable in.  We also tried using CodeWeavers Pro (which is built on top of Wine) to run Crystal.  It was a no go.  No matter what method we used within CodeWeavers, we always ran into an error about needing to run the setup.exe again.

Once the VM is installed, you can install <a href="http://www.businessobjects.com/product/catalog/crystalreports/">Crystal Reports</a> on the VM.

Then, make sure to download an Oracle client.  Oracle clients are infamously large, clunky, and have a very low-value per Mb of size.  Therefore, I like to go with the smallest client available.  As of this writing, the smallest is the Oracle <a href="http://www.oracle.com/technology/tech/oci/instantclient/index.html">Instant Client</a>, basic lite version.  Download the package, extract to a folder, and put that folder in your PATH.  

Now you can pull up Crystal Reports and make a new connection.  The Instant Client, because of the lack of pork rolled its package, lacks functionality, but that's ok because there's a workaround.  It's worth the saved space and thought of massive amounts of worthless Oracle code cluttering your hard drive.  Instead of being able to use your tnsnames.ora, you will need to enter the actual address of the database host.  Use this format:

```html
//host:port/servicename
```

The service name will be the database alias that you would normally use via tnsnames.ora.  In fact, you can just inspect your tnsnames.ora file to find the host, port, and all that jazz.

  
