---
layout: post
title: "Writing Jquery Plugins"
date: "2010-10-12"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "jquery"
  - "plugins"
description: Jquery has made developing javascript fun and enjoyable.  It is a fantastic library that essentially allows the creation of library extensions on top of it 
metaKeywords: javascript, jquery, plugins
draft: false
---

Jquery has made developing javascript fun and enjoyable.  It is a fantastic library that essentially allows the creation of library extensions on top of it via plugins.  Jquery plugins are surprisingly easy to write and elegant to read and use.  Here are a few tips on where to find good plugin candidates, design principles for plugins, and an outline of the basic structure that I have found most useful when writing plugins.

<!--more-->

<div style="width:425px" id="__ss_5423499"><strong style="display:block;margin:12px 0 4px"><a href="http://www.slideshare.net/rockycode/jake-trent-writingjqueryplugins-5423499" title="Writing Jquery Plugins">Writing Jquery Plugins</a></strong><object id="__sse5423499" width="425" height="355"><param name="movie" value="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=jaketrentwritingjqueryplugins-101012075852-phpapp02&rel=0&stripped_title=jake-trent-writingjqueryplugins-5423499&userName=rockycode" /><param name="allowFullScreen" value="true"/><param name="allowScriptAccess" value="always"/><embed name="__sse5423499" src="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=jaketrentwritingjqueryplugins-101012075852-phpapp02&rel=0&stripped_title=jake-trent-writingjqueryplugins-5423499&userName=rockycode" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="355"></embed></object><div style="padding:5px 0 12px">View more <a href="http://www.slideshare.net/">presentations</a> from <a href="http://www.slideshare.net/rockycode">rockycode</a>.</div></div>

Plugins aren't magical or anything.  In fact, any code that you can produce that's delivered as a plugin can be written without a plugin.  Jquery itself is just a bunch of javascript code written in a way that is packaged nicely, ready for distribution, and has a cleaned up API.  That's one of the things that makes it a joy to use.  Compare that with seeing a .js file full of line after line of function() { ... } and either choosing to copy paste bits and pieces or having to sift through it to determine which methods you should or want to call.  Plugins provide an elegant way to create cohesive code and then distribute the idea so that others will be able to pick it up and use it more easily.

For the demo used in conjunction with this presentation, visit the <a href="http://bitbucket.org/jtsnake/jquery-photopeek">Bitbucket Jquery Photopeek</a> repo (hg).

  
