---
categories:
- "Leadership"
comments: true
date: 2017-09-09T17:44:33-06:00
description: "The first and most important step is to make it work."
draft: false
image: "https://i.imgur.com/XBLdI68.jpg"
layout: post
metaKeywords: "premature optimization, work, fast, beautiful, polishing"
tags:
- "optimization"
title: "Make it Work"
---

The first and most important step is to make it work.

<!--more-->

## Works or Bust

What kind of a product do you have if it simply doesn't work?  You don't.  You really have nothing.  It doesn't work.

If you have something that works, there is at least _potential_ value being delivered.  You can test it.  You can get feedback.  You can iterate.  You can use it.

## Optimization is More That Perf

We have a tendency to want to have things be just so.  We want the perfect solution [before we ship anything](/post/continuously-not-delivering/).  We want to create the perfect code abstractions so everything's neatly tucked away where it should be.  We worry about our code practices and end up blog-crawling when we could be creating.  We wonder if our product will scale when it becomes popular, even before we've scaled to a single user on a single product.  We want to make sure we try this, that, and the other, so we integrate all tech of interest.  We have a deploy pipeline for a team of 20 even though we're the solo developer. 

Our tendencies toward premature optimization are many and all-to-natural.  It takes effort to realize that it's important to make it work first.

## A Potential Priority

Many years ago at a conference I remember hearing the steps of: 

1. First, make it work
2. Then make it pretty
3. Then make it fast

I think this works as a pretty good order to quickly remember.

## Later Optimization Signposts

It is so easy to be distracted by "pretty" or "fast" while you're just trying to make it work.  Instead we want to maintain our flow.  Efficient progress toward the objective of getting it working is our goal.

To this end, I like to drop little signposts in the code that signal to later-me that I had a thought about potential improvements.  Something like:

```txt
// TODO: figure out a better way to do this -- count children, determine placement of divider
```

Once the product or chunk of code works, make time to come back and finish these partial thoughts about improvements you saw that could be made.  This helps focus on getting it to work in the first place and keeping context about what could be improved on when inspiration struck.

What do you do to keep your priorities straight when coding?  Do these general categories match your own priorities?
