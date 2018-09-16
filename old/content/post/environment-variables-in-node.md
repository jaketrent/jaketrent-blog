---
layout: post
title: "Environment Specific Variables in NodeJs"
date: "2012-12-05"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "nodejs"
description: Do you need to change variables per environment in NodeJs?  There's a great nconf package that helps out.
metaKeywords: js, nodejs, node, environment variables, nconf
draft: false
image: https://i.imgur.com/5rZ8H.png
---

Sometimes things change in different environments.  For one, I wear a tie to church but try not to otherwise.  In Node, you might want variables to change per environment.  And it turns out people have wanted this exact thing, creating marvels of code for us to use as we please.  Enter, nconf.

<!--more-->

## Nconf

[Nconf](https://github.com/flatiron/nconf) provides "hierarchical node.js configuration with files, environment variables, command-line arguments, and atomic object merging."  It is a great little package provided by the folks at [NodeJitsu](http://nodejitsu.com/).  

To install, run a little:

```
$ npm install nconf
```

#### Environment Variables in Node

Often, NodeJs environments are specified through the aptly-named environment variables.  These are the variables that are set on a system level, available to yours and other applications.  In Unixy environments, you'd set one with:

```
$ export NODE_ENV=production
```

And it turns out that `NODE_ENV` is the single most-used environment variable of them all.  Really, it's the big kahuna that triggers other environment variables or code for activation. 

For instance, in an [Express](http://expressjs.com/) app, you'll see this a lot:

```js
if ('production' == app.get('env')) {
  app.set('dbUri', 'n.n.n.n/prod');
}
```

Actually, you see [`configure()`](http://expressjs.com/api.html#app.configure), but it's all just sugar around a check to `process.env.NODE_ENV`.

#### Set NODE_ENV and Start Node

If you want to start node and set the environment variable all in a one liner, try:

```
$ export NODE_ENV=production && node app.js
```

#### Multiple, Variable Sources

You could just grab all your variables out the process environment, but the cool thing that nconf gives you is a hierarchy.  The [docs](https://github.com/flatiron/nconf) give the probable example of the following hierarchy:

1. Command-line arguments
2. Environment variables
3. A file

One could access these sources in code with this beaut:

```js
var nconf = require('nconf');
nconf.argv()
     .env()
     .file({ file: 
       'config.json' 
     });
```

You could even have a config file specific to each environment that ships with your app and load it with a slightly spiffier:

```js
var nconf = require('nconf');
nconf.argv()
     .env()
     .file({ file: 
       process.env.NODE_ENV + '.json'
     });
```

#### Using the Data

Finally, after loading, just access your environment variables and incorporate them in your code as you will:

```js
nconf.get('NODE_ENV');
```

Declare some variables per environment.  Likely candidates are database connection strings or web service endpoints or feature flags.  These will help you avoid as many nasty if-else branches in your code.
