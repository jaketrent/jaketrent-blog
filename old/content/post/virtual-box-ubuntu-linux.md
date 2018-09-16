---
layout: post
title: "Virtual Box on Ubuntu Linux"
date: "2008-11-19"
comments: true
categories:
  - "Code"
tags:
  - "linux"
  - "ubuntu"
  - "virtualbox"
  - "vm"
description: As awesome as Linux is, I still have moments where I want something from the Windows world.  Shy of putting a whole dual-booted partition on my harddrive, I
metaKeywords: linux, ubuntu, virtualbox, vm
draft: false
---

As awesome as Linux is, I still have moments where I want something from the Windows world.  Shy of putting a whole dual-booted partition on my harddrive, I am doing the virtual machine gig.  I have tried VMWare before, but have just found the whole experience rather clunky.  I even found VirtualPC (running on Windows) more pleasing.  Another big kicker with VM's is performace -- I can't ever seem to get even comparable performance from a VM.  Several of my coworkers report, however, that they are please with the performance of Sun's VirtualBox.  I, therefore, am giving it a try.

<!--more-->

As awesome as Linux is, I still have moments where I want something from the Windows world.  Shy of putting a whole dual-booted partition on my harddrive, I am doing the virtual machine gig.  I have tried VMWare before, but have just found the whole experience rather clunky.  I even found VirtualPC (running on Windows) more pleasing.  Another big kicker with VM's is performace -- I can't ever seem to get even comparable performance from a VM.  Several of my coworkers report, however, that they are please with the performance of Sun's VirtualBox.  I, therefore, am giving it a try.

First, download the package:

```bash
sudo apt-get install virtualbox-ose
```

(This fetched version 1.5x for me, but 2.0 is available as well.)

Determine your kernel version:

```bash
uname -r
# for me, yields: 2.6.24-19-generic
```

Match a VirtualBox kernel driver to your version:

```bash
sudo apt-get install virtualbox-ose-modules-2.6.24-19-generic 
```

VirtualBox has set up a user group, verified here:

```bash
grep vboxusers /etc/group
```

Then add your user to the user group for the kernel driver:

```bash
sudo usermod -a -G vboxusers jtsnake
```

The -a option adds the group as a supplementary group and doesn't replace your primary group.  

Verify that the group was added to your user:

```bash
id jtsnake
```

Logout to allow the group addition to be activated.

Now startup VirtualBox and let it walk you through the several-step process of creating a new VM.  I'm set mine up for WindowsXP, on a growable virtual drive, starting at 20 GB.  

Once it's all setup in VirtualBox, insert your alternative-OS CD, select your newly-created VM, and press Start.  Under the Devices menu, be sure to mount your CD.  By now, you probably have gotten an error message about the absence of bootable media.  Restart the VM and press F12 a couple seconds after startup to get the boot options.  Select option 3 for CD-ROM, and you should be in business to start installing files to the virtual drive.

Now your virtual life is even more virtual, virtually.

  
