---
layout: post
title: "Run a Shell Script from NodeJs"
date: "2012-07-20"
comments: true
categories:
  - "Code"
tags:
  - "bash"
  - "js"
  - "nodejs"
description: Node can fork and run external binaries.
metaKeywords: bash, javascript, nodejs, shell, spawn, fork, exec
draft: false
---

NodeJs can do many things.  It can even run things that it can't do itself.  For instance, I have a shell script that I don't want to rewrite in Javascript, so I want my Node app to run the shell script.  No problemo.  

<!--more-->

(Updated 22 Aug 2016)

The [docs](http://nodejs.org/api/child_process.html) indicate a number of ways you can kick off child processes.  In my case, I wanted to use [`spawn`](http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options).

Import the `child_process` library:

```js
const { spawn } = require('child_process')
```

Now you have `spawn` available to call.  Just send it the right stuff.  I have a `deploy.sh` script that I want to run.  The command I'll actually run is `sh`, and I'll pass the name of the script to it in the 2nd parameter.  I can also specify other options in the 3rd parameter.  For instance, I want this to execute in a certain directory and with certain commands available to it via the `PATH` variable.  And so:

```js
const deploySh = spawn('sh', [ 'deploy.sh' ], {
  cwd: process.env.HOME + '/myProject',
  env: Object.assign({}, process.env, { PATH: process.env.PATH + ':/usr/local/bin' })
})
```

This will execute the shell script.  There are other callback events that you may/not want to set to grab the data that comes back from the process, such as 'data', 'end', or 'exit'.

Rock that!

  
