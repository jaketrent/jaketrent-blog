---
layout: post
title: "Testing es2015 Riot Tags"
date: "2016-07-28"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "riot"
description: How to test Riot.js tags that are written in es2015. 
metaKeywords: es2015, riot, riotjs, riot.js, riot tags, testing, unit test, ava, avajs, jsdom
draft: false
image: https://i.imgur.com/EF2IK3G.png
---

Getting riot.js setup for development isn't too bad.  But the combo of language features, testing tools, and riot templates made setting up the test environment a bit trickier than I expected.  Here are some of the details.

<!--more-->

## Es2015 in Src

For this project, I am using [riotjs](http://riotjs.com/), which is a React-like library for writing UI components.  The library is designed to look for Riot components in `.tag` files.  These files look like HTML fragments, like:

```
<div>
  <!-- my component markup... -->
</div>

<script>
  // my component scripts...
</script>
```

I am using [Babel](https://babeljs.io/) to transpile the es2015 code in my project.  I also want es2015 available in the tags.  So, instead of just using the `babel-preset-es2015` preset, I'm using [`babel-preset-es2015-riot`](https://github.com/riot/babel-preset-es2015-riot).  I also want default module export support, so I'm using `babel-plugin-add-module-exports`.  The `.babelrc` file looks like:

```js
{
  "presets": [
    "es2015-riot",
    "stage-1"
  ],
  "plugins": [
    "add-module-exports"
  ]
}
```

For in-browser module support, I'm using webpack.  So, for `.js`, I'm using `babel-loader`.  For `.tag` riot files, I'm using `babel-loader` _plus_ `riotjs-loader`.  The useful `webpack.config.js` snippet for the loaders is here:

```js
{
  // ...
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      excludes: /node_modules/
    }, {
      test: /\.tag$/,
      loaders: ['babel', 'riotjs?type=babel'],
      exclude: /node_modules/
    }]
  }
}
```

Note that the riotjs plugin takes a query parameter for determining what type of code lives in the `<script/>` section of the `.tag` files.

Now a simple app might look like this:

```js
import riot from 'riot'

import './app.tag'

export default {
  render() {
    riot.mount('app')
  }
}
```

It's importing the top-most riot component for the app, called `app.tag`:

```html
import './header.tag'

<app>
  <header></header>
  <!-- more app stuff -->
</app>
```

Which uses the `header.tag` file:

```html
<header>
  <h1>Wow</h1>
</header>
```

Note that the tag file imports other tag files.  To me, this seems to be the right place to do this, since the parent tag has dependencies on children tags.  But it presents a problem that requires extra configuration in the test environment.

## Es2015 in Test

In test land, we are using [ava](https://github.com/avajs/ava) as our test runner.  We configure it in the `package.json` file:

```json
{ 
  "ava": {
    "babel": "inherit",
    "files": [
      "src/**/*.spec.js"
    ],
    "require": [
      "babel-register",
      "./test/utils/node-extensions",
      "./test/utils/dom"
    ]
  }
}
```

A few explanations about the test setup above...

Ava supports es2015 out of the box.  But it also allows you to specify your own `.babelrc` configuration using the 'inherit' value. 

With `files`, we are telling ava to find all the specs in the `src/` subdir that have the `.spec.js` filename suffix.

The `require` section is used to specify what code needs loaded before the specs run:

- `babel-register` - so we can use es2015 in test setup code.
- `./test/utils/node-extensions` - so we can tell node (running ava) how to load the `.tag` files that it encounters (remember, we don't have webpack in this test environment).
- `./test/utils/dom` - sets up a jsdom for doing our UI test

The `node-extensions.js` file is pretty interesting.  It is providing node a new function for how to handle the `.tag` files.  For these files, we'll compile using the riot compiler and then compile that output using babel.  In the end, we should have ready code.  You'll also notice that this custom file loader requires that we load up our `.babelrc` file manually because we're acting outside of ava at this point.

```js
const babel = require('babel-core')
const fs = require('fs')
const path = require('path')
const riot = require('riot')

// Add riot to node env so compilation works - per https://github.com/riot/riot/issues/895
global.riot = riot

function getBabelRc() {
  try {
    const contents = fs.readFileSync(path.join('..', '..', '.babelrc'), 'utf8')
    return JSON.parse(contents)
  } catch (e) {
    console.log('Error loading .babelrc', e)
    return {}
  }
}

// override behavior for riot tag import - per https://github.com/mochajs/mocha/issues/1458
require.extensions['.tag'] = function (module, filename) {
  const content = fs.readFileSync(filename, 'utf8')
  const riotCompiled = riot.compile(content, { type: 'babel' })

  const babelCompiled = babel.transform(riotCompiled, getBabelRc())

  return module._compile(babelCompiled.code, filename)
}
```

Next, we have our dom setup, which is pretty straightforward jsdom:

```js
import jsdom from 'jsdom'

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
const win = doc.defaultView
global.document = doc
global.window = win
global.navigator = win.navigator
global.history = win.history
```

Now we have a dom with a body tag we can render into, so let's try to test out our `app.js` render code -- finally, the test:

```js
import test from 'ava'

import subject from '../app'

test.before(t => {
  document.querySelector('body').appendChild(document.createElement('app'))
})

test.after.always(t => {
  const body = document.querySelector('body')
  while (body.firstChild) {
    body.removeChild(body.firstChild)
  }
})

test('#render displays a header', t => {
  subject.render()
  t.truthy(document.querySelector('h1').innerHTML === 'Wow')
})
```

So much work for such a benign test. :)

It's a cool combo of technologies.  But it takes a fair bit of wrangling and that interesting bit of `node-extensions.js` code to get it working.

Have you used this combo of tech before or something similar?  Any better setups that you've found?

