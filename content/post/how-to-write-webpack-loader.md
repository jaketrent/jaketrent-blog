---
categories:
- "Code"
comments: true
date: 2017-05-03T07:30:01-06:00
description: "There are many useful webpack loaders.  But sometimes you need something special, and it's easy to write your own."
draft: false
image: "https://i.imgur.com/z6INGGW.jpg"
layout: post
metaKeywords: "js, webpack, loader, webpack loader, custom loader, loader function"
tags:
- "js"
- "webpack"
title: "How to Write a Webpack Loader"
---

There are many useful webpack loaders.  But sometimes you need something special, and it's easy to write your own.

<!--more-->

## What is a Loader

Webpack is all modules all the time.  It utilizes plugin-like code, called loaders, to gain additional functionality.  Webpack will take a file at a file path and load the contents of the file as a string into memory.  Depending on the types of files that a loader is meant to read, it will interpret and transform the contents differently.  For instance, the [`css-loader`](https://www.npmjs.com/package/css-loader) is used to read and interpret CSS stylesheets.  Loaders can be chained together, much like Unix pipes, where the output of the previous loader will feed into the next and so on.  At the end of the chain, a string must be produced.  Webpack will make this output available as a module to calling the program.

## Loaders in Webpack Config 

Loaders are the main event inside a `webpack.config.js` file.  We match certain file types, usually by file extension, to the loaders we want to process them:

```js
modules: {
  rules: [{
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader']
  }]
}
```

The loader chain above will be used to process `*.css` files.  The loader chain is read from right to left.  `postcss-loader` is first, then `css-loader`, then `style-loader`.

## Resolve Custom Webpack Loader

What if we wanted to add an additional Webpack loader to this chain?  The catch might be that there is no webpack [loader in npm](https://www.npmjs.com/search?q=loader) that fits our need.  So we decide to write our own.  In this particular scenario, what exists already above is a very featureful loader chain for processing CSS, so we'll be hard-pressed to make something up.  But that hasn't stopped me before.  We'll go with a minimal transform example in this case.

### Choose a Custom Loader Name

First, choose a name for your loader, and just add it to your loader chain:

```js
use: ['style-loader', 'css-loader', 'postcss-loader', 'parent-scope-loader']
```

### Resolve the Loader Name

Now we have a new name for our loader, but webpack doesn't know where the implementation is.  We'll solve this by adding this to our `webpack.config.js`:

```js
  const path = require('path')
  // ....

  resolveLoader: {
    alias: {
      'parent-scope-loader': path.join(__dirname, 'utils', 'parent-scope-loader.js')
    }
  }
```

This alias will match the name to the implementation file.

### Implement your Custom Loader

The most important part is to actually write your loader.  We'll do that now, in the `parent-scope-loader.js` file, matching the location of the path that we specified in our `resolveLoader.alias` declaration above.  This particular example loader will add a parent selector, nesting all existing selectors beneath it.  This is probably not a good idea to do in practice, but we'll use it to get a taste for transformations.

```js
module.exports = function parentScopeLoader(source) {
  return '.parent { ' + source + ' }'
}
```

A loader is simply a method that takes a string, the original source file contents (or output from the previous loader), and returns a new string (or other type), with the transform applied.  It can be more complicated than this, but this is the essence.

There are other things we could or should do to make this loader better.  For instance, we could give it an option to take a dynamic parent selector that's not just `.parent` every time.  That would be more useful. The [official docs](https://webpack.js.org/development/how-to-write-a-loader/) have some great guidelines on other things to consider when implementing your loader.

Once you have your new loader in the chain, you're ready to run webpack in your project:

```
webpack
```

You new customer loader function will be called on imported `*.css` files, and the transformations will be glorious.

What are the coolest custom webpack loaders that you've had to write to get your project to do what you wanted to do?
