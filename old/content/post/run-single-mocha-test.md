---
layout: post
title: "Run a Single Mocha Test"
date: "2013-01-16"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "mocha"
description: If you have a whole suite of Mocha tests, sometimes you don't want to run all of them.  Here's how to run a subset of Mocha tests.
metaKeywords: js, javascript, mocha, subset, run subset, run one
draft: false
image: https://i.imgur.com/hbcnU.png
---

When working inside your test suite, it's often the case that you don't want to run all of your tests.  Mocha has a great mechanism that allows you to easily specify what exactly you want run.  This can help make your processes such as TDD faster and more focused.

<!--more-->

## Run a Single Test File

Using the mocha cli, you can easily specify an exact or wildcarded pattern that you want to run.  This is accomplished with the [`grep`](https://mochajs.org/#g---grep-pattern) option when running the `mocha` command.

If you wanted to run only the test suite that tests the "api", the command would look like:

```
$ mocha --grep api
```

The spec must have some `describe` or `it` that matches the grep pattern, as in:

```js
describe('api', _ => {
  // ...
})
```

## Run a Single Spec

Often we're in the test code making changes, and it's easy to make adjustments to what subset of tests you run from here as well.  If I want to run a single `describe()` function, I can add a `.only()` to the function call, like this:

```js
describe(function () {
  // these tests will be skipped
});
describe.only(function () {
  // these tests will run
});
```

You can stick the `.only()` on any `describe`, no matter if it's first or last in the list of specs.

## Run a Single Test

Just as you can with `describe`, the tests can be specified to exclusively run if you attach `.only()` to the function call.

```js
it.only(function () {
  // this test will run
});
it(function () {
  // this test will be skipped
});
```

**Update 12 Oct 2015**: The following note now does not apply.  `before`, etc hooks are now verified to be run when running a single test.

~~Note! that by putting the .only() on a test, all other functions in the spec are skipped.  This means that your before, beforeEach, after, and afterEach functions are *not* called.  Sometimes it's hard to remember when that matters, so I usually end up running single specs instead of single tests.~~

## Skip Something

If you want to run all the specs/tests that you have minus some subset, effectively commenting out these tests, you can add `.skip()` to either `describe` or `it` function calls.

## Remember to Remove

With the additions of the `.only()` or `.skip()` you are altering the actual code of your tests.  This is great for your local development process.  You'll need to be careful that you don't commit this change -- at least you usually won't want to.  Otherwise, you CI process will be running a subset of your tests, just as you are locally, which is no bueno.
