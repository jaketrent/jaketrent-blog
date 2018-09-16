---
layout: post
title: "Minimized AngularJs Dependency Injection"
date: "2012-12-31"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "angularjs"
description: I just minified my AngularJs code, and all my dependency injection broke.  I'm getting a "Unknown Provider" message.
metaKeywords: js, javascript, angular, angularjs, dependency injection, minimization, uglify
draft: false
image: https://i.imgur.com/wVBKD.png
---

Aren't environment-specific bugs some of the hardest to troubleshoot!  You may find yourself scratching your head after building and deploying your AngularJs code.  If you minimize or uglify your Angular code, there may be a few things you need to do differently to make it work.

<!--more-->

## Dependency Injection

Angular has a great feature for sharing code and declaring dependencies.  They use dependency injection, where modules or controllers and the like can use services available to them.  You can even define your own services to inject.  Our need here is nothing that fancy.  We just want the thing to work -- always and in any environment.

## Angular Unknown Provider

It's hard to track down what's really the problem in minimized code.  Everything's on line 1.  And all the variable names are shortened and obfuscated.  Thus, when I first got this error, I was a bit lost:

```
Uncaught Error: Unknown provider: e from myModule
```

In my local environment, my code looked like this and worked fine:

{% codeblock lang:"js" %}
angular.module('myModule', [], function ($interpolateProvider) {
  // interpolate stuff
});
```

After my build process and mangled local variables, it looked like this:

{% codeblock lang:"js" %}
angular.module('myModule', [], function (e) {
  // interpolate stuff
});
```

Oh boy.  A few StackOverflow articles later, and I was led to the [dependency injection guide](http://docs.angularjs.org/guide/di) that's a part of the Angular docs.  It revealed that my pattern of dependency injection wasn't gonna cut it:

> While straightforward, this method will not work with JavaScript minifiers/obfuscators as they rename the method parameter names. This makes this way of annotating only useful for pretotyping, and demo applications.

## Reliable Angular Injection

While you can build Angular code that way, it just simply won't be reliable.  "Pretotyping", as the docs say, is only for trying stuff out and seeing how you like it.  Okaaaay.  I guess that's kind of nice, since the reliable way is more verbose, requires writing things twice, and keeping them in sync.  Stink!

#### Reliable Style #1: "Controller Style"

```js
var MyController = function ($scope) {
};
MyController.$inject = ['$scope'];
```

The `$scope` parameter in the function is soon to be renamed once minified, so save a list of the parameter names as strings in the `$inject` array.  Make sure the order and length of these two lists match.

#### Reliable Style #2: "Module Style"

```js
angular.module('myModule', [])
  .config(['$interpolateProvider', function ($interpolateProvider) {
  }]);
```

The idea is the exact same.  Note the placement of the square brackets;  It's a bit different.

Well, there you are.  Write Angular dependency injection once and run anywhere.
