---
layout: post
title: "Test RequireJs Code in Testacular"
date: "2012-10-31"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "requirejs"
  - "testacular"
  - "mocha"
image: https://i.imgur.com/7gh40.jpg
---

Did you write your source code as JavaScript AMD modules in [RequireJs](http://requirejs.org/)?  Do you want to test them in real browsers?  Do you want the flexibility of using [Mocha](http://visionmedia.github.com/mocha/) or [Jasmine](http://pivotal.github.com/jasmine/)?  This is the moment you've been waiting for.

[Testacular is a "spetacular test runner for JavaScript"](http://vojtajina.github.com/testacular/) that was written to support the [AngularJs](http://angularjs.org/) project.  It is valuable because it will run your tests in real browsers.  This is important for front-end code that relies on browser globals such as `window` (eg, if you use jQuery) or that manipulates the DOM (which could vary browser to browser).

Client-side JavaScript testing is a somewhat crazy space.  Some have even called it ["insane"](http://rzrsharp.net/2012/08/01/client-side-testing-insanity.html) and taken drastically different routes than what follows.  But we're gonna see if we can power through, and Testacular will help us get the job done.

<!--more-->

## RequireJs Modules

We wrote our source code using RequireJs-implemented AMD modules.  This gives us:

- Clean code organization
- Namespaced code (not global)
- Explicit dependency management
- Source optimized via the RequireJs build

Unfortunately, it also makes our source a bit more tricky to test.

## Testacular RequireJs Support

[RequireJs support was just barely added](https://groups.google.com/forum/?fromgroups=#!topic/testacular/CRsf8Ig4bgE) to Testacular, so it only lives in the canary channel (master).  To install with npm:

    npm install -g testacular@canary

This will currently install version <del datetime="2012-11-05T14:38:54+00:00">0.5.1</del> 0.5.2.  This is the first version of Testacular with RequireJs support.  So your `package.json` should include an entry like:

    "testacular": ">=0.5.2"

If [Testacular](https://npmjs.org/package/testacular) has moved to >=0.6.0, you can use the stable channel.

## Configure Testacular For RequireJs

#### Directory Setup

For clarity in the example configuration files and test below, the directory structure upon which these are based looks like this:

    project/
        lib/
            jquery.js #etc
        node_modules/
            chai/ #etc
        src/
            MyModule.js
        test/
            MyModule.test.js
            test-main.js
    testacular.conf.js


#### Initialize Testacular

Testacular comes with a nice utility for generating a config file (default name: 'testacular.conf.js') that it needs in order to run.  In your terminal, type:

    testacular init

This will give you a series of prompts for things such as paths to source and tests and which browsers to capture.  <del datetime="2012-11-05T14:38:54+00:00">These prompts do not include the option to add RequireJs support automatically, so you'll need to add those lines manually to your `testacular.conf.js` (see below).</del>  As of testacular 0.5.2, `testacular init` will prompt for usage of the RequireJs adapter.

#### Testacular Include

Testacular 0.5.1, while adding RequireJs support, has added a new concept of "included" to the files listed in your config.  This is because RequireJs will balk about a the module not being loaded correctly (ie, loaded synchronously in the `<head/>` tag of the runner).  From the [RequireJs docs](http://requirejs.org/docs/errors.html#mismatch):

> "Be sure to load all scripts that call define() via the RequireJS API. Do not manually code script tags in HTML to load scripts that have define() calls in them."

#### RequireJs Shim

Not immediately apparent is the fact that the 'shim' config from RequireJs 2.x does not work from within Testacular.  I haven't yet figured out why.  For instance, I was constantly getting "'Backbone' is not defined" messages even though it was specified in the 'shim' config and required in the test.  I could have been doing something wrong.  My solution thus far has been to list each of the non-RequireJs modules and their dependencies in the 'files' attribute of `testacular.conf.js`.

#### testacular.conf.js

The final point is that the RequireJs main module for your test runner should be the last file listed.

So, finally, here is the 'file' excerpt of `testacular.conf.js`:

```js
files = [
  MOCHA,
  MOCHA_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,

  // !! libs required for test framework
  {pattern: 'node_modules/chai/chai.js', included: false},

  // !! put what used to be in your requirejs 'shim' config here
  'lib/jquery.js',
  'lib/underscore.js',
  'lib/backbone.js',
  'lib/handlebars.js',

  // !! put all libs in requirejs 'paths' config here (included: false)
  {pattern: 'lib/**/*.js', included: false},

  // !! all src and test modules (included: false)
  {pattern: 'src/**/*', included: false},
  {pattern: 'test/**/*.test.js', included: false},

  // !! test main require module last
  'test/test-main.js'
];
```

This config is awesome.  It replaces an html test runner that you would otherwise have to build.

## RequireJs Main Module

Just like any RequireJs project, you need a main module to bootstrap your tests.  In the main module, you setup the [`require.config`](http://requirejs.org/docs/api.html#config).

#### Testacular '/base' Directory

Testacular serves files under the '/base' directory.  So, on the server, requests to files will be served up under 'http://localhost:9876/base/*'.  The RequireJs config for `baseUrl` gives a starting context for modules that load with relative paths.  When setting this value for the Testacular server, it will need to start with '/base'.  I want my baseUrl to be at the root of my '/src' directory so relative requires in the source won't need to change.  My baseUrl has the value of '/base/src'.

#### Require Each Test File

One of the things I hate is having to update a master list of all tests to run every time I add a test.  Unfortunately, that's what I currently have.  The test main module has to specifically require each of the test modules.  I would love it if I could add a `*.test.js` file to the test directory and just have it run the next time the tests run.

#### Asynchronously Run Testacular

Because the RequireJs require statements are asynchronous, Testacular needs to wait until they're done (the code is loaded and ready) before it starts the tests.

The `main-test.js` file ends up looking like this:

```js
require({

  // !! Testacular serves files from '/base'
  baseUrl: '/base/src',
  paths: {
    require: '../lib/require',
    text: '../lib/text'
  },
}, ['../test/MyModule.test'], function() {
  window.__testacular__.start();
});
```

## RequireJs Test in Testacular

All the setup thus far has been in preparation for the code to follow.  The test can now be setup as a RequireJs module.  It can require the source code under test.  It can use [Mocha](http://visionmedia.github.com/mocha/) (or whatever framework there is a Testacular adapter for).

I will also use [Chai](http://chaijs.com/) in order to get the ['should' BDD-style assertions](http://chaijs.com/guide/styles/).  Note that by using RequireJs and running in the browser, we can't just `require('chai')`.  It has to be required using the asynchronous callback to avoid [this error](http://requirejs.org/docs/errors.html#notloaded):

> Uncaught Error: Module name "../node_modules/chai/chai" has not been loaded yet for context: _. Use require([])

And finally, `should()` must be invoked to be available in the test.

So, a simple test will look like:

```js
define(['../node_modules/chai/chai', 'MyModule'],
  function(chai, MyModule) {

  var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

  describe('MyModule', function () {
    describe('#initialize()', function () {
      it('should be a stinkin object', function () {
        var yippee = new MyModule();
        yippee.should.be.an('object');
      });
    });
  });
});
```

## Run the Tests in Testacular

There are a couple options set in `testacular.conf.js` that will describe how your tests can be run:

- **singleRun** - Start Testacular server, capture browsers, run all tests, shutdown server
- **autoWatch** - Have the server run tests every time a source or test file changes (and requires you to turn off singleRun)

To start the Testacular server:

    testacular start

Finally, if your Testacular server is already running and you want to kick off the tests, type:

    testacular run

## Now to Test

Thank you to [Vojta Jina](https://github.com/vojtajina) and the rest of the AngularJs crew and other contributors for making an awesome test runner.  I'm very happy that RequireJs support was added.  Vojta has also provided an [end-to-end example](https://github.com/vojtajina/testacular/tree/master/test/e2e/requirejs) with code on Github.

How do you see that we could improve this configuration or testing process?

Now to test some sweet code!
