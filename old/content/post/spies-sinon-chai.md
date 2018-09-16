---
layout: post
title: "Spies with Sinon and Chai"
date: "2013-08-19"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "sinon"
  - "chai"
  - "angularjs"
description: Spies will help you verify calls to methods.  Sinon is a library that provides spies.  Chai will provide appropriate assertions.
draft: false
image: https://i.imgur.com/yuKcrP9.jpg
---

Spies will help you verify calls to methods without actually calling them.  [Sinon](http://sinonjs.org/) is a library that provides spies.  [Chai](http://chaijs.com/) will provide assertions appropriate to spying.

<!--more-->

## Install Dependencies

You'll need 3 dependencies in dev mode for running your tests:

```
npm install sinon chai sinon-chai --save-dev
```

Now make sure that you import these testing tools into your test environment.  I'm using [Karma Runner](http://karma-runner.github.io/0.10/index.html), so my `files` array has these 3 lines:

```javascript
'node_modules/sinon/pkg/sinon.js',
'node_modules/chai/chai.js',
'node_modules/sinon-chai/lib/sinon-chai.js',
```

Make sure that you are including the packaged version of each of these files.  For instance, the `sinon/lib` files are not built together, so you'll likely import some subset of needed files; it won't error out, but it won't provide working spies like we're wanting (so use the `pkg` directory files).

## Spying

We spy because we care.  We don't want certain methods to be called.  In this case, we're testing Angularjs code.  We don't want our event broadcast to actually happen because we don't care about testing the listeners to that event.  We just want to know that the broadcast happens.  We can test listeners separately in their own unit test.

I found that following the "Getting Started" example on the Sinonjs page didn't lead me to create a spy that worked.  I went spelunking and found a working example on a random tech blog (a la this one).  So, here's this advice:

- `sinon.spy` api takes the object with the function as a 1st parameter and the string name of the function that you're wanting to spy on as the 2nd parameter.
- `sinon.spy` will return a reference to the spy.  You can use that reference to do assertions on or you can use the spied on function itself (ie, `$rootScope.$broadcast`)
- Use [`sinon-chai`](https://github.com/domenic/sinon-chai).  It provides better assertions and works with `chai`.

```coffeescript
assert = chai.assert
expect = chai.expect
should = chai.should()

model = null
$rootScope = null
$httpBackend = null

beforeEach module 'app'

beforeEach inject (_Model_, _$rootScope_, _$httpBackend_) ->
  model = new _Model_
  $rootScope = _$rootScope_
  $httpBackend = _$httpBackend_

it 'broadcasts model:fetched event w/ model', ->
  spy = sinon.spy($rootScope, '$broadcast')
  model.fetch()
  $httpBackend.flush()
  spy.should.have.been.calledWith 'model:fetched', model
```

Most of that code is setup.  And most of that setup is related to [Angularjs](http://angularjs.org/).  If that doesn't apply to you, ignore it.  It's just there to give a more full picture of the environment.

The interesting part is all in the final `it` function call.  The code under test is `model.fetch()`, which is called.  Internal to that function, there is a `$rootScope.$broadcast` call that we're spying on that we're asserting is called with 2 parameters: 'model:fetched' string and the model itself.

As with most testing environments, it's fairly simple once you discover the pattern.  What do you think of this one?  Does it work for you?
