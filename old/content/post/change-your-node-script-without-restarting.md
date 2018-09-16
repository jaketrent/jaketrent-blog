---
layout: post
title: "Change Your Node Script Without Restarting"
date: "2012-10-03"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "nodejs"
image: https://i.imgur.com/jrkIv.jpg
---

Have you every wished you could change your node script and not restart the server?  Restarting your node server after changing your script can get annoying.  This is especially true if you're in guess and check mode, changing and checking a lot.  Luckily, there are a few tools to save you the pain.

<!--more-->

## Node-supervisor

Isaac Schlueter has created a [node-supervisor](https://github.com/isaacs/node-supervisor).  Install it with a quick npm:

    sudo npm install supervisor -g

Use `supervisor`, instead of `node` to start your app:

    supervisor app.js

By default, this will run with these options:

    DEBUG: Running node-supervisor with
    DEBUG:   program 'app.js'
    DEBUG:   --watch '.'
    DEBUG:   --ignore 'undefined'
    DEBUG:   --extensions 'node|js'
    DEBUG:   --exec 'node'

There are other options for things like watching only specific extensions or not restarting on app errors.

## Nodemon

Remy Sharp has created [nodemon](https://github.com/remy/nodemon).  It also is a quick npm install:

    sudo npm install nodemon -g

Again, run with `nodemon` instead of `node`:

    nodemon app.js

By default, runs:

    [nodemon] v0.6.23
    [nodemon] watching: .
    [nodemon] starting `node app.js`

There are similar options here for what to watch.

## Comparison of tools

Both tools will get the job done.  Choose either.  Both can specific directories or file extensions to watch.  Both can run other executables (like [forever](https://github.com/nodejitsu/forever), which is awesome, btw).

Both tools are circa 2010.  Node-supervisor is the slightly older brother (by 8 months).  Both projects seem to have slow, steady development development activity.  What is there to add to tools that do their job already?

In general, `nodemon` has a few more options.  For example, it has explicit support for coffee-script.  I like `supervisor` more for silly reasons:  I found it first, it works fine, feels better to type, and has fewer terminal command expansion conflicts.

*Update*

Recently I have found one clear reason to use `supervisor` over `nodemon`.  `nodemon` doesn't allow starting a process with node and monitoring coffee script files.  The conditionals in the source code rule that possibility right out.  `supervisor` does this just fine with the command:

```
supervisor --extensions 'node|js|coffee' app.coffee
```

Another couple observations:

- `supervisor` doesn't have in-terminal colors
- `supervisor` seems to be more explicit in its logging
