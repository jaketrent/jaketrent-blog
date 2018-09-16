---
layout: post
title: "Preload Route Data in Angular"
date: "2013-08-13"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "angularjs"
description: It's sometimes useful to preload/resolve data previous to your Angular view being displayed.  Such was the case recently for our current user object.
draft: false
---

It's sometimes useful to be able to preload or resolve data previous to an Angular view being displayed.  Such was the case recently for our current user object.  It simplified a lot of things in the app to have the guarantee of a loaded current user previous to displaying pages.  The Angular router has a great mechanism built in to do just this sort of thing, called `resolve`.

![Angularjs](https://i.imgur.com/wVBKD.png)

<!--more-->

## Current User

For the example, our current user object is super simple.  Just pretend that it holds all of the relevant details of a user.  These details are useful for displaying various things in the app that need the context of who the currently logged-in user is.

```coffeescript
  angular.module('app.services').factory 'CurrentUser', ($http, User) ->
    class CurrentUser extends User
      fetch: ->
        # do $http things to request user data
      isLoaded: ->
        # true if fetched and ready to go

    new CurrentUser
```

Note that for our app there is just one `CurrentUser` object, a singleton, because we return a single instance from our factory, not a class.

## Router

The Angular router is used for client-side routing of urls.  Our angular app is called `app`.  We setup some angular submodules to hold config, services, and controllers.

Let's say that we have a home page and a profile page for our example.

Each route can be configured with a `resolve` object.  The key of that object is the name of a local variable and the value is a function which returns a promise.  The resolution value of the promise is the data you want before the route executes.After all the promises are resolved, the route is free to switch and execute.  Until then, each unresolved promise will block the route from executing.

```coffeescript
angular.module 'app.config', []
angular.module 'app.services', []
angular.module 'app.controllers', []

angular.module('app', ['app.config', 'app.services', 'app.controllers'])

angular.module('app').config ($routeProvider, $locationProvider, resolves) ->
  $locationProvider.html5Mode true

  $routeProvider
    .when '/',
      controller: 'HomeCtrl'
      templateUrl: '/templates/home.html'
    .when '/profile',
      controller: 'ProfileCtrl'
      templateUrl: '/templates/profile.html'

angular.module('app').run ($route, resolves)->
  for r in $route.routes
    r.resolve ?= {}
    r.resolve.CurrentUser = resolves.getCurrentUser
```

The `run` method is essentially the Angular app's main method, starting the program.  I want to ensure the current user is loaded for each route.  In this case, instead of putting a `resolve` config on each route, I'm looping through all routes after their initial definition and adding the `CurrentUser: resolves.getCurrentUser` config.

## Resolve Function

In our resolve function we setup our own promise via the `$q` service.  We check to see if our singleton `CurrentUser` is already loaded.  If it's not, we fetch it.  If it has been fetched once already, we resolve the promise with the value that's already available.

```coffeescript
angular.module('app.config').constant 'resolves',

  getCurrentUser: ($q, CurrentUser) ->
    defer = $q.defer()

    if not CurrentUser.isLoaded()
      req = CurrentUser.fetch()
      req.success -> defer.resolve CurrentUser
      req.error -> defer.reject()
    else
      defer.resolve CurrentUser

    defer.promise

```

## Application Controller

Now that we have the `CurrentUser` guaranteed to be resolved (fetched and returned) by the time we enter all routes, we need to grab the value of `CurrentUser` and put it in `$scope` where our program would normally pick up and start using variables.

```coffeescript
angular.module('app.controllers').controller 'AppCtrl', ($scope) ->

  $scope.$on '$routeChangeSuccess', (next, current) ->
    if current.locals.CurrentUser?
      $scope.currentUser = current.locals.CurrentUser
```

We listen the Angular-provided event when a route is successfully entered: `$routeChangeSuccess`.  The value we care about is available on the `current` route's `locals` object, placed there magically by the resolve function.

## When to Use

There are a few bits to piece together to make this happen.  It might be simpler than other solutions or make more sense for you in your app if you need something(s) loaded previous to executing on a route.

I would definitely use this feature judiciously, as it seems to eat away at one of the advantages of a client-side app in the first place: asynchronous loading.  We'8re blocking the whole app from going forward when we're in the process of resolving.  That boundary used to be on the edge of the server, building up the page before it was servable to the client.  Now, on a web client, we have multiple requests that can happen in parallel and we can render bits as they're available -- important bits first and so on.
