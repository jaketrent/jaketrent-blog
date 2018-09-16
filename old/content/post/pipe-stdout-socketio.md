---
layout: post
title: "Pipe stdout to SocketIO"
date: "2012-07-20"
comments: true
categories:
  - "Code"
tags:
  - "bash"
  - "js"
  - "nodejs"
  - "websockets"
description: When you run a shell script or some other process from NodeJs and want to get the output in a stream to a client, you can redirect or pipe the output from t
metaKeywords: bash, javascript, nodejs, websockets
draft: false
---

When you run a shell script or some other process from NodeJs and want to get the output in a stream to a client, you can redirect or pipe the output from the process that originally outputs to stdout into your socketio stream.  

<!--more-->

First, setup socketio on your server as you normally would:

```js
var io = require('socket.io').listen(80);
```

    io.sockets.on('connection', function (socket) {
      runMyProcess(socket);
      socket.on('my other event', function (data) {
        console.log(data);
      });
    });

Second, setup your process to run [using spawn](http://rockycode.com/blog/run-shell-script-nodejs/).  For instance:

```js
var spawn = require('child_process').spawn;
var myProcess = spawn('sh', [ 'myShellScript.sh' ]);
```

And setup your `myProcess` variable with the needed callbacks.  The 'data' callback is called whenever there is output from the process.  So, if you want to catch data from `stdout` and `stderr`, catch those and emit the data into your socketio stream, a la:

```js
myProcess.stdout.setEncoding('utf-8');
myProcess.stdout.on('data', function (data) {
  socket.emit('process_data', data);
});
myProcess.stderr.setEncoding('utf-8');
myProcess.stderr.on('data', function (data) {
  socket.emit('process_data', data);
});
```

An important note from [the docs](http://nodejs.org/api/stream.html#stream_event_data) is that:

> The 'data' event emits either a Buffer (by default) or a string if setEncoding() was used.

If I didn't set the encoding so strings were returned, they did not transfer well over socketio.  Well, there you have it.  You can now get output from child processes to stream through socketio.  In my case, I was wanting to show realtime output in a web client.  It's a fun combination of abilities that should produce interesting applications.  Have fun!

  
