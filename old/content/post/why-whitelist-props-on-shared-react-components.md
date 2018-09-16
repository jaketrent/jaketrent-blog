---
categories:
- "Code"
comments: true
date: 2018-01-11T11:46:46-07:00
description: "Some reasons around why we whitelist props on our shared React components."
draft: false
image: "https://i.imgur.com/b1z0lDT.jpg"
layout: post
metaKeywords: "react, components, component api design, whitelist props, blacklist props"
tags:
- "react"
- "js"
title: "Why Whitelist Props on Shared React Components"
---

Some reasons around why we whitelist props on our shared React components.

<!--more-->

## Whitelist What?

In a project I'm on, we're building reusable, shareable React components as a part of a [design system](http://design-system.pluralsight.com/). 

Obviously, each of these components has a public API, accessible via props.  Most of these props are purpose-made for the particular component.  These are not the props I'm referring to when I talk about whitelisting props.  I'm referring to the _other_, more miscellaneous props.

Other props that might be whitelisted are those props that are often not part of the purpose-built API.  Instead, they might feel like native things or props that "all" components should accept.  For example: `title`, `className`, or `style` -- things that might be from the HTML spec.

A final clarification: whitelist is used in this case in opposition to blacklist.  Whitelist is listing those props that we _will_ accept as opposed to those we _won't_.

## Narrow Paths to Override

One of the reasons that we want to limit the ways that props can flow into a component is that the components are meant to be consumed as-is.  We usually don't want the components to be changed.  We want consistency.  These components are part of a design system, after all.

That being said, we do realize that our reusable components will not cover _every_ situation that our users want to cover.  So we create a few, simple avenues for customization (which in our case is mostly for changes to look and feel).  This means usually simply exposing `style` and `className` props.

## Explicit Support

Whitelisting, as opposed to blacklisting or just wildcard letting everything in (`{...props}`), is better at showing what we explicitly support.

We write out what we will maintain, what we write tests around, and what we will fix bugs for. Our explicitly-typed out props become documentation about the API.  

## Not Easy to Take Away Features

If we just let any/all props into our component, where does that end?  How do you close the floodgates on that?  It's a lot easier to offer new features later than take away implicit features later.

## Encourage Good Practices

By typing out the props that we support and make possible, we can encourage use of those things by bringing them to mind and advancing what we believe are good practices.

## Client Use is Made Visible

When we whitelist the props that our components will accept, we know exactly how teams are using our components.  Or at least we know how they're _not_ using our components, because we've made certain things impossible.

## Make Non-breaking Changes

We can then change things without breaking unsuspecting clients.  Allowing all props into our components, via `{...props}`, is an almost infinite interface.  If I change anything that affects a prop, it's probably a breaking change.

## Keep Components Lean

Our product is still in active development, and it's meant to support a limited domain.  We have a picture of what it should do and support.  

To that end, we only want to add support for what is needed.  It should do that well and no more.

## Easier to Read

When props are explicitly listed inside a component, it's easier to read the internals.  You can see the prop trail.  You can see subcomponents or elements that are affected by props.  It's grep'able.  `{...props}` is impossibly vauge.  You don't know what's going to be there until runtime.  How do you support that?  It feels like shipping with an already-voided warranty.

But there is _more_ to read.  Whitelisting might be safer and more specific, but there is more code to read.  Sometimes the code solutions look less elegant by being more explicit.

What do you think?  Is there a case for whitelisting miscellaneous props to your component?  Can you think of other reasons in favor of whitelisting?  Or are there other tradeoffs that you'd choose?
