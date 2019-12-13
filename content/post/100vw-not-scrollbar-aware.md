---
categories:
  - "Code"
comments: true
description: "100vw will give you a horizontal scrollbar -- sometimes."
image: "https://i.imgur.com/IHU1x3V.jpg"
layout: post
metaKeywords: "100vw, 100vw horizontal scrollbar, unexpected horizontal overflow"
draft: false
tags:
  - "css"
title: "100vw Horizontal Scrollbar"
date: "2019-12-13"
---

You'd think that 100vw would fill the viewport and no more, but that's not always true.  Sometimes it overflows horizontally. 

<!--more-->

## The mystery

Web dev has its share of mysteries to solve.  Some days it's amazing anything works at all.  Today we had one of those.  There were users reporting a horizontal scrollbar.  Others didn't see them.  On our team, the story was different for different team members.  What gives?

For me, there was a horizontal scrollbar on the page.  If I removed a `width: 100vw` element, it went away.  It was odd that one could only scroll a little bit, like some UI element must be overflowing unexpectedly.  But `width: 100vw` was one of the only suspects and seemed harmless.

![small scrollbar](https://i.imgur.com/zG3mEIS.png)

I changed the CSS to this value:

```
width: calc(100vw - 15px)
```

And the scrollbar went away!  My teammate did the same and instead got a gap, making the element not full width (because he hadn't had the scroll in the first place).

I ran this code:

```
document.body.clientWidth
1668
document.querySelector('footer').clientWidth
1683
```

Man, the element really *was* bigger than the viewport!  My teammate ran the code, and the values matched.  What gives?  

## The problem

A bit of Googling later, and there was the smoking gun:  There was a connection between `width: 100vw` and scrollbars:  Viewport (`vw`) measurements are not scrollbar aware, so if there's a vertical scrollbar on the page for other reasons, the `width: 100vw` element will cause a slight horizontal scroll.

This is terrible.

## "Sometimes" scrollbars on MacOS

And that difference between users?  That is caused by a MacOS optional feature of hiding scrollbars when not scrolling.  In this mode, there is not permanent scrollbar gutter.  It instead becomes a small overlay scrollbar when scrolling.  The teammate who didn't see this problem had the invisible overlay.  Others and I had the permanent bar.

To see what you have enabled, go to **System Preferences > General**

![system scrollbar options](https://i.imgur.com/McPghvl.jpg)

- 1st option - has problem
- 2nd option - doesn't

That's why it's different for different people.

But, hey, you can't dev for the web based on host machine preferences.  That would be like going back to the security zones of Internet Explorer!

## The fix

Well, I found a fix.  There are others, like just hiding overflow.  In my case, that wasn't a possible solution.  

The solution here is to detect the scrollbar presence with JavaScript and restyle with JavaScript.  Egh...  Anyway, here it is:

```  
function handleFullWidthSizing() {
  const arbitrarySizeDifferenceThatIndicatesScrollbar = 5
  const hasScrollbar = window.innerWidth > 
    document.body.clientWidth + arbitrarySizeDifferenceThatIndicatesScrollbar

  const scrollbarWidth = hasScrollbar
    ? window.innerWidth - document.body.clientWidth
    : 0

  document.querySelector('myElementWith100vw').style.width = `calc(100vw - ${scrollbarWidth}px)`
}
```

Run that bad boy after render, and you'll be styling and feeling terrible -- but looking nice.

What would really be nice is if the browser that was hosting your web page knew about CSS *and* its own scrollbars and would adjust `width: 100vw` to work as expected.  Of course, there's probably some other case they're accounting for that I haven't anticipated.  

Anyone have a better solution? ...please. 


