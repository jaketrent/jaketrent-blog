---
categories:
- "Leadership"
comments: true
date: 2017-08-12T07:23:26-06:00
description: "Your knowledge of a field is deeper when you're focused on it."
draft: false
image: "https://i.imgur.com/EnDsQ5V.jpg"
layout: post
metaKeywords: "specialization, specialized developers, separation of concern, one thing well, focus, separation of responsibility"
tags:
- "specialization"
title: "Deeper Focus"
---

Your knowledge of a field is deeper when you're focused on it.

<!--more-->

## Your Surroundings 

Stop wherever you are and consider your surroundings.  Look around, making note of things you see.  Do this for 30 seconds.  Then close your eyes and list all the red items that you saw.  

Actors sometimes use this exercise to get into the zone and focus on their surroundings. 

Imagine your increased perception of the red things around you if instead of just making note of "things", you were asked to take note of "red things".

## Deeper Abstractions

When making a program, it's composed of functional units called abstractions.  Some are general and high level.  They might be composed of more specific, low-level abstractions.  

The higher-level abstractions might have cursory knowledge of some of the subjects handled by the deeper abstractions inside of them.  For instance, they have to know how to invoke them.  They know of public APIs.  But they don't know the implementation details, and this is on purpose, so that you only have to consider those details when you peek inside that deeper abstraction.  Otherwise, you can trust that it's doing its job well.

## Separation of Concern

Our brains are very good at categorization.  They have to be.  We encounter hoards of new information each day.  What do we do with it all?  We rarely can use it at the moment, but some things we take mental note of, considering their potential utility.  We slap a mental label on it and file it away for recall when we are more engrossed in that subject.

We do this to survive mentally.  As in the "red things" awareness exercise, how much more effective in filing would we be if we knew we could disregard more streams of data coming into our minds and focus on those that really mattered?

## Single Responsibility

When we create a boundary around an abstraction in code, we often strive to follow the single responsibility principle.  If this bit of code does _one_ thing, it'll do it well.  If it does one thing, when I examine it, I know what to expect.  If I change its inner content, I will effect that abstraction and it _only_.

Imagine if your own focus was deepened.  What would you go deeper in?  At what cost?  At what gain?
