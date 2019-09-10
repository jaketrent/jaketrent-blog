---
categories:
  - "Code"
comments: true
date: 2019-09-06T06:50:04-07:00
description: "Having to support IE has a cost. Here's some of what more we could do with out it."
draft: false
image: "https://i.imgur.com/RB5crjw.jpg"
layout: post
metaKeywords: "ie support, cost of ie, drop ie, internet explorer, end of life internet explorer"
tags:
  - "internet-explorer"
  - "browsers"
title: "What We Could Do Without Internet Explorer"
---

I think the cost of supporting Internet Explorer matters. Here are some things we could do if we didn't have IE to support.

<!--more-->

## Why still support it

I work for a company and on a product that is fantastic by many standards. But this is not one of its shining points: we still support IE. I write code to make our product work within IE. I am precluded from writing code that IE can't handle. It pulls us down and keeps us from a greater potential.

Our company still supports IE because people who pay us money still use it. I think there is a good list of reasons for these _users_ of IE not to use it.  This is not that list.  This is more of a musing list of things that I as an application developer could accomplish for my users if they did not use IE and/or we decided not to support it.  This is not a conclusive list, by far. It's simply the things that occur to me.

## Problems at every stage

In general, supporting IE matters because of the problems it creates at every stage of the product lifecycle.

**It limits user expectations**. Potential users of our web-based application have less trust and lower standards as to what a web app from us can and will be because of the dirty window to the web that they're viewing it through.

**It limits what we design**.  Our UX designers, on purpose and sometimes through practiced habit of hitting a glass ceiling, will create with constraint and mental boundaries far within what the state of the art browser technology could actually allow us.

**It leads to slower development cycles**, where complicated solutions are often required as workarounds, additional testing on non-standard browsers is required, and there's generally more to do.

**IE users are negatively impacted**.  One, because of the archaic browser they use.  Two, because we ship with larger bundle sizes and lesser performance.

**It leads to additional bugs** because of the extra complexity in the codebase and prolonged time in development. And troubleshooting these bugs with terrible IE dev tools means problems are resolved slower and sometimes not at all.


## Specific things we could support

In addition to these systemic problems that IE brings, and that we could be rid of by dropping support, here are some of the other specific things we could support without Internet Explorer:

- [Native Promise](https://caniuse.com/#search=promise) - no polyfills, smaller bundles, basic control flow these days
- [CSS Grid](https://caniuse.com/#feat=css-grid) - flexible and reliable layouts, support mobile, creative experiences
- [CSS Variables](https://caniuse.com/#feat=css-variables) - native vars, lightweight theming solution, remove preprocessor
- [Service Workers](https://caniuse.com/#feat=serviceworkers) - support offline, network performance control
- [Native Modules](https://caniuse.com/#feat=es6-module) - share native modules, simplify imports, better support for code splitting
- [Array methods](https://caniuse.com/#feat=array-includes) - and all the other JavaScript language additions, more expressive, understandable, no polyfills

## And more

When you support IE, you run into things that are possible but that you can't support often.  You bow your head and look for lesser solutions -- or abandon features entirely.  You've tried to forget these painful experiences.  But the next time you run into this, comment here.  What are you having a hard time delivering because of IE 11 support?

