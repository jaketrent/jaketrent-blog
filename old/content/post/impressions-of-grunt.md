---
layout: post
title: "Impressions of Grunt"
date: "2012-12-12"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "grunt"
description: My impressions of writing Grunt plugins and why one might want to.
metaKeywords: js, javascript, grunt, build configuration
draft: false
image: https://i.imgur.com/4773D.jpg
---

Grunt is a great build tool for JavaScript projects.  It comes with a lot out of the box, and you can write your own custom tasks.  It joins a world fraught with many, glorious build tool options.  So, a bit has been made of the decision to have Grunt join the fray.  Perhaps most prominently, Miller Medeiros had [a few problems with Grunt](http://blog.millermedeiros.com/node-js-ant-grunt-and-other-build-tools/).  And in response, Ben Alman gave his reasoning on [why he wrote it](http://benalman.com/news/2012/08/why-grunt/).  Having used it for a bit, I have a few impressions.  Here they are so far.

<!--more-->

## Community

There will probably never be any build tool that gains more mass than what already exists as just a bash or a make script.  And really nothing needs to.  Healthy-sized communities have been built up around different build tool options where those that used it liked the style, it fit their platform, and they found it useful.  Grunt feels like it's on track to become a highlight build tool in the Js community.  There are many using it [already](https://github.com/gruntjs/gruntjs.com/issues/9) and more [on the way](https://github.com/angular/angular.js/pull/1544).

## Declarative vs. Procedural

Which style of project configuration is better?  Declarative or procedural?  Wars have been started with lesser words.  I don't feel like it's a question of better.  It's just a matter of style.  There are pros and cons.  Where you do the many of same things as everyone else, declarative works just fine.  When you have to do new, original things, you have to write code to support that.  You might wrap that in a grunt plugin to encapsulate it then write declarative options to feed it.  But, you still own the plugin implementation.

## JavaScript Build for JavaScript Project

Maybe obviously, the sweet spot for Grunt is building JavaScript projects.  Js projects are becoming more complex all the time.  Often, complementary build tools are lacking.  There are other projects that are named [awesomely](https://github.com/280north/jake), though they are mostly dead.  Grunt fills a gap for JavaScript projects.  It seems that the advantages of writing client *and* server js apply here as well:  Js build tools take advantage of the Js (Node) environment.  You can use your Js skills here.  The context switching is diminished.

## Synchronous Exec for JavaScript Build

One of the main sellings points for NodeJs is that it is built from the ground up for using in asychronous environments and problems.  Build scripts aren't generally asynchronous.  Usually, it's quite the opposite.  Step 1 leads to step 2 and so on.  You can't skip, and future steps rely upon completion of the previous.  

So, you can try [child_process.exec](http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback), but it's asynchronous.  So, make it synchronous and try [exec-sync](https://github.com/jeremyfa/node-exec-sync).  But it has [problems](https://github.com/jeremyfa/node-exec-sync/issues/8) vanilla exec doesn't.  The best synchronous exec for JavaScript I've found so far is [shelljs.exec](http://documentup.com/arturadib/shelljs#command-reference/exec-command-options-callback). 

In this way, NodeJs/Grunt seems like an awkward fit as a build tool.

## Shell Commands in Grunt

When I end up doing custom things in my Grunt build, it tends to be that I'm trying to get to the shell and execute something.  If I have a shell script, I can just execute it with [grunt-exec](https://github.com/jharding/grunt-exec).  If I'm trying to keep all logic in Grunt, I'll use [shelljs](https://github.com/arturadib/shelljs).  The thing that gets me with both of these solutions is that I'm in Node, constantly trying to get out of Node to run something in the shell, like a git command.  So my code ends up looking like lots of these:

```js
var shell = require('shelljs');
grunt.log.writeln('Cloning repo');
shell.exec('git clone ' + opts.repo);
```

There's a bit of cruft to recreate bash in Node.  It's not as clean and does not read as well as a vanilla shell script might:

```bash
echo 'Cloning repo';
git clone $repo
```

## New APIs

Grunt does quite a bit for you.  It's now up to me to go figure out all the cool stuff it can do.  Once I found the [file API](https://github.com/gruntjs/grunt/wiki/grunt.file), I was excited and retained a touch of the nagging feeling I just mentioned related to shell commands.

## JavaScript Build Scripts are Cross-OS Compatible

One of the main reasons you would choose to write JavaScript for a build script instead of a .sh or a .bat file is that you can use it multiple OS'es.  Node [should](https://github.com/jeremyfa/node-exec-sync/pull/6) :) execute the same on each platform it supports -- essentially Windows, Linux, and Osx.

## Builds Scripts as Plugins

When you come up with a new Grunt task that is obviously useful for someone else out in the world, you'll likely generalize it and publish it to npm.  There already a good number of ['gruntplugin'](https://npmjs.org/browse/keyword/gruntplugin)s out there.  This is a great sharing mechanism that not every build tool environment will give you.  I'm grateful for the good Grunt plugins shared out there.

## Grunt Configuration

Grunt, by default, has a declarative configuration style.  This means lots of json, often long and nested.  It's all organized by task names, so it's fairly easy to find stuff.  But the bottom line is that there is a fair bit to navigate in the average grunt file.

## Breaking Changes in Grunt API

As of this writing, Grunt 0.4 is on the verge of release.  By all accounts it will make things better, and it looks promising.  They have a mostly-straightforward [migration guide](https://github.com/gruntjs/grunt/wiki/Upgrading-from-0.3-to-0.4).  The thing that has been the most painful is the lack of backward compatibility.  My current, working builds rely on Grunt plugins that are not 0.4 compliant, so I have two choices:  Help each of those plugins upgrade or wait until 0.4 reaches critical mass -- ie, most worthy plugins are upgraded.

## Grunt is Fast

Grunt is faster than Pumba being chased by a hyena.  Previous to Grunt, we were using Maven to do similar tasks.  Now we do more (Grunt has made it easy for us to incorporate more good practices -- eg, linting), and the build is done is a serious fraction of the time.  The speed is super dependant on what operations the build actually performs, but my impression for my builds is that Grunt is fast.

## The Grunt Logo

Yes, it's superficial, and it's even a lame reason, but I like Grunt because they have a great logo.  Wild boar for logo?  Instant win.  (That is what it is, right?)

So, is Grunt helping you out?  What are your impressions?  Or are you using something else entirely?
