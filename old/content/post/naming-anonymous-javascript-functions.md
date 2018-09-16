---
layout: post
title: "Naming Anonymous JavaScript Functions"
date: "2013-01-17"
comments: true
categories:
  - "Code"
tags:
  - "js"
description: In JavaScript, functions can be defined and used in the same statement.  These are anonymous, but labeling them can be helpful.
metaKeywords: js, javascript, anonymous functions, stack trace
draft: false
image: https://i.imgur.com/uH7E2.jpg
---

In JavaScript, functions can be defined and used in the same statement.  This makes creation quick, and the functions are considered anonymous because of their inline use and lack of assignment to a local variable.  But, there are a couple reasons you might want to label them.

<!--more-->

## Readability

A great thing about functions in general is that they will tell you what they're used for.  If I call a function called `calculatePi()`, I expect it to do just that.  It's a great abstraction.  We can look at the name of the function without having to learn exactly how it does its stated task.

The performance of anonymous functions can often be determined from the calling context, but why not just name it for what it does like all other functions?  Did you know that you can?  Piece of pi.  Where you would normally write this:

```js
doStuff(function () {
  console.log('reporting…');
});
```

Additionally label your callback:

```js
doStuff(function reportResults() {
  console.log('reporting…');
});
```

## Easier Stack Traces

To make this code actually run, let's add a little bit and stick in a thrown error that should provide us a stack trace:

```js
function doStuff(callback) {
   callback();
}

doStuff(function reportResults() {
	throw new Error('problem');
});
```

Another difference between labeled and non-labeled anonymous functions is what they print in a stack trace. Without a label, you are getting line numbers, but the stack trace itself is harder to follow without bring up the source in order to interpret it.

Without named function:

```js
/.../error.js:10
	throw new Error('problem');
	      ^
Error: problem
    at /.../error.js:10:8
    at doStuff (/.../error.js:5:4)
    at Object.<anonymous> (/.../error.js:8:1)
    at Module._compile (module.js:449:26)
    ...
```

```js
/.../error.js:8
	throw new Error('problem');
	      ^
Error: problem
    at reportResults (/.../error.js:8:8)
    at doStuff (/.../error.js:4:4)
    at Object.<anonymous> (/.../error.js:7:1)
    at Module._compile (module.js:449:26)
    …
```

Notice that every frame of the stack is now clearly displaying its name.

And wouldn't this be awesome if everyone did this, including all the people that wrote some of those favorite libraries that you use but that you have occassion to debug through?

What other benefits do you see that might come from naming your anonymous functions?
