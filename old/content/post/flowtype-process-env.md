---
categories:
- "Code"
comments: true
date: 2017-08-07T07:16:17-06:00
description: "Add typing to your process.env access in Node.js."
draft: false
image: "https://i.imgur.com/JGKbRJ3.jpg"
layout: post
metaKeywords: "flowtype process.env, non-null process.env, type process.env as string"
tags:
- "nodejs"
- "flowtype"
title: "Flowtype process.env"
---

Add typing to your `process.env` access in Node.js.

<!--more-->

## process.env Access

`process.env` is a globally-available object on which environment variables are accessible to your Node.js program. 

When you ask for an environment variable, such as `process.env.MY_VAR`, it may or may not be set.  If it's set, it'll be returned as a string.  If it's not set, it'll be returned as `undefined`.

## process.env Original Type

Because of the above behavior, the flowtype definition for `process.env` is a map of nullable strings:

```js
{ [string]: ?string }
```

## process.env Nullable Access

If you're trying to access and use the values of an environment variable, you have to do null-checking before you can be sure when using it.

This code is unsafe:

```js
process.env.MY_CSV.split(',')
```

And provides the following flowtype error:

```txt
call of method `split`. Method cannot be called on possibly null value
```

To make it safe, we have to null-check first:

```js
if (process.env.MY_CSV)
  process.env.MY_CSV.split(',')
```

## Null Checking En-masse

Usually you'll have multiple env vars in your code that you want to use.  Many of these are required for your program to run. And usually you don't want to be checking for nulls on required values in the middle of other logic.  You want a non-nullable type that you can rely on.

There are many ways to accomplish this.  Here is one:

Create a `config.js` abstraction around your `process.env` access.  In the initialization of this abstraction, read from `process.env`, do all the null checking at once, and from then on only use the config abstraction in the rest of your code.

This `config.js` code might resemble:

```js
type Cache = {
  databaseUrl: string,
  // ...
}

let cache: Cache = {
  databaseUrl: '',
  // ...
}

const getVar = name => {
  if (!process.env[name]) throw new Error(`process.env.${name} required`)

  return process.env[name]
}

const load = (seed: ?Cache): Cache => {
  cache = Object.freeze(Object.assign(cache, seed, {
    databaseUrl: getVar('DATABASE_URL'),
    // ...
  }))

  return cache
}

module.exports = load()

```

When you call `load()` in the above code, if there are missing env vars, your program will error out.

The `cache` is initially assigned to an object of empty strings.  This is required to assure flowtype that the value really is always non-null.

There is a lot of type defining that's going on here.  This is all in the name of safety.  It's definitely more of a pain when you write this, but if you could guarantee that you access of env vars is safe, might it not be worth it?

What do you think?  How else have you accomplished this?


