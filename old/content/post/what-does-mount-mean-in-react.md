---
categories:
- "Code"
comments: true
date: 2017-04-27T07:36:41-06:00
description: "In React, mount means the moment when your Component is inserted into the DOM."
draft: false
image: "https://i.imgur.com/0dHFUCG.jpg"
layout: post
metaKeywords: "js, react, dom, insert, mount, unmount, what does mount mean in react"
tags:
- "js"
- "react"
title: "The Meaning of \"Mount\" in React"
---

In React, "mount" means the moment when your Component is inserted into the DOM.  Well, what does that mean?...

<!--more-->

## The Circle of Components

In React the main abstraction are Components.  A component represents an element in the UI.  Components exist in memory -- they're virtual.  React maintains a virtual DOM in memory.  You can't see this virtual DOM.  But at one point, the React library will decide to make each Component visible in the real DOM.  The moment at which a Component is inserted into the real DOM is called "mount".

The Component instance will also remain in memory.  React will maintain it and make updates to it as the app state changes.  As React detects that the user wants to see these changes reflected in-browser, it will flush changes out again to the real DOM.  This is called an "update".

And the Component will live until React, in its mercy, lets it rest from its work.  When it has given its all and it's time to come home, React will destroy the real DOM element and the Component representation is no longer in the browser view.  This moment is called "unmount".  After React has mourned the loss of its own, it will also destruct the in-memory Component instance.

## Component Hooks, Arg!

To help the developer through this cycle of mount and unmount, React has provided some lifecycle hooks on for a `React.Component`.  The hooks are methods that you can implement on your Component definition that will be called at certain times during the lifecycle.  It's an opportunity for a developer to make the Component do something interesting.

Around the "mount" event, you can implement these hooks:

- `constructor` - called *before* mount; optional; place to initialize component state
- `componentWillMount` - called *before* mount; optional; use `constructor` instead, unless server-rendering
- `render` - called *during* mount; required; returns Component contents to be mounted
- `componentDidMount` - called *after* mount; optional; allows access to real DOM element from within Component

And around the "unmount" event, there is this hook:

- `componentWillUnmount` - called *before* unmount; optional; allows for cleanup of anything going on in-memory or in DOM before your Component's day of work has passed; affectionately, the "Component eulogy"

And just like that, you've dealt with the momentous moment of mount.  You've look React in the eye, and it blinked.

What other mysteries of mount have you uncovered?  Anything else that you've found useful to know or ways you think about it?
