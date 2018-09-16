---
layout: post
title: "Npm Install Local Files"
date: "2012-12-14"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "nodejs"
  - "npm"
description: How do you install a package with npm that's not in the npm registry?  Perhaps you're developing a package locally.  A few options.
metaKeywords: js, javascript, node, nodejs, npm, local install, package
draft: false
image: https://i.imgur.com/xnDMm.jpg
---

Sometimes you'll want to use [npm](http://npmjs.org/) to install a package that doesn't exist in the official npm registry for some reason.  Maybe you're developing the package yourself.  Maybe it's an internal use-only package. Maybe the package writer never published it.  Here are a few ways to install a local package with npm.

<!--more-->

## Link the Local Node Package

If you're developing a package locally, you're likely making lots of changes to the source.  You don't want to publish after each change in order to install this package as a dependency elsewhere.  Npm has provided the [link](http://npmjs.org/doc/link.html) keyword.  

This allows your put a global label on your package that tells your local npm cache about it:

```bash
cd <pkg_dir>;
npm link;
```

And then go to the local project that you're using the package in and point to the dependency by package name:

```bash
cd <project_dir>;
npm link <pkg_name>;
```

Now you have symlinked a directory called `<pkg_name>` in the project's node_modules directory.  Changes you make in your package will appear and be usable from within your project.

## Tarball the Local Node Package

Npm can [install](https://npmjs.org/doc/install.html) either a path or url to a local tarball.  To create a tarball that npm will like, you want to run npm [pack](https://npmjs.org/doc/pack.html):

```bash
cd <pkg_dir>;
npm pack
```
This will create a tarball a la `<pkg_name>-<pkg_ver>.tgz`.  Now just store your new tarball somewhere like a local filesystem or server that is accessible when you run npm install on your dependant project.  

You can ask for the tarball manually:

```bash
npm install http://localServer/my-pkg-0.0.1.tgz
```

Or put the reference in your package.json for later:

```js
{
  "dependencies": {
    "my-pkg": "http://localServer/my-pkg-0.0.1.tgz"
  }
}
```

You probably have a node package that's only available locally for a reason.  To guarantee that it's not accidentally published to the world via the npm registry, add this beaut to your package.json:

```js
{
   "private": true
}
```

## Replicate the Npm Registry

If you're going all out, like creating a corporate npm registry, you always have the option of [replicating](https://npmjs.org/doc/registry.html#Can-I-run-my-own-private-registry) the Npm registry internally.  It's CouchDb, and '[replication](http://www.imdb.com/title/tt0120029/quotes?qt=qt0192627)' is its Chinese neighbor's middle name.  You can publish your own packages there so they're still private to your and your organization.  And you also get local references to the public packages.

## The Glory of Npm

Npm is great.  The ability to install published or local packages is an example of its flexibility and usefulness.  What are the other ways that you've found to make non-public packages installable -- for instance, that package that the writer just never bothered to publish to npm?
