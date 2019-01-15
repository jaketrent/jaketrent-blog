---
categories:
  - "Code"
comments: true
description: "How to track your JavaScript app or lib bundle size."
image: "https://i.imgur.com/BFBMhTS.jpg"
layout: post
metaKeywords: "es module size, track bundle size, javascript size, size of my bundle, size performance"
draft: false
tags:
  - "javascript"
title: "Monitor JavaScript Bundle Size"
date: "2019-01-14"
---

At some point, you may realize that all those packages you're conveniently npm installing are actually causing quite the bloat in your library or your application.  Here are some tools that will help you monitor that and find where the size is coming from.

<!--more-->

I recently discovered this tool called [Size Limit](https://github.com/ai/size-limit).  It's my favorite of its kind so far.  It will alert you once the size of your bundle gets over a certain threshold size (think CI integration).  It uses webpack.

## Install Size Limit

To try it out, first install:

```
npm install size-limit --save-dev
```

## Config

Then open `package.json` for the package you're wanting to test and define the threshold that is the upper limit for how high you're willing to let the file size of your total JavaScript get.  Also include the `path` to your built app's entry point:

```json
{
  "size-limit: [
    { 
      "path": "dist/index.js",
      "limit": "25 KB"
    }
  ]
}
```

## Get Size Feedback

Then run it with:

```
size-limit
```

You'll get a nice cli report, like:

```
  Package size limit has exceeded by 55.26 KB
  Package size: 80.26 KB
  Size limit:   25 KB
  With all dependencies, minified and gzipped
```

## Get a Detailed Breakdown

Well that's no good.  Where is all that cruft coming from? To get the breakdown in a hard-to-read but useful web ui, you can run:

```
size-limit --why
```

This will utilize the venerable [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) and open a browser window to a localhost server for you, as seen here:

![webpack bundle analyzer ui](https://i.imgur.com/EMGaI6v.png)

From there, you have some insight into what is eating up all that space.  (Probably lame stuff.)  The cool thing about Size Limit is that it uses webpack, like a real consumer app of a lib (I'm building libs) would do, and so it pulls in all the dependencies that are needed for a more real-life bundle.

## A Similar Option

There are other similar tools to this like [bundlesize](https://github.com/siddharthkp/bundlesize).  Its config and usage are nearly identical.  From my usage so far, it seems like the main difference is that it does not use webpack and doesn't include the nice size breakdown ui.

## Analyze 3rd-Party Libs

If you're looking for something that will help you analyze code that's *already* out on NPM, there are some great options.  My favorite so far is called [Bundle Phobia](https://bundlephobia.com).  It's a web ui where you can look up a package by name and then by version.  Once the site has built the requested package, you get a nice breakdown: 

![bundlephobia breakdown](https://i.imgur.com/J7OPUII.png)

And you can see the size per version over time:

![size over time](https://i.imgur.com/jbTQw3A.png)

It's nice because it allows you to analyze already-live code without any configuration.  It's a simple and quick way to get a peak into what a package is made up of.

Again, there are couple similar alternatives here.  [Package Phobia](https://packagephobia.now.sh) is extremely similar in what it offers, minus the breakdown graphic.  And for the cli lovers out there, there's [Cost of modules](https://github.com/siddharthkp/cost-of-modules) util.

How do you monitor the size of your bundles effectively?  Why do you do it?  Any great utils?  

