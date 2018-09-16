---
layout: post
title: "Backbone Inheritance"
date: "2011-12-14"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "backbonejs"
  - "requirejs"
description: Backbone has a great inheritance mechanism.  It's as easy as Backbone.Model.extend().  This much is obvious.  Let's try a few other things.
metaKeywords: javascript, backbonejs, requirejs
draft: false
---

Backbone has a great inheritance mechanism.  It's as easy as Backbone.Model.extend().  This much is obvious.  Let's try a few other things, like:  Subclassing our own classes, calling to super classes, adding subclass attributes, and adding various subclasses to a collection based on a super class.

<!--more-->

Let's just envision a potential application where we are modeling locations of different types.  In the general case, we'll refer to these things as Locations.  If it is to be a Backbone-flavored object, must [extend from Backbone](http://documentcloud.github.com/backbone/#Model-extend).  Let's just show the imagined models.

These examples are using AMD-style modules.  I personally use [RequireJS](http://requirejs.org/docs/start.html).  Note that Backbone is not AMD-compatible, so it is assume to be globally available here.

Subclass Your Subclasses
------------------------

`Location.js` might look like this:

```javascript
define(function () {
  return Backbone.Model.extend({
    // general state and behavior for all locations        
  });
});
```

In `Location.js` is where we want to put all general state and behavior across locations. Now to create a location that's specifically of type Country, we just change what we extend.  Since `Location.js` is a `Backbone.Model`, we can call extend on it as well in `Country.js`:

```javascript
define(['Location'], function (Location) {
  return Location.extend({
    // things that just a country knows and does
  });
});
```

Boom!  Just like that, `Country.js` will have everything `Location.js` does, and can add to it (by creating fields of different names than exist in `Location.js`) and can override it (by create fields of the same name).

Calling Backbone Super
----------------------

It's super!  That was easy.  

Many times, we may want to put more specific behavior in a subclass, but we still want to execute the more general code in the superclass.  For example, the `Location.js` may do certain things in its `initialize()` function that the `Country.js` wants to do as well in addition to its special country things.  Call super, causing the Location stuff to happen, the code out the rest.  

In `Country.js`:

```javascript
define(['Location'], function (Location) {
  return Location.extend({
    initialize: function () {
      this.constructor.__super__.initialize.apply(this, arguments);
      // ... do more Country-only stuff
    }
  });
});
    
```

So, latch onto the `constructor` field, then to `__super__`.  Finally, use the *actual name* of the function in the superclass that you want to call and apply it.  

And you don't even have to make the call to super as the first operation of the function. w00t!

There have been other [efforts made to simplify the call to super](http://forrst.com/posts/Backbone_js_super_function-4co), but they really aren't that much nicer so I just stick to what's built in.

Adding Attributes
-----------------

For things that aren't functions, such as an object, sometimes we want to do the equivalent of a call to super, but there's nothing to call.  Yet, we still don't want to re-state all the state of the superclass.  What's a coder to do.  Try a little [underscore](http://documentcloud.github.com/underscore/) action.  

If `Location.js`'s defaults field looks like this:

```javascript
define(function () {
  return Backbone.Model.extend({
    defaults: {
      name: 'Lame Default Location Name'
    }
  });
});
```

Then you can add more defaults in the Country and not lose the `name` field.  In `Country.js`:

```javascript
define(['Location'], function (Location) {
  return Location.extend({
    defaults: _.extend({
      more: 'goodness'
    }, Location.prototype.defaults)
  });
});  
```

Underscore's [extend](http://documentcloud.github.com/underscore/#extend) function will combine object attributes for you!  So, in the end, you'll have all of the fields in one object:


```javascript
{ 
  name: 'Lame Default Location Name',
  more: 'goodness'
}
```

This is especially great for subclassing the `Backbone.View` events attribute.


Subclasses in a Super Collection
--------------------------------

If you want a heterogeneous mix of subclasses in a super `Backbone.Collection`, you can do it.  For instance, if for some reason we wanted another Location subclass, `Ocean.js`, you'd make it extend Location:

```javascript
define(['Location'], function (Location) {
  return Location.extend({
    // big blue wet things here
  });
});
```

Now, we'll setup our collection as `World.js`:

```javascript
define(['Location'], function (Location) {
  return Backbone.Collection.extend({
    model: Location
  });
});
```

When you call `Backbone.Collection.fetch()`, `Backbone.sync` is called and a request is made to the server for your list of objects.  When the data comes back, `Backbone.Collection.parse()` is called before being saved in the collection.  Something in the incoming data must differentiate the models as being different subclasses.  For instance, countries are solid and oceans are liquid:

In `World.js`:

```javascript
define(['Location', 'Country', 'Ocean'], function (Location, Country, Ocean) {
  return Backbone.Collection.extend({
    model: Location,
    parse: function (res) {
      var self = this;
      _.each(res, function (location) {
        switch(location.phase) {
          case 'solid':
            self.add(new Country(location));
          case 'liquid':
            self.add(new Ocean(location));
          case 'gas':
            alert('kernel panic');
        }
      });
    }
  });
});
```

Now, `World.js` will contain different kinds of Locations, including Country, Ocean, and whatever other types you support.

Super Indeed
------------

Backbone does really give some niceties around inheritance.  Use it and cry with joy.    

  
