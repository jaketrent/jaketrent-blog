---
categories:
- "Code"
comments: true
date: 2017-09-13T06:21:55-06:00
description: "Modern frontend dev is enabled by growing browser capabilities."
draft: false
image: "https://i.imgur.com/h4Q6HAL.jpg"
layout: post
metaKeywords: "browser capabilities, offline, native, in-browser database, webassembly, layout"
tags:
- "frontend"
- "webdev"
- "browsers"
title: "Modern Frontend Dev: Browser Capabilities"
---

Modern frontend dev is enabled by growing browser capabilities.  There are many exciting things happening in browserland.  Here are a few that I care about.

<!--more-->

## Offline Support

The new approach to handling offline support, embodied in [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), is so much better than what came before.  It's now like you have a little router in the browser that you get to implement. It routes requests to where they should go during on- and off-line moments. It's a giant leap forward, and it's huge for creating web experiences that exist even when you're not connected to the Internet.

## In-browser Databases

We've had most of these storage options for a while now: local storage, session storage, and [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).  But paired with newly-viable offline support, they are _way_ more compelling.  And improved APIs and capabilities, such as IndexedDB 2.0 are starting to land in browsers.

## WebAssembly

I think [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly) has the potential of changing the face of web development.  New, high-performance apps will be accessible over the Internet through browsers, continuing to evolving past the original document sharing network it all start as.  

WebAssembly also has the ability to change the source languages for the web. This will expand the number and kinds of programmers that are involved in creating the next generation of web applications and the form that these web apps take.

## Speed

Browsers are pretty snappy these days.  Vendors are constantly working to refine, enhance, or wholly recreate the engines that power the running of JavaScript, application of CSS, and the rendering of UIs.  You can require your apps to do a lot more and still be performant.

## Layout

New and interesting layouts are possible using specifications that are much more powerful and flexible than before.  CSS Flexbox is widely supported and we see a growing number of applications that can now respond to the wide-ranging form factors that web users come to the web within.  [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) is quickly spreading across all browsers, being adopted faster than about any significant CSS spec in the past.  

## Browser APIs

New and interesting browser capabilities are coming to fruition, some long years after conception.  The [web animation API](https://developer.mozilla.org/en-US/docs/Web/API/Animation) expands upon keyframe animations and transitions from CSS and brings that and more to JavaScript.  Support for the [payments API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API) has just started to land, allowing the browser to natively handle user payment information.  Mixed with a resurgence in talk around micropayments, this could change the way and the ease with which money is exchanged on the web.

## Language Support

Browsers are following the language advances in JavaScript itself, supporting more and more natively.  Native promises, es2015+ syntax, and new data types will allow the browser to do more with less.  As polyfills and runtimes diminish, bundle sizes will shrink, and certain API and data structure implementations should become more performant.

## Tooling

To enhance the developer experience, browser vendors are investing much in developer tooling.  Most noticeable is Chrome, which has a widening and deepening array of useful tools.  Debugging is top-notch.  New performance audits via Lighthouse are awesome.  I've also heard raving about the great animations panel in Firefox.  

Browsers are getting better.  They can do more.  Which of these advances or others are most important to you?
