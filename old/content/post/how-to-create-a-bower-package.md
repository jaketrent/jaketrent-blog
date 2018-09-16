---
layout: post
title: "How to Create a Bower Package"
date: "2013-09-05"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "bower"
description: Bower is a client-side package manager.  To make it really useful, package your own components.  Here's how.
draft: false
image: https://i.imgur.com/t4XxrHn.jpg
---

Bower is a client-side or browser package manager.  It will handle your 3rd-party packages that are registered with the service.  To make it more useful, you can package up some of your own code and create a component to install with Bower.

<!--more-->

## Prepare your Package

To prepare your code to be a Bower package, you must install the Bower CLI:

```bash
$ npm install -g bower
```

If you haven't upgraded Bower lately, you might want to, as the basic config files have changed recently, and the CLI has improved.  This command would do the trick:

```bash
npm update -g bower
```

Now let's generate the basic config file, `bower.json`, by running:

```bash
$ cd your_project_dir
$ bower init
```

You will be prompted to select a name, version, etc. for your project.

## Add Your Package to the Registry

There is a Bower registry at `http://bower.herokuapp.com` that is used as a central lookup for the Bower components that are available.  This allows searching for packages by name, for instance:

```bash
$ bower search angular-models
```

Now the only step left is to add a reference to our package in the registry, for instance:

```bash
$ bower register angular-models git://github.com/octanner/angular-models.git
```

That's it!  It's that easy.

## Potential Errors

When giving a URL to your git repo, use the `git` protocol URL specifically.  Otherwise on old versions of Bower you'll get an [error](https://github.com/bower/bower/issues/66):

```bash
bower error Incorrect format
```

The newer versions will give a much more helpful message:

```bash
bower EINVFORMAT The registry only accepts URLs starting with git://
```

And don't worry about name overwriting.  Bower will catch that too with an error response:

```bash
bower EDUPLICATE Duplicate package
```
