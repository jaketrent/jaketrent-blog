---
layout: post
title: "Bower Resolutions"
date: "2014-05-29"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "bower"
description: Sometimes there are different versions that bower packages rely on.  You can save your resolution choices in bower.json
metaKeywords: js, bower, bower.json, resolutions
draft: false
image: https://i.imgur.com/t4XxrHn.jpg
---

When you specify dependencies for you app via Bower, some of the packages might rely on different versions of the same library.  You will have to resolve what version of libraries your app actually wants.  In other words, you break the tie.  But you don't want to break it every time, so save your choice.

<!--more-->

## bower.json Resolutions

When you run `bower install`, the resolution process is interactive.  When bower recognizes that there are two packages that depend on a package at different versions, it'll list all those versions and ask:

```
Unable to find a suitable version for ember, please choose one:
    1) ember#~1.0.0 which resolved to 1.0.1 and is required by ember-data#0.0.14
    2) ember#1.5.1 which resolved to 1.5.1 and is required by melodrama
```

In this case, the library in question is ember.  I can press the number `2` and bower will install the 2nd option, `ember#1.5.1`.

The next line in the prompt is very handy.  It reads:

```
Prefix the choice with ! to persist it to bower.json
```

Awesome! So, if I type `!2` instead, my choice is saved in `bower.json`.  Specifically, it'll add a `resolutions` entry:

```js
"resolutions": {
  "ember": "1.5.1"
}
```

Now, the next time you run `bower install`, there is no interactive question of what version I want because I've already resolved that `ember` for my app should be version `1.5.1`.

## Bonus: Heroku install

Not only do you save your brain from having to remember what version you want in your app, you save your fingers the added stress of typing numbers.  And as a bonus, you also make `bower install` possible for automated processes.  For instance, if you want to run `bower install` in a Heroku deploy of a Node app, you can add a postinstall script for npm in your `package.json`:

```js
{
  "scripts": {
    "postinstall": "./node_modules/bower/bin/bower install"
  },
  "dependencies": {
    "bower": "~1.3.3"
  }
}
```

Now you should be able to push to heroku, have npm install, then have bower install.  Because you've recorded your resolutions choices, the process can work automatically on heroku without prompts.
