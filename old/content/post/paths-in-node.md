---
categories:
- "Code"
comments: true
date: 2017-05-10T05:02:42-06:00
description: "There is a great path api in Node.  Still, you can get mixed up in how to get the right path.  Let's break it down."
draft: false
image: "https://i.imgur.com/1arT8Ho.jpg"
layout: post
metaKeywords: "js, node, node.js, file path, relative path, absolute path, directory"
tags:
- "js"
- "nodejs"
title: "Paths in Node"
---

There is a great path API in Node.  Still, you can get mixed up in how to specify the correct path.  Let's break down a few options.

<!--more-->

## OS-agnostic Paths

All OSes have a file structure, where directories are nested within directories, with files existing in each.  But between OSes there is a difference in the symbol used to separate directory names.  When showing a file path in MacOS or Linux, forward slash `/` is used, as in `dev/magic.txt`.  In Windows, back slash `\` is used, as in `dev\magic.txt`.

You don't need to detect which OS you're on yourself.  Node will do that for you and then provide you with the correct file separator if you use this API:

```js
const path = require('path')

path.join('dev', 'magic.txt')
```

On Mac, this would output:

```txt
"dev/magic.txt"
```

## Process-relative Paths

Let's say that we're opening a file from within our Node app, so we need to specify a file path.  The code we're executing is in a module called `util/file-opener.js`, and the file we want is `files/secret-numbers.txt`.  The app was started in the project root directory, calling `Node app.js`.  What is the path that `file-opener.js` should use to access `secret-numbers.txt`?:

```
.
├── app.js
├── files
│   └── secret-numbers.txt
└── util
    └── file-opener.js
```

The answer is `path.join('files', 'secret-numbers.txt')`.  The reason is that by default relative paths are relative to where the process is being run from.  The entry point for the application is in the root project directory.  Paths will simply be subdirectories from there in this example.

## File-relative Paths

Sometimes it's confusing to consider where the app process is running from. Sometimes that has the potential to change over time, so you don't want to couple file paths to that fact.  Sometimes it can be easier to think about the path relative to the module that you're *accessing* the file from.  In this case, this means the relative path from `file-opener.js` to `secret-numbers.txt`.

There is another global variable in Node that allows us to know what directory or path the current module is in.  Thus, we can navigate from inside the `util` directory out and into the `files` directory using a relative file from `__dirname`, the current directory:

```js
path.join(__dirname, '..', 'files')
```

## Absolute Paths

Many times, relative paths will be just fine.  But there are some APIs that require an absolute path.  That should be easy to get.  You may know an absolute path that you are willing to hard code into your program.  But often you want to avoid that, since your program might run on a different host machines, and then that absolute path is likely wrong.  

To get an absolute path, start with a relative path, and have Node convert it for you with `path.resolve`.  If run from the `util` directory:

```js
const path = require('path')

path.resolve(path.join(__dirname, '..', 'files'))
```

...will output something like:

```txt
/Users/jaketrent/dev/secret-tunnels-project/files
```

With those basic tools and understanding, you're ready to blaze some paths all over your app.  Are there any other ways of approaching pathing that helps you keep it straight?  Are there other Node APIs that you find useful in this regard?


