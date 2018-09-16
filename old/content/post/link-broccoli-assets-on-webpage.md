---
layout: post
title: "Link to Broccoli Assets on a Webpage"
date: "2014-03-18"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "broccoli"
description: Broccoli.js is good at building assets.  Now, how do I use them on a webpage?
metaKeywords: js, broccoli, broccoli.js, reference, link to broccoli assets, serve broccoli
draft: false
image: https://i.imgur.com/oYpiHcU.jpg
---

[Broccoli.js](https://github.com/joliss/broccoli) is good at [building assets](http://www.solitr.com/blog/2014/02/broccoli-first-release/).  But now that they're built, how does one use them on a webpage?

<!--more-->

## Broccoli Serve

Broccoli has a great feature of having assets cached at every step in a list of transforms.  This makes it quite fast.  It can selectively reprocess only the subset of assets that have changed, and it can selectively transform only what's required.

Broccoli provides a command, `serve` that watches for changes to the trees specified in your `Brocfile.js` and spits them out to its temporary directory.  From there, it sets up a small webserver to serve the built assets to anyone who wants them.  The intent is that you can use this server in local dev on your sites.

Open your project and run:

```
$ broccoli serve
Serving on http://localhost:4200
```

And you'll get a local server defaulting on port 4200.

## Webpage Reference

Now that you have this server for local assets, you need to reference it from your webpage.  Just as when you get to production, you'll want to reference a deployed asset on a CDN, locally broccoli can serve as your asset host.

You can accomplish this in any number of ways.  Essentially, you need two things:

### 1. Environment Detection

If you're in development, you'll want to use `http://localhost:4200` for asset host, otherwise you'll want to use something like `http://mycdn.com`.

Assuming less of your other infrastructure, we'll make Broccoli accomplish this (but you could do this easily with `NODE_ENV` or something similar).  Broccoli internally uses `BROCCOLI_ENV` to switch functionality.  To detect this value easily, you can install [the plugin](https://github.com/joliss/broccoli-env):

```
npm install broccoli-env --save-dev
```

Then you'll be able to use it in your `Brocfile.js` to switch on important things:

```javascript
var env = require('broccoli-env').getEnv()
if (env === 'development') // do stuff
```

Currently, the plugin only supports `development` and `production` values.

### 2. View Compilation

If you have a server-side component in your project that serves UI, you likely have this built in already with the likes of `erb`, `jade`, `swig`, or something else.  If you don't, again you can defer to Broccoli.  It's good at building assets after all.

As an example, there is a plugin for compiling `jade` templates, [broccoli-jade](https://github.com/sindresorhus/broccoli-jade).  First, install:

```
npm install broccoli-jade --save-dev
```

Then create a view to meet your needs.  Perhaps in part, that might look like:

```jade
doctype html
html
  head
    script(src="#{assetsHost}/main.js", type="text/javascript")
    / ...
```

Here, `assetsHost` is a variable that will be replaced at compile time with the appropriate asset host value.

Finally, in your `Brocfile.js` you can tie it all together with something like:

```javascript
var env = require('broccoli-env').getEnv()
var jade = require('broccoli-jade')
var tree = broccoli.makeTree('my/views/path')
tree =  jade(tree, {
  data: {
    assetsHost: env === 'development' ? 'http://localhost:4200' : 'http://mycdn.com'
  }
})
return tree
```

Now when the `jade` template is compiled, it will have as local data the value of `assetHost` according to the env set by `BROCCOLI_ENV`.

And since Broccoli is handling the building of your view, you can even use Broccoli to serve it.  If it's called `index.jade` and ends up at the root directory after building with Broccoli, you could serve your whole site at `http://localhost:4200`.

And just like that, you can dev locally referencing the assets that Broccoli is building for you.  Does it work for you?  Is the picture clear?
