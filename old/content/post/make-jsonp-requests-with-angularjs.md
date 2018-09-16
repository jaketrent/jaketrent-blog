---
layout: post
title: "Make Jsonp Requests with AngularJs"
date: "2013-03-20"
comments: true
categories:
  - "Code"
tags:
  - "angularjs"
  - "js"
  - "cors"
description: How to make a jsonp request in AngularJs for cross-domain requests.
metaKeywords: angularjs, js, javascript, cors, cross domain, jsonp, json
draft: false
image: https://i.imgur.com/wVBKD.png
---

There are a couple ways to make cross domain requests from a client browser.  One method is called Jsonp or Json with padding.  The AngularJs library makes this really simple.

<!--more-->

## Web Server Support

First of all, your Jsonp request will be worth nothing if the server you're requesting data from does not support it.  Jsonp requests require explicit support on the server side.  This is because the data that's returned is formatted differently.  The 'p' in Jsonp stands for padding.  

But that's kind of a weird name.  Maybe Jsonf would be more analogous to reality.  This is because the Json data that you seek is really wrapped in a Javascript function.  This function is then evaluated as a script, passing the data into a callback to be saved by your client program.  

This essentially is a browser hack to get around the security constraint of browsers not being able to request non-script items from different domains.  But since we request Javascript this way all the time, we'll just make our data look like Javascript.

## Angular Jsonp

You're probably already used to using the `$http` service.  It provides the normal `get`, `post` and other functions mapped to http methods.  It also provides the function that we'll need: `jsonp`.  

The client script also requires that we specify the callback to send data to.  AngularJs has its own callback pattern, so it would follow that it has a pattern to handle Jsonp callbacks.  It does.  The callback is always called `JSON_CALLBACK`.  What parameter that it's assigned to in the query string depends on the design of the web service you're calling.  Take a look at the documentation on what's required there.

All that jibber jabber for this simple example of a script asking for [Tumblr](http://colorwheelie.tumblr.com) data:

```coffeescript
$http.jsonp 'http://api.tumblr.com/v2/blog/colorwheelie.tumblr.com/posts/photo?api_key=<mykey>&callback=JSON_CALLBACK'
  .success (data) ->
     $scope.colorwheelies = data.response.posts;
  .error (data) ->
     console.log('ERROR');
```

The interesting line is line one.  We call the `jsonp` function.  We assign our callback like this: `callback=JSON_CALLBACK`.  And in our success callback, we can consume our data variable like it was pure Json.
