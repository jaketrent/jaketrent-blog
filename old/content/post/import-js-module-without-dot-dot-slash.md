---
categories:
- "Code"
comments: true
date: 2017-06-16T07:36:44-06:00
description: "Writing ../../ can be a pain when importing modules from relative directories.  Webpack can help."
draft: false
image: "https://i.imgur.com/3rHrBJ8.jpg"
layout: post
metaKeywords: "../, dot dot slash, long relative paths, long paths in imports"
tags:
- "js"
- "webpack"
title: "Import Local JS Modules Without ../'ing"
---

Writing `../../` can be a pain when importing modules from relative directories.  Webpack can help.

<!--more-->

## Vanilla JS Module Imports

JavaScript module systems usually use the filesystem as the API for importing files.  There has long been a distinction between import paths for npm modules vs. local files:

- npm modules - `import React from 'react'`
- local modules - `import App from './app'`

Local modules have to start with a `.` and then some series of `/` or `../` to navigate to relative directories to find files containing the JS modules.  This is expected.  This is how it should be.  Tradition!

## The Pain of Long Relative Paths

Of course, in the world of build-stepping all the JavaScripts, we have created new options for ourselves.  So, let's say that we have a spec file that lives next to our source file, as I'm wont to do.  But that spec file has a dependency on a test helper that lives in a root test folder.  Something like this:

```
├── src
│   └── some
│       └── deep
│           └── module.spec.js
└── test
    └── helper.js
```

From my `module.spec.js` file, then, I'm going to have to do an egregiously long (could be longer) import to get to `helper.js`:

```js
import helper from '../../../test/helper'
```

Oh, the pain.  Right?  I have to count the directories out to make it to the project root.  It also feels a little weird in this case `../`ing out to pass the `src` -> `test` boundary.  And what about when I refactor and move my `module.spec.js`?  Well, let's try something else.

## The Terrible Power of Webpack

Webpack is here to help.  What can't you do with Webpack!  With Webpack, *you* are the expert.  You can do *anything*.

By default, Webpack, like the module systems we've talked about above, looks in `node_modules` for those import paths that don't start with `.` and are thus interpreted to be npm modules.  We can add to the list of where Webpack looks for such modules.  This is accomplished via the [`resolve.modules`](https://webpack.js.org/configuration/resolve/) attribute in `webpack.config.js`.  Want it to look for files in this same way in your own project root?  Assuming `webpack.config.js` is in your project root, just try:

```js
const path = require('path')
{
  // ...,
  resolve: {
    modules: [
      path.resolve(), 
      'node_modules'
    ]
  },
}
```

Don't forget to keep `node_modules` in the list in order to keep being able to find npm modules like `react`.

To import your helper from inside `module.spec.js`, now you'd write:

```js
import helper from 'test/helper'
```

Pretty snazzy, right?

Beware this feature.  It is useful and convenient, to be sure.  But it changes a foundational expectation that a JS/Node developer would have when approaching a codebase.  I've seen some projects do some pretty gnarly things, programmatically generating a list of `resolve.modules` paths to the point that tracing imported dependencies to their actual source became as bad as Ruby.

Have you used this feature before?  Or what else have you found `resolve.modules` in Webpack good for?
