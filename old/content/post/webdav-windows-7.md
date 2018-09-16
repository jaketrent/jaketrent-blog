---
layout: post
title: "WebDAV on Windows 7"
date: "2010-10-05"
comments: true
categories:
  - "Code"
tags:
  - "marklogic"
  - "webdav"
  - "windows7"
description: The spectre of webdav has again appeared before me.  This time's it's on Windows.  My last experience on webdav was in the dojo of Linux.  Now, my Linuxy nu
metaKeywords: marklogic, webdav, windows7
draft: false
---

The spectre of webdav has again appeared before me.  This time's it's on Windows.  My last experience on webdav was in the dojo of Linux.  Now, my Linuxy nun chucks aren't quite as deadly.  I must tame this beast.  Here's a Windows-webdav must.

<!--more-->

Disable Internet Exporer 8's automatic proxy
--------------------------------------------

If you don't do this, you will find that webdav on Windows 7 is extremely slow.  So slow, in fact, that it crashed Windows Explorer several times as I tried connecting to webdav and got the dreaded "(Not Responding)" text multiple times.

To disable, open up IE, and pull this action:

1. Tools menu > Internet Options > Connections tab > LAN Settings button

2. Uncheck "Automatically detect settings" box

This should noticeably improve your speed.


Other Troubled-shots
--------------------

I tried a few other things that may/not help you in your quest for webdav'ery on Windows:

* Allow for [basic authentication via webdav](http://support.microsoft.com/kb/841215).

* Use the [Oxygen](http://www.oxygenxml.com/download.html) webdav interface.  It's faster that the Windows Explorer method (with auto proxy still enabled), but limited in its function.  You can't copy folders of things out of or into webdav.


Make a webdav connection
------------------------

Now that you hopefully have your enemies to progress subdued, it's time to just make the connection.  The favored Windows 7 method is adding a network place:

1. Start menu > Computer 

2. Right click in main window area > Add a network location

3. Next > Next > Enter URL > Enter descriptive name > [enter credentials] > Finish

Now your connection should be saved for the next time you log into your computer and are ready to face the perils of webdav once more.

  
