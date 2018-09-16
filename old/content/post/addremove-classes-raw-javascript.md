---
layout: post
title: "Add/Remove Classes with Raw Javascript"
date: "2010-05-19"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "jquery"
description: Jquery and other sweeto js frameworks have some awesomeness to help you change the css classes of various elements on the page with ease and grace.  They ha
metaKeywords: javascript, jquery
draft: false
---

Jquery and other sweeto js frameworks have some awesomeness to help you change the css classes of various elements on the page with ease and grace.  They have some very convenient functions to add and remove classes.  These are uber-useful and highly recommended for saving you precious time and gigawatts, but if you don't have one of these tools available to you, sometimes you may want to do this in raw JavaScript.

<!--more-->

```javascript
$("#peace").addClass('be-still')
// or
$("#peace").removeClass('be-still')
```

And now for raw power:

```javascript
document.getElementById("peace").className = "be-still"
```

If you want to add or remove your own, you have to write that goodness, and here's one implementation example for your sweet pleasure.  Note that this implementation uses `classList` first, which is a great feature to use if it's available.  As of this writing, [IE still has some support problems](http://caniuse.com/#search=classList).  Thus, there's also a fallback.  You could also [write your own classList shim](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) if you'd like.

```javascript
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}
```

Called like:

```javascript
var el = document.getElementById('peace')
addClass(el, 'be-still')
// or
removeClass(el, 'be-still')
```



