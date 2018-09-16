---
layout: post
title: "Run RequireJs with GruntJs"
date: "2012-10-28"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "grunt"
  - "requirejs"
image: https://i.imgur.com/4773D.jpg
---

RequireJs features a fantastic optimization tool, [r.js](http://requirejs.org/docs/optimization.html), that utilizes [UglifyJs](https://github.com/mishoo/UglifyJS) to minimize and concatenate your JavaScript code.  [Grunt](http://gruntjs.com/) is a build tool that is great for standardizing your build configuration and coordinating multiple build steps -- amongst its other wonders.  Hopefully you get to use both on your project, because they'll both make your development process smoother and leave you to the funnerest stuff -- writing sweet apps.

<!--more-->

## Vanilla RequireJs

To use [vanilla RequireJS to optimize your project](http://requirejs.org/docs/optimization.html#wholeproject), you'll need to do two things:

1. **Create app.build.js**  - This file contains the configuration for how your want RequireJs react to your source code.  Among other things, paths to source directories and output files are specified.
2. **Run the optimizer** - via the command `node r.js -o app.build.js`

Grunt has essentially the same steps, but they're specified in the standard grunt config file and will integrate better with the rest of your build process steps that are in grunt.

## Grunt RequireJs Configuration

An easy way to get Grunt to run your RequireJs build is to use the [`grunt-contrib-requirejs`](https://npmjs.org/package/grunt-contrib-requirejs) plugin.

Install the plugin:

    npm install grunt-contrib-requirejs

Add the requirejs config to your grunt.js file:

```js
module.exports = function(grunt) {
  grunt.initConfig({
    /* ... */

    // !! This is the name of the task ('requirejs')
    requirejs: {
      compile: {

        // !! You can drop your app.build.js config wholesale into 'options'
        options: {
          appDir: "src/",
          baseUrl: ".",
          dir: "target/",
          optimize: 'uglify',
          mainConfigFile:'./src/main.js',
          modules:[
            {
              name:'MyModule'
            }
          ],
          logLevel: 0,
          findNestedDependencies: true,
          fileExclusionRegExp: /^\./,
          inlineText: true
        }
      }
    }
    /* ... */
  });

  // !! This loads the plugin into grunt
  grunt.loadNpmTasks('grunt-contrib-requirejs');

};
```

And run the task:

    grunt requirejs

You should get the regular RequireJs build output that you're used to seeing, and you'll be able to verify that it worked.

## Solid Optimization

RequireJs does a great build.  Grunt is flexible and easy to work with.  They go well together thanks to the [grunt-contrib-requirejs](https://npmjs.org/package/grunt-contrib-requirejs) plugin, which gives a solid performance.  You'll have your JavaScript code done up so tight; it'll be denser than lead -- which is obviously what you've always dreamed of.
