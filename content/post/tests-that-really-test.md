---
categories:
  - "Code"
comments: true
description: "Tests that actually exercise the system will provide value."
image: "https://i.imgur.com/t92euc5.jpg"
layout: post
metaKeywords: "tests, integration tests, acceptance tests, no mocks"
draft: false
tags:
  - "testing"
title: "Tests That Really Test"
date: "2020-04-17"
---

Tests that actually exercise the system will provide value.

<!--more-->

## Any Type

There's often discussion about which *type* of tests one should be writing: unit, integration or functional, etc.  But I think this point matters less than other things. It matters much more *what* our test is actually testing.

It might feel like we must *always* be testing our source code when we write a spec, but it's surprisingly easy to have holes in our tests.  Or it's easy to start testing a 3rd-party dependency, or the testing framework itself, or to just be creating coverage that gives a false sense of security.

## Avoid Mocks

This last point, I think, is one of the reasons that some have said to do more integration and functional testing compared to unit testing.  Unit testing is often the easiest and first type of test that we as devs reach for. But boundaries for a unit test can sometimes turn out to be hard to control.  Unit tests, by definition, are usually independent of 3rd-party libs or the network or the database.  But our code interacts with those systems, so we often start [faking](/post/sinon-spies-vs-stubs/) those parts with mocks or stubs.

But mocks should make us pause. We are faking something and making it unreal. We're programming in test how our code must respond.  It doesn't have a choice. We *made* true in test. The problem with that is we are often wrong, and this truth we fabricated might not be what really happens in production. So the test that "exercises" our source code hasn't really uncovered what will happen or asserted accurately about what will happen in a production environment. 

## Approach Production

So instead of mocking, which creates a synthetic reality, we should want to make our tests as production-like as possible. They should be true to life and avoid assumptions or synthetic truths. Get the actual truth from the system! This is often a harder test to make -- it'll often integrate systems, require more complicated test environments or be slower or harder to even implement in test. Often these tests are also brittle. In my experience this is mostly because of the complicated test environment (like the real world, also complicated and brittle). 

But tests that go further, avoid mocks and actually test things will be worth more when they assert what our code *really* does. When this kind of test runs, we can really have increased confidence, instead of having that sinking feeling that we've probably skimmed over something important.

