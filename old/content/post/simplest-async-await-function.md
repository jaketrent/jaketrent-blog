---
categories:
- "Code"
comments: true
date: 2017-06-20T21:15:04-06:00
description: "The most lightweight way to get an async/await function."
draft: false
image: "https://i.imgur.com/y9r7ixW.jpg"
layout: post
metaKeywords: "async/await, await without async function, lightweight async, simple async/await"
tags:
- "js"
- "nodejs"
- "es2015"
title: "Simplest async/await Function"
---

The most lightweight way to get an async/await function.

<!--more-->

## No Async Function?

It sure would be nice if you could `await` something without needing to wrap it in an `async` function.  But, language-wise, these two go together.  If you use `await` outside an `async` function, it's an invalid token.  Inside the `async` function, however, `await` is perfectly legal (on supported platforms).

## Simplest Async Function

So the next simplest thing to do is write it in a way that doesn't seem like it's a function at all: a self-executing function.  Here's an example:

```js
;(async _ => {
  await somethingAsync()
})()
```

Note that the whole function is wrapped in parenthesis, and then there are open/closed parens at the end, invoking the inner function.  The inner function is marked with `async` so that `await` can be used inside.  Bam!  No name on the function and no named invocation.  As light as it gets.  

Or can you get it lighter?




