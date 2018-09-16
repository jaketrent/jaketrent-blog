---
categories:
- "Code"
comments: true
date: 2017-06-22T07:25:37-06:00
description: "A generator function is a special, restartable function."
draft: false
image: "https://i.imgur.com/ARD9CHn.jpg"
layout: post
metaKeywords: "javascript, js, generator function, iterator, generator terminology, effects as data, generator object"
tags:
- "js"
- "async"
title: "What is a Generator Function?"
---

A generator function is a different, special function.

<!--more-->

## Differentiating Syntax

Because it's different, a generator function has a syntax to mark it as such:

```js
function* myGenerator() {}
```

Note the `*` after `function`.  This is the function declaration difference.  The `*` can be applied to arrow functions `()* => {}` or object methods `class { myGenerator()* { } }`.

## Starts Paused

When you call a **generator function**, it doesn't actually execute the body of the function.  Rather, it "starts" paused. Instead of invoking the function, returing a return value, it returns a **generator object**, also called an **iterator**.  An iterator is a special object that allows you to iterate through a collection. 

If I call this generator function, the error will _not_ be thrown:

```js
function* generator() {
  throw new Error()
}

const iterator = generator()
```

We haven't actually executed the first line of the function yet.

## Can Advance Programmatically

The returned iterator conforms to an [**iterator protocol**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator).  This means that the object will have a special property, `next`, which is a function that, when called, advances the iterator.

```js
function* generator() {
  throw new Error()
}

const iterator = generator()
iterator.next()
```

Since we're calling next, we're running the function body, and this example will throw an error.  The `next()` function is meant to be called multiple times if necessary.

## Can Pause Again

Inside of a generator function, you can use the keyword `yield`.  It's a little like `await` in that it defines a "pause point".  Said another way, it defines an element in the collection of things that the iterator is iterating over.

Thus every time you call `iterator.next()` you advance to the first `yield`, then all the `yield`s thereafter.  In this example, it will take 3 calls to `next()` to iterator through the entire iterator collection:

```js
function* generator() { 
  yield 'fan'
  yield 'tast'
  yield 'ic'
}
const iterator = generator()
```

## Can Return Multiple Values

The `yield`s are useful for more than pausing.  Each can return a value.  The 3 calls to the iterator in the example above would yield the following:

```js
iterator.next().value // 'fan'
iterator.next().value // 'tast'
iterator.next().value // 'ic'
```

Note the accessing of `.value` on the object that `next()` returns in order to access the `yield`ed value.

## Can Know When It's Done

How do you know when to stop calling `next()`?  After all, the generator in the example above has finite values to `yield`.  We could check to see if `next().value` is `undefined` and then stop iterating.  But what if `undefined` is a valid, expected value to be returned from this generator.  For something much more sure, the object returned by `next()` also includes the property boolean `done`, as a sibling to `value`, which, if true, signifies the end of the iterable collection of `yield`s.

To clarify the picture a bit, calls to `next()` return **an object with `{ value, done }`**.  This is an oddly long, possibly-ambiguous term, for this object because it is a rather specialized object.  But it's the best term I've been able to find.

## Can Resume with Client Values

When we call `next()`, we're resuming the generator, letting it run until it reaches the next `yield`.  We can even provide our own values into the generator function.  This is much like function parameters, but we're able to provide them for every `yield`.  We can effectively tell the generator what the value to be `yield`ed is.  To do this we provide an argument to `next()`.

```js
function* generator() {
  const result = yield 'simon'
  console.log(result)
}
const iterator = generator()
iterator.next('says')
```

Whatever we provide as the argument to `next()` will be the value that is `yield`ed.  The above example will print `'says'` to the console.

## Can Throw Errors 

We can also throw errors within a generator function.  We get this opportunity with each `yield`.  In addition to `next()`, an iterator returned by a generator also has a `throw()` function.  We can even provide our own error to the `throw()` function as an argument, similar to providing values to `next()`.  So if we wanted to go into a catch block, we might write:

```js
function* generator() {
  try {
    const result = yield 'trip wire'
  } catch (err) {
    console.log(err)
  }
}
const iterator = generator()
iterator.throw(new Error('boom!'))
```

Calling `throw()` will cause this example to print `'boom!'` to the console.

## Generator Function Applications

Now we know of a fairly interesting type of function: the generator.  What can we use generators for?  It starts paused, can pause again, can return multiple values, and we can feed it values in the middle of the function body.  I'm interested to hear of the applications you've found.  One of the most interesting I've found is in the area of effects as data.  

An example library that is using generators for this purpose is [redux-saga](https://github.com/redux-saga/redux-saga).  The application of generators works well there because a generator function describing work to be done can have multiple `yield`s on each step of work. The function can pause and exit to execute that work elsewhere. Then work as it is described in the generator can resume again until it's done.  There are more interesting points on effects as data.  But for now know that specific application is compelling and makes good use of generators.

What other questions about generators do you have?  What do you use them for?
