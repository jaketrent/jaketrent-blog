---
layout: post
title: "A Grab Bag of Backbone Tips"
date: "2012-10-09"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "backbone"
image: https://i.imgur.com/yXrC3.png
---

Backbone.js is a great MV* library created by Jeremy Ashkenas.  It is small and powerful, yet unopinionated.  That means that it will let you walk straight into a pit.  It so happens that I'm speaking to you now from the bottom of such a chasm.  Do not fall into the same pit.  As a guide to your travel, here are a few Backbone tips that might help you avoid a few problems.

<!--more-->

## Tips for Backbone

The list of tips for using Backbone is assuredly long and storied.  Here is but a brief offering.

### Make Views Reusable

Pass in the `el` attribute to your views.  Or create the container dynamically (via `tagName` attribute) and display using `$.html()` outside the view.  Essentially, don't hardcode the `el` attr in the view.

### Ensure DOM Element Exists

In short, pass `el` references as css selector strings (eg, '.viewLocation') so Backbone will lazy evaluation them.  This is especially important in a [changing DOM](http://rockycode.com/blog/backbone-views-dynamic-dom/).

### Clean Up Your Events

Create a `.close()` function on Backbone.View.prototype.  Implement an `onClose()` function in each view you create that unbinds events on the view and child models and collections.  [Derick Bailey addresses zombie events](http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/) very well.

### Inheritance

Create class trees just as you would doing regular OOP.  Keep the code DRY.  `Backbone.*.extend()` makes it easy.  [`_.extend()`](http://underscorejs.org/#extend) or the like can also be used for extending non-Backbone objects.

### Develop Without a Real Backend

Because Backbone models allow specifying their own `fetch()` location (via `url` attr), you can specify you own stores, even local .json files as backends.  This can speed up development.

### Bind in Initialize

Extending page state in single-page apps will allow event binding to stick around longer.  Usually, you'll want to bind once per object.  Do that in `initialize()`.

### Nest Your Views

`Backbone.View`s can be nested within `Backbone.View`s.  Do it.  It will help organize your code.  It will make things like event scoping easier.

### Communicate Between Objects

Interesting things will start to happen when objects start talking to each other.  You can pass references to provide a line of communication.  Or you can talk over the global `Backbone.Events` bus.

### Model Newness

`Backbone.Model` has the concept if `isNew()`.  It's not magic.  If the model has an [`id`](http://backbonejs.org/#Model-idAttribute) attribute, it's not new, meaning it's already persisted in your data store.  This affects HTTP commands in `save()`: POST for new, PUT for not new.

### Remember Who You Are

This is an issue you'll deal with in all JavaScript.  Since Backbone is event heavy, you'll see it a lot.  Within event callbacks, `this` will refer to `window`.  To [maintain the context of your Backbone object](http://backbonejs.org/#FAQ-this), pass context in your event `.on()` calls.  [`_.bindAll()`](http://underscorejs.org/#bindAll) is also handy where the API doesn't support context passing directly.

### Organize Your Files

You're using Backbone because you're creating a thicker client, and it's getting crowded there.  For the same reasons, use an AMD loader, like [RequireJs](http://requirejs.org/docs/start.html), and encapsulate your files.

### Minimize DOM Operations

Modifying the DOM is expensive.  Use `document.createDocumentFragment()` or use jQuery (eg, `$('<div /')`) as a disconnected fragment.  Do all possible operations there, and touch the real DOM once.

## War Stories

Each of these tips are topics in their own right.  This list is merely a mention of issues that have each affected me for hours in the past.  Which of them do you think deserves to be addressed further?  Those would be good topics for future posts.

The ideas given in these tips are very subjective.  In some ways, they are prescriptions for a library which otherwise gives few.  As such, use them if you will.  Discard them just as well.

For some code snippets, see my [slides on the same Backbone tips](http://jaketrent.github.com/vertebrae-preso/).

Doubtless you have your own tips as well.  What are the issues that you've had with Backbone?  What are the tips you would offer to overcome them?
