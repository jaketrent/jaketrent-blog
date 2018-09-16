---
layout: post
title: "Grunt-init Exercism.io"
date: "2014-01-03"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "grunt"
description: Exercism.io has great JavaScript exercises that are made better by a better test runner.  Use grunt-init to set up.
metaKeywords: grunt, grunt-init, exercism, jasmine_node, watch, js, javascript
draft: false
image: https://i.imgur.com/4773D.jpg
---

[Exercism.io](http://exercism.io) has a great set of JavaScript exercises.  They could be made better by a better test setup and runner.  I've created a small grunt-init template to help in that setup.

<!--more-->

## Exercism.io

For those unfamiliar, [Excercism.io](http://exercism.io) is a great tool that helps coders and potential coders learn and expand their knowledge in several programming languages.  Currently, among the 9 language choices, JavaScript is one.  The JavaScript exercises come with a pre-built [jasmine_node](https://github.com/mhevery/jasmine-node) test suite.  The point of the exercise is to write code that will make all the corresponding tests pass.  For more on Excercism.io, see my [review](/post/exercism-review/).

## Vanilla jasmine_node

As the [Exercism JavaScript docs](http://exercism.io/help/setup/javascript) indicate, you can setup your JavaScript environment like this:

```bash
npm install -g jasmine_node
```

And then run your tests like this:

```bash
jasmine_node bob_test.spec.js
```

This does work perfectly well.  But, we want something more.  Of course.

## Grunt watch

We want the test suite to re-run as soon as we make a change and save either our test file or our file under test.  Well, it turns out that [Grunt](http://gruntjs.com) is a great little command-line tool that has plugins for file watching.

Grunt needs to be told to use a plugin.  Then it needs to be told that we want to run the task that watches our files.  All of this is indicated to Grunt via a local `Gruntfile.js` or `Gruntfile.coffee` file.  You could create this file by yourself, but wouldn't it be nice if there was a `Gruntfile.js` created somewhere for you already that worked well with Exercism?

## Grunt-init

It turns out that there is a great, separate utility called [grunt-init](http://gruntjs.com/project-scaffolding) that you can use to create your `Gruntfile.js` (and many other things) with a pre-built template.

To install this tool, run:

```bash
npm install -g grunt-init
```

To use a grunt-init template, you need to have a local copy.  This template copy could live anywhere, but grunt-init can reference these templates purely by name if you put them in `~/.grunt-init/`.

To get the [Exercism grunt-init template](https://github.com/jaketrent/grunt-init-exercism), clone it like so:

```bash
git clone git@github.com:jaketrent/grunt-init-exercism.git ~/.grunt-init/exercism
```

Then change into your specific Exercism directory, init your `Gruntfile.js`, and follow the other commands:

```bash
cd ~/dev/exercism/javascript/bob
grunt-init exercism
npm init
npm install
```

The `npm init` will flush out the rest of the generated `package.json`.  The `npm install` will install all dependencies that we said Grunt needed to do its job.

Finally, activate Grunt to watch your files with:

```bash
grunt watch
```

Now as you write your Exercism code to fulfill tests, you will see the tests get run automatically and become greenlit as your code increases in awesomeness.
