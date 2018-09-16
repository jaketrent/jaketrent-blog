---
categories:
- "Code"
comments: true
date: 2017-05-31T07:27:26-06:00
description: "Single-line spacing is easy.  Let's space out flexbox elements over multiple lines."
draft: false
image: "https://i.imgur.com/Ph18o2m.jpg"
layout: post
metaKeywords: "css, flexbox, responsive flexbox, space between siblings, flexbox spacing, margin, margin between flexbox elements"
tags:
- "css"
- "flexbox"
- "rwd"
title: "Spacing Between Multi-line Flexbox Child Elements"
---

Single-line spacing is easy.  Let's space out flexbox elements over multiple lines.  (Also not bad.)

<!--more-->

## Single-line

In a single-line design, getting space between your flexbox elements is easy.  It's similar to how you probably space siblings in a non-flexbox world.  If the `.parent` is `display: flex` and the children want `12px` of spacing between them, with no spacing on the outer edges, this is easily accomplished:

```html
<div class="parent">
  <div class="child"></div>
  <div class="child"></div>
</div>
```

```css
.parent {
  display: flex;
}
.child + .child {
  margin-left: 12px;
}
```

![nice single-line spacing](https://preview.ibb.co/jV3xAv/single_Line.png)

## Multi-line for Responsive Design

But what about when this side-by-side design is too squished for mobile views.  Instead of side-by-side, you want the elements stacked. You could make this multi-line layout, specially for a small screen, work using a media query:

```css
.parent {
  display: flex;
  flex-direction: column;
}
.child + .child {
  margin-top: 12px;
}
@media screen and (min-width: 321px) {
  .parent {
    flex-direction: row;
  }
  .child + .child {
    margin-top: 0;
    margin-left: 12px;
  }
}
```

The mobile view will then look like this:

![media query accomplishes this](https://image.ibb.co/cczhca/multiline_Responsive.png)

Spacing is still there, just specified in as `margin-top` or `margin-left`, depending on the media query.

## Multi-line for flex-wrap'ed Designs

But what if you have more than one side-by-side `.child` element.  And sometimes they're side-by-side, but other times you want them to wrap to the next line if sizing requirements call for it? 

Flexbox is going to be taking care of that calculation and when to wrap.  You don't have a media query to rely on any more.  But now you do need a more general solution that will guarantee spacing no matter the flow.

One possible solution is to use plain 'ol `margin`.  We can get a reliable `12px` separation with margin on all sides.  But we'll also push our whole layout down and to the right because of margin that goes all the way around our `.child` elements.  So, we just hack the `.parent` back into position, and we're good:

```html
<div class="parent">
  <div class="child child--1"></div>
  <div class="child child--1"></div>
  <div class="child child--2"></div>
  <div class="child child--1"></div>
  <div class="child child--1"></div>
</div>
```

```css
.parent {
  display: flex;
  flex-wrap: wrap;
  margin: -6px -6px;
}
.child {
  margin: 6px;
}
.child--1 {
  width: calc(50% - 12px);
}
.child--2 {
  width: calc(100% - 12px);
}
```

![flex-wrapped with margin](https://preview.ibb.co/kzJaxa/multiline_Wrap.png)

`.child--1` and `.child--2` variants are used just to be interesting and represent whatever size requirement you specifically have.

We use the `6px` margin value on `.child` since there is a margin on all sides of the element, which will add up to `12px` in the adjacent `.child` spaces. 

These examples are available in [code](https://github.com/jaketrent/demo-flexbox-margin) and for you to [play](https://jaketrent.github.io/demo-flexbox-margin/) with.

What do you think of this method?  What other reliable methods have you used to get this kind of spacing on flexbox child elements?
