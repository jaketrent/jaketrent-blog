---
categories:
- "Code"
comments: true
date: 2017-09-27T06:57:21-06:00
description: "A way to deploy multiple packages in Lerna monorepo to Heroku."
draft: false
image: "https://i.imgur.com/9B8AnzM.jpg"
layout: post
metaKeywords: "lerna, heroku, multiple buildpacks, deploy lerna, heroku monorepo"
tags:
- "lerna"
- "heroku"
- "js"
title: "Deploy Lerna Packages to Heroku"
---

A way to deploy multiple packages in Lerna monorepo to Heroku.

<!--more-->

## Lerna Packages

[Lerna](https://lernajs.io/) is a project that allows you to manage multiple JavaScript projects in a a single monorepo.

The packages are stored in a `packages/` directory.  For our purposes, let's say that we have this directory structure with 2 projects:

```
.
└── packages
    ├── api
    └── worker
```

Each of the separate projects' files are all within `api` or `worker` project subdirectories.

## Heroku Requirements

By default, Heroku has the expectation that your project's metadata (ie, `package.json`) and how to run it (ie, `Procfile`) are going to be in the root directory of the git repo.  With Lerna, this is not a workable expectation because we need to handle _multiple_ projects in a single repo.

## Setup Heroku App

But we'll get there. Let's start with the basic step of first setting up our Heroku application.  You'd do this step for each project you want to deploy.  For us, let's follow the example of just the `api` project.  Start with:

```bash
cd packages/api && heroku create myproject-api
```

## Monorepo Buildpack

In Heroku, how a project builds is controlled by a buildpack.  Luckily for us there are a couple buildpacks that others have built to support the monorepo/Lerna scenario.  

The one that works best for me is [heroku-buildpack-select-subdir](https://elements.heroku.com/buildpacks/pagedraw/heroku-buildpack-select-subdir).  Set it as the buildpack on your `api` project:

```bash
heroku buildpacks:set -a myproject-api https://github.com/Pagedraw/heroku-buildpack-select-subdir
```

This buildpack allows Heroku to discover a project nested in a monorepo.

## Per-project Buildpack

But we still need a buildpack to tell that nested _project_ how to build.  For instance, we have `api` which is a Node.js project.  We need to set the buildpack for it to know how to install a runtime and pull down dependencies.

We can set the buildpack on the `api` project so that the parent `select-subdir` buildpack knows how to use it by running this command:

```bash
heroku config:add BUILDPACK='packages/api=https://github.com/heroku/heroku-buildpack-nodejs#v83' -a myproject-api
```

## Setup Git Remote

Now the buildpacks are setup, and we're getting ready to push our code to a Heroku git remote.  Unfortunately, because of our monorepo layout, when we ran `heroku create`, we didn't get a Heroku git remote setup for us automatically as we usually do.  So we need to set that up ourselves:

```bash
heroku git:remote -a myproject-api
```

## Push Code as Normal

Now we're all set.  We should be able to push our `api` code as we'd expect to in another codebase.  But in this case, we're doing it in style in a multi-project monorepo using Lerna:

```bash
git push heroku master
```

How do you handle deploying your Lerna monorepo projects?
