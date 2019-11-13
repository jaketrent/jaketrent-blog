---
categories:
  - "Code"
comments: true
description: "Create a clip-path that uses a bezier curve."
image: "https://i.imgur.com/QLckrbP.png"
layout: post
metaKeywords: "bezier curve, clip path, curved clip path, rounded clip path, css clip path"
draft: false
tags:
  - "css"
  - "svg"
title: "Create a Bezier Curve Clipping Path"
date: "2019-11-12"
---

## Maybe use just a CSS clip-path

If you have a simple shape -- like a rectangle or circle -- you can use a simple [CSS `clip-path`](https://css-tricks.com/almanac/properties/c/clip-path/) attribute.  It's fast and easy.

But what if you want to create something more complicated like a custom shape, with a bezier curve?  `clip-path` by itself does not handle curves, just fixed points.

## Curves in SVG Clip Paths

SVG to the rescue!  SVG has a [`clipPath` element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath) that will help us out.

The `clipPath` element will contain the shapes or paths that you write in SVG crypto codes (not explained here) that create the clipping path shape of your choice.

For instance, we could create a kind of curved-at-the-bottom shape:

```html
<svg width="0" height="0">
  <defs>
    <clipPath id="myCurve" clipPathUnits="objectBoundingBox">
      <path d="M 0,1
              L 0,0
              L 1,0
              L 1,1
              C .65 .8, .35 .8, 0 1
              Z" />
    </clipPath>
  </defs>
</svg>
```

A couple things to note:  

Use `clipPathUnits="objectBoundingBox"`.  This puts the path coordinates in the top left, and it applies the path relative to the bounding box of the element it's applied to.

There's also definitely an `id` on the `clipPath`.  This will be used later.

Finally, you need to get this SVG markup into the markup of the page.  It can be placed anywhere.  It won't be visible.

## Referring to SVG Clip Path from CSS

Now that your SVG is in the markup with an id, we can refer to it from CSS:


```
.my-element-to-clip {
  clip-path: url(#myCurve);
}
```

Note that in the end we used `clip-path`, but it only works in conjunction with the actual path in SVG.  This is referred to by the id, `#myCurve`.

What's greate about this setup is that the sky's the limit with the SVG path creation, and it's even responsive to the size of the clipped element.

## Bonus: Clipping Paths with Shadows

And now that you have a clipping path with a custom shape, you could even apply a shadow to it.  You can't do this with CSS `box-shadow`, because that shadow only follows the rectangle shape of the box model that your element is in.

But you can use the CSS `filter` property for `drop-shadow()`.  It will follow the shape curve.

Start by adding a parent element for the shadow:

```html
<div class="parent">
  <div class="my-element-to-clip"></div>
</div>
```

And apply the shadow CSS to it:

```css
.parent {
  filter: drop-shadow(0px 7px 4px rgba(0, 0, 0, 0.5));
}
```

Voila!

All together, it's a fun method for creating some curves -- some nice beziers -- for your layout. I mean, boxes are cool too.

For the code all together and live example, see this beauty:

<iframe
     src="https://codesandbox.io/embed/long-violet-h8x8l?autoresize=1&fontsize=14&hidenavigation=1&moduleview=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="bezier-curve-clip-path"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>
