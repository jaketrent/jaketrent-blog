---
categories:
  - "Code"
comments: true
description: "Run the Madge utility to discover your circular dependencies"
image: "https://i.imgur.com/ki1vpQH.jpg"
layout: post
metaKeywords: "madge, javascript, cirular dependencies"
draft: false
tags:
  - "js"
title: "Find Circular Dependencies in JavaScript"
date: "2019-11-21"
---

Finding circular dependencies can help you avoid troublesome errors.  Find them with this helpful tool, Madge.

<!--more-->

## Definition of a circular dependency

A circular dependency is a clothes dryer that spins and never stops.  

An ES module might `import` another module that `import`s right back to itself.  

If you have a module `a.js` that depends on a module `b.js` that depends on module `a.js`, where does it stop?

```javascript
// a.js
import { b } from './b.js'

// b.js
import { a } from './a.js'
```

It doesn't.  You have a circular dependency.

## Find circular dependencies

You can detect circular dependencies with your eyes you're sharp and troll through your code looking for them.  But we're usually solving problems, not looking for the ones we inadvertantly make in our dependency graphs. Then we ship, get weird errors and wonder where they came from.  

There's a nice tool you can run to determine if you have circular dependencies:

```bash
npx madge --circular myAppEntryPoint.js
```

The tool is [Madge](https://github.com/pahen/madge).  

You app entry point is the point from which all dependencies can be traced.

`npx` is just a binary runner that comes with Node and allows you to temporarily use the utility without permanent install.  

Madge does other things too, but this time it's running `--circular`, looking for those kinds of dependencies.

If you have any, you'll get a report like this:

```bash
$ npx madge --circular a.js

npx: installed 149 in 7.135s                                                                                                                            
Processed 2 files (75ms) (0 warnings)                                                                                                                

✖ Found 1 circular dependency!
1) a.js > b.js 
```

You have the files pinpointed to check out.  Go there and remove the circular dependencies.  It's madge-ic!
