---
layout: post
title: "Backbone Views in a Dynamic DOM"
date: "2011-12-29"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "jquery"
  - "backbonejs"
  - "requirejs"
description: When you start writing applications with BackboneJS, that means that you're dealing with some dynamic UI.  There are elements being pushed into and pulled o
metaKeywords: javascript, jquery, backbonejs, requirejs
draft: false
---

When you start writing applications with BackboneJS, that means that you're dealing with some dynamic UI.  There are elements being pushed into and pulled out of the DOM.  I was having problems trying to reference DOM elements that were dynamically inserted into the DOM by other Backbone views.  The fix was simple but not immediately obvious without cracking open Backbone.

<!--more-->

Backbone View Element
---------------------

The [`el`](http://documentcloud.github.com/backbone/#View-el) property of a `Backbone.View` is the dom element within which your view contents will be displayed.  By default it's an empty div, otherwise it can be specified by a combination of `tagName`, `className`, and `id` properties.  For these options, Backbone assumes that your DOM element isn't living within the document; rather, it will be created in memory and then inserted where you later specify.

If you want to specify a pre-existing DOM element within which to insert your Backbone view contents, you set the `el` property of your view directly.  This is where I ran into problems.

Shifting Plates of the DOM
--------------------------

Backbone views assume the `$` alias is either [jQuery](http://docs.jquery.com/Main_Page)or [Zepto](http://zeptojs.com/).  They do the same thing, just use css-like selectors to get references to DOM elements.  So, I would have a view and set the `el` property to a DOM element selected by jQuery (note: examples use [RequireJS to manage dependencies](http://requirejs.org/docs/whyamd.html)), such as `MountainView.js`:

```javascript
define(function () {
  return Backbone.View.extend({
    el: $('#mountains'),
    render: function () {
      $(this.el).html(makePrettyMountains());
      return this;
    }
  });      
});
```

Problem is that earlier in the code, another view was being relied upon to insert the `#mountains` element into the DOM.  Let's say `SceneryStarterView.js` looked something like this:

```javascript
define(['MountainView'], function (MountainView) {
  return Backbone.View.extend({
    initialize: function () {
      $('body').html(makePlaceForMountains());
      var mountain = new MountainView();
      mountain.render().el;
    }
  });
});
```

It was importing (via [RequireJS](http://requirejs.org/docs/whyamd.html)) `MountainView.js`.  At import time, `$('#mountains')` was evaluated but nothing was found, because `makePlaceForMountains()` hadn't been called yet.  It was looking for `#mountains` too early!  How import the needed view, let it specify somewhere on the DOM that doesn't exist *yet* but *will* by the time it's instantiated and then rendered?  Backbone has a mechanism for this...

Into the [Asthenosphere](http://en.wikipedia.org/wiki/Asthenosphere)
--------------------------------------------------------------------

To find the answer, I had to peel back the Backbone crust and do a little dumpster diving.  When my `MountainView` is new'ed up, the constructor for `Backbone.View` is hit.  It calls a function called `_ensureElement()`:

```javascript
// Ensure that the View has a DOM element to render into.
// If `this.el` is a string, pass it through `$()`, take the first
// matching element, and re-assign it to `el`. Otherwise, create
// an element from the `id`, `className` and `tagName` proeprties.
_ensureElement : function() {
  if (!this.el) {
    var attrs = this.attributes || {};
    if (this.id) attrs.id = this.id;
    if (this.className) attrs['class'] = this.className;
    this.el = this.make(this.tagName, attrs);
  } else if (_.isString(this.el)) {
    this.el = $(this.el).get(0);
  }
}
```

Hmmmm...  If there isn't an `el` field, grab `id`, `className`, and `tagName` and create an in-memory element with `document.createElement()`.  And it's the `else if` that gives us the option we need.  *If the `el` property is a string, _now_ try and select it with jQuery*.  Perfect!  If we change our code for `MountainView.js` to reflect that one change:

```javascript
define(function () {
  return Backbone.View.extend({
    el: '#mountains',
    // render, etc
  });      
});
```

It works like a charm.  Why?  Now the order of events is:  

- `SceneryStartView` is instantiated somewhere
- It imports `MountainView` as a dependency
- `SceneryStartView` inserts the `#mountians` DOM element
- Then it news up `MountainView`
- In the constructor for `Backbone.View`, jQuery selects my string value for `el`
- One more round of hallelujah is sung!

  
