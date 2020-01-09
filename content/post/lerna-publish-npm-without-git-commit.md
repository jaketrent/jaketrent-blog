---
categories:
  - "Code"
comments: true
description: "A lerna command to publish to npm without pushing to github."
image: "https://i.imgur.com/P7rCQHw.jpg"
layout: post
metaKeywords: "lerna, npm, lerna publish, npm version missing"
draft: false
tags:
  - "lerna"
  - "npm"
title: "Lerna Publish to NPM Without a Git Commit"
date: "2020-01-09"
---

If you need to publish a [Lerna](https://github.com/lerna/lerna)-managed packaged to npm without commit and pushing to Github, here's a way.

<!--more-->

## Lerna Versions

Weird things seem to happen infrequently enough with Lerna that they always leave me wondering what happened and at a loss as to the resolution.  Most of the time, Lerna does a great job handling monorepo package versions, automatically keeping everything in sync.  

## Package Version Missing in NPM

But when it doesn't, builds break, I check npm and it doesn't have the version of packages that exist in src, yet Lerna doesn't see that it has anything to publish.  At those moments, I wonder why.

## Lerna Command to NPM Publish

Without necessarily knowing why, it might happen again.  But, for now, I can resolve the matter with a simple command:

```
lerna publish --force-publish=myFullNpmPackageName --no-git-tag-version --no-push
```

Anyone have alternate solutions for this scenario?

