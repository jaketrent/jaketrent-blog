---
categories:
  - "Code"
comments: true
description: "How to copy an ISO file to a bootable USB stick"
image: "https://i.imgur.com/MMP88ah.jpg"
layout: post
metaKeywords: "iso, dd, etcher, bootable usb, usb stick, linux usb, macos"
draft: false
tags:
  - "linux"
title: "Copy ISO to Bootable USB Stick"
date: "2019-02-22"
---

An `.iso` file is an image of a bootable disk.  If we can can put it on a USB stick, we can boot our computer to that USB stick contents.  Here's a way to do that in MacOS.

<!--more-->

We find ourselves a fresh USB and clear it out.  This can be done with the Disk Util.app, built into MacOS.  Erase it and format it.

## Unmount the USB Stick

Make sure it's unmounted, or later it'll show as busy when we try to copy files to it.  We'll get an error like `dd: /dev/disk3: Resource busy`.

To unmount, check what mounted volumes we have:

```
ls /Volumes
```

Identify the USB stick's volume name, in my case named `LINUXINSTAL`, and type:

```bash
diskutil unmount /Volumes/LINUXINSTAL
```

## Find USB Stick Drive Name

We found the name of the mounted USB stick, but we want to know the identifier of the USB stick as a drive, still plugged into our computer.

This can be done with:

```
distutil list
```

This will list various disks that are physically present on  computer.  Find the one with the size and filesystem type that seem to indicate your USB stick.

Mine looks like:

```txt
/dev/disk3 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *2.0 GB     disk3
```

Now that we can identify the destination, it's time to copy files over.

## Copy the ISO to the USB Stick

To copy the `.iso` file, there's a handy built-in utility called `dd`, meant for moving and converting files.

To setup that command, type:

```bash
sudo dd bs=4m if=~/Downloads/myiso.iso of=/dev/disk3
```

That should do the trick.  That command will likely take a while, differing based on the size of the file and the hardware involved.

To break down the command:

- `bs` - sets the block size (this is how many bytes are written at a time)
- `if` - the input file path (otherwise default is stdin)
- `of` - the output file path (otherwise default is stdout)

Please note that for Mac, the `bs` unit has to be a lowercase `m`.  Otherwise, you'll get `Illegal numeric value`. Also specific to Mac, you cannot add the argument `status=progress`.  Otherwise, you'll get `unknown operand status`.

If you did it right, you're all set (or you will be given time!). Then give it the boot!
