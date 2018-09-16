---
categories:
- "Code"
comments: true
date: 2017-10-30T07:46:46-06:00
description: "The triple dot in JavaScript can be used as a spread operator or in a destructuring assignment."
draft: false
image: "https://i.imgur.com/4oZlkBx.jpg"
layout: post
metaKeywords: "spread operator, destructuring, triple dot, ellipsis, spread vs. destructure "
tags:
- "js"
title: "Spread Operator or Destructuring"
---

The triple dot in JavaScript can be used as a spread operator or in a destructuring assignment.

<!--more-->

## The Syntax

In the latest versions of JavaScript, the triple dot (or `...`) is used as a new syntax for two separate concepts:

1. Spread operation
2. Destructuring assignment

But because the syntax (at least the `...`) is the same, how do you tell them apart?

Context is everything.  Depending on where the `...`, the results are vastly different.  The reasons you'd like to use the syntax are different.

## Spread Operator

In a spread operation, you're trying to take either an array or an object and _spread_ it onto a new array or object, respectively.  In other words, you're creating a new data structure by putting _all_ the elements of an existing structure into it.

For arrays, you use the `...` spread operator inside the square brackets (`[  ]`).  Here, we create a new, `shiny` array that contains the numbers 1-6.

```js
const dull = [1, 2, 3]
const shiny = [...dull, 4, 5, 6]
```

For objects, we do the same, but within curly braces `{ }`. 

```js
const dull = { a: 'alpha', b: 'beta' }
const shiny = { ...dull, c: 'carotene' }
```

The resulting `shiny` object contains keys and values for `a`, `b`, and `c`.

The context here is that we're in an expression on the right-hand side of the assignment (`=`) operator, creating a new data structure.  We're taking existing data (in this case, `dull`), and spreading it into the new data structure which is assigned to `shiny`.

## Destructuring Assignment

The context changes for destructuring.  In a destructuring assignment, instead of spreading multiple values into a _new_ data structure of the same type, we're taking an existing data structure and _extracting_ values from it.

This will happen to the left of the assignment operator:

```js
const [first, second, ...rest] = ['some', 'long', 'array', 'of', 'values']
```

In this example, the outcome is the same as if we had written:

```js
const array = ['some', 'long', 'array', 'of', 'values']
const first = array[0]
const second = array[1]
const rest = array.slice(2)
```

As we can see, using the triple dot on the `...rest` assignment allows the extraction of all values not in the 0th (`first`) or 1st (`second`) index.

We can destructure from objects as well:

```js
const { a, ...rest } = { a: 'alpha', b: 'beta', c: 'carotene' }
```

After this destructuring assignment, the `rest` object will contain keys and values for everything but `a` -- that is, `b` and `c`.

Destructuring can also happen in function signatures.  If you have a function that takes an object, you can extract and bind variables right in the function parameter list.

```js
const obj = { a: 'alpha', b: 'beta', c: 'carotene' }
const fn = ({ a, ...rest }) => {
  console.log(rest)
}
```

What is logged in the function body with be the object containing keys and values of `b` and `c`, just like the previous destructuring example.

Do you see how the difference in context changes the operation?  Spread operators show up in value expressions. Destructuring shows up in variable name binding.  

Where else do you see spread operations and destructuring assignments?  And how do tell them apart?
