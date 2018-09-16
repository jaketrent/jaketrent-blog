---
categories:
- "Code"
comments: true
date: 2017-03-14T21:40:34-06:00
description: "Some tips on how to select the proper value for a key attribute in reacSome tips on how to select the proper value for a key attribute in react."
draft: false
image: "https://i.imgur.com/0dHFUCG.jpg"
layout: post
metaKeywords: "js, react, key prop"
tags:
- "js"
- "react"
title: "How to Choose a Key in React"
---

The React prop of `key` is a special attribute that's used by the library to keep track of nodes within a list.  There are a few guidelines that can help in selecting an appropriate `key` value.

<!--more-->

The `key` prop is used in React's diffing algorithm.  This means that when React is trying to determine what has changed before it repaints your UI to the screen, it runs through all components in your UI component tree to determine what has been updated.  The `key` will help React keep track of changes in lists.  If you don't put a `key` on the top-level component you're looping on, you'll get warnings from React reminding you it needs this hint.

## Unique in the List

The `key` should be unique within the universe of the list.  The value of `key` does not need to be unique for any larger universe -- it doesn't even need to be unique on the page.

## No Semantic Meaning

The `key` has no meaning in and of itself.  It simply has to be a unique string value.  So don't worry about the "meaning" of what you put in as a key.  Because it's a unique identifier, often you might use something like an `id`, as in `<MyComponent key={model.id} />`, but you don't have to.

## Stable

The `key` value should be stable.  They `key` had better not change.  This is because React uses the `key` to keep track of nodes between list adds, removes, updates, and reorders.  The same `key` should be assigned to the same component for every render.

This is why using the list array index can be so problematic.  If any of those operations listed above happens to the list, `key` assignment for one or more components will change.  If React loses track of which node was which, the whole list is potentially repainted, making React render very inefficient.  If you're positive that the list is immutable, you can use the array index.

## Surrogate Key

When I haven't had an `id` for a `key`, and the list is potentially mutating, I have even generated a surrogate key for each model in the view so there's a surrogate key on whatever data I'm looping over to render the list.  I have often used the [node-uuid](https://www.npmjs.com/package/node-uuid) package for this.

What other tips do you have for choosing a proper `key` prop?
