---
layout: post
title: "Broccoli Ember Emblem"
date: "2014-05-30"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "broccoli"
  - "ember"
  - "emblem"
description: Make broccoli compile your emblem templates so they're ready for your ember app.
metaKeywords: js, ember, emblem, handlebars, broccoli
draft: false
image: https://i.imgur.com/85v8PQP.png
---

Make broccoli compile your emblem templates so they're ready for your ember app.

<!--more-->

## The Libraries

[Broccoli](https://www.npmjs.org/package/broccoli) builds your assets quickly.  It makes heavy use of caching so it only has to rebuild affected subtrees when files change.  [Emblem](http://emblemjs.com/) is a significant whitespace version of [Handlebars](http://handlebarsjs.com/) templates, similar in style to [Slim](http://slim-lang.com/) or [Jade](http://jade-lang.com/).  [Ember](http://emberjs.com/) is a MVC framework for building browser apps.

Put them all together, and you have something that will help you compile your templates quickly for your browser app.  The [broccoli-ember-emblem](https://github.com/jaketrent/broccoli-ember-emblem) plugin for Broccoli will do just that.

## Install

To use the library, you'll need broccoli installed first.  Then, you'll install the plugin via npm:

```
npm install --save-dev broccoli-ember-emblem
```

## Usage

You'll setup the plugin in your app's `Brocfile.js`.  That setup might look something like this:

```js
var emblem = require('broccoli-ember-emblem')
var mergeTrees = require('broccoli-merge-trees')
var pickFiles = require('broccoli-static-compiler')

function preprocess (tree) {
  tree = emblem(tree, {
    stripPathFromName: 'tmpl/'
  })
  return tree
}

var tmplTree = 'client/tmpl'
tmplTree = pickFiles(tmplTree, {
  srcDir: '/',
  destDir: '/tmpl'
})
tmplTree = preprocess(tmplTree)

module.exports = mergeTrees([ /* other trees, */ tmplTree ])
```

Note a few things:

- I'm using another plugin, `broccoli-static-compiler` to move files around in the broccoli build directories.  This is to be able to identify separate trees that both use similar file filters (eg, *.js for both src scripts and templates).
- I'm using the one option for the `broccoli-ember-emblem` plugin, `stripPathFromName`, which allows me to remove the path name from the template name in output.  For example, if I have a file at `tmpl/application.emblem`, I want the template name in ember to be `application`, not `tmpl/application`.
- Final output is merged into a single tree via another plugin, `broccoli-merge-trees`.

## Output

Broccoli will take care of finding all of your template files.  It will use directories and filenames as the input for template names.  As a few examples, here is input and output as it might happen in the above configuration:

- File: `client/tmpl/application.emblem` becomes: `Ember.TEMPLATES['application']`
- File: `client/tmpl/components/song.emblem` becomes: `Ember.TEMPLATES['components/song']`

Notice that Ember requires all templates to be registered on the `Ember.TEMPLATES` object.  Later, at app runtime, they are looked up on that object by name.

So, use the plugin and win.  How does your template compilation for Ember/Emblem differ?  What other features do you wish were supported here?

