---
layout: post
title: "Behavior of CoffeeScript Fat Arrow"
date: "2013-07-01"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "ember"
description: CoffeeScript functions are defined with arrows.  Fat arrow provides special function binding.
metaKeywords: ember model, ember view, ember, js, javascript
draft: false
image: https://i.imgur.com/nGd04zX.jpg
---

In CoffeeScript there are two different types of arrows for defining functions:  arrow (`->`) and fat arrow or hash rocket (`=>`).  Usually, you'll use the regular arrow.  But sometimes you'll want the special behavior of the fat arrow.

<!--more-->

## Function Binding

In JavaScript, the keyword `this` within a function refers to the thing that the function is attached to.  Since functions can be invoked in various ways in an average application, what `this` actually references will change.

For instance, if a function is invoked as a callback in an event handler, `this` within that handler will likely reference `window` in JavaScript running within a web browser.  Often, this is not the desired reference.

The solution in vanilla JavaScript is to save a reference to the context the function is defined within and then use that reference in lieu of the `this` keyword.  My favorite name to save the `this` reference into is called `self`.  In JavaScript, that might look like:

```javascript
this.myVal = "my val"
var self = this
var myFn = function () {
  console.log(self.myVal); // will print "my val"
}
```

## CoffeeScript Function Binding

CoffeeScript understands this basic need and makes the reference saving even easier.  When you use the fat arrow, or hash rocket, it will perform function binding.  It uses a variable called `_this` automatically.

### CoffeeScript Binding Rules

1. When a fat arrow is used to bind a function, a `_this` reference is saved in the same context as the function that was declared.
2. When properties of `this` are accessed inside the bound function, they will use the saved `_this` reference (e.g., `@myVal` would compile to `_this.myVal`).
3. When fat arrows are used to bind functions nested within bound functions, the `_this` reference from the top-level bound function context is used in the nested bound functions.
4. The deepest non-bound function context will be used to save a `_this` reference when a bound function is declared.

## When to use Fat Arrow

Given that, here are the every day rules on when to use the fat arrow:

1. If the context of `this` in you function could change based on how it was invoked but properties of `this` need to always reference the context where the function was created, declare the function with a fat arrow.
2. If nested functions exhibit the same need as in rule #1, declare them with the fat arrow.
3. Don't bind, then not bind, then bind again in nested functions.  The inner binding will clobber the `_this` reference and will likely not be what you expect in the outer context (see the last example below).

## A Swirl of Examples

Here are a bunch of examples of bound and non-bound functions.  The first code snippet is the CoffeeScript source.  The second code snippet is the compiled JavaScript.

### No Bound Functions

Just regular CoffeeScript function declarations.

```coffeescript
myVal: 'my val'
myNonBoundFn: ->
  console.log @myVal
```

And in JavaScript:

```javascript
({
  myVal: 'my val',
  myNonBoundFn: function() {
    return console.log(this.myVal);
  }
});
```

### Bound Function

Introduced the fat arrow

```coffeescript
myVal: 'my val'
myBoundFn: =>
  console.log @myVal
```

In JavaScript:

```javascript
var _this = this;
({
  myVal: 'my val',
  myBoundFn: function() {
    return console.log(_this.myVal);
  }
});
```

### Bound, Non-bound Inner Function

Notice the inner function is not bound, and defaults back to just referencing `this`.

```coffeescript
myVal: 'my val'
myBoundFn: =>
  myInnerNonBoundFn = ->
    console.log @myVal
```

JavaScript:

```javascript
var _this = this;
({
  myVal: 'my val',
  myBoundFn: function() {
    var myInnerNonBoundFn;
    return myInnerNonBoundFn = function() {
      return console.log(this.myVal);
    };
  }
});
```

### Bound Within Bound Functions

Inner bound function uses top-level `_this`.

```coffeescript
myVal: 'my val'
myBoundFn: =>
  myInnerBoundFn = =>
    console.log @myVal
```

And the translation:

```javascript
var _this = this;
({
  myVal: 'my val',
  myBoundFn: function() {
    var myInnerBoundFn;
    return myInnerBoundFn = function() {
      return console.log(_this.myVal);
    };
  }
});
```

### Bound, Non-bound, then Bound Functions

When `myVeryInnerBoundFn` uses the fat arrow inside of `myInnerNonBoundFn`, which does not, `_this = this` is generated again.  And when `myOtherBoundFn` is called, the `@what` property will be `undefined`.

```coffeescript
myVal: 'my val'
what: 'is this?'
myBoundFn: =>
  myInnerNonBoundFn = ->
    myVeryInnerBoundFn = =>
      console.log @myVal
myOtherBoundFn: =>
  console.log @what
```

Compiled to JavaScript:

```javascript
var _this = this;
({
  myVal: 'my val',
  what: 'is this?',
  myBoundFn: function() {
    var myInnerNonBoundFn;
    return myInnerNonBoundFn = function() {
      var myVeryInnerBoundFn,
        _this = this;
      return myVeryInnerBoundFn = function() {
        return console.log(_this.myVal);
      };
    };
  },
  myOtherBoundFn: function() {
    return console.log(_this.what);
  }
});
```
