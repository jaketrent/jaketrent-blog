---
layout: post
title: "Grunt and Testacular"
date: "2012-11-06"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "grunt"
  - "testacular"
image: https://i.imgur.com/zze56.jpg
---

[Testacular](http://vojtajina.github.com/testacular/) is a test runner for running browser tests.  Once you have it [up and running](http://jaketrent.com/post/test-requirejs-testacular/), you may want to integrate it with your [Grunt](http://gruntjs.com/) build process.  This will allow Testacular to be started and your tests to be run from Grunt.

<!--more-->

## grunt-testacular

Lucky for us, [Friedel Ziegelmayer](https://npmjs.org/package/grunt-testacular) has created a nice little plugin, [grunt-testacular](https://npmjs.org/package/grunt-testacular).

To install:

    $ npm install grunt-testacular

Add the current version to your `package.json` for the future:

    "grunt-testacular": "0.2.x"

Import the plugin in your `grunt.js` file:

```js
grunt.loadNpmTasks('grunt-testacular');
```

And finally, in `grunt.js`, specify your tasks:

```js
testacularServer: {
  unit: {
    options: {
      keepalive: true
    },
    configFile: 'testacular.conf.js'
  }
},
testacularRun: {
  unit: {
    runnerPort: 9100
  }
}
```

#### Two Tasks

Grunt-testacular provides two tasks:

1. testacularServer - starts the Testacular server (equivalent to `testacular start`)
2. testacularRun - runs your tests against an already-started server (equivalent to `testacular run`)

#### A grunt-testacular Oddity

If you don't have `keepalive: true` set for grunt-testacular, the Testacular server will shutdown before it has a chance to capture browsers or run your tests.  I'm really not sure why this is even an option.  The false case behavior doesn't seem to be useful.  With the `singleRun` ability of Testacular, the plugin should just call start on the server and let the server configuration decide when it's appropriate to shut down.

**Update:**
I logged an [issue for grunt-testacular](https://github.com/Dignifiedquire/grunt-testacular/issues/3#issuecomment-10234529) that Grunt tasks listed after `testacularServer` weren't being run.  Friedal responded that `keepalive: true` was the problem.  If it is specified true, then it has to be the last task in the list.  So, if you have tasks after `testacularServer` specified, remove `keepalive: true` and add `watch` to the end of your task list.

## Grunt and Testacular Work Flow

Of course, your work flow is up to you, and Grunt and Testacular give you enough flexibility to decide your own, but I think you'll run your tests in two main scenarios: development and continuous integration.

#### Development

For development, I like to start up the Testacular server and keep it running.  Then, I go write tests and update source code.  Testacular will notice my changes and automatically re-run my tests.

To set this up, make sure your grunt-testacular task has this option:

    keepalive: true

This will keep the server up even after the tests have completed.

And make sure your `testacular.conf.js` file includes:

    autoWatch = true;

This will force Testacular to re-run your tests if anything in your source or tests change (specifically, if anything in testacular.conf.js's `files` array changes).

#### Continuous Integration

For continuous integration, you just want your automated build to be able to verify the source code integrity prior to deploying.

We don't want tests to re-run automatically based on our changes, so we turn off `autoWatch` in `testacular.conf.js`:

    autoWatch = false;

And we set one more value in `testacular.conf.js` to:

    singleRun = true;

This will allow the `testacularServer` task to be run once, have Testacular run all the tests, and then make the server shut down.

Finally, remember to keep `keepalive: true` set in `grunt.js`.  Odd, right?

## Multiple Testacular Configurations

To manage the options that are distinct to these two work flows, one could just create two separate `testacular.conf.js` files.  But, that would be overkill, because there'd be a lot of overlap between the two files.

Instead, the grunt-testacular plugin gives you override ability on a per-variable basis.  To support the development and integration scenario, the grunt multiTask might look like this:

```js
testacularServer: {
  unit: {
    options: {
      keepalive: true
    },
    configFile: 'testacular.conf.js'
  },
  integration: {
    options: {
      keepalive: true
    },
    configFile: 'testacular.conf.js',
    autoWatch: false,
    singleRun: true
  }
}
```

Following this same pattern, you could create a separate config for automated functional or end-to-end tests as well.

Note that the `options` object is strictly for the plugin.  The other variables at that level feed straight into Testacular as overrides.

## Integrated Testing

Process and product maturity are increased as tests are integrated into the build process.  Grunt and Testacular make integrating your browser tests a snap.
