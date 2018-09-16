---
layout: post
title: "Handlebars For-Loop Index"
date: "2012-05-27"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "handlebars"
description: HandlebarsJs is a great Javascript templating engine.  It's pretty much Mustache templates on steriods -- or Rogaine or something like that.  Well, there's 
metaKeywords: javascript, handlebarsjs
draft: false
---

HandlebarsJs is a great Javascript templating engine.  It's pretty much Mustache templates on steriods -- or Rogaine or something like that.  Well, there's a great for loop, but it'd be cool if it had a loop index built in.  It doesn't have one as of the current version (1.0.0.beta.6).  But, we can make an easy helper.

<!--more-->

## Update: "Native"

Thanks to a bit of looking, Zander (see comment thread below), has discovered that Handlebars [now supports a native loop index accessor called `@index`](https://github.com/wycats/handlebars.js/issues/250#issuecomment-9514811).  And there's a [jsfiddle to prove it](http://jsfiddle.net/mpetrovich/gER9M/).  Thanks, Zander.

## When We're Helping We're Happy

Compared to Mustache templates, Handlebars has the Rogaine element of helper functions.  You have the ability to register as many custom functions for use in your templates as you find useful.  And we're gonna make a sweet one.

Lots of languages have the built-in ability to let you access the current index of a `for` loop.  We'll have to build our own

## For Loop Index Helper

The default Handlebars loop helper is `{{#each}}` .  We will replace it with `{{#iter}}`.  It essentially copies the current implementation of the for loop and adds a few more parameters to the loop context.

```js
Handlebars.registerHelper('iter', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";
  
  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + fn(_.extend({}, context[i], { i: i, iPlus1: i + 1 }));
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});
```

The key line is:

```js
fn(_.extend({}, context[i], { i: i, iPlus1: i + 1 }))
```

`fn()` is the call to execute the block of the template surrounded by `{{#iter}}`.  We pass in `context[i]` as in the normal loop, but we extend it with `i` (the 0-based index) and `iPlus1` (for a 1-based index).

Here's an example usage:

```js
{{#iter myArray}}
  {{i}}. {{myModelField}}
{{/iter}}
```

This would print a list of numbers, then a period, the field values.  Pretty sweet eh?  Use Handlebars and bring new life and lushness to your crop of js templating.  Now with an index in your for loops!  

Note: This code snippet makes use of [underscore.js](http://underscorejs.org/).  You could easily not use `_.extend()`.

  
