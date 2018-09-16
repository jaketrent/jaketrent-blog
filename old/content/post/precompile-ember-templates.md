---
layout: post
title: "Precompile Ember Templates"
date: "2013-05-21"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "ember"
  - "handlebars"
  - "emblem"
  - "grunt"
description: When you're working with Ember's Handlebars templates, you're going to want to precompile them for performance reasons.
metaKeywords: js, coffeescript, javascript, ember, emblem, grunt, handlebars, version
draft: false
image: https://i.imgur.com/x5HT4FN.jpg
---

[Ember](http://emberjs.com) makes use of the wonderful [Handlebars](http://handlebarsjs.com) templates.  These templates, in order to be performant, must be precompiled.  Based on the Ember docs, it's not abundantly clear how this is to happen.  Here's a solution that works well.

<!--more-->

## Ember Docs for Precompilation

Every official Ember doc will put templates in a `script` tag with the `type="text/x-handlebars"`.  But this is never how you'd write any serious (-ly awesome) app in production.  [The docs](http://emberjs.com/guides/templates/handlebars-basics/) say:

> "If you are using build tools to manage your application's assets, most will know how to precompile Handlebars templates and make them available to Ember.js."

Which tools?  Why would I want to precompile?  How *are* they made available to Ember?  Read, Ember journeyman, read on...

## Grunt

We'd love for this precompilation to happen previous to the running of your app.  Again, this is in hopes of increased performance.  [Grunt](http://gruntjs.com) is a great little Nodejs-based tool for build-level tasks.

## Emblem

Grunt comes with a variety of plugins.  We're going to use one called [grunt-emblem](https://github.com/wordofchristian/grunt-emblem/).  [Emblem](http://emblemjs.com/) is a fantastic templating syntax layered on top of Handlebars (still a dependency).  Its syntax looks very similar to Haml or Ruby Slim or Jade.  It may well be the most flexible of all of them, and it simplifies some Ember helper syntax very nicely.

## Versions Matching

As I've said before, [matching Ember dependency version can be a pain](/post/match-ember-handlebars-version/).  With precompilation, you have one more dependency to match.  Now not only do you care about the version of Handlebars that Ember uses at runtime, but you care about the version of Handlebars that is used to precompile your templates.  If the precompile Handlebars version doesn't match the runtime Handlebars version, your app will die at runtime.  `grunt-emblem` helps immensely with this.

## grunt-emblem

I haven't found another Handlebars precompile plugin that helps as much as `grunt-emblem`.  It solves the precompile version problem by letting you utilize the actual runtime Handlebars as the precompile Handlebars script.

It is also nice in that it puts the precompiled templates into the collection that Ember expects to find templates in, namely `Ember.TEMPLATES`.  As you can find on the [`grunt-emblem` Github page](https://github.com/wordofchristian/grunt-emblem/), your grunt config will look something like the following:

```coffeescript
matchdep = require 'matchdep'

module.exports = (grunt) ->
  grunt.initConfig

    watch:
      ember_templates:
        files: ['app/views/templates/**/*.emblem']
        tasks: ['emblem', 'livereload']

    emblem:
      compile:
        files:
          "app/static/templates/ember_templates.js": ["app/views/templates/**/*.emblem"]
        options:
          root: "app/views/templates/"
          dependencies:
            jquery: "app/static/js/components/jquery/jquery.js"
            ember: "app/static/js/components/ember/ember.js"
            emblem: "app/static/js/components/emblem/dist/emblem.js"
            handlebars: "app/static/js/components/handlebars/handlebars.js"

  matchdep.filterDev('grunt-*').forEach grunt.loadNpmTasks

  grunt.renameTask 'regarde', 'watch'

  grunt.registerTask 'dev', [ 'livereload-start', 'watch' ]

```

This particular config has a couple other niceties.  Let me enumerate the awesome:

- Line 6 - Not only can we precompile the templates, but we'll precompile on the fly, whenever `.emblem` files are change in the specified directories.
- Line 8 and 14 - We're precompiling `.emblem` templates, but this plugin can do regular Handlebars syntax as well
- Line 16 - `root` is the substring that will be stripped out of your template name.  For instance, you don't want your template to be called `app/views/templates/home`.  Your home route in Ember will want your template called `home`.  `root` to the rescue -- bam!
- Line 17 - These `dependencies` are the libraries that you use at runtime and that Handlebars needs at compile time.  As I said, this plugin simply rocks because of the ability to specify your own Handlebars script.
- Line 23 - Remember how you used to have a whole list of npm tasks registered.  This little beaut will load all `grunt-*` dependencies.
- Line 25 - `regarde` is a cool name, but I understand what `watch` means a bit better. Rename it.

This setup requires the following dependencies:

```
npm install matchdep grunt grunt-regarde grunt-contrib-livereload grunt-emblem --save-dev
```

So now, seriously, go write some Emblem templates.  So fun, so precompiled.
