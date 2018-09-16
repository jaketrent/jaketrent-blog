---
layout: post
title: "Style File Input"
date: "2013-07-23"
comments: true
categories:
  - "Code"
tags:
  - "css"
description: File input fields are notoriously painful to style.  Here are a few quick tips to that will save you some dead ends.
metaKeywords: style file input, css, double click file input in ie, trigger click on file input
draft: false
image: https://i.imgur.com/sm1b2ok.jpg
---

File input fields are notoriously painful to style.  Here are a few quick tips to that will save you some dead ends.

<!--more-->

## The Problem with File Inputs

File inputs are inconsistent to start with.  They differ even in their native form across all browsers.  They also have internal elements that are not individually accessible, such as the "Browse" button.  They are also subject to more browser-imposed security constraints than input fields of other types.

Given these inherent problems/constraints, try to follow two basic rules:

1. Don't expect to make your file input look exactly like you'd like
2. Don't trigger clicks on the file input

## Styling the File Input

Why is file input rule reasonable?  Shouldn't you be able to match the UI design you desire?  Yes, on both counts.

Don't style the file input to make it look like a photo upload button (or whatever you're marking).  Instead, **hide it**.  And after you hide it, position it **over** another another element, such as a `div`, that you can style much more easily to look like the UI you envision.

Here is some example css on how you might accomplish this.

First, `fileinput.jade`:

```haml
.file-wrapper
  .file-input(type="file")
```

And `fileinput.styl`:

```sass
.file-wrapper
  position: relative
  overflow: hidden
  cursor: pointer

.file-input
  position: absolute
  top: 0
  right: 0
  z-index: 2
  opacity: 0.01
  height: 100%
  font-size: 150px
```

The add additional styles to `.file-wrapper` to make it look as you wish.  Remember any vendor prefixes you may/not need for `opacity`, etc.

## Handling Double Clicks in IE

It's important to position the `.file-input` as `right: 0`.  Otherwise, in IE the file input field will not activate on a single click.  Instead it'll need a double click.  This is because in IE clicking on the text box portion of the file input requires a double click.  Clicking on the browse button requires just a single click.  And the browse button is on the right side of the file input field in IE.  Finally, make the `font-size` big enough that you're guaranteed to cover the `.file-wrapper` area.

## Handling Clicks

Now you don't need to have JavaScript to trigger click events on the file input field.  You will just be relying on direct user interaction to click the native file input field.  This will make [some browsers](http://stackoverflow.com/questions/210643/in-javascript-can-i-make-a-click-event-fire-programmatically-for-a-file-input), like Chrome and Firefox, happy.  This is because these browsers won't hold file values given to the input programmatically as a security precaution.  Oddly, IE, which sometimes balks more about innane security constraints like this, is ok.

So, what do you think?  Does this work for you?  Anything else to make the solution more solid?





