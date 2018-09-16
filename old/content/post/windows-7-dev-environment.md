---
layout: post
title: "Windows 7 Dev Environment"
date: "2010-11-01"
comments: true
categories:
  - "Code"
tags:
  - "windows7"
description: I recently rebuilt my dev box into a Windows 7 environment, coming from Ubuntu 10.04 Lucid Lynx.  The reasons were varied, and most weren't very significant
metaKeywords: windows7
draft: false
---

I recently rebuilt my dev box into a Windows 7 environment, coming from Ubuntu 10.04 Lucid Lynx.  The reasons were varied, and most weren't very significant at all.  Perhaps I just needed another beast to tame.  And an OS can be quite a beast.  But, since I've switched to daily dev on Windows 7, I've been mostly happy in a number of ways.

<!--more-->

The good things
---------------

- **No Synergy** - Synergy can be a really great tool, but the reason I was using it was because I never really chose to get rid of Windows.  The reasons are mostly app-related: Outlook, Powerpoint, and Photoshop.  Now, because I don't use Synergy, I don't have to log off two computers, I don't need as many monitors, I have sound for all my running apps, I don't have to use the cloud to transfer files between apps (though Dropbox is great) and I take all my tools with me on my dev laptop.  I don't need two machines.  

- **No VMs** - This good thing is closely tied to "no Synergy".  I have used VMware and VirtualBox for essentially the same purpose: running apps that weren't available to me on Linux -- most notably here, Internet Explorer.  My main beef with VMs has been performance -- they're generally resource hogs and slow.

- **Photoshop** - This is a wonderful tool that I am way more adept at using, especially compared the Linux "equivalent", Gimp.  

- **Outlook** - I am not forced into the Outlook web client any more, which is dumbed down for the browser and supremely dumbed down for anything except Internet Explorer.  I can easily sync my mail, contacts, and calendar with the rest of the organization.  This is huge.

- **Fast startup** - When I used to boot both my Windows and Lucid Lynx machines, they would get to login at almost the exact same time.

- **Sleep works** - This is closely tied to the fast startup reason -- I have fewer shutdowns and startups during the day because sleep actually works.  

- **Symlinks** - I remember one of my main reasons for going to Linux in the first place was symlinks.  Seriously.  Now, since Vista, the Windows mklink command gives us the same power.  This is fantastic and makes me smile broadly.

- **Pleasing UI** - The Windows 7 UI is very smooth and nice-looking.  The taskbar and startbar pinning of apps is way convenient.  The flyout menus for docs opened with said apps makes recent documents very reachable.  The window grouping and previews keep piles of windows sectioned off well.  There are a couple things that I miss that from the Compiz Fusion windows manager enhancements, such as tiling the windows so they're all visible, ala Mac, and multiple desktops.  

- **Windows Search works** - Ok, not as good as grep or find, nor is it from the command line, but it has vastly improved.  It sits right on the Windows Explorer window, so it's immediately contextual, and it's fairly speedy.  

- **Internet Explorer** - This browser is no good to anyone, unless you get a cut of all the OEM install $$.  But, if you are forced under threat of job loss to code to support it, it's way nice to be able to boot it for some cross-browser testing and not require a VM.  

- **Audio Volume** - I think this must be a driver support issue, but I can crank out so much more volume on my laptop speakers using Windows compared to Ubuntu.

- **Plug and Play** - I get a seamless experience in docking and undocking -- although, I've had it freeze up on me a few times to.  I automatically get external displays and projectors detected.  The resolution is correct.  This is a huge plus around the office when I take my lappy from my desk docking station to a mtg and then quickly present something on a projector.

- **Num Pad** - This was a joke in Ubuntu.  In Windows 7, I can at least rely on my number pad always working. 

- **WebDAV is a little better** - WebDAV stinks in my experience with MarkLogic, but at least in Windows the experience is a little bit better from a stability, read, copy, and UI experience.

- **Steam** - After a good day of dev, and if the eyes aren't yet too strained, it's time for some Monkey Island remakes on Steam.  When is this coming to Linux?! :)


The bad things
--------------

- **Michael Jackson** - or Weird Al.  Oh, wait, that's Fat.

- **Filesystem speed** - Yeah, NTFS shows its age.  Filesystem reads and writes seem quite a bit slower.  I also spend a lot of time in IntelliJ, where file opening and tab switching is also noticably slower.  

- **Mouse time** - I'm handling the mouse a LOT more.  My superuser status is threatened with the lack of keyboard koolness here.

- **Terminal** - Er, command line.  And PowerShell?  Not worthy of the name.  In fact, it's sometimes less powerful than vanilla cmd at times.

- **Home directory layout** - Deep in the directory structure.  And spaces -- Ick!

- **Backslashes** - Eeeegggh...

- **Social acceptance** - I got thrown out of a few geek clubs.  But, on the bright side, I can communicate and debug and get support from more users around the office because most of them use Windows as well.

- **No gnome-do** - I love this app.  The others that are available aren't nearly as elegant.  Start menu app search isn't bad, but it doesn't have all the other plugins of gnome-do.

- **Price** - I can't get the latest release for free.

- **File printing** - Print to PDF not built in

- **No sudo** - Super user process contains more annoying dialogs and is harder to get to w/out re-opening applications like cmd.


It's a tie
----------

- **Wireless** - Wireless networking setup is about as streamlined in each.  I like the UI a bit better in Windows.  I have full control over how I join networks in Ubuntu, but then again I don't have to specify everything everytime on Windows.  Of course, now I'm having a problem when trying to connect to a wireless network on a different domain on my Windows box, and it's giving me severe headaches.  It's like software is built of twine or something.


  
