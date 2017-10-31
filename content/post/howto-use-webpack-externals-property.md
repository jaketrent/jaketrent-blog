---
categories:
- "Code"
comments: true
date: 2017-10-31T07:41:40-06:00
description: "Webpack's externals property indicates code is available in the runtime environment."
draft: false
image: "https://i.imgur.com/lGbxzWr.jpg"
layout: post
metaKeywords: "webpack, webpack externals, cannot resolve module, environment, global library"
tags:
- "webpack"
title: "How to Use Webpack's externals Property"
---

[Webpack's](https://github.com/webpack/webpack) `externals` property indicates code is available in the runtime environment.

<!--more-->

## Cannot Resolve Module

In a recent project, I ran the webpack build and got an error something like:

```text
ERROR in ./~/xmlhttprequest/lib/XMLHttpRequest.js
Module not found: Error: Cannot resolve module 'child_process' in /Users/jaketrent/dev/node_modules/xmlhttprequest/lib
 @ ./~/xmlhttprequest/lib/XMLHttpRequest.js 15:12-36

ERROR in ./~/xmlhttprequest/lib/XMLHttpRequest.js
Module not found: Error: Cannot resolve module 'fs' in /Users/jaketrent/dev/node_modules/xmlhttprequest/lib
 @ ./~/xmlhttprequest/lib/XMLHttpRequest.js 16:9-22
```

Running an `npm ls` and finding the dependency that was requiring `XMLHttpRequest`, I found:

```text
 d3@4.11.0
 ...
 ├─┬ d3-request@1.0.6
 │ ├── d3-collection@1.0.4 deduped
 │ ├── d3-dispatch@1.0.3 deduped
 │ ├── d3-dsv@1.0.7 deduped
 │ └── xmlhttprequest@1.8.0
```

D3 has a helper package that has a `xmlhttprequest` dependency.  That's odd.  Hasn't XHR been in browsers for years?

## Adjusting Webpack

Webpack is reading these modules' dependency graphs and bundling the code for us.  That is awesome, but in this case it couldn't find it.  But it doesn't seem like it should need to find this particular code.  

This code should be available in the browser environment -- and it is.  We just need to tell Webpack about it.

That's what Webpack's `externals` is for.  This is a collection of variables that Webpack is not going to try and bundle into your code.  Instead, you're going to tell Webpack where to find it in the host environment.

In our case, we can simply point Webpack to `window.XMLHttpRequest` for the desired `xmlhttprequest` package.  We create a key-value mapping for that pair inside our `webpack.config.js`:

```
externals: [
  {
    xmlhttprequest: 'XMLHttpRequest'
  }
]
```

There are [other options](https://webpack.js.org/configuration/externals/), like arrays, objects, and functions, for specifying where to find code.

In this case as a string, `'XMLHttpRequest'`, indicates that is the name on the global object (`window`) where `xmlhttprequest`-equivalent code will be found.

So if Webpack can't find a module and you know it should be in the host environment, add it to `externals`.  You don't need to include it in your bundle anyway.

What are some other cool ways that you use `externals`?

