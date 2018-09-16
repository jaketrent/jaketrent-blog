---
layout: post
title: "Depending on a Shared Lib"
date: "2016-05-04"
comments: true
categories:
  - "Code"
tags:
  - "design"
description: You're building a project that depends on a shared lib.  How will you evolve?
metaKeywords: shared lib, dependencies, autonomy, independence, teams, open source
draft: false
image: https://i.imgur.com/6TDbI7O.png
---

You build a product.  Someone else builds a shared lib.  You want to use the shared lib in your app for its apparent utility.  There come _new_ features that the product team wants to adjust and add to your product.  The shared lib provides utility that is _related_ to these new features but does not provide these new features per se.

<!--more-->

## Wishing the Shared Lib Did More
You think to yourself, "I wish this shared lib did this for me too."  

You might even go further to start adjusting your expectations and timeline around the shared lib. "I might just _wait_ until the shared lib does this for me.  It's already doing stuff in this area.  It should do it the related stuff too."  

After all, you have a lot of other stuff you'd rather do.

## The Feature I Need
If you wait, you may get lucky and get what you want.  Or, by the nature of the lib being shared, other constituents of the shared lib may have their own sway on it, pushing it in a direction that doesn't match the feature you need.   Or, the designer of the shared lib might not _want_ to add in the new features that are expedient for your product, thinking them ill-fitting of the shared lib.

## Independence to Move
You're already waiting, and you say, "Let's give the shared lib _more_ to do."  This seems like an equation for waiting more and shipping less.  You're putting your product in the hands of someone else.  That someone else may mean well, and you may trust him to eventually deliver on what you want in your product.  But you are reducing your independence by simply relying on the shared lib and its author.  

You're already waiting.  There's probably a reason for that.  What makes you think that if you continue _or increase_ reliance on this lib that you'll be waiting _less_ in the future?  In practice, many shared libs have simply less manpower than full product teams.  

Is it possible for you to affect the development timeline by your own effort and contribution to the shared lib?  If you're willing and have time to contribute to the shared lib, why not use that time and effort to further the needs of your specific product?  If you're not willing, then you really shouldn't be picky about what you get and when you get it, right?

## Owning Your Product
In the end you own and ship a product.  End users don't care if you use this shared lib.  You can get the job done many ways.  A shared lib that solves some of your problems isn't on the hook to solve all your future problems.  It's _your_ project.  Owning it is a mindset:  "I'm going to ship this thing as well and as quickly as I can.  I'll do what I can to gather helpful resources, such shared libs, and ask for help in order to make this happen.  But in the end, I'll make it work one way or another."
