---
layout: post
title: "Responsive Table with Scrolling"
date: "2012-11-07"
comments: true
categories:
  - "Code"
tags:
  - "Design"
  - "rwd"
  - "css"
image: https://i.imgur.com/GeuZe.png
---

Sometimes a `table` element is the most semantic element one can use in markup.  It is true.  If you're displaying tabular data, a `table` is a likely option.  If you're on a responsive site, however, you'll cringe at this option.  It turns out that tables aren't very responsive web design-friendly.  One way to create a more responsive table is with scrolling.

<!--more-->

## Responsive Table Options

I love the article by Chris Coyier that describes [responsive tables](http://css-tricks.com/responsive-data-tables/).  Some of his ideas and those of the commenters on his post a great at thinking outside the box on what the options include for responsive tables:

1. Orient the table vertically when there's not enough room for all the columns.
2. Replace tabular data with a graphic, such as a pie graph, that communicates the same gist.
3. Replace the table with a link that opens a scrollable view large enough for the regular-sized table.

My favorite option is the first.  But, in my case, it didn't seem to work extremely well because I have two headers.  The example had column headers only.  I have row headers as well.  After a bit more looking, I ran across this [Zurb scrolling table css and js example](http://www.zurb.com/playground/playground/responsive-tables/).  The best solution, it seemed for now, was scrolling.  (My example code is based on the markup and styles of the Zurb code with a few things taken out and a few things added.)

## Table Horizontal Scrolling

On the web, vertical scrolling is a part of the full meal deal.  So, the only thing to solve is the horizontal scrolling.  Normally, we don't want content flowing off the right side of the screen when browsing.  So, we when there's scrolling required, we're going to do it within the table only and for the columns we want.

#### Divide table in two

We want some columns to scroll and others to remain pinned whilst scrolling.  We'll duplicate the table in the markup and wrap each, a la:

```html
<div class="table-wrapper">
  <div class="pinned">
    <!-- table here with pinned columns only-->
  </div>
  <div class="scrollable">
    <!-- table here with scrollable columns only-->
  </div>
</div>
```

#### Line up the rows

Now we have two tables.  The flexibility we've given ourself is that we can make some columns stick and others scroll easily.  Our new challenge is keeping the row height lined up so the two tables look like one.

Put the two tables next to each other with a float left and a float right.  Make the widths percentage-based as with any [rwd](http://en.wikipedia.org/wiki/Responsive_web_design).

Now we have a few options to make our rows line up:

1. Explicitly set all table cells to the same height
2. Use JavaScript to make each cell in a row be the same height as the tallest cell in that row
3. Put similar content in each cell on a row (eg, just text with the same attributes that will not wrap for longer text)

Turns out that I will choose option 1 for the table cells (`td`) and option 3 for the table headers (`th`).

This is my least favorite feature of this solution.  Anyone have a better idea on lining up the rows?

#### Set column width

I want some of my columns to have a set width.  Well, as *set* as anything is in rwd.  An html `table` will usually expand and contract columns across the table to give optimum spacing based on the content.

I want to make my pinned table columns allow extra-long content, but I don't want their widths to change at all.  A bit of StackOverflow love yielded this answer on why `overflow: hidden` doesn't work when [constraining table cell width](http://stackoverflow.com/a/7570613/118561).

In short, the solution is to wrap the content inside of the `td` with two `divs`:

```html
<div class="outer">
  <div class="inner">
    Row 4 longer than lotr
  </div>
</div>
```

And sprinkle with a bit of stylesheet:

```css
td .outer {
  position: relative;
  height: 30px;
}
td .inner {
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
  width: 100%;
}
```

This style will let the column width remain and the content overflow.  It will also keep the cell text on one line, and it will be hidden as it flows off the right-hand side of the cell.  To wrap and hide as it flows off the bottom of the cell, remove the `white-space: nowrap` attribute.

## Responsive Table with Scrolling

For the final result, check out the [CodePen for the responsive table](http://codepen.io/jaketrent/pen/CcboI).

What are your suggestions for making this better?  How have you solved the responsive table challenge?


