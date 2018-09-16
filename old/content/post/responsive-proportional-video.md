---
categories:
- "Code"
comments: true
date: 2017-06-12T07:38:43-06:00
description: "It's easy to make a video embed responsive, but it's not the default.  Here are some styles."
draft: false
image: "https://image.ibb.co/eObdca/responsive_Vid.jpg"
layout: post
metaKeywords: "rwd, responsive video, fit video to screen, video keep proportion, responsive iframe, responsive youtube embed, flexible"
tags:
- "video"
- "rwd"
title: "Responsive Proportional Video"
---

It's easy to make a video embed responsive, but it's not the default.  Here are some styles that will help.

<!--more-->

## Default YouTube Embed

When you find a video in YouTube you'd like to embed, it offers you some embed markup that looks something like this:

```html
<iframe width="853" height="480" src="https://www.youtube.com/embed/dMDNWLTOU8o?rel=0" frameborder="0" allowfullscreen></iframe>
```

This embed code is fine, except the `width` and `height` dimensions are going to not be flexible.  This iframe and the video inside will be stuck at this size no matter the site's screen size.

## Keep it On Screen

A good idea to keep the iframe on screen would be to not let it escape via `max-width`:

```css
iframe {  
  max-width: 100%;
}
```

This is great, except it breaks the proportions.  It'll keep the iframe in the viewport, but the iframe will clip off the video that it's not wide enough to see.  Let's keep it and add to it.

## Keep Video Proportions

There are a couple options we have to keep the video flexible, onscreen, and in proportions.  One that's been around for a long time is [fitvid.js](http://fitvidsjs.com/).  The hangup with this solution is that it's a script and requires jQuery.  Skipping that, let's go for a CSS-only solution.  

First we need to know what the proportion of the video is.  The embed code's `height` and `width` values give us a good idea.  If we divide `480` by `853`, we get `.562719812`.  `56.25%` is the proportion of a common video aspect ration: `16:9`.  Dividing `9 / 16`, we get `56.25%`.  We'll use that as our proportion.  Your video might vary in proportion.  Just check its proportions in a similar fashion.

Now that we have the proportion, we create a container element for the video:

```html
<div class="container">
  <iframe ... />
</div>
```

With styles like so:

```css
.container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}
```

The most interesting part here is to set the `padding-bottom` to the proportion of our video.  This will create a blank space in the page that will always keep this proportion.  The `div` is `display: block` by layout, so it'll take the full width allowed it.

To get our video into that space and always taking the full proportion, we apply the following styles to our video iframe: 

```css
iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

Positioning it `absolute` will overlay it in that space.  Try it!  It's simply and it works.  No script required.

What other methods do you use for keeping your video embeds responsive?

