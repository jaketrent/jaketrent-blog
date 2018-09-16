---
categories:
- "Code"
comments: true
date: 2017-10-05T06:54:12-06:00
description: "Flowtype gives type errors to help you consider all function code paths."
draft: false
image: "https://i.imgur.com/CHJ3Xso.jpg"
layout: post
metaKeywords: "flowtype, incompatible with undefined, multiple code paths"
tags:
- "flowtype"
title: "Flowtype Analyzes All Code Paths"
---

[Flowtype](https://flow.org/en/docs/types/maybe/) gives type errors to help you consider all function code paths.

<!--more-->

## Other Potential Paths 

Often we are only paying attention to the happy path that we're developing in our code.  This may lead to bugs later on that we hadn't anticipated from the other code paths that exists in different branches of logic.

Flow helps us consider all the code paths and handle each of them in the manner that we've indicated is correct in our defined types.

## Code With Two Paths

For instance, we might write a function that has some error handling.  We declare that the return type of this function is `number`:

```js
// @flow
const someFunction = (): number => {
  try {
    // ...something that might throw
    return 123
  } catch (err) {
    console.log('handle error...')
  }
}
```

Do you see the 2nd code path?

## One Path Not Handled

So often we consider what's in the `try` block and forget to deal with the `catch` block.  That is the case in this example.

When we type check this file by running `flow`, we get the error:

```bash
Error: src/somecode.js:44
 44: const someFunction = (): number => {
                              ^^^^^^ number. This type is incompatible with an implicitly-returned undefined.
```

It says "this type", pointing at `number`, is incompatible with the implicit return that happens in the `catch` block path of our function.  It helps us remember to cover all code paths.

## Solution: Change the Code

To make our function do what we said we really wanted -- always return a `number` -- we could make the `catch` path return some error-state value, such as `-1`:

```js
// @flow
const someFunction = (): number => {
  try {
    return 123
  } catch (err) {
    console.log('handle error...')
    return -1
  }
}
```

This would be valid for our existing type, and Flow would be happy.

## Solution: Change the Type

Another solution would be to use the _actual_ type that we coded for in our original code.  The original code returns `123` in the `try` block but nothing if the `catch` block is entered.  

We could express this with a [Maybe](https://flow.org/en/docs/types/maybe/) type, where the `number` could be a number or `null` or `undefined`.  To do this, we put a `?` before the `number` return type.

We would change our type signature to:

```js
const someFunction = (): ?number => {
  try {
    return 123
  } catch (err) {
    console.log('handle error...')
  }
}
```

This would also make Flow happy by changing the type because that's actually what the code does.

What other kinds of code path issues has Flow analyzed that have helped you?
