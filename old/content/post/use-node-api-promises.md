---
categories:
- "Code"
comments: true
date: 2017-05-29T10:57:04-06:00
description: "Most native Node APIs use callbacks.  Use Promises instead."
draft: false
image: "https://image.ibb.co/fq0Qxa/await_Node.jpg"
layout: post
metaKeywords: "nodejs native apis, nodejs stdlib, standard lib uses callbacks, use promises with standard lib, node.js"
tags:
- "js"
- "nodejs"
title: "Use Node APIs with Promises"
---

Most native Node APIs use callbacks.  If you want to use Promises to work with these APIs instead, it's easy.

<!--more-->

## Native Node APIs

In Node, most of the async APIs in the core APIs use callbacks to notify of task completion and resume a code path.  This works just fine.  The pattern is solid.  If you like callbacks, keep using them.  That original callback method of an async file read might look like this:

```js
const fs = require('fs')

fs.readFile('myFile.txt', 'utf8', (err, data) => {
  if (err) return console.error(err)
  
  // ... process data
})
```

This works great.  It does require care to not recreate a biblical tower of doom with nested callbacks. 

There is a new native kid in Node.js town that might help.  Promises have been there for a long while, and constructing towers of terror is possible with these as well.  But now [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) are available as of Node [7.x](http://kangax.github.io/compat-table/es2016plus/#node7_6).  `async` and `await` are keywords that you can use without a code compilation step.  This syntax will help flatten out your code, and it's quite nice. That might be one reason to want to get back on the Promise train and use the built-in Node APIs as if they were Promise-based as well.

## Converting Node Functions to Use Promises

But how do you make the conversion?  There are a couple Promise libraries that provide a function that's generally called `promisify`.  To use one, we'll install:

```bash
npm install promisify-node
```

This is a wrapper function.  Whatever API that was callback-based can be wrapped using `promisify` to make it Promise-based.  To wrap a whole Node API like the `fs` module, use it in place of the `require` call.  The above code changes to look like:

```js
const promisify = require('promisify-node')
const fs = promisify('fs')

async function processMyFile() {
  try {
    const data = await fs.readFile('myFile.txt', 'utf8')
    // ... process data
  } catch (err) {
    console.error(err)
  }
}
```

Note that the `await` keyword has to be used in the enclosing `async` function.  If you'd like to promisify a single function, that's possible as well:

```js
const promisify = require('promisify-node')
const fs = require('fs')

const promiseBasedReadFileFunction = promisify(fs.readFile)
// then use async/await as above...
```

Pretty cool, huh?  Although I was a little disconcerted when I saw some of the [guts](https://github.com/nodegit/promisify-node/blob/master/index.js#L61) of how this is accomplished by this library.  :)

## Built-in Support in v8.0.0

Now things are even better!  If you're on a new enough version of Node, this is built in. As of [node 8.0.0](https://nodejs.org/en/blog/release/v8.0.0/#improved-support-for-promises), the ability to `promisify` is a core API itself:

```js
const { promisify } = require('util')
const fs = require('fs')

const promiseBasedReadFileFunction = promisify(fs.readFile)
// then use async/await as above...
```

Do you `promisify` your usage of core Node APIs?  Why or why not?
