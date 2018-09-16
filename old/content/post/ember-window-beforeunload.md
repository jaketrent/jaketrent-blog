---
layout: post
title: "Detecting Window Closing in Ember"
date: "2014-03-17"
comments: true
categories:
  - "Code"
tags:
  - "ember"
  - "js"
description: In a long-running app such as you might build in Ember, it can be useful to detect when the window is closing.
metaKeywords: js, ember, beforeunload, window.beforeunload, close tab, close window, save data
draft: false
image: https://i.imgur.com/85v8PQP.png
---

In a long-running app such as you might build in Ember, it can be useful to detect when the window is closing.  This is easily detected with JavaScript, and there are easy places to put the code in your Ember app.

<!--more-->

## beforeunload

The `window` event that you want to listen for is `beforeunload`.  You might bind to the event like so:

```coffeescript
$(window).bind 'beforeunload', ->
  'Are you sure you want to close this window?'
```

Return a string from the function.  This string will be displayed in a browser-native confirm-style dialogue.

## beforeunload in Ember

Now, if your app is controlled by Ember, you're likely going to want it to handle bindings such as this from within Ember.  There are several places you might want to put this code.  Your decision will depend on the needs of your app.  You can put it in a route or controller.  The scope of that route or controller should match the scope for which you want the `beforeunload` event to be caught.  In other words, if you want `beforeunload` to be caught for the entire app, put the listener in `ApplicationRoute` (or `ApplicationController`).  Or if you wanted a more limited scope, put the listener in a more specific route.

For instance, if you wanted to save a blog post when the user closes a tab, you might implement something like this:

```coffeescript
App.BlogEditController = Ember.ObjectController.extend
  saveBeforeClose: (->
    $(window).bind 'beforeunload', =>
      @get('model').save()
      'Are you sure you want to leave unsaved work?'
  ).on 'init'
```

## In Practice

In practice, the UX for this kind of feature can be tricky.  If someone closes a tab, odds are they meant to and don't want to be bothered with a confirm dialogue asking them to reiterate their decision.  On the other hand, maybe the didn't realize the implications of closing out the app, such as in the case of unsaved work, and they become very grateful for the reminder to stay and save something.

In the case of the last example, it would be cool if we could detect the window closing, save the work automatically, and let the user close the tab as they indicated without interruption.  For asynchronous actions such as network requests, this is problematic.  The request will not finish before the browser has trashed the whole window.  In cases such as this, you will need to synchronize your requests to block before finishing execution of the `beforeunload` event callback.

So, does this work for you?  How might you make it better?
