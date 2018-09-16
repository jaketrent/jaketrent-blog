---
layout: post
title: "JavaScript Mixins"
date: "2013-09-06"
comments: true
categories:
  - "Code"
tags:
  - "js"
description: JavaScript makes mixins inherently easy.  Here are a few methods.
draft: false
image: https://i.imgur.com/XemDUw8.jpg
---

JavaScript makes mixins inherently easy.  Mixins are a native feature of the language without calling it that.  Here are a few methods for making this happen.

<!--more-->

## Attach a Property

You can attach a property to a Javascript object at any time.  You don't need to monkey patch it.  It doesn't need to be packaged up in a very special format.  You just shove stuff onto the object.  Here's an example:

```javascript
var MyModel = function () {
  doOneThing: function () { console.log('doing it right'); }
};

var model = new MyModel();
model.doItRight = function () { console.log('everybody will be dancing'); };

model.doOneThing(); // => 'doing it right'
model.doItRight();  // => 'everybody will be dancing'
```

A function is defined.  It is instantiated.  Later, a new property, `doItRight` function, is added to it.  Both functions now magically work on the original model instance.  We could have attached to `MyModel.prototype` and had the `doItRight` function attached to all future instantiations of the function as well.

## Use Extend

There are a couple great libraries that provide wholesale extension of object properties, just like mixins in other languages.  [jQuery](http://api.jquery.com/jQuery.extend/) and [Underscore](http://underscorejs.org/#extend) provide `$.extend` and `_.extend` respectively.  They are great utilities that make object extension quick and painless.  Here's an example using Underscore:

```javascript
var utilities = {
  workWater: function () { console.log('pay $75 for water'); }
};
var otherUtilities = {
  electrifyTheCompany: function () { console.log('pay $75 for electric slides'); }
};
var utilityConglomerate = _.extend({}, utilities, otherUtilities)

utilityConglomerate.workWater() // => 'pay $75 for water'
utilityConglomerate.electrifyTheCompany() // => 'pay $75 for electric slides'
```

## Handle Per-instance State

Notice that the above methods are very good at attaching functions.  The functions in these examples have no shared state.  The scenarios that we've made up so far haven't required per-instance state as specified by the mixin.  Recently I had a need for all of these things.  I was making a library called [angular-models](http://octanner.github.io/angular-models/).

I wanted to be able to assign what I called `AttributesMixin` to any function (Model `class`es, written in CoffeeScript).  To simplify the story, we have a `set` API that assign values to an internal `_attributes` object and a `get` to retrieve them.  These functions were to be assigned to the prototype of the function, but the `_attributes` were to be assigned to the object instance only, clean for each new object.

We invented our own convention, where each mixin would optionally implement its own `dependencies` function.  Each of the `Model`s knew how to extend itself with a given mixin.  This custom extend function was called `@include`.  As mixins were included, the `dependencies` function reference was saved (in an array called `_dependencyFns`) and then called in the `Model` superclass constructor.  So, each `Model` subclass is required to call the super constructor to get this functionality.

In the case of `AttributesMixin`, it looks as simple as this:

```coffeescript
AttributesMixin =
  dependencies: ->
    @_attributes = {}
  get: -> # ...
  set: -> # ...
```

The `Model` can include like this:

```coffeescript
class MyModel extends Model
  @include AttributesMixin
  constructor: ->
    super
```

And the `Model` constructor includes a snippet something like this:

```coffeescript
class Model
  constructor: ->
    fn.apply @ for fn in @_dependencyFns if @_dependencyFns?
```

For a more accurate, in-depth look at the code, see the [Github repo for angular-models](https://github.com/octanner/angular-models).

Do you use any of these methods to mixin functionality to your JavaScript objects?  What others?
