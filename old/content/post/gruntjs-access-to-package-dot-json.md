---
layout: post
title: "GruntJs Access to package.json"
date: "2012-10-25"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "grunt"
  - "npm"
image: https://i.imgur.com/4773D.jpg
---

Have you used GruntJs to build your JavaScript project yet?  It's a great tool.  Often as a part of the build configuration, you'll want to access your package.json with grunt.  Grunt has some built-in support for this.  Some bits can be a little tricky, and some plugins have limited support.  Here are some ways around all that.

<!--more-->

## Grunt JSON Directive

Grunt supports a number of [directives](https://github.com/gruntjs/grunt/blob/master/docs/helpers_directives.md) out of the box.  These are callable from within you `grunt.js` file.  The gruntfile template uses one of these directives like so:

```js
grunt.initConfig({
  pkg: '<json:package.json>',
  /* ... */
});
```

This is making the contents of your `package.json` file available to your grunt config.  And this is what we wanted!  So, if I want to put the version of my app into some grunt task config, I can use it like so:

```js
someTask: {
  options: 'doStuff <%= pkg.version %>'
}
```

This would already be enough -- it it worked all the time!  Turns out it doesn't [tear].

## grunt.template

This syntax ("<%= someVar %>") is referred to as a grunt.template.  It is based on  [underscore's template](http://underscorejs.org/#template) function.

## Grunt Plugin Support

It turns out that all plugins are not created equal.  Some plugins do not support this syntax at all.  I wrestled with mainly two plugins

- [grunt-exec](https://npmjs.org/package/grunt-exec) - for executing scripts/commands in the shell
- [grunt-jade](https://npmjs.org/package/grunt-jade) - for compiling jade templates

As far as I can tell, neither plugin supports `grunt.template`.  Lameo.  In the case of `grunt-jade`, I actually switched plugins to [`grunt-contrib-jade`](https://npmjs.org/package/grunt-contrib-jade), which states explicit support for `grunt.template` in the docs.  Other than the docs or trying it out, I otherwise don't know how to determine support.

## Access package.json Directly

Where I couldn't find a plugin that explicitly supported `grunt.template`, I needed another solution.  Guided by the power of Google, I ran across a good Stack Overflow post on [getting `package.json` values into the `grunt.js` file](http://stackoverflow.com/questions/12408535/how-to-pass-in-package-json-array-to-grunt-js).

The post illuminated my dim mind:  Grunt runs in node.  Do what you would do in node.

Thusly, I just require the `package.json` file, and it is available.  Voila.  Who needs a stinkin template directive?  And it looks like:

```js
var pkgJson = require('./package.json');

/* use as desired */
var version = pkgJson.version;
```

My one departure from the Stack Overflow suggestion was to use a different variable name on the require statement ('package' -> 'pkgJson').  'package' is a keyword that doesn't pass linting.

## Grunt access package.json

As it turns out, Grunt has not problem accessing `package.json`.  Grunt was already a venerable build tool option.  Now, it running Javascript, speaking to your Javascript project descriptor (`package.json`) is pure genius.  And genius that is easily accomplished? -- noteworthy indeed.
