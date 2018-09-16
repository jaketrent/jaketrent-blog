---
categories:
- "Code"
comments: true
date: 2017-08-31T06:35:44-06:00
description: "Arrow functions treat return values in a couple ways."
draft: false
image: "https://i.imgur.com/zcEXMdp.jpg"
layout: post
metaKeywords: ""
tags:
- "js"
title: "JavaScript Arrow Function Return Rules"
---

Arrow functions treat return values in a couple ways.

<!--more-->

## Normally Returns are Required

There has traditionally been no implicit return in JavaScript functions.  If you write a function using the `function` keyword, this remains true:

```js
function needsReturn() { 'awesome' }
needsReturn()    // returns undefined
```

Functions without a `return` statement return `undefined` by default.

This changes with [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), which can potentially have an implicit return.

## Single Expression Return

An arrow function is declared with a fat arrow/hash rocket (`=>`).  In the case that your arrow function has a single expression as the function body, that expression will be executed, and the resulting value will be implicitly returned when the function is called.

```js
const implicit = () => 'awesome'
implicit()    // returns 'awesome'
```

This also works if the function body is defined on multiple lines.

```js
const implicit = () =>
  'awesome'
  
implicit()    // returns 'awesome'
```

## Expressions vs. Statements

For an arrow function to have an implicit return an _expression_ is required.  But in JavaScript, many language constructs are not expressions but are statements.

In a programming language, an expression returns or is replaceable with a value.  A statement will execute some code _without_ a resulting value.

A contrasting example could be a [ternary](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) expression vs. an `if` statement.  Both are used for conditional branching in the code.  

A ternary allows an expression, and an expression can be returned:

```js
function ternary() { return true ? 'awesome' : 'nicht awesome' }
ternary()     // returns 'awesome'
```

An `if` creates a statement, and a `return` statement can only return an expression.  Returning a statement isn't even possible:

```js
function statement() { 
  return if (true) { 'awesome' } else { 'nicht awesome' } 
}
Uncaught SyntaxError: Unexpected token if
```

## Arrow Function Statements

Arrow functions can contain statements too, but now the function body must be surrounded by {curlies}.  And as soon as you have curly braces surrounding your function body, returns are no longer implicit -- for either statements or expressions.

```js
const explicit = () => { return 'awesome' }
explicit()     // returns 'awesome'

const broken = () => { 'nicht awesome' }
broken()       // returns undefined
```

Arrow functions surrounded by curlies are the only way to get statements, or multiple statements or expressions into the function body:

```js
const multiple = () => {
  const flag = Math.random() > 0.5
  return flag ? 'awesome' : 'nicht awesome'
}
multiple()     // returns ???
```

As we've seen, there are many flavors of and rules for return values in arrow functions in JavaScript.  

How do you keep them straight?  And are there other rules that we need to keep track of?
