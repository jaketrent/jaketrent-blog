---
layout: post
title: "Pass Parameters to Javascript Callback"
date: "2009-09-09"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "jquery"
  - "souit"
description: Callback functions are a nice feature of Javascript.  It's nice to be able to just use a function handle to show that it should be called when a certain som
metaKeywords: javascript, jquery, souit
draft: false
---

Callback functions are a nice feature of Javascript.  It's nice to be able to just use a function handle to show that it should be called when a certain something completes.  Sometimes, however, we want to do more than just specify a function handle.  We want to pass parameters.  Why?  Because sometimes the callback method cares about other data that was available before the original request.  Here's an example:

<!--more-->

As a part of the same voting mechanism that I wrote about for [this article on event handler parameter passing](http://rockycode.com/blog/pass-parameters-jquery-event-functions/), I wanted to keep id and (vote) direction around for the callback, which was to update the UI.  

First, I made an ajax call with jquery to make vote updates to the database, and on my way to the ajax call, I would save the id and direction in a global (bad) variable.  This works, because later, I can reference it in my callback function, updateUI:  

```js
var action = null;
var objectid = null;
    
function vote(id, direction) {
   action = direction;
   objectid = id;
   $.ajax({
     type: 'POST',
     url: '/hymn/' + id + '/vote/' + direction + '/',
     dataType: 'json',
     async: false,
     timeout: 15000,
     success: updateUI
   });
}
```


The next solution is a bit cleaner and makes us feel better about ourself.  Instead of the global, a closure is used, in which we decorate the response object with new state (id and direction); and since the response object is passed by default into the ajax callback function, it's available later by calling response.id or response.objectid:

```js
function vote(id, direction) {
   $.ajax({
     type: 'POST',
     url: '/hymn/' + id + '/vote/' + direction + '/',
     dataType: 'json',
     async: false,
     timeout: 15000,
     success: function (response) {
           response.action = direction
           response.objectid = id
           updateUI(response);
        }
   });
}
```

Sweet!

  
