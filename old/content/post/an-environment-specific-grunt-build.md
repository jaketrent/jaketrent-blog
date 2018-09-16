---
layout: post
title: "An Environment-specific Grunt Build"
date: "2012-10-28"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "grunt"
image: https://i.imgur.com/4773D.jpg
---

Does your project use GruntJs as a build tool?  Have you ever to customize your build to the environment you're deploying to?  It's handy to be able to specify certain commands to run or keep from running.  It's likely essential to be able to change environment-specific variables via Grunt.  It's not bad.  Most of the leg-work has been done by earlier generations -- that is, if Grunt is old enough to have earlier generations yet.

<!--more-->

## Grunt-context Plugin

Jonathan Barnett has created a nice little grunt plugin that called [grunt-context](https://npmjs.org/package/grunt-context).  With grunt-context, you can easily specify environment-specific overrides to your grunt tasks.  The [github page for grunt-context](https://github.com/indieisaconcept/grunt-context) can provide you with the basics on how to configure your grunt build.

Let's try a concrete config.  Let's say that I want to run the [RequireJs optimizer](http://jaketrent.com/post/run-requirejs-with-gruntjs/) only when I deploy to my test environment or to production but not for my local build.

First, install the plugin:

    npm install grunt-context

Second, fix up your grunt.js file to include:

```js
module.exports = function(grunt) {
  grunt.initConfig({
    /* ... */
    // 'requirejs' task REQUIRED to be listed first at root level config
    requirejs: {
      compile: {
        options: {
          // !! all app.build.js standard requirejs options here
        }
      }
    },
    context: {
      // !! list each of your desired environments/contexts here
      local: {
        tasks: {
          // !! 'requirejs' task left out
          default: 'lint test'
        }
      },
      test: {
        tasks: {
          // !! put 'requirejs' in default task list
          default: 'requirejs lint test'
        }
      },
      prod: {
        //  !! re-list the 'requirejs' task to override its behavior for this context
        requirejs: {
          compile: {
            options: {
              // !! override the standard requirejs options for something
              // special in prod build only
            }
          }
        },
        tasks: {
          default: 'requirejs lint test'
        }
      }
    }
  });

  // !! load the plugin
  grunt.loadNpmTasks('grunt-context');
};
```

Finally, run the grunt build and target a specific context.  If you want to build locally and not have requirejs run, type:

    grunt context:local

If you want to build for test, where requirejs will optimize, type:

    grunt context:test

Notice in the 'prod' context that I also can override the actual variables for running the requirejs build.  So, it will not only run things or not run things, but you can run tasks in specific ways per environment.

## The Cons

The plugin works well most of the time, but I haven't had a stellar performance in all cases.  It could be that I'm unknowingly using it wrong.  I've tried many different methods to try and work out some of my issues with it.

For instance, I cannot get it to override functions set to the [grunt-exec](https://npmjs.org/package/grunt-exec) `command` attribute.  It will override string commands just fine, but it has problems with functions.  This could be because it has to assemble task lists for execution within a context and calculate overrides.  My guess is that the implementation may just be lacking in this area.

## Best Option So Far

For environment-specific grunt builds, [grunt-context](https://npmjs.org/package/grunt-context) is the best solution I've found so far.  It's not the best, but it usually gets the job done.  I've bent it to my will thus far.

What have you found that works well for environment-specific JavaScript builds?
