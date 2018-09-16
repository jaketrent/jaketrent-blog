---
layout: post
title: "ngStyle Background"
date: "2013-06-19"
comments: true
categories:
  - "Code"
tags:
  - "angularjs"
  - "js"
  - "css"
description: ngStyle is used to set inline style attributes with AngularJs.  Using the background style is slightly tricky here.
metaKeywords: angular, angularjs, background, background-image, ngstyle, ng-style
draft: false
image: https://i.imgur.com/wVBKD.png
---

`ngStyle` is the directive used to set inline style attributes with AngularJs.  Most of the time, it's straightforward to use.  `background` css attributes can be just slightly trickier.

<!--more-->

## ngStyle Objects

The `ngStyle` directive requires an object for input.  The object key is the css attribute name.  The resultant value for the key is the value of the css attribute.

`ngStyle` is obviously used to set dynamic styles, because static styles are more easily and efficient set using the standard html `style` attribute.

## A Dynamic Style Example

So let's setup a controller that sets a dynamic color based on something as useful as the time.  Useful, right?

```coffeescript
angular.module('colorly').controller 'colorCtrl', ($scope) ->
  $scope.getColor = ->
    if new Date().getTime() % 2 is 0 then "red" else "blue"
```

We could use this `getColor` function in our app:

```haml
html(ng-app="colorly")
  head
    //- ... include Angular, etc
  body(ng-controller="colorly")
    p(ng-style="{ color: getColor() }")
      | The text will be one of two colors
```

## A Background Example

If we have a dynamic value that needs to go in a css `background` or `background-image` attribute, it can be just a bit more tricky to specify.

Let's say we have a `getImage()` function in our controller.  This function returns a string formatted similar to this: `url(icons/pen.png)`.  If we do, the `ngStyle` declaration is specified the exact same way as before:

```haml
ng-style="{ 'background-image': getImage() }"
```

Make sure to put quotes around the `background-image` key name.  Remember, this must be formatted as a valid Javascript object key.

## Another Background Example

That example was easy.  Often, however, you don't have data stored in your models that's formatted like `url(icons/pen.png)`.  Instead you often have a field that represents the image path only.  In this case, you must do some JavaScript inside your `ngStyle` declaration:

```coffeescript
angular.module('colorly').controller 'colorCtrl', ($scope) ->
  $scope.tool =
    name: 'Pen'
    icon: 'icons/pen.png'
```

```haml
ng-style="{ 'background-image': 'url(' + tool.icon + ')' }"
```

Remember that it's just Javascript, and you'll setup the string concatenation to work just fine.
