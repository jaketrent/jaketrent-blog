---
layout: post
title: "CSS Vertical Height of Text"
date: "2013-06-03"
comments: true
categories:
  - "Code"
tags:
  - "css"
description: Setting up text elements to be a specific height is usually straight forward.  Here is the list of attributes that affect the height.
metaKeywords: js, css, vertical height, line-height, height
draft: false
image: https://i.imgur.com/hxw13Yp.png
---

Setting text elements on a page to be a specific height is usually straight forward.  Here are the specs for a couple textual situations you'll encounter.

<!--more-->

**Note:** Experiments were done in Chrome 27, but this should be pretty consistent over browsers

## Text in a Div

Text is likely most common just plastered across your site.  Lucky for us all, this is the most straightforward way to calculate and guarantee a vertical height.

![Text height css](https://i.imgur.com/cy3HTWW.png)

The formula is simple.  Here, vertical height is calculated by:

> vertical height = margin + border + padding + (line-height || height)

`line-height` or `height` will determine the height of the main body of the text container, such as a `div`.  Either one will do.

I will guess that most of the time you'll want your text centered vertically in the container.  But for those times you want it hugging the top or bottom, add a line-height that's either smaller or larger than the height, respectively, to move the text vertically within the container.

## Text in an Input

Text appearing within an input field is much more tricky and has a quite a few more caveats.  There are two main different modes that vertical height will be determined by: without a `height` or with a `height` specified:

![Input height css](https://i.imgur.com/4UdHhF4.png)

### No Height Specified

If the `height` is not set, traditional attributes, combined, create the total vertical height.  This formula becomes:

> height = margin + border + padding + (line-height || font-size)

Some observations and caveats:

- `font-size` only affects vertical height as it approaches or exceeds the `line-height`.
- `padding`, `border`, and `margin` always affect the vertical height, no matter their value.
- If `font-size` is small enough to not affect `line-height`, `line-height` can be used for an exact vertical height sum.
- If `font-size`, instead of `line-height` is affecting the vertical height, the px value of the `font-size` will not be usable to guarantee height.  Each font has different heights.  A per-font calculation will have to be made.

### Height Specified

If `height` is set, the input's vertical height formula will always

> vertical height = height + margin

Some observations and caveats:

- If `margin`, `border`, and `padding` add up to be greater than `height`, then that becomes new height.
- `line-height` and `font-size` don't contribute the vertical height, no matter the `height` attribute.
- `margin`, `border`, and `padding` attributes don't contribute at all to the vertical height if their sum height is less than the actual `height` attribute.
- Once `line-height` exceeds `height`, the text in the input moves vertically downward, eventually becoming hidden.
- As `font-size` approaches `height`, the text will eventually become hidden.
- `border` will not affect vertical height, but it will still affect horizontal width.
- `vertical-align`, as in most things, does nothing.
