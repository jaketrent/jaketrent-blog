---
layout: post
title: "Sinon Spies vs. Stubs"
date: "2015-02-25"
lastmod: "2019-11-16"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "sinon"
  - "unit-testing"
description: Sinon provides spies, stubs, mocks.  They're all useful as fakes in tests with essential differences.
metaKeywords: js, sinon, spy, stub, mock, unit testing, mocha
draft: false
image: https://i.imgur.com/yuKcrP9.jpg
---

[Sinon](http://sinonjs.org/) provides spies, stubs, and mocks.  They're all useful as fakes in tests.  They come with essential differences for what they're helpful in doing and how they work.

<!--more-->

## Why Use Fakes?

In a unit test, you might want to avoid having to test the unit's dependencies.  This is especially true in [white-box testing](http://en.wikipedia.org/wiki/White-box_testing).  In this case, test fakes are going to be very helpful.  Sinon provides several fakes, notably spies, stubs, and mocks.  Let's compare and contrast the three:

## Sinon Spies

Spies sound like what they do -- they watch your functions and report back on how they are called.  They generally avoid the violence and mayhem of a Hollywood spy, but depending on your application, this could vary.

They don't change the functionality of your application.  They simply report what they see.  The [sinon API for spies](http://sinonjs.org/docs/#spies-api) is fairly large, but it essentially centers around the `called` attribute (of which there are many variations).

I first setup that I want to spy on something.  Then I call my subject under test (src code).  Then I verify with the spy what was actually called and stop spying.  That might look like this in a test:

```js
describe("#fight", () => {
  it("calls prayForStrength for fight success", () => {
    sinon.spy(subject.strengthDep, "prayForStrength")
    subject.fight()
    subject.strengthDep.called.should.be.true
    subject.strengthDep.restore()
  });
});
```

*Note: this example is in [mocha](http://mochajs.org/) using a [should.js](https://www.npmjs.com/package/should) assertion style*

The dependency's `prayForStrength` method is referred to by name in a string to setup the spy.  When `fight` is called here, `strengthDep.prayForStrength` will be called as normal -- but there will be someone watching.  Finally, we call `restore` on the function we spied on so that all spies are called off.  If you want to do more than watch as dependencies work as described, you might want to use a stub.

## Sinon Stubs

Stubs are more hands-on than spies (though they sound more useless, don't they).  With a stub, you will actually change how functions are called in your test.  You don't want to change the subject under test, thus changing the accuracy of your test.  But you may want to test several ways that dependencies of your unit could be expected to act.

For instance, if you had a function that returned a boolean that your code used to do different things, you might want to use a stub in two different tests to verify conditions when returning different values (ie, guarantee one run of `true` and one of `false` return).

To continue the `fight` example from above, let's assume that if `prayForStrength` returns true, we are guaranteed to win the fight for the orphans (ie, `fight()` should return `true`).  That might look like this:

```js
describe("#fight", () => {
  it("always wins when prayForStrength is true", () => {
    sinon.stub(subject.strengthDep, "prayForStrength").callsFake(() => true)
    subject.fight().should.be.true
    subject.strengthDep.restore()
  });
});
```

Notice that we use a different `sinon.stub` API.  This call chains to an invocation of `callsFake` where we're supplying our own version of `prayForStrength`.  For our test, all we care about is the return value, so that's all we supply.  We're not testing this dependency.  We're instead testing how our subject `fight`s in a certain circumstance.  There are many ways you can use [sinon stubs](http://sinonjs.org/docs/#stubs) to control how functions are called.  Also note that you can still use the `called` verifications with stubs.  But if you do verify a stub was called, you may want to use a mock.

## Sinon Mocks

[Mocks](http://sinonjs.org/docs/#mocks) take the attributes of spies and stubs, smashes them together and changes the style a bit.  A mock will both observe the calling of functions and verify that they were called in some specific way.  And all this setup happens *previous* to calling your subject under test.  After the call, mocks are simply asked if all went to plan.

So the previous test could be rewritten to use a mock:

```js
describe("#fight", () => {
  it("always wins when prayForStrength is true", () => {
    var mock = sinon.mock(subject.strengthDep)
    mock.expects("prayForStrength").returns(true)
    subject.fight().should.be.true
    mock.verify()
    mock.restore()
  });
});
```

The `expects` and `returns` line is where the combo magic happens.  `expects` is verifying a call (like `spies` can), and `returns` is specifying functionality (like `stubs` can).  The `verify` call is the line that will fail (essentially the mock assertion) if things in the subject didn't go exactly according to plan.

## Spies vs. Stubs vs. Mocks

So when should I use spies or stubs or mocks?  As with most art, there are many ways to accomplish what you want.  Much of your choice will depend on your own style and what you become proficient in.

Some basic rules might be:

- ***Use Spies*** - if you simply want to watch and verify somethings happens in your test case.
- ***Use Stubs*** - if you simply want to specify how something will work to help your test case.
- ***Use Mocks*** - if you want to both of the above on a single dependency in your test case.

When do you find yourself most often using spies vs. stubs vs. mocks?
