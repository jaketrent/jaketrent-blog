---
categories:
- "Code"
comments: true
date: 2017-06-02T07:17:28-06:00
description: "Everyone has a different flavor.  Here's how I order the inside of a JavaScript module."
draft: false
image: "https://i.imgur.com/qGY3miJ.jpg"
layout: post
metaKeywords: "js file ordering, import order, function order, javascript require order, module organization"
tags:
- "js"
title: "How I Organize a JavaScript Module"
---

Everyone has a different flavor for this.  Here's how I order the inside of a JavaScript module.

<!--more-->

I believe that order is an important element of consistency.  Consistency allows your codebase to feel organized and more easily navigated.  Things are where you expect them to be.  A coherent ordering strategy in your files isn't going to solve all problems, but it'll be nice for you, future you, and other readers and contributors to your code.

## Imports

Imports are one of the things that I most consistently order.  

### 3 Sections

There are 3 main sections of `import` or `require` statements.  These are separated by a blank line.

1. Optionally, anything required to make the whole module/app work, like config.
2. 3rd-party code, usually in the form of named npm packages.
3. App-level code -- in other words any local imports.

```js
import dotenv from 'dotenv'
dotenv.config()
import { promisify } from 'util'

import 'isomorphic-fetch'
const fs = promisify('fs')
import { Link, Route } from 'react-router'
import React from 'react'

import css from './app.css'
import repo from './repo'
```

### Alpha Order

Within each section, I favor alphabetical order.  No-binding imports come first, then bindings that start with numbers.  Lowercase before uppercase. `React` would come before `ReactDOM`.  Non-JavaScript imports are mixed in (in alpha order) right with the other imports.

### Multiple Bindings on One Line

If bindings are destructured on a single line, I keep the destructure object in alpha order as well.  The first binding in that list will determine where the line should fall in the alpha order of the section.  As a single line's destructured list of imports changes, I may or may not go through the trouble of moving the line.

## Non-function Declarations

Most declarations in a module end up being functions, and most other variable declarations end up inside those functions as local vars.  But if there are any module-scope declarations to be made, they come in the next section, separated by a blank line.  This section, again, is in alpha order within itself by default.  But this is traditionally problematic since some declarations often depend on previous variables.  In that case, whatever pragmatic order works.  The section is usually small and scannable anyway.

```js
const options = { browsers: 'last 2 versions' }
const maxAge = 3600
const cacheControl = `max-age=${maxAge}`
```

## Function Declarations

This is usually the meat of the module. In general, I favor a loose policy of putting the larger facade or controller functions toward the bottom of the file.  The functions that compose them come before.  This generally means that a function is declared on a line previous to the line it's invoked on.  This isn't strictly necessary in this language.  In other languages it is.  If you follow this order it's something that can help you visualize the composition of bits within the module.

I usually put a blank line between each function.

```js
const toHexValueSpace = letter => ...

const dropUnmapped = hex => ...

const separateHexColors = (hexes, str) => ...

const completeColor = color => ...

const prefixHash = color => ...

const formatStyle = (_style, _hex, i, hexes) => ...

const mapToGradient = str =>
  str.split('')
    .map(toHexValueSpace)
    .filter(dropUnmapped)
    .reduce(separateHexColors, [''])
    .map(completeColor)
    .map(prefixHash)
    .reduce(formatStyle)
```

## Module Exports

Putting the facade functions towards the bottom of the file usually has another advantage.  This is where I do exports.  In an es6 imports/exports environment, I will inline the named exports, ie:

```js
export const toHexValueSpace = ...
```

This will happen right on the line of the function declaration, again in order of usage.  In a commonjs environment, I will define the named exports at the bottom of the file.  The list comes after a blank line and is kept in alpha order.

```js
const toHexValueSpace = ...
const dropUnmapped = ...
// ...

exports.dropUnmapped = dropUnmapped
exports.toHexValueSpace = toHexValueSpace
```

With either export style, the single module/default export will come at the bottom.  If it's `default` in the case of es6, it's exported inline with the declaration:

```js
export default const mapToGradient = str => ...
```

If the module is commonjs-formatted, the order depends on the declaration style of the function.  If it's a function statement, I often export inline:

```js
module.exports = function mapToGradient() { ... }
```

If it's a function expression, I declare and then export separately after skipping a line:

```js
const mapToGradient = str => ...

module.exports = mapToGradient
```

## Many Flavors

There are more ways to organize a js module than there are Ben & Jerry's flavors.  This is what works for me.  Most importantly, be consistent within a single codebase.

Don't fret about this too much.  Focus on making your module *do* something awesome.  [Prettier](https://github.com/prettier/prettier) has done great things for helping me not care about the code formatting.  It would be great if I came upon some tooling that helped me not care about ordering and organization within the module.  Does anyone know of good tooling that does this?

What do you think of the organization here?  How do you do it differently that has suited you well?
