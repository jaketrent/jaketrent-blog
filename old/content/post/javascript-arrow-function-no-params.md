---
categories:
- "Code"
comments: true
date: 2017-07-12T07:41:26-06:00
description: "How I like to write JS arrow functions with no parameters."
draft: false
image: "https://i.imgur.com/8xwS2uc.jpg"
layout: post
metaKeywords: "arrow function, es6 function, no parameters, no arguments, no args, zero args, 0 args"
tags:
- "js"
title: "JavaScript Arrow Functions with No Params"
---

How I like to write JS arrow functions with no parameters.

<!--more-->

## Arrow Functions

An arrow function is a syntax that defines as a function in an expression without using the `function` keyword.  They're great because of their terse, understandable syntax.  They serve well as inline functions.  They have automatic context binding.  Supes super all around.

## No Params

I would guess that most people would write a parameterless [arrow function ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) like this:

```js
const a = () => {}
```

The empty parenthesis express the lack of parameters.  There's something about this I don't love.  It's ok, but it has two chars, is somewhat awkward to type, and has an odd symmetry with the curly braces.  I'm stretching, right. :)

Anyway, I like to write parameterless arrow functions like this:

```
const b = _ => {}
```

What's better about it?  One char, less awkward, and it doesn't look like curly braces.  There's also a well-known convention that `_` underscore indicates that params are discounted or ignored (or in this case no present). 

## An Issue with Arity

I use this `_ => {}` style of parameterless function all the time.  But there's one place that it's bitten me:  that's where function arity matters.  Note this difference:

```bash
$ node
> const a = () => {}
undefined
> a.length
0
> const b = _ => {}
undefined
> b.length
1
```

`_ => {}` has a length of one.  There is some clever code in this world that will care about such things.  Mocha is one, where the existence of a parameter in a spec's function indicates that the existence of a callback for async test code.  For instance:

```
test('learn all code conventions', done => {
  takeSuperLongTime(done)
})
```

The `_ => {}` underscore will still trigger this kind of thing.  I use `() => {}` here instead.  Of course, some people are against any arrow functions in specs like this -- that's another flame war.

Anyway, what do you think?  `_` underscore trendy enough for you? :)
