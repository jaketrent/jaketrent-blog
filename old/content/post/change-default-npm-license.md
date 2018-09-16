---
layout: post
title: "Change Default NPM License"
date: "2016-03-24"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "npm"
description: Change your npm defaults for npm init
metaKeywords: npm init, npm init defaults, npm license
draft: false
image: https://i.imgur.com/P34k4L5.png
---

Npm has a fantastic init tool for creating the descriptor for your project.  It will gladly provide defaults for you.  These are sometimes helpful.  Wouldn't it be more better to define your own defaults?

<!--more-->

## Npm Init

If you're doing any JavaScript development, NPM is likely a helpful tool for your toolbox.  To add a descriptor with meta information, including things like 3rd-party project dependencies, you need a `package.json` for your project.  To get this file, you can edit it by hand or have one generated for you.  To generate it, run:

```
npm init
```

You will then be prompted to answer a series of relevant questions, such as:

```
name: (hello-riot)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
metaKeywords:
author:
license: (ISC)
...
```

The values in parenthesis are the defaults.  Defaults are determined from things like the directory you're in, the git repository you're in, etc.

## Set Npm Init Defaults

Some defaults are just the NPM-provided conventions.  They don't know much more to provide.  But you can provide your own defaults for your system by editing `~/.npmrc`.  Or you can use the cli to add to this file from the terminal.  For instance, the two I like to change are my author name and the license:

```
npm config set init-author-name "jaketrent"
npm config set init-license "MIT"
```

Now, you can init and just take the defaults without pressing enter to answer the question with:

```
npm -y
```

And what you get are the defaults you've already decided you like.

To know what other things you can change as defaults, use `npm help 7 config` and grep for `init-`-prefixed values.  Happy npm'ing!
