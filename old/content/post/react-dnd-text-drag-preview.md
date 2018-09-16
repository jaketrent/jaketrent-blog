---
layout: post
title: "react-dnd With Text Drag Preview"
date: "2016-04-21"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "react"
  - "react-dnd"
description: How to create a text drag preview in react-dnd
metaKeywords: react, react-dnd, text, drag preview, string, drag and drop
draft: false
image: https://i.imgur.com/E5NwBek.png
---

[react-dnd](http://gaearon.github.io/react-dnd/) is a fantastic library for implementing drag and drop features in a React application.  In browsers, you have the ability to specify a drag preview for the thing your dragging.  Images are easy.  Text takes more work -- because you need to generate an image.

<!--more-->

I love the abstractions in react-dnd.  They seem very elegant.  We're going to need another abstraction here, because there's a short list of things that we need to do in order to get a text-based drag preview showing up in our app.  These things are required because drag previews in browsers only support images.  Thus we will need to take source text from our app code and convert it into an image in order to hand it off to the drag and drop api.

## Drag Text from a Canvas

To convert text to an image, we must:

1. Create a canvas element
2. Fit the canvas to our text
3. Style the canvas
4. Create a new image element with the canvas data as src

#### Create a Canvas Element

We choose a canvas element because we can write text onto it and eventually export its bytes.

```js
var c = document.createElement('canvas')
var ctx = c.getContext('2d')
```

#### Fit Canvas to the Text

We want the drag preview to be dynamically sized.  This is because the text can change in length.   The key to our success is available on the [Canvas 2D context as `measureText`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText).  This function is available in IE9+.  In case you don't have access to this function, you can attempt a crude fallback.

```js
function getTextWidth(ctx, fontSize, text) {
  if (typeof ctx.measureText === 'function') {
    return ctx.measureText(text).width
  } else {
    var perCharWidth = fontSize / 1.7
    return text.length * perCharWidth
  }
}
```

#### Style the Canvas

Once you know how big to make your drag preview, draw a rectangle upon which you can then draw your text.

In addition to drawing the main content, there are also other stylistic adjustments that you can make via [attributes on `CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D).  Attributes like `fillStyle`, `strokeStyle`, and `font` are available.

```js
ctx.rect(0, 0, rectWidth, rectHeight)

ctx.save()
ctx.fillStyle = backgroundColor
ctx.strokeStyle = borderColor
ctx.fill()
ctx.stroke()
ctx.restore()

ctx.fillText(text)
```

#### Create a new Image Element

Remember, drag preview requires an image to render when the user is dragging.  Set the `src` of the image to the data from the canvas.  This will transfer everything you just created in the canvas into an image.

```js
var img = new Image()
img.src = c.toDataURL()
```

This image should be ready to use in react-dnd's [`connect#dragPreview`](http://gaearon.github.io/react-dnd/docs-drag-source-connector.html).

## A Library to Help

When making a React drag and drop app, I usually don't look forward to using the sometimes-arcane API of the `canvas` element.  So, I wrapped it up so I wouldn't have to look at it as often.   

If you think this might help you, take a look at [react-dnd-text-dragpreview](http://npm.im/react-dnd-text-dragpreview).

<a href="http://npm.im/react-dnd-text-dragpreview"><img src="https://i.imgur.com/glegZVc.gif" /></a>

How do you go about doing text-based drag previews?  Any other good tips?
