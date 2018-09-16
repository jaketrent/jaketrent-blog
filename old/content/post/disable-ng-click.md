---
layout: post
title: "Disable ngClick"
date: "2013-08-14"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "angularjs"
description: ngClicks can go on anything.  Your program might require that they be disabled at certain points.  Here's an easy directive to help.
draft: false
image: https://i.imgur.com/wVBKD.png
---

Angular's ngClicks can be attached to anything.  This makes it easy to add interactivity to elements on the DOM.  Your program might require that these click callbacks be disabled at certain points, such as during form processing.  ngClick doesn't have a toggle built in.  Let's build one that might help.

<!--more-->

In our app we're going to track the state of the UI via various events that get passed in scope.  We slap our directive as an attribute on an element and it will respond by disabling or enabling on certain events.  Here's the directive:

```coffeescript
angular.module('app.directives').directive 'disableToggle', ->
  restrict: 'A'
  replace: false
  link: (scope, element, attrs) ->
    defaultDisableEvt = 'click:disable'
    defaultEnableEvt = 'click:enable'

    disableEvt = attrs.disableEvt || defaultDisableEvt
    enableEvt = attrs.enableEvt || defaultEnableEvt

    disableEvts = disableEvt.split(/\ *?,\ *?/)
    enableEvts = enableEvt.split(/\ *?,\ *?/)

    for evt in disableEvts
      scope.$on evt, (evt) ->
        element.attr 'disabled', 'disabled'
        element.addClass 'is-disabled'
        scope.disabledToggled = true

    for evt in enableEvts
      scope.$on evt, (evt) ->
        element.removeAttr 'disabled'
        element.removeClass 'is-disabled'
        scope.disabledToggled = false
```

The directive allows for listening on multiple events.  This is useful if your button should be disabled/enabled via multiple events.  Just separate your event list with commas.  If you don't want to specify any events, the directive uses two default events, 'click:disable' and 'click:enable'.

The directive sets the `disabled` attribute, commonly used in form fields.  It also sets the `is-disabled` class so your app can style this state consistently in the UI.

Lastly, the directive also sets a `scope.disabledToggled` variable on the scope of the element.  This will be useful for elements which are not form elements and which do not prevent clicking just because their `disabled` attribute is set to `disabled`.  Instead, we'll use this value to short-circuit the `ng-click` event itself.

So here it is in action on the template:

```html
  <button ng-click="disabledToggled || doClickyThings()"
          disable-toggle enable-evt="click:enable,photo:clear" disable-evt="photo:add">Click Me</button>
```

Here, we're setting custom events for disabling and enabling the button.  And note the `ng-click` value.  The `doClickyThings()` function will not get called if `disabledToggled` is true.

So, what do you think.  Is there an easier way to get this kind of functionality?  What could we do to make it better?
