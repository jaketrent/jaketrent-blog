---
categories:
- "Code"
comments: true
date: 2017-05-02T07:21:17-06:00
description: "Simplify your Babel setup by not manually tracking plugins.  Use a target browser strategy instead."
draft: false
image: "https://i.imgur.com/Ji3sVsi.jpg"
layout: post
metaKeywords: "js, babel, transpile, autoprefixer, babelrc, preset, plugin, simple"
tags:
- "js"
- "babel"
title: "Simplify Your Babel Setup with babel-preset-env"
---

Simplify your [babel](https://babeljs.io/) setup by not manually tracking plugins.  Use a target browser strategy instead.

<!--more-->

## Most Plugins Target Features

Babel helps you transpile your source JavaScript, written with the latest language doodads, into the usually-older JavaScript that your browser will actually understand.  Often, when setting up this transpilation, you're looking at the cool new language features that you want to use, and then you add those to your babel config in `.babelrc`:

```json
{ "plugins": ["transform-es2015-arrow-functions"] }
```

If you start using a new feature, you change your config to match.  If you stop using a feature, you need to remember to remove the cruft in your babel config.  There's a lot of work for you to do, tracking features in your app.

## babel-preset-env Targets Browsers

What's something else that you could target that changes much less frequently?  Your app's target browsers -- only those you support.  This is what (`babel-preset-env`)[https://github.com/babel/babel-preset-env] does:

```bash
npm install babel-preset-env --save-dev
```

And in `.babelrc`, add:

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions"]
      }
    }]
  ]
}
```

You can specify your target browsers in any combination that [browserlist](https://github.com/ai/browserslist) syntax supports.  In this way, it takes the same wonderful strategy that [autoprefixer](https://github.com/postcss/autoprefixer) takes for CSS.

Some browsers have some new JavaScript features implemented for your native use.  Other browsers don't.  To know what browser supports what, the babel preset pulls in compatibility information from [compat-table](https://kangax.github.io/compat-table/es6/).  Then it takes the lowest common denominator browser that you choose to support and includes all the plugins needed for Babel to transpile your code to an older style JavaScript that browser will understand.

If you turn on the preset's `debug` flag:

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions"]
      },
      "debug": true
    }]
  ]
}
```

...you can see the list of plugins used and the reasons (ie, target browsers) for using them:

```bash
Using plugins:
  check-es2015-constants {"edge":13,"firefox":49,"ie":10,"ios":9,"safari":9}
  transform-es2015-arrow-functions {"ie":10,"ios":9,"safari":9}
  transform-es2015-block-scoped-functions {"ie":10,"ios":9,"safari":9}
  transform-es2015-block-scoping {"edge":13,"firefox":49,"ie":10,"ios":9,"safari":9}
  transform-es2015-classes {"ie":10,"ios":9,"safari":9}
  transform-es2015-computed-properties {"ie":10}
  transform-es2015-destructuring {"edge":13,"firefox":49,"ie":10,"ios":9,"safari":9}
  ... moar! ...
```

A lot, right!  You could manage your own plugins or presets (eg, `es2015`), but that will requires moar management.  Targeting the browsers, as features move through language stages and are implemented in browsers, you can drop or add the required transforms automatically.  As browsers release more versions, you can upgrade to the new compat-table for free.

## Plugins Still Required

Some other babel plugins will still be required if you use language features that are not officially part of the JavaScript language yet.  If [compat-table](https://kangax.github.io/compat-table/es6/) has no info on any browser supporting the feature, the `babel-preset-env` preset is not going to transpile that for you.  

A classic example would be use of stage-1/2/3 features.  If you use those, keep `babel-preset-stage-1` (or 2 or 3) in you babel config.  You'll still need it.

Are there other things you've done to simplify your babel setup?
