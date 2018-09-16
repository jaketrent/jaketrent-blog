---
layout: post
title: "Access Model in Ember View"
date: "2013-07-01"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "ember"
description: Ember views are used for event handling and creating web components.  To make them useful, model data has to make it in and out.
metaKeywords: ember model, ember view, ember, js, javascript
draft: false
image: https://i.imgur.com/RGKiJ0n.jpg 
---

Ember Views are used for event handling and creating reusable web components.  To make them useful and interesting, model data needs to make it into and out of the view.  Here is an example of how this works.

<!--more-->

## Define Your View

In our example, I'm making a simple dice rolling game.  I want to use a view to represent the die on the screen and to handle the roll event.  Your custom view must simply extend `Ember.View` in `die-view.coffee`:

```coffeescript
App.DieView = Ember.View.extend
  templateName: 'die'
```

This is about the simplest view definition we could make.  We'll make it a bit cooler later.  For now, the view just knows where to get its markup.  The `die` template can be any valid template.  Ember, by default, uses Handlebars templates.  I prefer [Emblem](http://emblemjs.com/) templates, such as this `die.emblem` file:

```haml
li.die = die
```

This template will simply print the `die` object in an `li` with class of `die`.  (There are an unusual number of 'die' references are in this example.  This is for purely entertainment reasons, nothing more nefarious. :)

## Render Data in Ember View Template

Next, you need to get your Ember View referenced in your template markup.  In [Emblem](http://emblemjs.com/syntax/), to reference a view, start the line with a capital letter, specifically the name of your view.  In this view, I list the dice in my game controller `rolling` array and render each die in the `DieView` in `dice.emblem`:

```haml
ul.dice
  each die in this.rolling
    App.DieView
```

Using this code, the parent template `dice.emblem` passes the `die` variable to the `DieView`, where its child template, `die.emblem` renders `die` data.

## Pass Data Into Ember View

To pass the `die` data from `dice.emblem` into the `DieView` to be used programatically, however, you need an extra attribute.  Change `dice.emblem`, adding `contentBinding`:

```haml
ul.dice
  each die in this.rolling
    App.DieView contentBinding="die"
```

Now you can access the `die` data via a special Ember View variable named `content`.  Why might you want to get to this data programatically in the view code?...

## Passing Data from Ember View to Controller

You might want to pass it somewhere else.  Remember, Ember Views are meant to take primitive UI events and translate them into semantic events, meaningful to your application.  For example, our view might want to translate a die element `click` on the DOM into a `roll` event in the application.  We made the modification to `dice.emblem` to pass the data in.  Now, let's send it to the controller like this:

```coffeescript
App.DieView = Ember.View.extend
  templateName: 'die'

  click: (evt) ->
    @get('controller').send 'roll', @get 'content'
```

We retrieve the `content` variable (holding the `die`), and send it to the controller in scope as a roll event.  The controller now must implement a `roll` function.  Let's say we have a game controller.  That code might look like this in `game-ctrl.coffee`:

```coffeescript
App.GameController = Ember.ObjectController.extend

  roll: (die) ->
    # roll die and advance game accordingly
```

If the controller doesn't implement this function, the current Ember Route may implement it in its `events` object.  If neither the controller or the route implement it, an exception is thrown.

In this way, Ember Views show their worth in collecting events and translating them to meaningful verbs that we can act upon in our application.  They become reusable, allowing us to bind different content to them on different occassions.  Do Ember Views help you in this way?  Is there a better way?
