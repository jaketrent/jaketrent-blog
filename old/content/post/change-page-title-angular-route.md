---
layout: post
title: "Change Page Title in Angular Route"
date: "2013-11-07"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "angularjs"
description: When you change routes in Angular, the page title doesn't change automatically, but this can be done rather simply.
metaKeywords: js, javascript, angular, angularjs, page title, title
draft: false
image: https://i.imgur.com/wVBKD.png
---

When you change routes in Angular, the page title doesn't change automatically, but this can be done rather simply.

<!--more-->

## Servers and Clients

Client-side routers are pretty awesome.  A new url is pushed into the browser's history to represent the particular resource that pure client code has produced and displayed.  It's pretty cool.  It's also used widely these days.  Angularjs has a nice little router built into its framework.

Route changes from a server always have the page title set automatically in the `head > title` tag.  Client-side routing doesn't have that exactly.  Nor does the Angularjs router change the page title via an automatic mechanism.  So, let's add our own.

## Add Page Title to Angular Router

First, notice that you can add any arbitrary attributes to an angular route that you desire.  In the code below, notice that each route has a `title` attribute:

```coffeescript
angular.module('app', []).config ($routeProvider) ->

  $routeProvider
    .when '/',
      controller: 'HomeCtrl'
      templateUrl: "/templates/home.html"
      title: 'Home'

    .when '/about',
      controller: 'AboutCtrl'
      templateUrl: "/templates/about.html"
      title: 'About'
```

Then in a place that exists on every route -- something like an `AppCtrl` -- you can gain access to the `current` route's `title` every time the route changes:

```coffeescript
angular.module('app').controller 'AppCtrl', ($rootScope) ->
  $rootScope.$on '$routeChangeSuccess', (event, current, previous) =>
    $rootScope.pageTitle = $route.current.title
```

Now we have put the route's `title` in `$rootScope.pageTitle` and can use it in our template:

```html
<html>
  <head>
    <title ng-bind="pageTitle + ' | MyApp'"></title>
  </head>
  <!-- ... -->
```

`ng-bind` is just like using double curlies, but also acts as if it's surrounded by an ng-cloak as well.  Notice that in the title, I'm even concatenating the `pageTitle` with my app's overall name.

Props go to [@danethurber](http://github.com/danethurber) for putting this title changing logic in our most recent app.

Is this how you change your Angular app's title?  Is there a better way?  Specifically, I wonder if `AppCtrl` really is the best place to listen for `$routeChangeSuccess`.
