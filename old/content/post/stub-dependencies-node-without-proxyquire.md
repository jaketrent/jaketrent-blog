---
layout: post
title: "Stub Dependencies in Node Without Proxyquire"
date: "2016-09-29"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "unit-testing"
  - "nodejs"
description: How to stub your own dependencies in node without using a library like proxyquire
metaKeywords: js, node, stub, spy, unit testing, proxyquire, mock
draft: false
image: https://i.imgur.com/1arT8Ho.jpg
---

When testing a unit, often you'll want to stub out that unit's dependencies.  Some libraries will help you do this.  But you can do it with plain JavaScript, and it works quite well.

<!--more-->

## Stubbing Dependencies

We're unit testing a module in Node.  That unit has dependencies on some other sub-unit.  For our example, these units are modules. The subject under test is `prep-for-fight.js`.  It has a dependency on `eat-corn.js`.  We want to eventually stub out `eat-corn.js` within our unit test for `prep-for-fight.js`.

```js
const eatCorn = require('./eat-corn')
module.exports = function prepForFight() {
  const nutrients = eatCorn()
  if (nutrients > NUTRIENT_LEVELS.EAGLE_EMPOWERMENT)
    return { hasCape: donHomemadeCape() }
  // ...
}
```

A [stub](/post/sinon-spies-vs-stubs/) is a testing fake that you create in place of the real thing.  While testing our module `prepForFight`, we'll stub out the sub-unit module `eatCorn`.  That module is tested elsewhere in another unit test.  We don't want to conflate the two tests, coupling them strongly together.  This is because if the sub-unit's implementation changes, we don't want to have to change our current unit's test.  

The tradeoff is that we are going to couple our `prepForFight` unit test to the implementation of that module.  This is generally known as white box testing, where we care about the internal implementation of our source code within our tests.  If we did the opposite, and treated `prepForFight` as a black box and just tested its final output, there really is no need to stub anything or ever care about implementation as long as `prepForFight` continues to do its job.  For today's example, we'll choose to stub so that we can have a more isolated unit and focused test, drawing our unit boundaries strictly around code that exists in `prepForFight` proper.

## Stubbing Libraries

There are libraries that help us stub.  Since we have a `require`d module for `eat-corn.js`, there is one in particular that would do well for us called [proxyquire](https://github.com/thlorenz/proxyquire).  It allows targeting the `./eat-corn.js` import path and replacing it with your own module at test runtime.  With a couple caveats, it usually works quite well.  We're going to *not* use it and see how we fare.

## Stub by Passing the Dependency

An easy way to get a dependency into `prepForFight` is to pass it as a function argument.  The rewrite might look like this:

```js
module.exports = function prepForFight(eatCorn) {
  const nutrients = eatCorn()
  if (nutrients > NUTRIENT_LEVELS.EAGLE_EMPOWERMENT)
    return { hasCape: donHomemadeCape() }
  // ...
}
```

Now we have no `require` statement, and `prepForFight` gets the dependency it needs.  Given this implementation, we can exercise our two code paths in our test:

```js
const test = require('ava') // or whatevs

const subject = require('./prep-for-fight')

test('many nutrients dons cape', t => {
  function eatCornStub() {
    return NUTRIENT_LEVELS.EAGLE_EMPOWERMENT + 1
  }
  t.truthy(subject(eatCornStub).hasCape)
})

test('fewer nutrients remains cape-less', t => {
  function eatCornStub() {
    return NUTRIENT_LEVELS.EAGLE_EMPOWERMENT - 1
  }
  t.falsy(subject(eatCornStub).hasCape)
})
```

By passing in our stub directly, we control the branching inside the function.

## Leaking Dependencies

By exposing `eatCorn` as a function parameter, we're telling all consumers that we rely on `eatCorn`.  We've leaked our dependency, lessening our encapsulation.  For the function to work as written, it always needs the consumer to send it the `eatCorn` argument when `prepForFight` is called.  Let's give it a default, and make the consumer code care about our dependencies a bit less.  The default will be our original `require`d module.

```js
const defaultEatCorn = require('./eat-corn')
module.exports = function prepForFight(eatCorn = defaultEatCorn) {
  const nutrients = eatCorn()
  if (nutrients > NUTRIENT_LEVELS.EAGLE_EMPOWERMENT)
    return { hasCape: donHomemadeCape() }
  // ...
}
```

Now if `eatCorn` is *passed* as an argument, it will be used.  Otherwise, `defaultEatCorn`, which is the normal imported dependency, will be used.  This is great because now consumers don't necessarily have to care about the dependency, except to override, which for now is just a thing our test wants to be able to do.

## Stub Without Changing Your Signature

If putting `eatCorn` in your function parameter list bothers you, here's another potential solution.  

```js
const eatCorn = require('./eat-corn')
exports.prepForFight = function prepForFight() {
  const nutrients = eatCorn()
  if (nutrients > NUTRIENT_LEVELS.EAGLE_EMPOWERMENT)
    return { hasCape: donHomemadeCape() }
  // ...
}

exports.withEatCornForTest = function withEatCornForTest(eatCornOverride) {
  eatCorn = eatCornOverride
}
```

Now you can call `withEatCornForTest` before you exercise your subject under test:

```js
const test = require('ava')

const subject = require('./prep-for-fight')

test('many nutrients dons cape', t => {
  function eatCornStub() {
    return NUTRIENT_LEVELS.EAGLE_EMPOWERMENT + 1
  }
  subject.withEatCornForTest(eatCornStub)
  t.truthy(subject.prepForFight().hasCape)
})
```

This overrides the imported `eatCorn` module much like proxyquire does.  This is nice because your `prepForFight` function remains untouched, but I think there are a few drawbacks.

- We had to change our single export module to a multiple named export module in order to add the extra API for setting the dependency.
- We have code in our src that is there specifically for testing.  The `*ForTest` suffix is a particularly clear flag of that.  But if we remove the `*ForTest` suffix, we simply cloud that fact and make something still test-specific look like it's for general use.
- We have made our `prepForFight` function impure, because now its output can change depending on when or if we call the `withEatCornForTest`, creating a module-global side effect.
- `withEatCornForTest` is further away from the `eatCorn` usage inside of `prepForFight`.  Thus, we could read `prepForFight` and never know that it's possible for the `eatCorn` implementation to be switched out from under us without examination of more code outside that function.

## Decouple Function Parameter Order

Previous to reading Sandi Metz' [POODR](http://www.poodr.com/) book, I hadn't considered this, but she posits that a parameter list has coupling because of the order of the parameters.  To lessen the coupling, she proposes changing the function signature to take an argument hash instead.  This has the benefits of not requiring a specific order, letting consumers name the arguments, creating clarity on the consuming side, and having the consistency of a single argument for most/if not all functions that take input.

We can take advantage of these attributes and realize one of our own in our `prepForFight` function.  If we have multiple dependencies, we can put these dependencies and their defaults inside the argument hash, and no consumer has to know anything about it.  There's no ordering problem.  There's no null arugment passing.  We just specify the keys that we care to specify and have defaults for the rest.  A minor refactor might yield some destructuring of a single object sent to the function:

```js
const defaultEatCorn = require('./eat-corn')
module.exports = function prepForFight({ eatCorn = defaultEatCorn /*, more... */ }) {
  const nutrients = eatCorn()
  if (nutrients > NUTRIENT_LEVELS.EAGLE_EMPOWERMENT)
    return { hasCape: donHomemadeCape() }
  // ...
}
```

I think that's probably our final refactor for now.  What could we do to make this better?  What are other stubbing methods that you've gotten a lot of mileage out of?
