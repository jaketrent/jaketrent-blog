---
categories:
- "Code"
comments: true
date: 2017-04-28T09:35:43-06:00
description: "Debug your Node.js app without having to buy or install other tools."
draft: false
image: "https://i.imgur.com/1arT8Ho.jpg"
layout: post
metaKeywords: "js, nodejs, node, node.js, debug, step into, test, debugger, inspect"
tags:
- "js"
- "nodejs"
- "debugging"
title: "Debug Node with Built-in Tools"
---

Node has a built-in debugger.  It requires no extra tooling or purchased IDE.  Try it out.  It's easy.

<!--more-->

## Commandline Debugging

Node's debug module is available in the terminal.  Normally you would start your app up with `node app.js`.  If you adjust it slightly, you'll be ready to debug:

```bash
node inspect app.js
```

Once you start the app this way, you'll see a debug prompt instead of your normal terminal prompt:

```bash
< Debugger listening on port 9229.
< ...
break in server.js:1
> 1 (function (exports, require, module, __filename, __dirname) { const http = require('http')
  2
  3 http.createServer((req, res) => {
debug>
```

You're debuggin'!

## Set Breakpoints

Previous to starting the debugger, you can set breakpoints inside your Node app by include `debugger` lines in your source code, like this:

```js
const http = require('http')

http.createServer((req, res) => {
  debugger

// ...
```

Now, if I execute this program using the `node inspect app.js` command, the first time the `debugger` line is hit, execution of the program will pause.  You can also set breakpoints and do other things from inside the debugger.

## Debug Control

To see what options you have inside debug mode, type: `help` in the debugger.

There are a few controls that any interactive debugger will have to help in navigation.  You can use the following:

- `sb` - set breakpoint - interactive equivalent of putting `debugger` in your source code
- `c` - continue - let the program execute until it encounters another breakpoint
- `n` - next - let the program advance to the next instruction
- `s` - step into - step into the next instruction (eg, inside a function call)
- `o` - step out - continue execution until the stack is popped

## Inspect Local Variables

One of the coolest things about interactive debugging is the ability to see what the values of variables are as the program runs.  To do this in the Node debugger, set a breakpoint at the place where you'd like to stop and look around, then let the program run.  Once you're paused at the right point, type `repl` into the debugger.  You've now entered a new repl mode.  Here, you can type the variable names of anything within scope and see the values printed to the screen.

For the source code above, we could pause and investigate:

```
break in server.js:4
  2
  3 http.createServer((req, res) => {
> 4   debugger
  5
debug> repl
Press Ctrl + C to leave debug repl
> req
{ _readableState: ReadableState,
  readable: true,
  domain: null,
  _events: EventHandlers,
  _eventsCount: 0,
  ... }
> req.url
'/'
```

To exit, press `Ctrl-c` once.

It's not a particularly beautiful UI, but it's keyboard accessible!  I like it because it's always available to use -- it's built-in tooling.  

What other ways do you do your debugging in Node?
