---
categories:
- "Code"
comments: true
date: 2017-09-04T21:14:32-06:00
description: "It's important to have a single glamor instance on the page."
draft: false
image: "https://i.imgur.com/XS7SIQi.jpg"
layout: post
metaKeywords: "css-in-js, glamor, glamorous, multiple glamor instances, server-side glamor"
tags:
- "css"
- "css-in-js"
- "glamor"
title: "Single Glamor Instance"
---

It's important to have a single glamor instance on the page.

<!--more-->

## The Rule

The rule: Have one instance of [glamor](https://github.com/threepointone/glamor) on the page at a time.

How important is this rule?  Very important.  You can have a couple issues if you have more than one instance of glamor on the page.

## In Browser

In the browser, I've seen this fantastic little error:

> [glamor] an unexpected rule cache miss occurred. This is probably a sign of multiple glamor instances in your app. See https://github.com/threepointone/glamor/issues/79

Everything seemed like it was ok, but I got this error.  Turns out that I had two packages that were being included in my browser bundle that had `glamor` listed in their `package.json` `dependencies`.  That is a no-no. It will lead to rules existing in a different glamor instance, being unfindable by the other instance.

The solution?  Put `glamor` in just *one* `package.json` `dependencies` list, preferrably in the parent/top-most list.

## On Server

On the server, I've seen bad behavior when ignoring this rule.  Recently, I was doing server-side glamor via:

```js
import { renderStatic } from 'glamor/server'

const { html, css, ids } = renderStatic(() => ReactDOM.renderToString(<App />))
```

Using this method, `css` is supposed to contain all your style selectors.  ...But there were never any selectors! `renderStatic` finds all your calls to `glamor.css()` and reduces the css selectors in this collection.  You can see where this is going, right?

Turns out the problem was the same.  I was using shared modules that had a `glamor` dependency, and the server module had a `glamor` dependency.  Arg, will I ever learn?

The solution? Put `glamor` in the parent `package.json`, run the process from the parent, and all selectors are found and generated.

The lesson?  Have a single glamor instance on the page, in your bundle, or in your Node runtime.

What other glamor lessons have you learned?
