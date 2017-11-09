---
categories:
- "Code"
comments: true
date: 2017-11-09T06:28:28-07:00
description: "How to adjust the easing function per individual segment of a keyframe animation."
draft: false
image: "https://i.imgur.com/iV3FbxS.jpg"
layout: post
metaKeywords: "css, keyframe animation, easing function, change easing, change timing, adjust easing per keyframe"
tags:
- "css"
- "animation"
title: "CSS Animation Timing Function Per Keyframe Segment"
---

Here's how to adjust the easing function per individual segment of a keyframe animation.

<!--more-->

## Easing into Keyframes

In a keyframe animation, the animation is defined by specifying some key points or frames.  The in-between states are calculated automatically.  For example, you can define two keyframes, where an object should first be at one position and in the next keyframe be at a different position.  When the animation runs, the renderer, in this case CSS in the browser, will tween the object from the one keyframe position to the next.  The browser will interpolate the details.

A timing function, sometimes called an easing function, allows you to specify the acceleration or deceleration of the animation over the duration of animation.

A couple examples:

- `linear` timing - there is no acceleration or deceleration, the animation will march forward at constant speed.
- `ease-in` timing - starts slower and accelerates to full speed
- `ease-out` timing - starts at full speed and decelerates into the end state

Sometimes it helps to think of these easings in terms of their 2D graph [visualizations](http://easings.net/).

## Default Timing Function

By default, CSS keyframe animations in the browser have a default timing of `ease-in-out`.

You can also define a default timing function when you apply the keyframe animation:

```css
.mySelector {
  animation: 1000ms linear myAnimationName;
}
```

In the [example](http://jsbin.com/pefuroyubo/edit?html,output) above, `.mySelector` will be animated for `1000ms`, defaulting to `linear` timing, while it animates according to the keyframes in `myAnimationName`.

The above `animation` example is the shorthand.  You can also set only the timing attribute separately with:

```css
.mySelector {
  animation-timing-function: linear;
}
```

## Per-Segment Timing Function

Sometimes you have a more complicated keyframe animation.  It has multiple segments to animate, and you want the easing function to be different per leg of the animation.

To apply multiple, per-segment easings, we're going to need to move the timing function specification into the keyframe definition itself, where we can set it multiple times.

Order is also important when setting the timing function.  If you want a timing function to apply to a segment of the keyframe, you must set it in the _previous_ keyframe segment.  

For [example](http://jsbin.com/muxayirale/edit?html,output), let's say that we want a ball to travel in a square.  It starts in the top-left corner and travels clockwise in the shape of a square.  When it moves horizontally, we want it to move at linear speed, as if it's pushed constantly with the wind.  When it drops, it should start slow and get faster.  When it rises, it should start fast and get slower.  We'll slow it down so we can see the subtle differences.

![gif of ball moving](https://i.imgur.com/h5153Qz.gif)

The keyframe definition might look like this:

```css
@keyframes move {
  25% {
    transform: translate(100%, 0%);
    animation-timing-function: ease-in;
  }
  50% {
    transform: translate(100%, 100%);
    animation-timing-function: linear;
  }
  75% {
    transform: translate(0%, 100%);
    animation-timing-function: ease-out;
  }
}
.mySelector {
  animation: 5000ms linear infinite move;
}
```

A few things of note:

- There is no `0%` segment.  The animation starts at the position where the animated element starts.
- There is no `100%` segment.  The animation ends where it started.
- The `animation-timing-function` for a segment is specified in the segment *before* it's used.  A segment will use the `animation-timing-function` that is active at the *start* of the segment.  Confusing API!  For example, the second segment moves from `translate(100%, 0%)` at `25%` complete to `translate(100%, 100%)` at `50%` complete.  The `ease-in` timing that is desired for the transform defined in the `50%` segment is defined a segment before in the `25%` segment's `animation-timing-function: ease-in`.
- The `animation` attribute in `.mySelector` must specify a timing function (here, `linear`) in order for that timing to be used on the `0%-25%` tween.

So it doesn't work quite as you might intuitively expect.

How else do you keep this straight or otherwise specify easings per segment of your keyframe animation?
