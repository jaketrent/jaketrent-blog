---
layout: post
title: "Console.log Deep Objects"
date: "2016-03-14"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "nodejs"
description: Deep objects need some extra help to log all their contents
metaKeywords: js, console.log, inspect, depth, deep,
draft: false
image: https://i.imgur.com/00WAox4.jpg
---

With deep object structures, `console.log` can leave you wondering what's down in the depths of the objects you're printing out.  Here's a quick help from Node stdlib.

<!--more-->

You can usually see the objects that you're `console.log`ing, and life is good:

Given:

```js
const stickers = {
  are: 'fun'
}
console.log('stickers', stickers)
// Outputs: stickers { are: 'fun' }
```

We can see the whole object, and we're happy.  We can even do objects up to a depth of 3 sub objects, and it works great:

```js
const stickers = {
  are: {
    even: {
      more: 'fun'
    }
  }
}
console.log('stickers', stickers)
// Outputs: stickers { are: { even: { more: 'fun' } } }
```

If, however, we have a potentially deeply-nested object, we'll get some of our data truncated:

```js
const stickers = {
  are: {
    even: {
      more: {
				than: {
					outrageously: 'fun'
				}
			}
    }
  }
}
console.log('stickers', stickers)
// Outputs: stickers { are: { even: { more: [Object] } } }
```

`[Object]`s are cool and all, but not very informative.  

To get at this information, use [`util.inspect`](https://nodejs.org/api/util.html#util_util_inspect_object_options) from the [stdlib](https://nodejs.org/api/util.html#util_util_inspect_object_options).  Here, you can set a depth option to be higher, letting you peer into those deep objects in the console:

```js
const util = require('util')
const stickers = {
  are: {
    even: {
      more: {
				than: {
					outrageously: 'fun'
				}
			}
    }
  }
}
console.log('stickers', util.inspect(stickers, { depth: 4 }))
// Outputs: stickers { are: { even: { more: { than: { outrageously: 'fun' } } } } }
```

Your data is yours again!
