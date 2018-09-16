---
layout: post
title: "Convert App From EmberFire to Fireplace"
date: "2014-03-17"
comments: true
categories:
  - "Code"
tags:
  - "ember"
  - "ember-data"
  - "js"
  - "firebase"
description: There are a few changes required to convert your Ember app from using EmberFire to Fireplace.  Here are those I've found.
metaKeywords: js, ember, emberfire, firebase, fireplace, emberfire to fireplace, ember-data
draft: false
image: https://i.imgur.com/1Jg69Pf.jpg
---

There are a few changes required to convert your Ember app from using EmberFire to Fireplace.  Here are a few that I found to be required.  There are probably more.

<!--more-->

## Your Options

[EmberFire](https://github.com/firebase/emberFire) and [Fireplace](https://github.com/rlivsey/fireplace) both provide an API for you to integrate your Ember app with a [Firebase](https://www.firebase.com/) backend.  You don't need either library; they provide a more high-level API and help handle some of the nitty gritties of making Ember data-binding work with your socket traffic.  You can just use the [Firebase JavaScript API](https://www.firebase.com/docs/javascript/firebase/index.html).

I was using EmberFire with ember-data first.  It worked pretty well.  I ran into a few hiccups where it seemed like model relationships weren't working quite right in a couple places, but I worked around it for my simple app.  Fireplace was recommended to me as a good option instead of EmberFire.  From those that know more about this than I do, Fireplace was described as "the thing that ember-data should have been," and way more capable than EmberFire.  As far as I can tell, they look very similar.  But, if you should want to switch, here are the basic changes:

## Changes Required

### Set the Store

Instead of setting up an adapter for Firebase to work with Ember data, you want to define a store on your app.  That might look like this:

```coffeescript
App.Store = FP.Store.extend
  firebaseRoot: 'https://myfirebase.firebaseio.com'
```

Note that the store is of type `FP.Store` instead of `DS.Store`.

### Remove ember-data

Now that you have another store set, you want to make sure you remove ember-data so it doesn't try to interact with it.  If you forget, you will get an error at runtime:

```
Uncaught Error: Assertion Failed: The initializer 'store' has already been registered
```

### Add ember-inflector

Ember-data comes bundled with ember-inflector.  But, now that ember-data is gone, we need to fetch this library separately.  This is the library responsible for inferring types in your models based on property names.  To get it, you'll need the [ember-inflector source](https://github.com/stefanpenner/ember-inflector).  You'll notice that there isn't a nice package built for you.  Instead, you'll have to build it with Ruby tools.

To make your own version from source, follow these steps:

```
git clone git@github.com:stefanpenner/ember-inflector.git
rake bundle
rake dist
cp dist/modules/ember-inflector.js your_project_dir
```

For convenience, at the risk of being out-dated, I've uploaded the version that I built as of 17 Mar 2014 to a [gist of ember-inflector at 32e30eb](https://gist.github.com/jaketrent/9621891).`

### Change Model Definitions

Your models will need to change, but not by much.  `DS.Model` becomes `FP.Model`.  `DS.attr` becomes `FP.attr`.  The changes are pretty much one-to-one in requiring just a namespace change.

### Optionally Change Finds

Where you use ember-data's `model.find` function, you may want to change to use Fireplace's `model.fetch`.  `fetch`, in this case will return a promise where `find` does not.

### Change Deletes

Beyond the above, only API that broke for me was ember-data's `model.destroyRecord`.  It seems on that this is the different, because `save` and `createRecord` remain the same.  But, for the delete, the API becomes simply `model.delete`.

### Other Changes

The app I converted was quite simple, so I'm thinking that there will be other changes required.  What have you run into?
