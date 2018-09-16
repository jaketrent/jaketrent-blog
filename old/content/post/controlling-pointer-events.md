---
categories:
- "Code"
comments: true
date: 2017-09-06T20:29:40-06:00
description: "You can control what elements can be the target of mouse events with CSS."
draft: false
image: "https://i.imgur.com/HTrqugS.jpg"
layout: post
metaKeywords: "pointer-events, pointer events disabled for parent, pointer-events enabled for children"
tags:
- "css"
title: "Controlling pointer-events"
---

You can control what elements can be the target of mouse events with CSS.

<!--more-->

## Disable Pointer-Events

[`pointer-events`](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) is the CSS attribute that determines whether an element can be the target of a mouse event.  By default, DOM elements are clickable and register these mouse events.

To disallow the mouse event to register on the DOM event, disable it via:

```css
.some-element { pointer-events: none; }
```

(There are some caveats regarding event listeners that the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) explore nicely.)

## Layering Pass Through

When you position DOM elements on top of one another such that they're layered, the top-most element will be the one to receive a mouse event in the case of a click.  But when `pointer-events: none` has disabled the mouse event registration on the element, the event will pass _through_ the element to the DOM element layered beneath it.

This becomes very useful if you have something layered visually on top that you _don't_ want clickable, but you _do_ want to click the thing beneath or behind it.

This works nicely when the elements are in a sibling structure:

```html
<div>
  <div class="on-bottom" /> 
  <div class="on-top" /> 
</div>
```

```css
.on-top { /* ... */ pointer-events: none; }
.on-bottom { /* ... */ }
```

## Child Re-enabled

If you have a parent with `pointer-events: none`, you have to explicitly turn the pointer events back _on_ for the children.  There's no automatic pass through in this case.  You affect all children until you re-enabled pointer events on them:

```html
<div class="parent">
  <div class="child" /> 
</div>
```

```css
.parent { /* ... */ pointer-events: none; }
.child { /* ... */ pointer-events: all; }
```

What are some other things that you watch out for when controlling pointer events?

