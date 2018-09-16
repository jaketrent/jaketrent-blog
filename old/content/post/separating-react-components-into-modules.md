---
categories:
- "Code"
comments: true
date: 2017-09-18T07:08:58-06:00
description: "Reasons for separating a React component into its own module."
draft: false
image: "https://i.imgur.com/sYZn5fh.jpg"
layout: post
metaKeywords: "react, separate component into module, many modules, component per file"
tags:
- "js"
- "react"
title: "Separating React Components Into Modules"
---

Reasons for separating a React component into its own module.

<!--more-->

## It's an Art

So much in decision-making depends on context.  Separating modules, just like painting a picture, is an art because there's no single best way to accomplish good modularization.  Here are some of the things that I think about -- sometimes at length and sometimes in snap judgements -- when trying to get my components modularized nicely.

## To Keep Single Responsibility

The biggest reason to create a new module, component or not, in my opinion, is to allow the module to contain only a single responsibility.  

A module with a single responsibility enables code readability. You more easily know if what you're looking at is appropriate for required refactors or bug fixes.

A single responsibility enables cleaner refactors in the future.  Locating bugs is simplified because there's a place for everything and everything's in its place.  Thus once the nature of the bug is known, the likely location of its creation is known.

Defining what the "single responsibility" can be tricky and artful.

## To Slim Modules Down

If you have a large module, you may want to break bits of it into a separate module.  Take care that you're not breaking things up just to hide the actual size and complexity. It is more likely, if you find a large module in your codebase, that you've actually accumulated multiple responsibilities in that module and should be breaking it up to separate those responsibilities.

Design more focused single responsibilities for modules.  Define other modules' responsibilities as composing other modules into aggregate tasks.

Wait until module separation feels more natural. Trying to fit large, complex problems into a small file can lead one to create module boundaries that are artificial, unhelpful, need to be crossed often, and create more work than before.

## To Enable Testing

Your module's public API greatly influences how easy or hard your component is to test.  Module boundaries influence how APIs are written.  Draw boundaries and create APIs into them that allow for simple developer use and simple testing.

Favor module boundaries that enable black box testing, where the implementation of the subject under test can be ignored and where only inputs and outputs are asserted.

## To Reuse

Perhaps you want to generalize a component that it can be reused in several different contexts.  You might draw together similar abstractions that you've created across your app into a single new module file and generalize it.  Now it is a single abstraction that can be utilized in all those similar places.  Having a central module that could be imported using the module system enables this reuse.

## To Share

A step further in the reuse spectrum is sharing externally.  If you are preparing to share a component, say to npm, then creating an independent module can be helpful.  You are forced to draw component boundaries that are more defined when you separate a module.  Creating this clearer definition preps your code for the moment when you want to extract the module from the codebase entirely.  The only thing you'll be left to refactor in your app are import paths.

## To Manage Dependencies

Some parts of your code might have dependencies on odd 3rd-party code.  You might want to localize and isolate the code that utilizes those connections.  A module also allows you a wrapper layer where you can define your own API into this odd functionality.

Creating a module can also help you break circular dependencies in your code so that you can linearly reference a new, 3rd module.

Those are some of the things I think about when separating a component module.  What are some of your personal considerations when separting a module?
