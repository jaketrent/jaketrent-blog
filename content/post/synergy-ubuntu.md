---
layout: post
title: "Synergy on Ubuntu"
date: "2010-01-04"
comments: true
categories:
  - "Code"
tags:
  - "linux"
  - "synergy"
  - "ubuntu"
description: Synergy is a fantastic project that allows you to share a single set of input devices (keyboa
metaKeywords: linux, synergy, ubuntu
draft: false
---

[Synergy](http://synergy2.sourceforge.net/) is a fantastic project that allows you to share a single set of input devices (keyboard and mouse) over multiple machines.  Clipboard sharing is also supported.  It's remarkably easy to set up, and it works across multiple platforms.

<!--more-->

For my personal setup, I wanted to link my Linux box (lds-lap-3) and my Windows (sidekick) box.  I wanted the Linux box to be the server and the Windows box to be the client.  I also want both to work on login.  Here are are the steps:

First, install the Windows executable after downloading it from the <a href="http://sourceforge.net/projects/synergy2/files/">Sourceforge</a> site.  For the Linux side, take advantage of the glorious network updates:

```bash
sudo apt-get install synergy
```

On the Ubuntu server, create a file called synergy.conf.  For the complete explanation, refer to the <a href="http://synergy2.sourceforge.net/running.html">Synergy docs</a>.  Here's my example file:

```text
section: screens
	 lds-lap-3:
	 sidekick:
end
section: links
	lds-lap-3:
		left = sidekick
        sidekick:
		right = lds-lap-3
end
```

In the above configuration, lds-lap-3 is to the right of sidekick.  Now, setup the Synergy server to start when I log into my Ubuntu box (running gnome):

```bash
sudo emacs /etc/gdm/Xsession

# add these lines:
/usr/bin/killall synergys
sleep 1
/usr/bin/synergys --config /your/path/to/synergy.conf
```

For a more comprehensive take on autostarting, check out the <a href="http://synergy2.sourceforge.net/autostart.html">Synergy docs</a>.  On the Windows box, start the Synergy GUI and select the option to "Use another computer's shared keyboard and mouse (client)".  Then, enter the other computer's host name.  In my case, this is "lds-lap-3".

If you want the client to connect on login or start up for the Windows box, you'll find that under the "Options" section, click the "Autostart..." button.  

Now, I restart the Ubuntu box and log in.  To check to see if Synergy auto-started, run a:

```bash
ps ax | grep synergys
```

You should see the command run by the loading of the Xsession script.  Now, you can restart your Windows box.  Or, if you want to test that later, just click "Start" to get your client going.

In my case, using Synergy 1.3.1, the client couldn't find the server this time.  I received this in the Synergy log: "WARNING: failed to connect to server: address not found for: lds-lap-3".  Well!  I'm not sure how I got this working before, but a Jaunty install with the same Windows install, I know this worked.  So, maybe it's a Karmic thing, I'm not sure.  I've also changed the physical location of my network plugin, so who knows.  In this <a href="http://www.linein.org/blog/2007/06/25/synergy-131-warning-failed-to-connect-to-server-time-out/">post</a>, they suggested pointing the client to the actual IP of the server.  This did work, though it's not as fun or automatic and gives me little spasms in my left eyebrow.  But, hey, it's working now.  If I find something more definitive, I'll post.

Enjoy the awesomeness of Synergy, for which there is also no charge, and enjoy finding your mouse pointer in the sea of screen that you are about to enjoy.

  
