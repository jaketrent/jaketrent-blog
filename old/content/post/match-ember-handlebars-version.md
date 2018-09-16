---
layout: post
title: "Match Ember and Handlebars Versions"
date: "2013-05-21"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "ember"
  - "handlebars"
description: Specific versions of Ember require specific versions of Handlebars.  Here's a way to help them match.
metaKeywords: js, coffeescript, javascript, ember, handlebars, version
draft: false
image: https://i.imgur.com/x5HT4FN.jpg
---

[Ember](http://emberjs.com) is very specific about what version of [Handlebars](http://handlebarsjs.com) it requires.  This is probably good, but it's also a pain to work with as different versions of the two libraries are released independently.  There are a few good tools to help us out.

<!--more-->

## Released Independently

In a prime example, recently there was a new version of Handlebars released: `1.0.0-rc.4`.  Ember happens to be on version `1.0.0-rc.3`.  That version has a hard dependency on Handlebars `1.0.0-rc.3`.  In other words, the latest Ember code relies on an older version of Handlebars.

## Bower

If you include these 3rd party libraries in your source code under a `lib` directory or something of that nature, you *always* have plenty of work to do.  Naturally, you just copy in the exact versions of the scripts that are needed.

Hopefully you're trying to make use of a mostly awesome tool, [Bower](http://bower.io).  It helps you manage these 3rd party libraries in a way similar to npm.  You provide a descriptor of your project's dependencies, `component.json`.  And you install things similarly via the `bower` cli.

## Specify a Bower Version

If I run:

```
bower install handlebars --save
```

It saves a dependency in my `components.json` for Handlebars for the latest version it could find.  This won't do for us.  We need to specify the versions.

Our strategy will be: take the latest version of Ember and then specifically match the Handlbars version.  Finally, we should type:

```
bower install ember --save
bower install handlebars#1.0.0-rc.3
```

As of this writing, that is the version of handlebars that is required.  Bower will recognize any semver git tag name or branch name after the hash `#` sign.

I like our version strategy for a project that is under active development in that it keeps us on the latest Ember.  But, if you're on a project that's been built to an Ember version and not deployed for a long time, you may want to make a very specific dependency out of Ember as well, so the two are guaranteed in sync for future deploys.
