---
categories:
- "Code"
comments: true
date: 2017-10-26T07:51:08-06:00
description: "An example of a Result type in Flow"
draft: false
image: "https://i.imgur.com/RymOVMk.jpg"
layout: post
metaKeywords: "result type, maybe, flow, flowtype"
tags:
- "flowtype"
title: "Result Type in Flow"
---

Here's an example of a Result type in Flow.

<!--more-->

*Updated* 27 Oct 2017 per [Harish's](https://twitter.com/TrakBit) suggestion for using exact object types.

## Result Type

In functional programming, a Result type can be useful for representing things that might fail.  It becomes a common interface that you can return from these potentially-failed processes.  

A Result type wraps up two things:

1. The value returned in the case of a potential success
2. The error returned in the case of a potential failure

When you use a Result type as a return value on a function, for example, you have a common interface in dealing with the return value whether it succeeded or failed.

Result types are generally nice when writing flow control code (like if, switches, or other pattern matching).  

Result types are nice when built into the language, because then even the standard lib will often use them when describing APIs that can fail.  

Functional languages that enforce total functions make consuming Result types nice as well because it forces you to handle the success _and_ failure branches of a Result type.

## Result in Flowtype

We don't have all the benefits that can come from using Result types in JavaScript.  But we can get some of them.

Let's look at how to represent a Result type in Flowtype.

First, there is a success and a failure potential.  There are a few naming conventions to represent these potentials.  I like `Ok` and `Err`, so let's use those.  We'll make each an object, and we'll put a boolean flag inside that has a literal type that we can use for conditional handling logic, called `ok`:

```js
type Ok = { ok: true }
type Err = { ok: false }
```

Now we need to wrap them up in one type, so we'll create a new union type, `Result`:

```js
type Result = Ok | Err
```

Now if we ran a function that returns a result, we can branch and do different things depending on success or failure:

```js
const someFn = (): Result => { /* ... */ }

const result = someFn()
if (result.ok) /* success... */
else /* failure... */
```

This might be enough in some cases, but not in the general case.  In the general case, we also want to have access to the return value in the success case.  For instance, if I asked an API for something, and now I have it, here's what the value is.  And on the other hand, in the case of the API call failing, we want to know why and have debugging or remediation data.  

So let's add a `value` on the `Ok` side and an `error` member on the `Err` side:

```js
type Ok<T> = {| ok: true, value: T |}
type Err = {| ok: false, error: Error |}
type Result<T> = Ok<T> | Err
```

A couple changes:  Now that we have all object fields in place, I've changed `Ok` and `Err` to exact object types (via `{| |}`), disallowing additional fields from type checking. I've made the value of generic type `T` and have genericized the `Result` and ~`Ok` types to pass that generic type through.  We'll need to adjust our usage of the `Result` type too (We'll pretend that our success value is of type `string` in this case):

```js
const someFn = (): Result<string> => { /* ... */ }

const result = someFn()
if (result.ok) doSuccessWithString(result.value)
else throw result.error
```

Here you can see that we have acceses to the `result.value` in the success branch and the `result.error` in the failure branch. And, of course, it's all type checked!  So you'll only be access `value` or `error` where it's available.

That's our Result type modeled in Flow.  For runnable code, check out this [flowtype-result-demo repo](https://github.com/jaketrent/flowtype-result-demo).

How would you model a Result type in Flow differently?  What great uses for Result types have you found in your JavaScript code?



