---
layout: post
title: "Rotate Gauge Needle in D3"
date: "2013-09-27"
comments: true
metaKeywords: rotate, triangle, d3, svg
categories:
  - "Code"
tags:
  - "js"
  - "coffeescript"
  - "d3"
  - "svg"
description: If you want to make a gauge chart in S3, you'll need a needle on your gauge.  It's not hard to draw a triangle, but here's the extra work to rotate it.
draft: false
image: https://i.imgur.com/7GSyOFd.png
---

If you want to make a gauge chart in S3, you'll need a needle on your gauge.  It's not hard to draw a triangle, but here's the extra work to rotate it.

<!--more-->

## The Gauge Chart

I'm not sure what you call this kind of chart, but I call it a gauge.  It pretty much looks like a speedometer or a pressure gauge.  I'm sure after seeing one, you want to make one.  I'm not going to cover the arc building.  It's pretty easy to build a [d3 arc](https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-arc).

## The Components

In my case, I can match the design of the needle with a triangle and a circle.  The circle is the base of the needle upon which the needle spins.  The triangle is the pointer of the needle, which will eventually sit at the angle we specify to our graph.

## The Coordinates

In svg/d3, you can redefine your coordinates by using a group.  If my `svg` container is square, the default coordinate plane will start in the upper left-hand corner at `(0,0)`.  If I wanted to redefine `(0,0)` to be in the bottom center of the `svg` container, we could do so by positioning a group (`g`) so that *its* top left-hand corner is at that point.

We might write this:

```coffeescript
height = # ... svg height
width = # ... svg width
needleG = svg.append('g')
  .attr('transform', "translate(#{width / 2}, #{height})")
```

## Draw a Triangle

To draw a triangle, use an [svg path](https://github.com/mbostock/d3/wiki/SVG-Shapes#path-data-generators).  It needs a start point and 2 more points to draw lines to.  In the special language of svg `path`s, `M x y` is the start point and `L x y` is the point to which a straight light will be drawn from the previous point.

Let's say that we want our needle to 60px tall and 20px wide at the base.  First we'll draw it pointing straight up.  Let's draw this triangle using the `needleG` coordinates.  In the code, I'll call the corners of the triangle `top`, `left`, and `right`.  The d3 code to draw this might look like:

```coffeescript
needleLen = 60
needleRadius = 10

centerX = 0
centerY = 0

topX = centerX - 0
topY = centerY - needleLen

leftX = centerX - needleRadius
leftY = centerY - 0

rightX = centerX - -(needleRadius)
rightY = centerY - 0

needleG.append('path')
  .attr('d', "M #{leftX} #{leftY} L #{topX} #{topY} L #{rightX} #{rightY}")
```

## Rotate the Triangle

Drawing a triangle pointed straight up, that is strictly parallel with the `x` and `y` access of the plane, is no problem.  But a gauge that points straight up isn't worth that much.  It doesn't measure anything.  So, let's rotate the pointer/triangle of the needle to get an actual visual display of our measurement.

Unfortunately, (but maybe you'll have fun) you'll have to pull out your middle school trigonometry here.  I was remembering sayings I had heard once a time to figure this out (like the mysterious "SOHCAHTOA" acronym).

### Percentage Input

Your input may vary, but mine starts as a percentage.  If yours does not, you could convert it to a percentage.  And since we're working with a half circle, we're just going to cut in half all our input since the rotation math is based on a circle.

Let's say in this case our percentage is 65%.  We need to convert from percentage to radians.  Note that all the code for rotation angles will use [radians](http://en.wikipedia.org/wiki/Radian).  Here's some conversion code:

```coffeescript
percToDeg = (perc) ->
  perc * 360

percToRad = (perc) ->
  degToRad percToDeg perc

degToRad = (deg) ->
  deg * Math.PI / 180
```

### SOHCAHTOA

We have to find the `top`, `left`, and `right` for a triangle rotated around the `(0,0)` point.  The basic SOHCAHTOA formulas will help us find the points:

```
sin of angle = opposite / hypotenuse
cos of angle = adjacent / hypotenuse
tan of angle = opposite / adjacent
```

![Needle trigonometry](https://i.imgur.com/RxoQF98.png)

Using these formulas, let's update our code for finding the endpoints of the triangle:

```coffeescript
needleLen = 60
needleRadius = 10
percent = .65

thetaRad = percToRad percent / 2

centerX = 0
centerY = 0

topX = centerX - needleLen * Math.cos(thetaRad)
topY = centerY - needleLen * Math.sin(thetaRad)

leftX = centerX - needleRadius * Math.cos(thetaRad - Math.PI / 2)
leftY = centerY - needleRadius * Math.sin(thetaRad - Math.PI / 2)

rightX = centerX - needleRadius * Math.cos(thetaRad + Math.PI / 2)
rightY = centerY - needleRadius * Math.sin(thetaRad + Math.PI / 2)

"M #{leftX} #{leftY} L #{topX} #{topY} L #{rightX} #{rightY}"
```

Note that `Math.PI / 2` is a 90 degree angle.  It's used to find the angle smaller than theta for the left triangle and find the angle larger for the right triangle.

There you have it.  That's the magic.  For an example of this working and some more code, see this [codepen of a d3 gauge](http://cdpn.io/eloGk).
