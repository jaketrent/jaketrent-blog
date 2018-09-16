---
categories:
- "Code"
comments: true
date: 2017-08-18T06:23:05-06:00
description: "A way to remove an array element without mutating the array"
draft: false
image: "https://i.imgur.com/6AZTAs3.jpg"
layout: post
metaKeywords: "immutability, immutable array remove, splice vs slice, remove element from immutable array"
tags:
- "functional-programming"
- "js"
title: "Remove an Array Element Without Mutation"
---

Here's a way to remove an array element without mutating the array.

<!--more-->

## Default Mutations

By default, the array methods in JavaScript will mutate your array.  Mutation means that the original array is changed in place. A common way to do this is with [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).

With `splice`, you tell the array at which index to start and how many elements to remove.  

If you had an array of `const fruits = ['peach', 'pear', 'apple', 'plum']` and wanted to remove `apple`, you'd call `fruits.splice(2, 1)` (index of 2, 1 element to remove).  

```js
> const fruits = ['peach', 'pear', 'apple', 'plum']
undefined
> fruits.splice(2, 1)
[ 'apple' ]
> fruits
[ 'peach', 'pear', 'plum' ]
>
```

The `fruits` array has been modified in place.

## Removal Without Mutation

But if you can avoid mutating the original array, that can often be better.  You can avoid a whole class of bugs.  You can create more readable, predictable programs.

To remove elements from an array in an immutable way, array copying is required.  You need a new data structure because you cannot change the first -- that would be mutation. You can also think of this as creating a new array without the elements you wanted removed.

## Copy the Array

We could simply do that: create a new array (a clone of the original) and mutate that instead of the original.

To do this, we could use a clone function or the [spread operator (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) to copy the original array into a whole new array, the `splice` just the new array.

```js
> const fruits = ['peach', 'pear', 'apple', 'plum']
undefined
> const newFruits = [...fruits]
undefined
> newFruits.splice(2, 1)
[ 'apple' ]
> newFruits
[ 'peach', 'pear', 'plum' ]
> fruits
[ 'peach', 'pear', 'apple', 'plum' ]
```

This would protect a few things: keeping mutations inside a function body and not modifying the original data structures that were sent as arguments.  But there's still mutation and room for bugs within the function body.  And it's somewhat inefficient in the new creation of and then immediate mutation of an array.

## Create the New Desired Array

There's another Array method called [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) that allows you to select a portion of an array and return a new array.  So we can slice out the portion of the array we want to keep *before and after* the index for removal.  

Since we'll have the before and after arrays, we'll also want to join them together at the end.  We can accomplish this with an array method called [`concat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat).

```js
> const fruits = ['peach', 'pear', 'apple', 'plum']
undefined
> fruits.slice(0, 2).concat(fruits.slice(3))
[ 'peach', 'pear', 'plum' ]
```

The first arg to `slice` is the first index to keep, all the way to the second arg, the index to stop at (and not include in the resulting array).  If no second arg is provided, include the rest of the array.

## Concat with Spread Operator

We can accomplish concatentation in a different syntax, again using the [spread operator (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

```js
> const fruits = ['peach', 'pear', 'apple', 'plum']
undefined
> [...fruits.slice(0, 2), ...fruits.slice(3)]
[ 'peach', 'pear', 'plum' ]
```

This final method is probably the most desirable.

What do you think?  How do you do array element removal without mutations?  And why do you think that's a good tactic to use?
