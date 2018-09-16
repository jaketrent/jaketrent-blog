---
categories:
- "Code"
comments: true
date: 2017-05-06T18:56:46-06:00
description: "There are only a few tabindex attribute values you can use.  Learn the few differences, and be empowered forever -- and beyond!"
draft: false
image: "https://i.imgur.com/oI6daFM.jpg"
layout: post
metaKeywords: "accessibility, tabindex, tab order, focusable, focus management, tab, tabbing"
tags:
- "accessibility"
- "html"
title: "Accessibility: Potential tabindex Values"
---

There are only a few tabindex attribute values you can use.  Learn the few differences, and be empowered forever -- and beyond!

<!--more-->

## Tab Order

In a web browser, when a user presses the `tab` key on your webpage, the browser will advance focus to the next element available in the tab order.  The tab order is determined by the document order by default.  This means that focus will traverse through the tree of elements on the page in the order specified in the markup.  This is as desired.  You can change the tab order, as we'll see, but it is preferrable to use the document order for the tab order and use styling to rearrange things, if needed, visually.

## Natively Focusable

There are many HTML elements that are focusable by default.  This means that they are present in the tab order without the developer doing anything to put them there.  Elements that are natively focusable are ones like the anchor (`<a />`) or the button elements.

There are other elements, based on the needs of your application, that you might want to make focusable.  For one reason or another, when the user is tabbing through elements using the keyboard, you want him to be able to focus on something that's not usually focusable.  By adding the `tabindex=<int>` attribute to the element, it will be focusable and join the tab order.  For instance, if you add `tabindex` to a `<div />`, it will be focusable.  The integer value of this attribute will determine how it joins the tab order.

## 0 tabindex

If you want an element to be able to receive focus when it couldn't before, you should set it to:

```html
<div tabindex="0" />
```

With the value of `0`, it will join the tab order in the default tab order of the document.  

Things that aren't natively focusable can have a potentially-unclear purpose to users with a screenreader.  For instance, if the usage of the newly-focusable element is meant to act as a button, additional screenreader hints such as the addition of an `aria-role="button"` attribute will be clarifying.

## Positive tabindex

Breaking the document tab order is usually discouraged, but you can do so by setting the `tabindex` value to any positive number:

```html
<div tabindex="1" />
```

Any element with a positive `tabindex` will be tabbed through, in the order of the natural numbers (1, 2, 3, etc), before any natively-focusable or `tabindex="0"` elements receive focus.  You can see how this might be disruptive or confusing.

## -1 tabindex

By adding a `tabindex` value of `-1`, you get the special behavior of the element being *programmatically* focusable (via link or js), but not being focusable by the user pressing the `tab` key:

```html
<div id="modal" tabindex="-1" />
```

Which is now focusable via a script:

```js
document.getElementById('modal').focus()
```

This can be very useful in the case of widgets where you want to control the focus via other keyboard commands or events.  For instance, if you pop a modal dialogue open, you want to move focus to the modal so that tabbing and screen reading can continue there.

Those are all the possible values and all the reasons for setting them.  That wasn't bad, right?

How do you use or not use the `tabindex` in you apps in order to help keyboard users?  Are there situations where you've found it better to set a positive integer value in your `tabindex` -- or at least required for your feature?
