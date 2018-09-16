---
layout: post
title: "Namespacing Angular Controller Attributes"
date: "2013-07-10"
comments: true
categories:
  - "Code"
tags:
  - "angularjs"
  - "js"
description: Usually attributes of your Angular controllers are not namespaced.  But you can namespace them.  But you might not want to.
draft: false
image: https://i.imgur.com/wVBKD.png
---

Usually attributes of your Angular controllers are not namespaced.  But you can namespace them.  But you might not want to.

<!--more-->

## Angular Controllers Usually Attach Attributes to Scope

Usually attributes in an Angular controller, such as functions and variables, are attached to the `$scope` object.  That looks like this:

```coffeescript
angular.module('myapp').controller 'MyCtrl', ($scope) ->
  $scope.myVar = 'myVal'
  $scope.myFn = ->
    console.log 'does stuff'
```

Then in my template I don't know, nor do I need to know, where the attribute comes from.  I just reference it in `my-app.jade`:

```haml
html(ng-app="myapp")
  body(ng-controller="MyCtrl")
    h1 My Var: {{myVar}}
    button(ng-click="myFun()") Does Stuff
```

## Namespaced Angular Controller Attributes

In this simple example, this is no big deal.  But as your app grows in complexity with many, nested controllers and templates, it can become difficult to read the code.  If you have common function names, it might be hard to tell which controller's function is referenced in your templates.  To make this less of a problem and the code more clear, you might namespace your controller attributes in the template.

To do this, you can write your controllers to attach attributes to the controller instead of scope and then put the controller itself on scope.  That looks like this:

```coffeescript
angular.module('myapp').controller 'MyCtrl', ($scope) ->
  @myVar = 'myVal'
  @myFn = ->
    console.log 'does stuff'
  $scope.MyCtrl = @
```

Then your template changes to look like this:

```haml
html(ng-app="myapp")
  body(ng-controller="MyCtrl")
    h1 My Var: {{MyCtrl.myVar}}
    button(ng-click="MyCtrl.myFun()") Does Stuff
```

It's kind of nice for the reasons stated above.  I saw this strategy referenced on the Interwebs at one point and thought it seemed like a good idea.

## Why You Might Avoid This

Maybe you love the idea.  Maybe you don't.  I thought I did.  I have been writing controllers this way for a while.  Now I don't.  Here's why:

### 1. It Makes Templates Less Reusable

It's quite probable that I'll have templates that I don't want permanently attached to a specific controller.  An example I ran into recently was on a profile page.  I had two pages to show profiles: one for my profile and one for an arbitrary person in the system.  They looked the same in the UI.  They had the same basic functions.  But the source of data for the variables and the implementation of the functions was different in the two scenarios.  Thus, I had to refactor to remove the namespacing to be able to reuse the template across pages.

### 2. It's More Typing

It's silly.  It adds up.  The less superfluous typing I can do, the more I consider that solution.

### 3. The Creators Don't Do It

I haven't seen this strategy featured in official tutorials, guides, or API examples.  Not that the Angular d00ds have all the ideas or do everything right -- it just isn't a pattern I see widely accepted or used.

These days, I don't namespace my controller attributes, and I don't recommend it.

So what do you think?  Do you write your controllers this way?  Good idea?  Bad idea?  What are some alternative methods you've found to balance template reuse with readability?
