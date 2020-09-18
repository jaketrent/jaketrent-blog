---
layout: post
title: "Prevent Children from Filling CSS Grid Cell"
date: "2020-09-18"
comments: true
categories:
  - "Code"
tags:
  - "css"
description: How to keep the contents of a cell in a grid layout from filling the whole width
metaKeywords: css, css grid, child filling whole width, child too wide, filling grid cell
draft: false
image: https://i.imgur.com/f0gJLPX.jpg
---

Here's a way to keep the contents of a cell in a CSS grid layout from filling the whole width of the cell.

<!--more-->

## Columns are easy

Whip out a grid. It'll solve your problems. They're easy to start and powerfully affect your layout. 

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

I've got two equal columns, and I'm ready to rumble. 

![equal columns](https://i.imgur.com/glX9vRx.png)

## Children filling the cell

But now when I put something in the grid -- something that's `inline-block` and shouldn't be expanding to fill the cell -- like a `<button />`, the buttons are way too wide.  They're taking up the entire cell width.

```css
button {
  display: inline-block;
}
```

![children filling cell width](https://i.imgur.com/1zJTQKL.png)

This is weird and undesirable because each of these buttons should only get as wide as they need to be in order to fit their own button text. But they're all equally huge now.

## Justify the items

This can all be remedied with a fairly versatile and widely used CSS attribute that I somehow have never used until this use case.

It is: [`justify-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items).  By default when applied to grids, the value is `stretch`. That seems to make sense based on what we've observed as the behavior.

Let's switch that up for `justify-items: left`, and we get buttons just the size that they need to be and still aligned within their grid column boundaries:

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: left;
}
```

![justify-items: left for grid cell children](https://i.imgur.com/SxHAyG3.png)

Much better!  Do you have other methods that you use for solving this problem?

<iframe src="https://codesandbox.io/embed/nifty-clarke-f1nk0?fontsize=12&hidenavigation=1&theme=light"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="nifty-clarke-f1nk0"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>



