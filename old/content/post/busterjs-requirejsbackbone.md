---
layout: post
title: "BusterJs with RequireJs/Backbone"
date: "2012-07-25"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "unit-testing"
  - "backbonejs"
  - "requirejs"
description: BusterJs is a still-in-beta library that allows for testing your Javascript.  It's got a wealth of cool features.  The browser capturing is awesome for runn
metaKeywords: javascript, unit-testing, backbonejs, requirejs
draft: false
---

BusterJs is a still-in-beta library that allows for testing your Javascript.  It's got a wealth of cool features.  The browser capturing is awesome for running your Javascript directly in the browsers you choose from one runner.  You can also execute within Node.  In short, it rocks.  But, how to get this rockin' with your project, specifically your AMD RequireJs with BackboneJs combo project is the lock that must be opened before daily buster love can be had.

<!--more-->

## Install
Buster is easily installed everywhere (but apparently not in Windows, which I have not tried):

```bash
> sudo npm install -g buster
```

The [buster docs](http://busterjs.org/docs/getting-started/) indicate not to use sudo, but I'm reckless.

## Buster Config

My directory structure looks something like:

```bash
proj/
  src/
    static/
      js/      # here are the objects under test
  test/
    tests/     # here are the tests
    buster.js  # here is the buster config
```


My previous experience with setting up [Jasmine testing with RequireJs](http://rockycode.com/blog/jasmine-unit-testing-requirejs/) was not entirely straightforward.  BusterJs was not totally straightforward either, but it felt better.  For one, it already has a runner.  I just need to give it some config (`buster.js`):

```js
var config = module.exports;
config['browser-all'] = {
  autoRun: false,
  environment: 'browser',
  rootPath: '../',
  libs: [
    'src/static/js/vendor/require-jquery-2.0.2.js',
    'src/static/js/vendor/underscore-1.3.3.js',
    'src/static/js/vendor/backbone-0.9.2.js'
  ],
  sources: [
    'src/static/js/**/*.js',
    'src/static/js/**/*.handlebars'
  ],
  tests: ['test/tests/*.js'],
  extensions: [require('buster-amd')]
};
```

A few salient points related to RequireJs / Backbone:

* `autoRun` - Turning this off allows you to [run buster tests manually](http://busterjs.org/docs/starting-testrun-manually/).  This is important from an AMD perspective, because the objects under test are loaded asynchronously.  Only once they're loaded do we want to kick off the tests.
*  `libs` - Include the RequireJs, Underscore, and Backbone files here.  `libs` will put some script tags into the browser, so require will be ready once tests start executing.  They're loaded first and in order (Underscore before Backbone is important).
* `sources` - I was having problems with my [handlebars template](http://handlebarsjs.com/) loader plugin until I realized that I need to list *all* sources, including templates, under this attribute.  And don't forget '**' for subfolders.
* `extentions` - [buster-amd](https://github.com/busterjs/buster-amd) is a buster extension that helps with the AMD module loading.  This will also require a `npm install buster-amd`.  As the [buster-amd docs](http://busterjs.org/docs/extensions/) point out, you still need to list your sources and tests normally so they're available to the buster runner, so don't leave these out thinking they'll be magically available.  

The [other configuration options/details](http://busterjs.org/docs/configuration/) are well documented.

## BusterJs Test Example

There are a few [simple examples](https://github.com/trodrigues/buster-amd-example/) of other busterjs tests that test AMD modules.  Mine looks something like:

```js
buster.spec.expose();
require.config({
  baseUrl: 'src/static/js/',
  paths: {
    text: './vendor/text-2.0.0',
    /* ... */
  }
});
```

    describe('single backbone dependency', function(run) {
      require(['Widget'], function(widget) {
        run(function() {
          it('should load', function() {
            expect(true).toEqual(true); // nothing but test execution
          });
        });
      });
    });

More from the peanut gallery:

* `buster.spec.expose()` just pushes main buster functions into the wide-open namespace to be called willy nilly.  Reckless -- again. :)
* `require.config` - it saddens me, but I have had to include this within each test file.  Others have [commented](https://groups.google.com/d/msg/busterjs/IZWItTzDT5I/AmX9wN-6oJoJ) that they could include this once in the buster.config `libs`, but it didn't work for me.  I also tried 'testHelpers', without the help they advertise.  Please let me know if it does for you and what kind of pixie dust is required.
* `baseUrl` needs to jive with your buster rootPath so that your RequireJs relative paths will match up and work in your app runtime and in the test runtime.
* `run` - notice this is called within the require callback manually.

## BusterJs Runner

If you call within the next 15 minutes, the travel-size test runner is included.  Operators are standing by.  Start your test server:

```bash
> buster server
```

That will start a server at localhost:1111.  Head 1+ of your local browsers to that address and capture them as your imprisoned slaves.  They will do your bidding when you run the tests.  Go to your project directory and run:

```bash
> buster test
```

If you've tied it all together, you should see something like:

```bash
> buster test
Chrome 21.0.1180.49, OS X 10.7 (Lion): .....                                                                            
1 test cases, 1 tests, 1 assertions, 0 failures, 0 errors, 0 timeouts
Finished in 0.02s
```

And now for a few parting tips...

## Mismatched Define Module

If you happen to include a js file in your 'libs' attribute or another section that's loaded previous to your tests running that includes a `define()` block, you're going to get stuck with this wonder:

```bash
Uncaught exception: ./src/static/js/vendor/require-jquery-2.0.2.js:1803 Uncaught Error: Mismatched anonymous define() module: function (module) {
```

As the [require docs](http://requirejs.org/docs/errors.html#mismatch) point out, to avoid this:

>Be sure to load all scripts that call define() via the RequireJS API.

## RequireJs 2.0 shim

I wasn't able to get the shim setup for getting underscore/backbone loaded and in the correct order.  Instead, I just listed these non-AMD files in the correct order under the 'libs' attribute in buster.config.

  
