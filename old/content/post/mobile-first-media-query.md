---
categories:
- "Code"
comments: true
date: 2017-06-30T07:01:41-06:00
description: "Get your media queries right for mobile-first styling."
draft: false
image: "https://i.imgur.com/HOHiXeK.jpg"
layout: post
metaKeywords: "css, rwd, responsive web design, mobile first, mobile first queries, media query order, min-width vs max-width"
tags:
- "css"
- "rwd"
- "mobile"
title: "Mobile-first Media Queries"
---

Get your media queries right for mobile-first styling.

<!--more-->

## Flexibility

The best and most foundational styles for mobile or responsive design will be those that offer flexibility.  "Flexible" means those elements that can respond to a changing viewport size without a media query.  A media query defines a break point.  It's where you flexibility breaks.  It is a separate construct that must be maintained in a world of uncountable devices and viewports.  Before you go straight to media queries, focus on flexibility.

## Min and Max

I always get confused with `min-width` and `max-width` meanings when it comes to media queries.  Wouldn't it be nice if there were nice ranges, like `@media (width >= 500px) and (width <= 1200px)` as in [cssnext's media queries](http://cssnext.io/features/#media-queries-ranges).  Bring on the day!  Some simple comparison math symbols would be nicer.  But as it is, this is what we have to work with.  This is what the existing `min-width` and `max-width` comparators mean, stated a couple different ways:

### `@media (min-width: 1234px)` 

- The viewport can only shrink to this minimum width to apply this the media query.
- Apply these styles when the viewport is wider than this minimum
- A lower bound on how thin the viewport can get
- The viewport must stay wide

### `@media (max-width: 1234px)` 

- The viewport can only grow to this maximum width to apply the media query
- Apply these styles when the viewport is stays thinner than this maximum
- An upper bound on how wide the viewport can get
- The viewport must stay thin

So which one do you think you use for mobile-first styling?

(Note, all these descriptions are width-specific.  We could similarly apply `height` or other attributes, depending on our design.)

## Order Matters

It is usually more understandable to write the general styles that apply to all viewports first.  Later, come the media queries, scoped to specific viewport sizes.  

If we're doing mobile-first design and styling, we can literally put the mobile styles first in the file.  These are the foundational styles that will apply to mobile or any viewport if or until they're overridden in a media query later in the cascade.

Then we choose a media query that describes what happens when the viewport becomes larger.  Do we use `min-width` or `max-width`?  

We choose `min-width` because we've already defined mobile-size styles.  Now, we want to define those styles for a viewport that must be wide enough to support them:

```
.mobileStyles {} 
/*...*/

@media (min-width: someUnitValue) { 
  .nextLargestViewportStyles {}
  /*...*/ 
}
```

If you support a couple viewport breakpoints, add the continually-larger ones below.  Remember, favor flexibility in design and styles first, then use breakpoints.

What else do you think about when considering your mobile-first design media queries?
