---
layout: post
title: "Replace Text With Css-Defined Image"
date: "2009-02-28"
comments: true
categories:
  - "Code"
tags:
  - "css"
  - "images"
description: Sometimes bland text on a webpage needs a little spicing up with an image.  Instead of having to mess with markup, this text can be replaced with an image. 
metaKeywords: css, images
draft: false
---

Sometimes bland text on a webpage needs a little spicing up with an image.  Instead of having to mess with markup, this text can be replaced with an image.  Plus, the remaining text in the markup allows for better screen-reader access.  There is a fair amount of discussion on the best way to do this.  One of the ways that I've found works pretty well for me is what is known as the <a href="http://stopdesign.com/archive/2003/03/07/replace-text.html#notes">Leahy/Langridge Image Replacement (LIR)</a>

<!--more-->

Set the height attribute to 0, set overflow to hidden, and set the padding-top to the height of the image.  In an example of my code, this is how it looks:

```css
<style type="text/css">
.title {
   height: 0px;
   overflow: hidden;
   padding-top: 150px;
   width: 400px;
   background: center no-repeat url(title.jpg);
}
</style>
```

And the markup:

```html
<h1 class="title">
   AprilandJake.com
</h1>
```
  
