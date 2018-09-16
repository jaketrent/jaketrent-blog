---
categories:
- "Code"
comments: true
date: 2017-07-03T08:12:40-06:00
description: "Here are a couple helpful packages that will help you write better npm-scripts."
draft: false
image: "https://i.imgur.com/oqGZKHY.jpg"
layout: post
metaKeywords: "npm-scripts packages, npm-scripts helpers, cross environment, env vars, multiple processes, remove directories"
tags:
- "js"
- "nodejs"
- "npm"
title: "Some Helpful Packages for NPM Scripts"
---

Here are a couple helpful packages that will help you write better npm-scripts.

<!--more-->

## rimraf

[rimraf](https://www.npmjs.com/package/rimraf) is a package for removing directories.  It is the equivalent of running `rm -rf`.  You could, of course, use this unix command directly in your npm-scripts, but then your windows users would be hosed.

First, install:

```bash
npm instlal rimraf --save-dev
```

Then add the script to your `package.json` that will blow away your `dist` (or other) directory:

```json
{
  "scripts": {
    "clean": "rimraf dist"
  }
}
```

And run with:

```bash
npm run clean
```

Simple, helpful, cross-platform directory removal.  So clean!

## cross-env

And speaking of cross-platform, why does every system have to have its own syntax for setting environment variables?  Never mind that any more!  From within npm-scripts, now you can set them in a consistent way, using [cross-env](https://www.npmjs.com/package/cross-env).

Install:

```bash
npm install cross-env --save-dev
```

Then imagine that we have a need to set the `NODE_ENV` environment variable to `'production'` when we run our `server.js` script.  That script in `package.json` might look like:

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node server"
  }
}
```

You can have multiple of these space-separated `key=value` pairs before your command.

## concurrently

Finally!, here's package that is good at forking children.  With this package you can use one npm-scripts target to run multiple things at once.  The package is called [concurrently](https://www.npmjs.com/package/concurrently). Let's say you want to simultaneously run a webpack build process, generating some static output, *and* spin up a simple http service to serve that static output directory.

Let's install our helper package:

```bash
npm install concurrently --save-dev
```

Then update our `package.json`:

```json

{
  "scripts": {
    "start": "concurrently \"webpack --watch\" \"http-server dist\"",
  }
}
```

Note the escaped use of the `\"` quotes inside the script.  Also note that these other utilities must be installed dependencies as well.  We can run as many processes as we need, separated by spaces, surround by quotes.

These are a few of my favorite utility helpers that are generally useful in writing npm-scripts.  What are some of your favorite packages to use when writing npm-scripts?


