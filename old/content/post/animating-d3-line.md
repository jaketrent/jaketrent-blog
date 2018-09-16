---
layout: post
title: "Animating a Line in D3"
date: "2015-07-27"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "d3"
description: D3 makes awesome charts, made awesomer by animations.  Make your lines animate!
metaKeywords: js, d3, line, animating, drawing, line chart
draft: false
image: https://i.imgur.com/94JQ8N8.jpg
---

You can make some awesome charts in D3.  Animate your charts, and they're made even awesomerer.  To animate lines, such as those found in line charts, try out the following methods.

<!--more-->

## D3 Transition

In order to animate in D3, you call the `transition` function on a `d3.selection`.  The transition essentially creates a tween from the starting point of the animation to the specified ending point.  So, to specify an animation:

1. Set the starting state
2. Specify that you are transitioning
3. Set the ending state

Then D3 will handle the animation on the diff between the starting and ending state.

## SVG Line Animation

An SVG line element has 4 required attributes, `x1`, `y1`, `x2`, and `y2`.  These required attributes specify where the line begins and ends in a 2D space.  When choosing your coordinates, remember that the SVG coordinate plane starts at (0,0) in the top-left of the SVG element.

For our line animation, we want the line to look like it's being drawing from the beginning to the ending point.  We will follow the general formula for defining a D3 transition as stated above.  Assuming we have an `svg` element from the DOM selected, the remaining code might look like this:

```js
svg.append('line')
  .attr({
    x1: 25,
    y1: 15,
    x2: 25,
    y2: 15
  })
  .transition()
  .duration(1500)
  .attr({
    x2: 400,
    y2: 15
  })
```

In the code above, the line's starting state shows the line beginning and end at the same point, (25, 15).  This is so that the line appears to be `15px` long when first seen in the UI.  Then, over time it will grow.  Note that the `attr`s set after the `transition` call specify the end of the line as being `400px` to the right.  Thus, over the duration of the transition (set to 1500ms in order to observe it), the line will appear to grow to its final length of 400px in the horizontal direction.

<p data-height="266" data-theme-id="1749" data-slug-hash="Pqyvqo" data-default-tab="result" data-user="jaketrent" class='codepen'>See the Pen <a href='http://codepen.io/jaketrent/pen/Pqyvqo/'>Pqyvqo</a> by Jake Trent (<a href='http://codepen.io/jaketrent'>@jaketrent</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## D3 Line Function

D3 line functions are specified differently than SVG lines.  An SVG line is guaranteed to be a straight edge from the beginning to the ending point.  On the other hand, a D3 line function can describe a line through many different points, and can thus be anything but straight.  Think of a zig-zaggy line chart, and this is what a D3 line function is meant to accomplish.  Thus, a D3 line function is often used to generate the data needed for an SVG `path`, not a `line` element.  There will still be an SVG `stroke` on a path, but we will use a different technique to animate it.

#### Strokes with Dashes

There are two attributes to of a `stroke` in SVG that we will use:

- `stroke-dasharray` - a set of 2 numbers.  The first number is the length of the dash.  The second number is the length between the dashes.
- `stroke-dashoffset` - a dash pattern is repeated, according to the `stroke-dasharray` attribute.  But this attribute specifies where to start in that repeating pattern.  In other words, how many pixels offset *into* that pattern should the first iteration of the pattern begin.  The default is 0px.

To see these numbers change and how they affect a line, check out the following SVG lines:

<p data-height="266" data-theme-id="1749" data-slug-hash="GJYaqK" data-default-tab="result" data-user="jaketrent" class='codepen'>See the Pen <a href='http://codepen.io/jaketrent/pen/GJYaqK/'>SVG Stroke Dasharray Grows a Line</a> by Jake Trent (<a href='http://codepen.io/jaketrent'>@jaketrent</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

In each of the above cases, the `stroke-dasharray` is set so the dash line length and the dash space length are equal to the total length of the total line.  Note that the `stroke-dashoffset` is the only attribute that changes between the 3 lines.

1. In the first, the `stroke-dashoffset` is set to the length of the total line.  This means that the `stroke-dasharray` pattern begins at the point where the space between the dashes begins.  Thus, the line appears invisible -- it's just the line-length space between the dashes.
2. In the second, the `stroke-dashoffset` is set to the mid-length of the total line.  Thus, the 2nd half of the first dash is visible, making the line seem half as long as its total intended length.
3. Finally, the `stroke-dashoffset` is set to 0, meaning that the total line-length dash is now fully visible.

#### Animating with `stroke-dasharray`

One could imagine that were the `stroke-dashoffset` to tween from the full line length to 0, the line would appear to grow from the left to the right.  At first, the space between the dash would be fully visible, slowly, backing off the `stroke-dashoffset` until the pattern, which begins with a dash be fully visible.  Let's try it:

```js
var data = [
  { x: 15, y: 15 },
  { x: 400, y: 15 }
]

var line = d3.svg.line()
  .x(d => d.x)
  .y(d => d.y)

var path = svg.append('path')
  .datum(data)
    .attr({
      'd': line,
      'stroke-dasharray': '385 385',
      'stroke-dashoffset': 385
    })
  .transition()
    .duration(1500)
    .attr('stroke-dashoffset', 0)
```

<p data-height="266" data-theme-id="1749" data-slug-hash="JdmqRm" data-default-tab="result" data-user="jaketrent" class='codepen'>See the Pen <a href='http://codepen.io/jaketrent/pen/JdmqRm/'>JdmqRm</a> by Jake Trent (<a href='http://codepen.io/jaketrent'>@jaketrent</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

The above is the simplest possible example of how to make this happen.  In real life, you're going to have:

- No foreknowledge of the data domain or maybe even the visual space range and will need a d3 scale (eg, `d3.scale.linear`)
- A more complicated set of data which is going to lead to a more complicated line and the actual need for the line function used above
- A more complicated line where the length is not immediately obvious and where `path.node().getTotalLength()` will be useful as a way to use the browser's distance-along-a-path algorithm

In the example above, note that the total length of the line is `385px`.  We make the line dashed.  We set the dash length and the space between the dash length to both be `385px` using `stroke-dasharray`.  We define the animation by making the starting state have a `stroke-dashoffset` of `385px`, showing nothing but the invisible space between the dash to start.  Then we tween to a `stroke-dashoffset` of `0`, causing the offset window to shrink until we see the dash, which is the length of the total line, grow into view.

Frankly, this dash-based solution feels like a hack.  It doesn't seem like someone sat back and thought much about how to animate a non-linear path.  But this solution works well all the times I've used it.

What are some other solutions that you've found for animating lines or creating other interesting line animations?



