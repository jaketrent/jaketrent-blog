---
layout: post
title: "Jquery Plugin: readmore"
date: "2010-06-28"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "jquery"
  - "plugins"
description: Jquery plugins are a joy to use, and they are surprisingly easy to write.  Everyone that writes lots of Jquery code should seek to take potentially-resuable
metaKeywords: javascript, jquery, plugins
draft: false
---

Jquery plugins are a joy to use, and they are surprisingly easy to write.  Everyone that writes lots of Jquery code should seek to take potentially-resuable functionalities of code and put them into a nice, compact plugin.  In the app I've been working on, we have a lot of user-generated content that we don't limit the length on, so it can grow very large.  To combat this, there is the UI pattern on the site that there is a "read more" link available to show the remaining text for the long-winded texts, while just showing a snippet otherwise.  This exists everywhere, for lots of different content; hence, the "readmore" plugin was born.

<!--more-->

So, let's use it.  If I have a bunch of answers to an online question submitted, looking like this on the page:

```html
<div class="answer">
  Imagine this is super long and goes on forever.
</div>
```

In your document ready area, you'd apply the readmore plugin:

```js
$(".answer").readmore();
```

This is going to go through your class answer div's and apply two things:

1. Abridge the shown text length (default is 500)
2. Setup the "read more" click event

So, you're dom will now look something like this (except the shown length is much less than 500 chars here):

```html
<div class="answer">
  Imagine this is super long...
  <span class="readm-continue">&#8230;</span>
  <span class="readm-hidden" style="display:none;"> and goes on forever.</span>
  <a class="readm-more">Read More</a>
</div>
```

As you can see even though the `readm-hidden` class is applied to the overflow/hidden text, the plugin still gives it an explicit `display: none` style so that the plugin functions for visibility toggling.

The `readm-more` class is only used internally in the plugin for the click event.

If you want to, you can modify the defaults per-invocation:

```js
$(".answer").readmore({ 
  substr_len: 250
});
```


It's simple; it's powerful; it's jQuery.  Kachow!

Download the plugin at the [Github repo](https://github.com/jtsnake/jquery-readmore).

  
