---
categories:
  - "Code"
comments: true
description: "Screen reader support will get more real with a support plan."
image: "https://i.imgur.com/nuv6Knn.jpg"
layout: post
metaKeywords: "screen reader, support, browser testing, screen reader testing, support docs"
draft: false
tags:
  - "accessibility"
  - "browsers"
title: "Screen Reader Support Plan"
date: "2020-05-04"
---

Screen reader support will get more real with a support plan.

<!--more-->

## Browser Support

Browsers get a support plan.  There's a model for which browsers we'll support.  There are support docs that state our policy.  Users that come to our site know what to expect.  When we file bugs, we know to report the browser in the filing.

Why don't screen readers get this?

## Tool Variability

Just like browsers, there are differences in "rendering" in screen readers.  One is different from the other, and thus we have to keep a mental matrix for how certain features behave in different screen readers. 

Too bad we don't have [Can I Use](https://caniuse.com) for screen readers.

Too bad we don't have free access to all major screen readers.  JAWS...

## Public-Internal Support

If we were to publicly state our support, it would drive internal support.  If we wanted NVDA to always be supported according to a certain user experience design, we'd state the design.  We'd develop against the spec.  We'd test the implementation. 

I don't think I've seen a support page for a web app that states its screen reader support model.  Perhaps if we had the publicly-documented plan, we'd be more serious about supporting screen readers.
