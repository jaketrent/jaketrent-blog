---
categories:
- "Code"
comments: true
date: 2017-08-05T16:03:22-06:00
description: "Here's a way to setup for types on a Node.js backend app."
draft: false
image: "https://i.imgur.com/k7PwB77.jpg"
layout: post
metaKeywords: "flowtype node.js, type node.js, transpile node, npm script flowtype"
tags:
- "nodejs"
- "flowtype"
title: "Setup Flowtype for a Node.js Backend"
---

Here's a way to setup for types on a Node.js backend app.

<!--more-->

## Flowtype Requires Transpilation

[Flowtype](https://flow.org/) will provide types for JavaScript, which originally has so little type information that it has essentially none.

You'll need to transpile from flowtyped-javascript into vanilla javascript that Node can run.

My favorite compiler for this is [babel](http://babeljs.io/).

## Lightweight Babel

The great thing about Node these days is that most of the time, you don't need to compile at all.  With flowtype, you will need to compile.  

The most lightweight babel integration we can get is via [`babel-cli`](https://babeljs.io/docs/usage/cli/).

First, install it.  While we're add it, grab the babel preset for flowtype:

```bash
npm install babel-cli babel-preset-flow --save-dev
```

To compile, run the cli in your terminal:

```bash
babel src/ --out-dir dist/ --no-babelrc --presets=flow --ignore spec.js
```

This will take all the Node code in the `src/` directory, compile it, and save it to the `dist/` directory.  Note that the babel preset we're using will remove the flowtype annotations, making our code again runnable in the Node.js runtime.

## Development Build

In your local dev environment, you'll want changes that you make in source code immediately transpiled and run by Node. Let's setup an npm script to help.

We'll first install another couple [useful helper](/post/some-helpful-packages-npm-scripts/)s:

```bash
npm install concurrently nodemon --save-dev
```

`concurrently` helps us run multiple processes at once.  `nodemon` will take care of restarting our Node server when code changes.

And then setup our `package.json` snippet:

```json
"scripts": {
  "build": "babel src/ --out-dir dist/ --no-babelrc --presets=flow --ignore spec.js ",
  "dev": "concurrently \"npm run build -- --watch\" \"nodemon dist/server.js\"",
}
```

Now if we run `npm run dev`, we'll get our compiled code running in Node.  Note that we're passing the extra `--watch` flag to the `build` script to enable this.  Also note that this assumes your app's entry point is `server.js`.

## Production Build

The production build setup is going to be even easier. 

Let's assume that we're deploying to the heroku.  We want to add a script that will run after we push new code to our server.  Heroku's version of this is called `heroku-postbuild`.  Again, in `package.json`:

```json
"scripts": {
  "heroku-postbuild": "npm run build",
  "start": "node server/dist"
},
```

We run the build after the server deploy, and we start our app by pointing to our compiled code.

Now we're set to add types via flow to our backend code.  Does this setup work well for you?  What have you done to make it even more slick?
