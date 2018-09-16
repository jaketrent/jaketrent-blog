---
categories:
- "Code"
comments: true
date: 2017-07-06T07:22:05-06:00
description: "A long dependency list in a Node project is part of the philosophy."
draft: false
image: "https://i.imgur.com/qTlbn7f.jpg"
layout: post
metaKeywords: "dependencies list long, npm for everything, small packages, npm publish, nodejs, npm"
tags:
- "nodejs"
- "npm"
title: "Lots of Node Dependencies"
---

A long dependency list in a Node project is part of the philosophy.

<!--more-->

## Different Stacks

There are different tech stacks for different folks.  Much of code is art, and there are so many ways that people prefer to experience art.  I've heard people who are unused to Node look at a Node codebase and marvel at the length of the dependency list.  Or I've heard people marvel at the thousands of packages that exist in NPM and exclaim that no tech stack could possibly use all that.  Well, maybe not.  But they're there, and dependency lists often get long quickly in a Node project.  

## Generally Small

There are some really small libraries on npm.  Famously, [left-pad](https://www.npmjs.com/package/left-pad) is one such example.  A small library is not unusual or undesired in the Node ecosystem.  Value can be shared, even in small doses.  It's easier and faster to get to the point of publishing something when it's small.

Small libraries are easy to reason about.  You can grasp and use the API surface area quickly.  

Granular dependencies means you get more of exactly what you need and less cruft that you don't.

You can [change faster](/post/speed-small-solutions/) with small solutions.

Small libraries are easier to keep cohesive and avoid becoming sprawling swiss army knives.

## Working Together

Because many libraries in Nodeland are small, they need to work together.  Small bits working together for a greater, interesting purpose has roots in Unix philosophy, where tools act in much the same way.

Because there are bits that can be combined in more than one way, the potential uses of these compositions multiply.  

The tools remain generally useful in more situations for longer periods of time.

## Some Tradeoffs

There are some tradeoffs to working with lots of small dependencies.  You simply have more dependencies to track.  You have to keep many versions updated.  You often have to provide your own glue code.  Sometimes composing very different packages is awkward or feels forced.  Sometimes it's harder to find what you want in a sea of options.  And probably more.

What do you think?  Do you enjoy an ecosystem of small dependencies?  What are the up or downsides that you see?


