---
layout: post
title: "Ember Parent Templates"
date: "2013-05-29"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "ember"
  - "handlebars"
  - "emblem"
description: Ember's convention of template hierarchy is very specific.  Learn it once, and you'll know it every time.
metaKeywords: js, coffeescript, javascript, ember, emblem, handlebars, template hierarchy, parent template
draft: false
image: https://i.imgur.com/x5HT4FN.jpg
---

[Ember](http://emberjs.com)'s convention of template hierarchy is very specific.  Learn it once, and you'll know it every time.

<!--more-->

**Note:** Code examples use [Emblem](http://emblemjs.com/) templates and [CoffeeScript](http://coffeescript.org).  Vanilla Handlebars and JavaScript would work just as well.

## Outlets

Ember templates make use of a special helper called `outlet`.  You can have one main, unnamed outlet or many named outlets.  The main thing to remember is that a child template will always render inside its parent's outlet -- so always put outlets in templates that have children.

## Application Template

There is a top-most template that all of your templates will render inside of.  This is called the application template.  It is specified in one of two ways.  If you are including your templates as script tags, simply create a script tag that doesn't have a `data-template-name` or `id` attribute, a la:

```html
<script type="x-emblem">
  h1 My Application
  == outlet
</script>
```

If you are [precompiling your Ember templates](/post/precompile-ember-templates), which you should, you have a directory for templates.  You will put your file, called `application.emblem` in the root of that directory.  The contents of `templates/application.emblem` would be the same:

```jade
h1 My Application
== outlet
```

## Route Templates

If you have a top-level route, it will have a top-level template.  Your route's template will have only the application template as its parent.  So, your about route:

```coffeescript
App.Router.map ->
  @route 'about'
```

Will have an about template at `templates/about.emblem` and you could define a route as `AboutRoute`.  It will render inside of `application.emblem`'s outlet.

## Resource Templates

Resources are interesting because you can nest other routes inside them.  Nesting routes will also result in nesting templates.  If I defined a `league` resource with a nested route for creating new leagues, it might look something like this:

```coffeescript
App.Router.map ->
  @resouce 'league', ->
    @route 'new'
```

There are two leaf routes (and thus templates) that are created here:

- `LeagueIndexRoute`, which uses `templates/league/index.emblem`
- `LeagueNewRoute`, which uses `templates/league/new.emblem`

Note that you create a `league` directory inside your `templates` directory for nesting these templates.  Precompiled templates will be created at:

- `Ember.TEMPLATES["league/index"]`
- `Ember.TEMPLATES["league/new"]`

If you wanted to use the `linkTo` helper in a template to link to these routes, you would use this syntax:

```jade
linkTo 'league.index' | List Leagues
linkTo 'league.new' | New League
```

And now as far as templates, there is *one more* that we're missing.  There is a root league template that these two league leaf templates render inside of.  It should live at `templates/league.emblem`.  This template would be useful for showing UI elements that are common to all league resource things.  In the case where there is no such need, this template will probably only contain a single outlet:

```jade
== outlet
```

So the final template hierarchy for `league.new`, for example, is `application.emblem > league.emblem > league/new.emblem`.

There is a bit of a chatter on the Githubs about whether the root resource template is good form or not.  As in, why would you create a file that contains nothing but an empty outlet?  Couldn't the framework infer that if it was missing?

## Children Need All Parents

Create all parents in your template chain, from the application template to the leaves.  The worst thing that can happen if you don't is that nothing will render at all, and no error messages will be displayed (pretty bad and unhelpful).

Most of the time, Ember will try to be helpful and give you a console warning:

> WARNING: The immediate parent route ('a') did not render into the main outlet and the default 'into' option ('p') may not be expected

In other words: You're trying to render a child template that either doesn't have a parent template it needs or the parent template does not specify a main outlet.
