---
categories:
- "Code"
comments: true
date: 2017-07-28T21:33:05-06:00
description: "Support both mouse clicks on a desktop and touches on a mobile device for event handling."
draft: false
image: "https://i.imgur.com/a9QTw8F.jpg"
layout: post
metaKeywords: "touch event, touch and click combination, pointer event, polyfill, addeventlistener, touchstart, touchclick"
tags:
- "rwd"
- "browser"
title: "Handling Touch and Mouse Clicks in the Browser"
---

Here's a way to support both mouse clicks on a desktop and touches on a mobile device for event handling.

<!--more-->

## Mouse Events

Mouse events are most familiar, used on websites much earlier than touch.  Familiarly, you can detect them and run your own even handlers with:

```js
const el = document.querySelector('button')
el.addEventListener('click', _ => console.log('clicked'))
```

## Rise of Mobile

With the rise of mobile, there are other input events that we need to track.  On a phone, mouse click doesn't exist.  Instead, there are only *touch* events.  This isn't entirely true, because some devices on some browsers for some elements will simulate a mouse click when a touch is made.

To detect a [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) that means finger down (click), you can write:

```js
el.addEventListener('touchstart', _ => console.log('touched'))
```

## Handling Both

To handle both clicks and touches it could be as easy as adding both listeners.  Then you'll probably want to extract a single handler, assuming mouse click and touch do the same thing.  

Then why have two?  Some have wondered the same thing and have pursued an abstraction that would cover both: [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events).  [Browser compatibility](http://caniuse.com/#feat=pointer) is currently low.  But there are [polyfills](https://github.com/jquery/PEP).  

But apparently recommended practice has generally changed to wanting to support native touch events instead.

## Avoiding Double-click

So if we do indeed have two `addEventListener`s, we need to make sure that we don't have a touch *and* a mouse click for the same interaction get handled twice.

This is possible on devices that simulate mouse clicks from touches (some mobile devices) and where both types of events are picked up on the hardware (some touchscreen laptops).

A simple solution is to handle the event once and prevent the next thing from happening.  I bet you can guess what that means: yes, `event.preventDefault()`: 

```
function handleInteraction(evt) {
  evt.preventDefault()
  console.log('interacted')
}
el.addEventListener('touchstart', handleInteraction)
el.addEventListener('click', handleInteraction)
```

The touch events, according to spec, fire first.  But it doesn't really matter which goes first if both a click and a touch are handled in the same function.  You just handle it once, prevent the subsequent rehandles, and you're done. 
Handled!

What other tips would you have for implementing a mouse *and* touch-capable web interface?

_Props to April for the sweeto graphic for this article! _
