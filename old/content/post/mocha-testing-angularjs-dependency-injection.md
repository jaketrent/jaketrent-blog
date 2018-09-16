---
layout: post
title: "Mocha Testing AngularJs Dependency Injection"
date: "2013-01-02"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "angularjs"
  - "mocha"
description: When you test your AngularJs code, you need to explicitly inject the services your controllers and modules require.
metaKeywords: js, javascript, mocha, angularjs, dependency injection, $scope
draft: false
image: https://i.imgur.com/wVBKD.png
---

When you test your AngularJs code, you need to explicitly inject the services that your controllers and modules require.  It has its own special syntax.  It requires mocking.  You'll see a slightly different syntax than you may have expected.

<!--more-->

## The Solution: Mocking AngularJs Injections

Angular is simple and quick on many things.  On some things, it's not as simple as we are be led to believe from simple examples.  From the [Angular tutorial](http://docs.angularjs.org/tutorial/step_05):

> Because we started using dependency injection and our controller has dependencies, constructing the controller in our tests is a bit more complicated.

And really, who doesn't use dependency injection in any of their Angular code?  But don't worry, it's not much worse.  And really, it makes sense that things would be this way.

The final Mocha code to test our simple controller should look something like this:

```js
  var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

  it('should be available', inject(function($rootScope, $controller) {
    var scope = $rootScope.$new();
    var ctrl = $controller(MyController, {
      $scope: scope
    });
    expect(ctrl).to.not.be.undefined;
  }));
```

A couple of points:

- [`chai` is an assertion library](http://chaijs.com/api/bdd/) that makes a great bdd/should-style assertion available in browser tests.
- `inject()` is made available through the [`angular-mocks.js` file](https://github.com/angular/angular-seed/blob/master/test/lib/angular/angular-mocks.js).  This is available automagically in Jasmine, but in Mocha, you have to include this extra file to get the function.
- `$rootScope` is a scope available to all controllers, so it's not dependent on `ng-controller` references which are in your src, but not your test environment.  From this scope, we create a new scope.
- Initializing `MyController` with the `$controller` function allows us to mock the value of `$scope` in the controller.

## Potential Errors

If you look at the solution above, it should give you the working test of DI that you want.  Here are a few things I worked through when testing my Angular controller...

#### TypeError: 'undefined' is not an object

My controller looked somewhat like this:

```js
function MyController($scope) {
  $scope.$on('$viewContentLoaded', function () {
    // ... stuff when dom in the controller is ready
  });
}
```

And this was the start of my test:

```js
  it('should be available', function() {
    var ctrl = new MyController();
    // ... assertions
  });
```

Ths `$scope.$on()` line couldn't run because `$scope` was simply not injected and undefined.
blah - scope is not there

#### ReferenceError: Can't find variable: expect

In Mocha, you'll need to import an assertion library of your choice.  Otherwise, `expect()` and other assertions will not be available to use.  I prefer Chai for its should-style assertions.  They read as a sentence really well:

```js
    expect(ctrl).to.not.be.undefined;
```
