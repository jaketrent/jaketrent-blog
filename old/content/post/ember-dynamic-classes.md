---
layout: post
title: "Ember Dynamic Classes"
date: "2013-08-02"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "ember"
description: Get your UI to show classes based on the state of your Ember models.
draft: false
image: https://i.imgur.com/85v8PQP.png
---

In Ember, your state is separated from the UI inside models.  But, often you want the state of your models to be represented visually in the UI via dynamic class names.  Make it happen with `Ember.View`s.

<!--more-->

## Use an Ember.View

A view will function as the translation layer between the state of your models and the DOM.  It will provide the logic to observe the properties within your model and expose it as a class name on the associated DOM element.

If I have a model with state:

```coffeescript
App.MyModel = App.Model.extend
  hasSomeState: true
```

## Use classNameBindings

Based on that state, I want to add a `has-some-state` class to the UI if it's true, and remove the class if it's false.  The view might look like:

```coffeescript
App.MyModelView = Ember.View.extend
  # ...
  classNameBindings: ['hasSomeState']
  hasSomeState: (->
    @get('content').get('hasSomeState')
  ).property('content.hasSomeState')
```

The `hasSomeState` function will return a boolean has to whether or not the `has-some-state` class should be added to the element.

## Bind to Model Properties

Now use the view in the template, being careful to match the binding of `content` so the property watching works.  Here in `template-fragment.jade`:

```haml
App.MyModelView contentBinding="this.myModelInstance"
```

In the example, make sure `myModelInstance` is available in the scope of your route/controller.

As your model's `hasSomeState` value is changed internally with the `@set` function, the view will be notified that it needs to re-run the `hasSomeState` function, and the UI will update if needed.

What other methods do you utilize in Ember to get dynamic classes?
