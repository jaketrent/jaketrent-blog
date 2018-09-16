---
categories:
- "Code"
comments: true
date: 2017-08-09T07:35:38-06:00
description: "The ecosystem that CSSNext lives within can be confusing to navigate.  Here's how I see the pieces fitting together."
draft: false
image: "https://i.imgur.com/PDoTnoH.jpg"
layout: post
metaKeywords: "postcss, cssnext, what is in cssnext, autoprexifer"
tags:
- "cssnext"
- "postcss"
title: "What is CSSNext?"
---

The ecosystem that CSSNext lives within can be confusing to name and navigate.  Here's how I see the pieces fitting together.

<!--more-->

## PostCSS

Before we get to CSSNext, let's visit [PostCSS](https://github.com/postcss/postcss).  PostCSS provides transform functions for CSS.  These functions are written in JavaScript.  PostCSS can assemble one or more of these transform functions into a transformation pipeline for your CSS.

Generally PostCSS is adding or changing the functionality of vanilla CSS, usually to make it do something cooler and newer than before. 

PostCSS doesn't contain any transforms itself.  Rather it is a platform for running plugins that you assemble.  In this way, it's like [Babel](http://babeljs.io/), which won't transform JavaScript until you add plugins and presets.

PostCSS can be compared to a preprocessor like Sass or LESS.

## CSSNext

[CSSNext](http://cssnext.io/) is a plugin to PostCSS.  More precisely, it's called `postcss-cssnext`, prefixed with `postss-*` as most PostCSS plugins are.  The library used to be called `cssnext`, but it was renamed to `postcss-cssnext`.  It's still sometimes referred to as "CSSNext".

Going back to the Babel analogy, CSSNext is similar in a couple ways:

CSSNext is like the `babel-preset-stage-*` presets in that it is anticipating the eventual adoption and implementation of new CSS specs by the browsers.  These specs haven't been fully implemented today, so CSSNext allows us to use them in our source CSS, compiling them down to browser-ready CSS through PostCSS.

CSSNext gathers togther many `postcss-*` plugins, each supporting some single new CSS spec feature.  In this way, it's like a Babel preset, or collection of plugins.  The [dependency list](https://github.com/MoOx/postcss-cssnext/blob/master/package.json#L23) should give you a nice view of what it includes.  Another [rundown of features](http://cssnext.io/features/) is on their website.

## What to Call It?

So what do you call your source code?  You're writing CSS using future features via CSSNext.  It's processed via PostCSS.  The file extensions are still usually just `*.css`.  I've just been calling it "CSSNext", as in, "I'm writing CSSNext", or "the styles are  in CSSNext".  

When referring to the tech stack of a project, I'll sometimes say, "It's built on PostCSS".  This is ambiguous and sometimes assumes a lot, since a pipeline of PostCSS plugins could provide all sorts of varied functionality.

What do you call these things?  And how do you frame what PostCSS and CSSNext are in your mind?
