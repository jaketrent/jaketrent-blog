---
categories:
- "Code"
comments: true
date: 2017-10-23T07:53:22-06:00
description: "Don't publish your .babelrc file to npm if you have prebuilt your package."
draft: false
image: "https://i.imgur.com/KsssqjK.jpg"
layout: post
metaKeywords: "npm, babel, babelrc, babelrc on npm"
tags:
- "js"
title: "Don't Publish .bablerc to Npm"
---

Don't publish your `.babelrc` file to npm if you have *pre-built* your package.

<!--more-->

## Publish .babelrc if Compiling Still Required

It's possible that you intend for others to compile the code you publish to npm.  You'd do this if you published your source to npm without precompiling but are using features not included in the target runtime for this code.  In this case, you still want to publish your `.babelrc` file alongside your package code.  In this circumstance, you can probably disregard the rest of this article.

## All Babelrc's Used

In the case where you have already pre-built your code but still have a babel process to build your local app code, you're probably going to have problems if you attempt to use a package that publishes a `.bablerc` file.  This is because your app has its own `.babelrc` file and its own build requirements.  But if you start using a library from npm that has a new `.babelrc` file, that `.babelrc` file is going to be picked up and used by babel as well.

Per the [babel docs](https://babeljs.io/docs/usage/babelrc/#lookup-behavior):

> Babel will look for a .babelrc in the current directory of the file being transpiled. If one does not exist, it will travel up the directory tree until it finds either a .babelrc, or a package.json with a "babel": {} hash within.

## Unknown Plugin

If you start using a package from npm with a `.babelrc` file that you don't anticipate, it probably means that you will not have all the babel plugins or presets installed to deal with building it.

You'll end up with an error like this:

```text
Module build failed: ReferenceError: Unknown plugin "glamorous-displayname" specified in "/Users/legolas/code/mycode/client/node_modules/@pluralsight/ps-design-system-button/.babelrc" at 0, attempted to resolve relative to "/Users/legolas/code/mycode/client/node_modules/@pluralsight/ps-design-system-button"
    at /Users/legolas/code/mycode/client/node_modules/babel-core/lib/transformation/file/options/option-manager.js:180:17
    at Array.map (native)
    at Function.normalisePlugins (/Users/legolas/code/mycode/client/node_modules/babel-core/lib/transformation/file/options/option-manager.js:158:20)
    at OptionManager.mergeOptions (/Users/legolas/code/mycode/client/node_modules/babel-core/lib/transformation/file/options/option-manager.js:234:36)
```

Again, this is a completely avoidable problem in the case that you've already prebuilt and published your compiled code to npm.

## Ignore .babelrc

You want to make sure that your `.babelrc` for your packaged library doesn't make it to npm at all.

To accomplish this, add it to your `.npmignore` file in your project root:

```text
.babelrc
```

The next time you `npm publish` this package, `.bablerc` will not show up in npm, and you will have bypassed this whole issue.

What else do you do to tidy up your prebuilt packages before you publish to npm?
