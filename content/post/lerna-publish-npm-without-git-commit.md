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

## Version to Publish

Then Lerna will start chugging through its publish sequence.  It'll ask you questions about the package you're publishing as well as dependencies.  You don't want to bump the version (or at least I don't in this case), so I select "Custom Version" at the prompt and re-enter the current version.

When it gets through all the questions and starts the PUT requests to npm for the updated packages, the package that was missing in npm will be uploaded successfully.  However, the dependent packages, which may have (hopefully) already been published properly to npm will fail with 403, saying that you can't re-publish the same package version.  This is to be expected.

## Fallback: Publish, Commit, Push

I've had trouble with this in the case that Lerna decides to publish the dependent packages first.  In such a case, I've found that I can't get around bumping the version on the package and git committing, and run:

```
lerna publish --force-publish=myFullNpmPackageName --message "build: publish"
```

## Fallback: Publish it All

Oh boy, and once you've cleaned up more than one of these packages, you may have had enough.  For the full smash, force publish everything:

```
lerna publish --force-publish=* --message "build: publish"
```

Anyone have alternate solutions for this scenario?

