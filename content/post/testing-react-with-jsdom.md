---
layout: post
title: "Testing React on jsdom"
date: "2015-06-18"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "react"
  - "mocha"
  - "webpack"
  - "jsdom"
  - "unit-testing"
description: Webpack's dev server for static assets can be quickly configured to handle JavaScript history api pushState.
metaKeywords: webpack, webpack-dev-server, pushState, history api, client router
draft: false
image: https://i.imgur.com/DXuSNbw.png
---

React allows you to create components that will render UI for your application.  If your UI is of any complexity, you'll likely want to test that it functions correctly and allows for future refactors.  There are numerous ways to do this.  One way that you might appreciate is using [jsdom](https://github.com/tmpvar/jsdom), an in-JavaScript implementation of the DOM.

<!--more-->

## What is jsdom?

Jsdom is an in-JavaScript implementation of the DOM.  The DOM is the document object model, which is the tree of nodes that make up the UI for documents shown in web browsers.  

Because jsdom is implemented in JavaScript, we can have a DOM-like API to work with without needing a browser.  That means that we don't have to capture a browser in order test, a la [Karma](http://karma-runner.github.io/).  That means that we can run our tests in environments without browsers, like in Node or in continuous integration environments.  

By not using real browsers, we're also essentially saying that we believe the problems in our client JavaScript will not be browser-dependent (again, because we're not capturing *real* browsers).

## The Test Runner

In my JavaScript tests, I prefer to use the [Mocha](http://mochajs.org/) test runner.  It's usable in Node or browser environments.  It has great async test support.  It has the familiar behavior-style syntax of `describe` and `it` and all the normal test setup hooks that you like.  Most importantly, it features the Nyan cat test reporter:

![nyan cat test reporter](https://mochajs.org/static/reporter-nyan.withoutEnlargement-resize920,9999.b756f7e62a.png)

Mocha lets you choose your own assertion library.  I like [should.js](http://shouldjs.github.io/).

To install both:

```
npm install mocha should --save-dev
```

## Configuring Mocha

By default, Mocha wants a `/test` directory in your project root in which to put its configuration and potentially your spec files, depending on how you like to organize your projects:

```
mkdir test
```

Inside of the `/test` dir, let's `vim mocha.opts` and give it a place to configure jsdom and our other libs:

```text
--require test/utils/dom.js
--require should
--reporter nyan
```

We have yet to write the `test/utils/dom.js` file.  We will.  This file includes options for mocha.  Line by line, we're saying that before mocha runs tests, we want to load our `dom.js` config, the `should.js` library, and specify our reporter as `nyan`.

## Configuring jsdom

I've tried to come up with several configurations that will make jsdom work well with my React projects.  This is the best/simplest that I've come up with.  I'd be interested to hear if you have any suggestions on the approach.

Here's the full configuration with explanatory comments inline, as it would appear in `test/utils/dom.js`:

```js
var jsdom = require('jsdom')

// setup the simplest document possible
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')

// get the window object out of the document
var win = doc.defaultView

// set globals for mocha that make access to document and window feel 
// natural in the test environment
global.document = doc
global.window = win

// take all properties of the window object and also attach it to the 
// mocha global object
propagateToGlobal(win)

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}
```

The reason that we want to attach all the `window` properties to the mocha `global` object is because developers often write code that is meant for the browser without explicitly using the global environment object.  For instance, in React the developers write:

```js
navigator.userAgent.indexOf('Chrome') > -1
```

instead of:

```js
window.navigator.userAgent.indexOf('Chrome') > -1
```

Without taking `window.navigator` and putting it on `global.navigator`, you'd get an error like this when running your tests:

```
ReferenceError: navigator is not defined
```

## The React Test 

You are now ready to render React components into a document in your tests.  The document will be provided by jsdom.  You don't need a browser environment to run this.  

```js
var React = require('react/addons')
var should = require('should')
var TestUtils = React.addons.TestUtils
var MyComponent = // a React.Component with a <button/> ...
describe('MyComponent', function () {
  it('has button that fires a dom event for click', function (done) {
    function handleClick() { done() }
    var detachedComp = TestUtils.renderIntoDocument(<MyComponent onClick={handleClick}/>)
    var button = TestUtils.findRenderedDOMComponentWithTag(detachedComp, 'button')
    var buttonNode = React.findDOMNode(button)
    should.exist(buttonNode)
    TestUtils.Simulate.click(buttonNode)
  })
})
```

To run mocha with the configuration above, I like to add an npm script in `package.json`:
 
```json
{
   "scripts": {
     "test": "mocha test/**/*.spec.js"
   }
}
```

And then type:

```bash
npm test
```

Write the source to satisfy your test, and the lights should go green.  Your DOM is happy.  Your test is happy.

Does it work well for you?  How might you improve on it?  Enjoy testing!


