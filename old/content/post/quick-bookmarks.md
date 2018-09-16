---
layout: post
title: "Quick Bookmarks"
date: "2010-07-28"
comments: true
categories:
  - "Code"
tags:
  - "browser"
description: For someone who spends mucho time daily on the interwebs, being able to jump around quickly is important -- both for focused productivity and ADD-inducing w
metaKeywords: browser, web
draft: false
---

For someone who spends mucho time daily on the interwebs, being able to jump around quickly is important -- both for focused productivity and ADD-inducing web surfing.  Bookmarks have long facilitated savings your place on the web for a future return, but there are a few enhancements to the regular vanilla bookmarks that have greatly added to my bookmark delight: 1) Bookmarks in the cloud and 2) Keywords/custom search engines.

<!--more-->

Bookmarks in the Cloud
----------------------

You have lots of options here, but what I really mean is [Delicious](http://delicious.com) (my personal [fav](http://delicious.com/jtsnake/)).  "In the cloud" only means not on your personal computing device.  Rather, your bookmarks are stored on the Delicious servers, ready to be slurped up at whatever computer you belly up to.  For instance, if I cite a bookmark at work, I instantly have access to it at home.  Also, Delicious bookmarks are gonna give you tagging ability, giving good meta information for categorizing your links without all the rigmarole.  Plus, you have great plugins/extensions available for both [Firefox](https://addons.mozilla.org/en-US/firefox/addon/3615/) and Chrome, integrating Delicious into your browser through REST services.  Firefox, with a Ctrl-D shortcut for bookmarking and nice separate interface for browsing your sync'ed Delicious bookmarks, seems to have a slight upper hand here.

Keywords / Custom Search Engines
--------------------------------

These are two words, depending on the browser, for the same bookmark-type thing.  Have you ever had a bookmark that's just slightly different?  For instance, every day at my current job, I use a bug/issue tracker called [Jira](http://www.atlassian.com/software/jira/).  As I work through my assigned issues at work, I'm always popping directly to the issue, navigating by number.  So, let's have an example:

Now, I work on a project called Screening, so the first issue I want to go to, by # of 303, might be here:

http://theurl/jira/browse/SCRN-303

But then the next issue I want to jump to is # 135 at:

http://theurl/jira/browse/SCRN-135

Well, since I don't want to bookmark each of these individual issues, I'm going to create a bookmark based on keyword (in Firefox) or a custom search engine (in Chrome), that is going to be formatted the same in each:

http://theurl/jira/browse/SCRN-%s  

with a keyword of:

scrn

Then, when I want to jump to an issue, all I type in my address bar is:

scrn 303

or 

scrn 135

It's fast, snazzy, and quick!  Just jump to your bookmarks with glee!  I love this feature!

[In Firefox](http://www.mozilla.org/docs/end-user/keywords.html), set this up by going to: Bookmarks menu > Organize Bookmarks > right click and Add Bookmark

[In Chrome](http://www.google.com/support/chrome/bin/answer.py?answer=95653), set this up by going to:  Tools menu > Basic tab > Default Search Manage button


  
