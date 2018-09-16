---
categories:
  - "Code"
comments: true
date: 2017-02-24T07:05:21-07:00
description: "Highlight.js is a great option to add client-side code highlighting to your blog"
draft: false
image: "https://i.imgur.com/r1zuWrq.jpg"
layout: post
metaKeywords: "js, blog, javascript, website, code highlighting, highlight.js, prism, hugo"
tags:
  - "js"
  - "blog"
  - "hugo"
title: "Add Client-side Code Highlighting to Your Blog"
---

There are a few options for client-side code highlighting.  [Highlight.js](https://highlightjs.org/) is one of the most popular, and it's super easy to integrate into your site.  Let's do it!

<!--more-->

## Compared to Server Side

I usually default to server-side code highlighting.  It puts the complexity of code highlighting in the build phase and keeps the runtime simple.  The most popular server-side option is [pygments](http://pygments.org/).  I have used this for many years.  Unfortunately, in my latest [conversion to hugo](/post/conversion-from-octopress-to-hugo/), I realized that the support for server-side highlighting was not good.  Not only was it slow, I found out over time that many simple things weren't even getting correctly interpreted as code blocks (eg, anything json or html, which should be common types, right?).  So I switched to Highlight.js on the client side.  I was pleasantly surprised at its simplicity.  Besides the couple new network requests, it's really simple for the consumer of this library.

## Include the Script

First, include the script near the bottom of the page that has code blocks on it:

```html
<script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js"></script>
```

Next, call the Hightlight.js initialize function:

```html
<script>hljs.initHighlightingOnLoad();</script>
```

When this function runs, it'll look for the `pre > code` blocks, like this:

```html
<pre>
  <code class="language-js">
    const nacho = anaconda => squeeze(anaconda)
    console.log(nacho())
  </code>
</pre>
```

And turn them into:

```html
<pre>
  <code class="language-js hljs javascript">
    <span class="hljs-keyword">const</span> nacho = <span class="hljs-function"><span class="hljs-params">anaconda</span> =&gt;</span> squeeze(anaconda)
    <span class="hljs-built_in">console</span>.log(nacho())
  </code>
</pre>
```

## Include the Stylesheet

Now that the code snippet has been parsed and class names added to elements representing the different parts of the code syntax, we want to color it.  There are [several options for styles](https://highlightjs.org/) available on the hightlight.js home page (though the ui is weird -- just click the "style" link under the code sample there to cycle through options).

I like one called `atom-one-dark`, so I will next include that stylesheet in the `<head />` of my page that contains code blocks:

```html
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/atom-one-dark.min.css" type="text/css" media="all" />
```

That's it.  You're now set.  Just load your page in the browser, and it should apply the highlighting.  That was easy, right?  Do you prefer client-side or server-side code highlighting?  Do you use Highlight.js or something else?  Any favorite highlighting themes?
