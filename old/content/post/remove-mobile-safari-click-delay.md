---
layout: post
title: "Remove Mobile Safari Click Delay"
date: "2013-06-24"
comments: true
categories:
  - "Code"
tags:
  - "js"
description: Mobile Safari, by default, delays click events.  To make your site more responsive, remove this delay.
metaKeywords: js, mobile safari, click event, delay, slow, mobile browser delay, click delay
draft: false
image: https://i.imgur.com/PH8Zosr.png
---

Did you know that Mobile Safari and other mobile browsers are delaying your click events?  If you've been testing your mobile site, and it feels sluggish in Mobile Safari, this could be one of the reasons.  Disable the click delay and rejoice at a bit more snappy response.

<!--more-->

## Sandbagging?

Why would a browser vendor build in this "functionality"?  Are they purposefully sandbagging their web experience so consumers will be more drawn to a device-specific app instead?  As if that could ever happen.

Google, as with most things, has an answer.  From a [Google Developer article](https://developers.google.com/mobile/articles/fast_buttons?hl=de-DE.):

> The reason for [the 300ms delay] is that the browser is waiting to see if you are actually performing a double tap.

As with the apps Google was developing, the buttons that we're designing don't really need this check for double taps.  We really just want fast buttons.

## FastClick

Really, most of the work for this problem is figuring out where the slowness is coming from.  I spent days and days trying to optimize a single-page web app that had a bunch of buttons with click events that seemed slow for some reason.  I came up with all sorts of theories and wasted a lot of time.

Now that you know what your problem is, just download and use a library to solve it.  Of the most fantastic, [FastClick](https://github.com/ftlabs/fastclick).  It's easy to use.

**Step 1**
Include the script in the `head` tag:

```html
<script type="text/javascript" src="fastclick.js"></script>
```

**Step 2**
Attach FastClick to all links on the page (or subset if you wish):

```coffeescript
window.addEventListener 'load', ->
  FastClick.attach document.body
, false
```

Just like that, you'll see marked improvements.  Thank you Apple.  Thank you FastClick.
