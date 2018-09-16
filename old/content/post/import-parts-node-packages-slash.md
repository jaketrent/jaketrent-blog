---
categories:
- "Code"
comments: true
date: 2017-06-01T07:31:55-06:00
description: "How to use a slash in the Node package import statement to get only a part of the package."
draft: false
image: "https://image.ibb.co/dTFGNa/slashes.jpg"
layout: post
metaKeywords: "js, nodejs, pacakges with slash in name, import subpackage, split module, split package"
tags:
- "js"
- "nodejs"
title: "Import Parts of Node Packages with Slash"
---

There are a couple ways to split up and import parts of Node packages.  Using a slash (`/`) in the import statement is one of them.

<!--more-->

## Main Entry Point

In the `package.json` for a Node package, the entry point of the package is defined in the `main` attribute:

```json
{
  "name": "some-package",
  "main": "index.js"
}
```

This defines the file that will be linked to when importing the package by name -- here called `some-package`. A common entry point is an `index.js` file in the root of the package:

```
├── index.js
└── package.json
```

From there we can do other interesting things in an import.

## Slash in the Require Statement 

Node packages are conventionally small and focused, and this is good.  Sometimes, however, it makes sense to group similar things in a package and publish them together.  If a package is a collection of things published together, there is going to be a user someday who doesn't want that whole collection.  Or perhaps they just want to conveniently import the subset of features that they want at that moment.

One way to get this subset of the package is to use a slash in the require statement.  Imagine such a statement:

```js
const subThing = require('some-package/sub-thing')
```

Because Node `require` statements use the filesystem as an API for addressing package locations, we can deduce that `sub-thing` is one of two places:

- `./sub-thing.js`
- `./sub-thing/index.js`

If you want to allow the users of your package to import subsets of your package this way, make them easily addressable on the filesystem.  

## Make Deep Directories Easy

Sometimes, if you have a more complicated directory/file setup, you'll want to create some convenience for users that want to import things this way.  Let's say that `buried.js` is deep in the directory structure, but you want it importable via `require('some-package/convenience')`.  You might set this up as:

```
├── convenience.js
├── deep
│   └── deeper
│       └── buried.js
├── index.js
└── package.json
```

Where `convenience.js` contains:

```js
module.exports = require('./deep/deeper/buried')
```

Do you import packages with slashes in this way?  Do you think it's a good thing to do?  When you publish your next package, is there some convenience for this method you could provide? 
