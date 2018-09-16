---
layout: post
title: "Use D3 rangeBands"
date: "2013-10-17"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "d3"
description: When building a bar chart in d3, you could calculate your own bar widths and padding or you could have d3 do it for you
metaKeywords: d3, chart, bar chart, ordinal scale, scale, rangebands, rangeroundbands
draft: false
image: https://i.imgur.com/JEniNrp.jpg
---

When building a chart such as a bar chart in d3, you'll want an evenly divided space on your x axis.  You could divide the space up with your own manual calculations, accounting for space available, bar width, and inner and outer padding.  Or, you could have d3 do the calculation for you via a `rangeBand`.

<!--more-->

## Scale

One of the great features of D3 is the ability it gives you to easily adapt your chart to the space available to you.  This is accomplished with scales.  There are a couple different scales built into D3.  Some for comparative numbers, such as `d3.scale.linear` and `d3.scale.log`; some for discrete data sets, such as `d3.scale.ordinal`.

**A scale maps visual space to data space.**

The visual space of a scale is the `range`.  The data space is the `domain`.  The internals of the scale will map it all for you.

## Manual Space Management

Previous to realizing some of the things that d3 scales can do for you, I did a lot of space management myself.  Here's an example:

Let's say we have a data domain of all the letters in the alphabet.  Let's say we're building a bar chart.  We'll put the letters on the x-axis, running horizontally along our chart.  We want to space out each letter's bar evenly across the visual space or range.

If we did our own math, it might look like this:

```coffeescript
barOuterPad = 20
barPad = 10

widthForBars = elementWidth - (barOuterPad * 2)
barWidth = widthForBars / data.length - barPad + (barPad / numBars)

barsG = svg.append('g')
  .attr('transform', "translate(#{barOuterPad}, 0)")

barsG.selectAll('rect')
  .data(data)
  .enter().append('rect')
    .attr('x', (d, i) -> (barWidth * i) + (i * barPad))
    .attr('width', barWidth)
    # attrs ...
```

In the code above, we have bar padding setup.  `barOuterPad` is the padding on only the far left and right of the entire chart.  `barPad` is the space between each of the bars.

The `barWidth` calculation is especially fun.  It splits the `widthForBars` space evenly over the number of bars.  Then it subtracts the `barPad` for the space of that bar that won't be able to be used.  Then, finally, we remember that there will be 1 fewer empty pad areas between bars than there will be actual bars.  So, we take that extra `barPad` space and give a bit of it back to every bar.  Whew.

When we go to place bars, we create a new group, `barG`, transformed in to take account of `barOuterPad`.  Then, for each bar in we make sure it's offset into the chart based on what number of bar it is in the set.

There is an easier way.

## d3.scale.ordinal.rangeBands

There is one particular function of `d3.scale.ordinal` that is particularly useful.  That is `rangeBands`.  It will evenly divide a space up for you into bands across the range.

Here's a great graphic from the d3 wiki on [`ordinal.rangeBands`](https://github.com/mbostock/d3/wiki/Ordinal-Scales#wiki-ordinal_rangeBands):

![rangeBand diagram](https://f.cloud.github.com/assets/230541/538688/46c298c0-c193-11e2-9a7e-15d9abcfab9b.png)

It looks like it knows how to take care of everything in our scenario.  It handles outer padding.  It handles between-bar padding.  Let's use it:

```coffeescript
barOuterPad = .2
barPad = .1

x = d3.scale.ordinal()
  .domain(data.map((d) -> d.letter))
  .rangeRoundBands([0, elementWidth], barPad, barOuterPad)

svg.append('rect')
  .data(data)
  .enter().append('rect')
    .attr('x', (d) -> x(d.letter))
    .attr('width', x.rangeBand())
    # attrs...
```

Note that our `barOuterPad` and `barPad` are now fractions.  This is because d3 expects a number, usually between 0 and 1, that is described as a proportion of the eventual width of the bands.

`x` becomes our scale function, mapping the domain, which is all letters (`d.letter`), to the range.  The range is specified as bands using `rangeRoundBands`.  This is different than `rangeBands` in that all spaces are guaranteed to be integers, avoiding antialiasing on screen.  The signature is as follows:


`ordinal.rangeBands(interval[, padding[, outerPadding]])`

We avoid having to use a new `barG` group to make our math easier.

When we set the `x` attribute on our bar, it's x offset is determined by passing the singular datum's letter to the `x` scale function.  And the width is simply the width of all bands, known by calling `x.rangeBand()`.

So much better.  And so much more concise.

What do you think?  Does this work for you?  What is the even-better way of doing this that I have yet to realize?

