---
categories:
- "Code"
comments: true
date: 2017-09-12T07:32:18-06:00
description: "What writing JavaScript looks like for a modern web developer."
draft: false
image: "https://i.imgur.com/rwFGM5z.jpg"
layout: post
metaKeywords: ""
tags:
- "js"
- "frontend"
title: "Modern Frontend Dev: Writing JavaScript"
---

What writing JavaScript looks like for a modern web developer.

<!--more-->

I'll assume, for a moment that I'm that modern web developer.  Hopefully my profile is modern and webby enough.  We'll use my own experiences as a hopefully informative prototype of what writing JS in the modern web can look like.

## Bet on JavaScript

I like Eich, and I subscribe to the "always bet on JavaScript" mantra.  JavaScript is being shown to be a solid choice for building rich Internet apps.  The language and browser engines to run it are quite fast these days.  The language is pleasant and productive to write in.

JavaScript is in so many places!  Your skills are widely applicable, and you can build a variety of things if you're good at this language.  

## Using ES Next

I use Babel on almost all my projects, except for some Node projects.  We're in the middle of ES2017 right now.  This and last year's feature adds were a bit lack luster.  ES2015 of yore was an amazing leap.  We have some interesting features yet to come.  

These days I'm recovering stage-0-er.  Now I'm a reformed stage-2-er.

There are so many, but my favorite feature to come out of ES2015 is the module system.  It's a basic feature.  In most programming languages, modules are just assumed to be a thing.  With modules now in JavaScript, we can create better code abstractions and trace explicit dependencies.  Tooling gets better too.  I love that modules for JavaScript are coming to more places, including the browser.

A feature yet to come, object spread, is hopefully one you've been using for a while via Babel.  It's currently a stage-3 feature.  In the data manipulation that our code is largely about, it is very useful!  Its effects are possible via `Object.assign` today in all browsers but IE 11 and Konqueror. But the spread operator is more expressive and lends my mind to better solutions.

## Harnessing Npm

A package manager is a program that allows you to easily and consistently share and access 3rd party code. The Web's original "package manager" was code addressable by a URL that was loaded into a script tag and had code attached to the global object.

Today, to accommodate an increased number of app dependencies and code bundling, local package managers are common.  I use Npm for essentially all Web and Node projects.  I have avoided the Yarn train and have only sometimes wished for the feature set there.

## Preferring a Library

Today there are so many good library and framework options for organizing your frontend apps and gaining efficiencies there.  On the whole, they're all viable, so we're really down to developer preference when it comes to choosing one.

I reach for React.  It has a great mental model which has [changed the way I code UIs](/post/repainting-my-mind-with-react/).  It has great abstractions that support many use cases, and I feel productive in it.

## Trying Tools

Because I'm writing code in ES Next, I need some compilation tools.  I use Babel.  When bundling, I use Webpack, but I'm trying to avoid it when I can.  There's a lot of power there, but it can be over- and mis-used.

I'm not an avid linter.  Some rules are sometimes helpful.  But I don't miss them a lot when they're gone.

I'm a huge fan of using [Prettier to format your code](/post/format-javascript-with-prettier/).  It helps you keep your mind on the task at hand an not have to take "breaks" to think about formatting.

I'm using flowtype on a few projects, mostly where the domain model is complex or will expand.  It helps make me more sure about refactors.

## Just a Snapshot

Of course, what is here today can be gone tomorrow in a JavaScript frontend world.  So here are some observations about my current JavaScript writing mode.  Tomorrow I may write another article.  

What is your JavaScript writing experience currently as a modern, possibly-mustached frontend dev?
