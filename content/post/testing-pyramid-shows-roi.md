---
categories:
  - "Code"
comments: true
description: "The testing pyramid can point out the greatest ROI for our tests."
image: "https://i.imgur.com/kUtoQYK.jpg"
layout: post
metaKeywords: "testing, testing pyramid, prefer integration tests, unit tests"
draft: false
tags:
  - "testing"
title: "The Testing Pyramid Shows ROI"
date: "2020-05-05"
---

The testing pyramid can point out the greatest ROI for our tests.

<!--more-->

## Traditional Testing Pyramid

The testing pyramid is traditionally used to show where we should focus our testing time and effort.  According to it, we should do mostly unit tests because they're cheap, stable and fast.

![testing pyramid](https://i.imgur.com/J2j44dt.png)

[Testing pyramid graphic credit to [Automation Panda](https://automationpanda.com/2018/08/01/the-testing-pyramid/)]

But what if the pyramid is telling us something else? [cue tense music]

## The Opposite Interpretation

If we go big on the bottom part of the pyramid, we're writing a ton of tests.  And has it every felt like it can take a ton of unit tests to really verify your code?  No test is free.  There will be a cost that eats at our profit margins. Those piles of unit tests have their own cost in understanding, maintenance, or even initial investment.

What if the testing pyramid could also really tell us where our best ROI, or return on investment could be?  

For instance, to verify something in unit tests requires writing a *lot* of unit tests.  But to verify something in integration tests takes fewer.  It's possible that higher-order tests, like functional tests, might take even fewer total tests to get the verification we seek.

I'm talking about [tests that really test something](/post/tests-that-really-test/).  Not just tests that make noise and make us happy because we have 400 of them.
 
The pyramid is pointing us to the pointy part -- the part that's thin and not fat. The message sounds worthy:

We can spend more time writing source code and less time plumbing tests if we focus on that part of the pyramid.

Is the pyramid sending you a similar message?
