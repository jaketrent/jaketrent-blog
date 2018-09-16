---
layout: post
title: "List Npm Scripts"
date: "2015-03-02"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "npm"
  - "nodejs"
description: A CLI tool that will help you list available npm scripts to run.
metaKeywords: npm, scripts, node, rake -T, list scripts, cli
draft: false
image: https://i.imgur.com/ZDCd9u1.png
---

Tools for storing and then later easily running scripts alias names are awesome.  Npm is one of those tools.  Rake is another.  Rake has a cool feature of allowing you to list the scripts available to you.  Npm has not -- until now.

<!--more-->

## Npm Scripts

You can specify scripts in your `package.json` for later use.  They go in the `scripts` attribute:

```json
{
  "scripts": {
    "start": "node server.js",
    "dist": "webpack -p"
  }
}
```

To run these scripts, you use the [`npm run`](https://docs.npmjs.com/cli/run-script) command.  For example, type `npm run build` to actually execute the `webpack -p` command in your terminal.  `start` and `test` are specially commands to npm and do not require `run`.  Instead, you can use `npm start`.

## Npm List Scripts

In Rake, you run `rake -T` in your terminal and all the available scripts for your project are displayed.  This allows you to see the what's potentially helpful.  You can't be expected to remember all of them, especially months later, right?

I certainly was having a hard time remembering all of my scripts and getting tired of typing `cat package.json`.  It didn't feel as cool as the `rake -T` experience.  I wrote a library called [`npm-ls-scripts`](https://www.npmjs.com/package/npm-ls-scripts).  To install, run:

```bash
npm install npm-ls-scripts -g
```

I like installing this package globally because then the CLI binary is available globally -- it does seem applicable to all projects.  You could instead include it under project `devDependencies` if you'd like.

If installed globally, you can then run it with:

```bash
ls-scripts
```

If I was to run this in the above project, it would print:

```bash
NPM - ls scripts
---
start - node server.js
dist - webpack -p
---
```

This prints the exact code that can be executed for each script.  If I would like to add some prose around any or all of the available scripts, I can do so by adding more config data to my `package.json` that will print when I run `ls-scripts`:

```json
{
  "config": {
    "scripts: {
       "dist": "Builds project for distribution"
    }
  }
}
```

Now if I were to run the `ls-scripts` command, I would see:

```bash
NPM - ls scripts
---
start - node server.js
dist - Builds project for distribution
---
```

Cool, right?  Complete with Shakespearean prose.

## New: Npm Run

After I had developed the above `npm-ls-scripts` tool, Npm built this feature natively into the core tool -- finally!  Now, to list available scripts, the command is intuitively to leave off the target script and instead simply type:

```bash
npm run
```

On the above example, this would yield:

```bash
Available scripts in the package:
  start
    node server.js
  dist
    webpack -p
```

So, they work about the same, and now it's built in!  What other cool features could you imagine this having?

