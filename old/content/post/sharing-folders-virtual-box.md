---
layout: post
title: "Sharing Folders in Virtual Box"
date: "2008-11-03"
comments: true
categories:
  - "Code"
tags:
  - "virtualbox"
  - "vm"
description: One of the stinky things about having a VM is that is can be difficult to transfer files to and from the host machine.  You generally have everything that y
metaKeywords: virtualbox, vm
draft: false
---

One of the stinky things about having a VM is that is can be difficult to transfer files to and from the host machine.  You generally have everything that you need on the host machine and don't want to re-download stuff, burn CD's, or go through any of that jazz.  Sharing folders is probably the best option.

<!--more-->

One of the stinky things about having a VM is that is can be difficult to transfer files to and from the host machine.  You generally have everything that you need on the host machine and don't want to re-download stuff, burn CD's, or go through any of that jazz.  Sharing folders is probably the best option.

First, start up your VirtualBox client.  I'm using 1.5.6_OSE.  Select your VM and then click the large "Settings" button.

<img src="http://lh4.ggpht.com/_5XZCKcD6--c/SQ9oMOWw6AI/AAAAAAAAEjc/Ev3u68fKLPY/s800/settings.png" />

In the dialog, select the "Shared Folders" section.  Then, on the far right, add a shared folder.  This is where you can select a directory on your host machine and name it.  In my case, I selected /home/jtsnake/shared and called it "linux-shared".

<img src="http://lh3.ggpht.com/_5XZCKcD6--c/SQ9oMdDmegI/AAAAAAAAEjk/Qa1phVO-67U/s800/shared.png" />

Now, start up your VM.  In the lower right hand corner, you should see a blue folder.  When you hover above it, the tooltip should show you that the shared folder you just shared is working.

<img src="http://lh5.ggpht.com/_5XZCKcD6--c/SQ9oM_IqTwI/AAAAAAAAEjs/VTrOslAZyuk/s800/status.png" />

Now, you have a couple of options.  From the VM side, you can mount a network drive, or from the host side you can mount a drive.  My host machine is Linux; my VM is Windows XP.  I chose to mount the Linux shared folder from the Windows/VM side.  So, I opened the command prompt and entered this command:

```bash
net use x: \\vboxsvr\linux-shared
```

If you wanted to mount from the Linux side, you could use this:

```bash
mount -t vboxsf share mount_point
```

Just remember to substitute the name of the drive with whatever you called you shared folder.

  
