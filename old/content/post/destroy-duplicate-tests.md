---
layout: post
title: "Destroy Duplicate Tests"
date: "2014-11-05"
comments: true
categories:
  - "Code"
tags:
  - "tdd"
  - "functional-testing"
  - "unit-testing"
description: Don't write duplicate tests.  If you have duplicates, destroy them.
metaKeywords: testing, tdd, duplicates, test code smells
draft: false
image: https://i.imgur.com/ozzuTNQ.png
---

As soon as we begin to write a test for our code, it is natural for us to think that we are doing a good thing, and often, we are.  Yet, I believe there are times that we’re writing tests when we’re hurting more than helping — and, of course, this is not on purpose.  To clarify, I’m an advocate for testing in general, and this is a short thought on how to make it better.

<!--more-->

As soon as we begin to write a test for our code, it is natural for us to think that we are doing a good thing, and often, we are.  Yet, I believe there are times that we’re writing tests when we’re hurting more than helping — and, of course, this is not on purpose.  To clarify, I’m an advocate for testing in general, and this is a short thought on how to make it better.

## Verify It, and Be Done
One of the main goals of testing is to verify that what you have written is correct.  So, if we’ve met that goal, there’s no need to go around the track one more time and see the checkered flag again.  The second time around produces no extra glory and no extra benefit.

If we cover a section of code many times, it isn’t more helpful than the first time we covered it.  To verify twice isn’t to verify any better.  If the second attempt does happen to verify the same thing in an obviously better way, remove the first attempt and keep the second.  

If it’s a variation of a certain case that you’re verifying, that’s different.  Adding new cases based on slight permutations of previous cases can be a good thing.  But covering the exact same thing provides no value.  In fact, multiple verification of code is just a type of debt.  It should be a smell in your test code that alerts you to clean things up.  

## The Debt of Duplicate Tests
If you have multiples of something, it just increases the maintenance over time.  Why would you want to update two tests instead of one?  Now that you have duplicate tests, you also have to keep them in sync.  Of course, if they cover the exact same case, if you change source code to fix the one test, the other will still be broken and be apparent and easy to fix.

The more tests you have, the longer your feedback loop in development or in a continuous build environment will be.  Multiply that extra wait time across your life on the project, and it has the possibility of being a non-trivial product.  Of course we need to wait for the tests that are needful and provide added value, but we shouldn’t wait needlessly.

Sometimes you do see duplicate tests within the same file — for instance, within the same unit.  This might happen when different developers approach the unit at different times to add tests.  

I think it’s probably more often the case that duplicate tests are found across test classes -- meaning across the different types of tests.  For instance, a developer might write a unit test that covers a case.  Later, someone else might add an integration test that adds the same case.  Later still, someone else might add a functional test that adds the same case yet again.  All these developers are well-intentioned in adding tests.  They all need to think, communicate, investigate, and coordinate a little more to avoid the duplicate test problem.

## Deleting Duplicate Tests
When duplicate tests are found, we should delete them.  Again, this might require some thinking.  We might want to consider which of the duplicate cases is the best test and therefore the one to keep.  This consideration might include which test is most stable, runs the fastest, is most readable, best designed, latest, earliest, etc.

## Avoiding Duplicate Tests
The best scenario would be the one where we avoid duplicate tests.  Teams with clear guidelines will be able to coordinate better.  Useful information might include which classes of tests exist in the project and what each is intended for.  We might describe which kinds of tests we prefer, in which order, for certain kinds of verifications.  Having clean, well-organized tests will also encourage the team to read each others’ tests and familiarize themselves with what’s already written and know where to find existing cases and where to properly categorize new cases.

So have fun testing, and destroy the duplicate tests!  Yay for test doubles, but boo for double tests.
