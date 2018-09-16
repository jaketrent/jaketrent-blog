---
layout: post
title: "LiveReload for NodeJs"
date: "2013-04-23"
comments: true
categories:
  - "Code"
tags:
  - "nodejs"
  - "js"
  - "grunt"
description: Livereload allows you to make code changes and see your changes in the browser without refreshing.
metaKeywords: nodejs, js, grunt, grunt-livereload, connect-livereload
draft: false
image: https://i.imgur.com/4773D.jpg
---

LiveReload is a wonderful tool/strategy for being able to develop websites more quickly.  You can make a change and see it immediately shown in the browser without requiring you to manually refresh.  To do this in NodeJs with Express, you'll need just a few packages.

<!--more-->

## LiveReload Express

If you're doing a website on Nodejs these days, you're probably using Express.  Express uses the Connect library for its middleware scheme.  Just grab one more middleware to handle the LiveReload.  It will add a little snippet of JavaScript to each of the html responses that is requested through this middleware.  First, install:

```
npm install connect-livereload --save-dev
```

Next, import:

```coffeescript
app.configure 'development', ->
  app.use require('connect-livereload') 35729
```

Note that we only want to import and use the middleware when in development.  This matches the fact that we are only declaring this package as in `devDependencies`.

## LiveReload Grunt

Now you need to something to start a livereload server, watch files for changes, and broadcast their availability.  The rest of this will be done via Grunt.

First, install:

```
npm install grunt-cli -g
npm install grunt grunt-regarde grunt-contrib-livereload --save-dev
```

- `grunt-cli` will allow you to run the `grunt` command in the terminal.  Global puts the bin in your path.
- `grunt-regarde` is a file watcher.  It senses changes to the filesystem.
- `grunt-contrib-reload` will handle the pushing of new code to the browser.

Next setup the `Gruntfile.coffee`:

```coffeescript
module.exports = (grunt) ->
  grunt.initConfig

    regarde:
      style:
        files: ['app/static/css/*.css']
        tasks: ['livereload']

  grunt.loadNpmTasks 'grunt-contrib-livereload'

  grunt.registerTask 'be-lively', [ 'livereload-start', 'regarde' ]
```

Now when you run:

```
grunt be-lively
```

A livereload server is going to be setup.  Then we watch for filesystem changes.  The only things we're watching are css files in our app.  You could expand the `files` array to watch more if you wish.

Yay!

## LiveReload all the Things

There are many ways to make this happen.  There are numerous Node libraries, Grunt plugins, and browser plugins.  Do what works for you.  Just make it happen fast and tend it well from the beginning to the end of your project.  Almost every solution I've found is somewhat high maintenance.  This one has proven to be the same.  What have you found to be your favorite LiveReload solution, and in what environment?
