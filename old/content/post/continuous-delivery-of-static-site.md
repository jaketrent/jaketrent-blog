---
layout: post
title: "Continuous Delivery of a Static Site"
date: "2017-02-17T20:28:34-07:00"
comments: true
categories:
  - "Code"
tags:
  - "hugo"
  - "continuous-delivery"
  - "feature-toggles"
description: A story of my migration from Octopress to Hugo static site generator
metaKeywords: hugo, static-site, continuous delivery, feature toggles, main line development, environment variables
draft: false
image: https://i.imgur.com/9BoMtUO.jpg
---

Continuous delivery allows for you to release often what you are always developing.  This is even possible on a static site where we might not be hiding in-development features but content and visual styles.  Here is a strategy for doing that, executing in Hugo.

<!--more-->

## Feature Toggles

Main line development is a joy.  It's often good to avoid the long-lived, meandering paths of feature branches.  In order to stay in the master branch, you need to keep it always ready to deploy.  So anything that's half-baked needs to be committable but not impact the main experience. 

Feature flags generally are able to be turned on/off for all or some users.  Since we don't distinguish between users in a static site via login and since it's static, with all users getting the same content, our feature flag will be on/off for all users at once.

We will be able to turn the flag on when in our development environment.  When we build for our prod environment, we turn it off.  To enable the static content once the feature is totally complete, either toggle on the feature or remove the toggle checks.

## Hugo Environment Variables

In general, environment variables are one of the low-cost ways of implementing feature toggles.  The environment config can be updated without a deploy and feature toggles can go on/off quickly.

In this specific example, we'll look at how we can do this in Hugo.  First, we'll name our flag `FEATURE_BOOK` since we're working on a book-related feature.  Then we'll connect to environment variables using the `getenv` template function:

```
{{ if getenv "FEATURE_BOOK" }}
  Book markup here
{{ end }}
```

And then to turn the feature on, just flip the flag in the environment when running the site:

```
FEATURE_BOOK=true hugo server
```

The book markup that you surrounded with the check will be visible.  Then when you build for prod, assuming the feature should be hidden, don't set the variable:

```
hugo
```

And the book markup will not be included.

## Turning Off Content

One of the biggest parts of a static site is usually the content.  In a site like Hugo, the content is mostly held in collections of markdown files.  There's usually a way, in these kinds of blogging platforms, to mark content as not ready for publishing.  In the case of Hugo, we put this in the markdown front matter:

```
---
draft: true
---
```

If we want to easily toggle all this content on in a dev environment, we can run the dev server with our normal environment variable and the `buildDrafts` flag:

```
FEATURE_BOOK=true hugo server --buildDrafts
```

## Separate Styles

In order to separate the css that we write, we need to be careful.  It would probably be wise to test both the feature toggled on and off states before we deploy, because CSS is notoriously global.  We can affect things we don't expect, even things not covered by our feature flags.

Since `getenv` and templating in general is not available in `.css` files, we might consider splitting out a stylesheet especially for our feature flag.  Then we can surround the import from our template:

```
{{ if getenv "FEATURE_BOOK" }}
  <link rel="stylesheet" href="/css/book-specific.css" />
{{ end }}
```

Have you felt empowered to deploy more freely with your use of feature toggles?  Are there any other continuous delivery devices that you use on your static sites?
