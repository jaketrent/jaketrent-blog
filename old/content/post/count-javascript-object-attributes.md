---
layout: post
title: "Count Attributes in JavaScript Object"
date: "2012-11-29"
comments: true
categories:
  - "Code"
tags:
  - "js"
description: How do you find the number of attributes in a JS object?  Turns out there's not a fantastic way to do it
metaKeywords: js, javascript attributes, count js attributes
draft: false
image: https://i.imgur.com/54smb.jpg
---

Sometimes it may be useful to know how many attributes a JavaScript object has.  There's not a fantastic way to do this.  Or maybe there is.  Do you know one?  Could cut out IE8 support.  Or, for what it's worth, here's a way.

<!--more-->

## Which Objects have a Length

If instantiate a new object, it does *not* have a built-in length attribute:

```js
> var obj = {}
undefined
> obj.length
undefined
```

If I add an arbitrary property that object, it still doesn't affect the length:

```js
> obj.prop1 = "adsf"
'adsf'
> obj.length
undefined
```

If I instantiate a new array, it has a built-in length attribute:

```js
> var arr = []
undefined
> arr.push(1)
1
> arr.push(2)
2
> arr.length
2
```

But an array is an object whose attributes are numbers, right?  So, if I put an arbitrary property on it, does it affect length:

```js
> arr.prop1 = "asdf"
'asdf'
> arr.length
2
```

No, this `arr` array still just has the two items we previously pushed onto it.

## Just Iterating

So, how do you find out how many attributes are in an object (not array)?  Just iterate on it:

```js
function numAttrs(obj) {
  var count = 0;
  for(var key in obj) {
    if (obj.hasOwnProperty(key)) {
      ++count;
    }
  }
  return count;
}
```

I found this a bit painful to write.  There should be a better way, right?  Do you know what it is?

## A Better Way for Better Browsers

If your in a [Modern JavaScript environment](http://kangax.github.com/es5-compat-table/), give this a whirl:

```js
  Object.keys(obj).length
```

Way nicer.  Don't try in <= IE8.
