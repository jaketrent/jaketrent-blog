---
layout: post
title: "Most Seamless Iframe"
date: "2011-03-31"
comments: true
categories:
  - "Code"
tags:
  - "cross-browser"
  - "css"
  - "html"
  - "iframe"
description: With few exceptions, it seems that when a developer puts a iframe on his page, he wants it to be seamless on his page.  In other words, he doesn't want the 
metaKeywords: cross-browser, css, html, iframe
draft: false
---

With few exceptions, it seems that when a developer puts a iframe on his page, he wants it to be seamless on his page.  In other words, he doesn't want the viewer to know that it's actually an iframe.  To that end, there are a couple of things you can do to make the iframe virtually invisible.

<!--more-->

The main reason this is such a pain is the main reason for most of the pains in web developer: browsers don't treat things the same way.  And specifically, you guessed it, Internet Explorer is very inconsistent compared to the other players.  We could do many comparisons on what attributes are needed in what browsers, but I'm just going to lay out the full combination.  In the end, the most seamless iframe that I can come up with looks like this:

```html
  <iframe
    src="remote.html"
    height="400"
    width="500"
    frameborder="0"
    seamless
    allowTransparency="true"
  ></iframe>
```

```css
  iframe {
    border: 0;
    overflow: hidden;
    height: 400px
    width: 500px;
  }
```

So what do each of these do?

* 'height' and 'width' and styled `height`/`width`- Specifying the height and width as attributes on the iframe and in the style is a sure way to make sure that your dimensions are respected.

* 'frameBorder and styled border' - Specify border=0 on the iframe itself and style it with no border to ensure that a border is not rendered.

* 'seamless' - This is a new html5 attribute to essentially replace frameBorder, ensuring that borders and scrollbars on the iframe are not rendered.

* 'allowTransparency' - In IE, if your remote content does not have a specified background color, but your containing page is not default white, you'll still see the default white on the iframe page unless you set this attribute.

* 'overflow: hidden' - This will hide your scrollbars.  But, whether you want this or not is probably a design call based on your content.

Have you had good luck hiding the fact that your content is in an iframe with these attributes?  If not which attributes have you used with success?

  
