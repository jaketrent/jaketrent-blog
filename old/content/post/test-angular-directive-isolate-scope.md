---
layout: post
title: "Test Angular Directive With Isolate Scope"
date: "2013-08-21"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "jasmine"
  - "angularjs"
description: Directives with isolate scope do not inherit their scope from their parent.  Thus, the pattern to test them is slightly different.
draft: false
image: https://i.imgur.com/wVBKD.png
---

Directives with isolate scope do not inherit their scope from their parent.  Thus, the pattern to test them is slightly different.

<!--more-->

When testing a directive, you'll often want to setup some fixture element to attach your directive to.  This will act as the DOM that you will compile with scope.  At that point, the variables that you attached to scope will be available within the directive under test.

For example, if I had a directive called `AccountList` with isolate scope:

```coffeescript
angular.module('app').directive 'AccountList', ->
  restrict: 'EA'
  replace: true
  scope:
    accounts: '='
  # etc ...
```

Then I would setup my test something like this:

```coffeescript
describe 'AccountList', ->

  elm = null

  beforeEach inject ($rootScope, $compile) ->
    accounts = []
    for num in [1..5]
      accounts.push createFakeAccount()
    $rootScope.accounts = accounts

    elm = angular.element """
      <account-list accounts="accounts"></account-list>
    """

    e = $compile(elm)($rootScope)
    e.scope().$digest()

  # actual specs, using elm ...
```

A few points:

- `inject()` comes from `angular-mock`.  It is currently only supported in Jasmine.
- Before each test of the `AccountList` directive, a set of 5 accounts will be put in scope so the directive, presumably, has something to display.
- `$rootScope` is going to be the only scope that you can get to easily from your tests.  You can attach variables to it directly as above or call `$rootScope.$new()` to generate a new scope if you'd like.
- We initially `$compile` the fixture element, passing in `$rootScope`.
- To get Angular to actually act internally on the variables that we've passed into the directive and put them on scope, we must call the important line of code: `e.scope().$digest()`.

Now you should be ready to rock and roll with your tests.  Isolate scopes can be tricky.  Testing them, a bit tricky as well.

Do you know a better way?
