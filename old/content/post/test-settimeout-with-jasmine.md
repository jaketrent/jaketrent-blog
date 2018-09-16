---
layout: post
title: "Test setTimeout with Jasmine"
date: "2013-05-15"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "jasmine"
  - "underscore"
metaKeywords: javascript, settimeout, setinterval, debounce, throttle, underscore, test, jasmine, mock, clock
description: Code that utilizes setTimeout or setInterval becomes asynchronous.  Jasmine has some nice helpers to make your test synchronous again.
draft: false
image: https://i.imgur.com/Ks3wt01.jpg
---

Code that utilizes `setTimeout` or `setInterval` becomes asynchronous.  Jasmine has some nice helpers to make your test synchronous again.

<!--more-->

## Code Using setTimeout

Any Javascript code that wants to delay certain actions or give intervals between actions will use `setTimeout` or `setInterval` respectively.  There are also libraries that create some niceties for working in these situations, notably [underscore](http://underscorejs.org)'s `_.throttle` and `_.debounce` functions.  Underneath all of these higher-level functions, they're using the native `setTimeout` construct, so the same strategies will apply.  In your source, you end up with something like this:

```coffeescript
$(document).on 'keyup', '.autocomplete-field', _.debounce(autocomplete, 500)
```

This code binds a keyup event listener on a contrived `.autocomplete-field`.  Of course, we don't want to do an expensive `autocomplete` lookup on every keypress.  So, we'll slow it down a bit with `_.debounce`.

## Testing Asynchronous Code in Jasmine

Now we go to test it in Jasmine (failing):

```coffeescript
  describe 'Autocomplete Field', ->

    it 'calls autocomplete when typing', ->
      called = false
      autocomplete = ->
        called = true

      keyup = $.Event('keyup')
      $('.autocomplete-field').trigger keyup
      called.should.be.true
```

In this test, or `autocomplete` spy will never be called, thus `called` will never be true.  There are a few ways to fix this.

## Mocking the Jasmine Clock

One way to fix the test is to remove `_.debounce` from our source code.  That would make the test pass.  The other is to setup our Jasmine to handle the `setTimeout` used in `_.debounce`.  Let's do the latter, and raise our fists to the sky in triumph over our testing foe (winning):

```coffeescript
  describe 'Autocomplete Field', ->

    beforeEach ->
      jasmine.Clock.useMock()

    it 'calls autocomplete when typing', ->
      called = false
      autocomplete = ->
        called = true

      keyup = $.Event('keyup')
      $('.autocomplete-field').trigger keyup
      jasmine.Clock.tick 501
      called.should.be.true
```

The needed code is simple to add.  Use `jasmine.Clock.useMock()` to setup the fake ticker.  Then call `tick()` on it whenever you want your test to simulate time massage.

The cool thing is that this does not slow down your tests.  You could set the clock tick to be 50100000 or some crazy number, and it will still execute as fast as your single JavaScript thread will let you.

Boom.  Another testing hurdle cleared.  Sometimes it's harder to write the test than the code.
