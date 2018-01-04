---
categories:
- "Code"
comments: true
date: 2018-01-03T17:02:59-07:00
description: "How to setup webpack to run Svelte component css through postcss."
draft: false
image: "https://i.imgur.com/v4k3TtH.jpg"
layout: post
metaKeywords: "svelte, svelte scss, svelte postcss, svelte css preprocessing, webpack"
tags:
- "svelte"
- "postcss"
title: "Preprocess Svelte Components with Postcss"
---

Here's a way to setup webpack to run Svelte component css through postcss.

<!--more-->

## Svelte CSS Preprocessing

Svelte is a magical disappearing framework for authoring ui components for the browser.  And it took a bit of magic to get preproocessing working right.

Svelte takes the approach of web components and polymer in that it puts all your markup, styles, and scripts in one file.  

Recently, Svelte has added the ability to preprocess each of these parts of your component files.  This is done by providing the svelte compiler with hooks for `markup`, `style`, or `script` respectively.

## CSSNext in Svelte

I like the idea of writing css in my components.  But I also want to write the latest/greatest css.  For that, I'll use some [cssnext](http://cssnext.io/).  But this won't work in all browsers yet, so it needs preprocessed.

As a simple example, I might want my css to be able to import 3rd party css from npm or transpile away variable usage in this kind of css code in my `src/badge.html` svelte component file.

```html
<style>
@import "@pluralsight/ps-design-system-core";
.badge {
  display: inline-block;
  color: #fff;
}
.badge--color-red {
  background-color: var(--psColorsRed);
}
</style>
```

But to do that, we'll need a little configuration.  For the build, I'll use Webpack.  I'll use [`svelte-loader`](https://github.com/sveltejs/svelte-loader) to compile the Svelte component.

For the css, Svelte gives us a couple options: make the compiled component js dynamically add `style` tags for css upon DOM insertion or export a `.css` file with all styles at build time.

Based on the option you pick, your Webpack setup will be different.  Here are both methods:

## Method 1: Components Insert Styles

For this option, we are going to only need `svelte-loader`, and we'll set it up to preprocess its own styles via the svelte preprocessor hook.  In `webpack.config.js`, we'll write:

```js
const path = require('path')
const postcss = require('postcss')
const postcssCssnext = require('postcss-cssnext')
const postcssImport = require('postcss-import')
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(html|svelte)$/,
        include: [path.resolve('src')],
        use: [
          {
            loader: 'svelte-loader',
            options: {
              style: ({ content, attributes, filename }) => {
                return postcss([
                  postcssImport,
                  postcssCssnext({
                    browsers: ['Last 2 versions', 'IE >= 11']
                  })
                ])
                  .process(content, { from: filename })
                  .then(result => {
                    return { code: result.css, map: null }
                  })
                  .catch(err => {
                    console.log('failed to preprocess style', err)
                    return
                  })
              }
            }
          }
        ]
      }
    ]
  }
}
```

Note that `options` for `svelte-loader` receives a `style` hook.  Inside that function, the source css is passed as `content`.  That `content` is what we pass to the `postcss.process` function.

If the `style` hook returns nothing, no preprocessing will happen, so make sure to return the Promise of the `postcss.process` call.  The shape of the data returned by the Promise must be `{ code: 'new css string', map: {} }`.  This code disregards the source map because currently Svelte does too.

This `postcss.process` call is happening per file, and that file directory context is provded to the `postcss-import` plugin (and others that need it) via the `from` option passed to the `postcss.process` call.

Run `webpack` and the outputted `.js` file should contain code to insert the postcss-processed css.

## Method 2: Emit External CSS

For performance reasons, you might like to build an external `.css` file instead of doing dynamic style insertions at runtime.  For this, we're going to setup our loaders differently.  

First, we'll add an `emitCss: true` option to the `svelte-loader`:

```js
const path = require('path')
const postcssCssnext = require('postcss-cssnext')
const postcssImport = require('postcss-import')
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(html|svelte)$/,
        include: [path.resolve('src')],
        use: [
          {
            loader: 'svelte-loader',
            options: {
              emitCss: true
            }
          }
        ]
      }
    ]
  }
}
````

You'll also notice that the config for preprocessing doesn't exist in the `svelte-loader` options any more.  It has moved and changed a bit.

Instead, now we use a CSS loader chain like you might be more used to.  Add this to your `webpack.config.js` `module.rules`:

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// ...
{
  test: /\.css$/,
  exclude: /node_modules/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: { modules: true, sourceMap: true }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            postcssImport({
              addModulesDirectories: [
                path.resolve(path.join(__dirname, 'node_modules'))
              ]
            }),
            postcssCssnext
          ]
        }
      }
    ]
  })
}
```

And this bit in your `plugins` portion of `webpack.config.js`:

```js
plugins: [
  new ExtractTextPlugin('styles.css'),
]
```

There are a few important bits to note here.

We are using `exclude` over the more precise `include` option on the loader because of the fact that the `svelte-loader` is emitting our CSS into temporary directories (like `/private/var/folders/77/58asdf/T/svelte-183827797.css`) for preprocessing before the final webpack output destination.  Since we don't know where that temp directory will be, we can't include it and will thus exclude what we know we don't want processed by this loader.

The fact of the temp directories causes us to have to do additional config to the `postcss-import` plugin.  We have to show it where our project's `node_modules` directory is because when preprocessing happens in the temp directory, the module resolution process can't do what it usually does by default -- recursively traverse `node_modules` directories from `process.cwd()`.  This is because the file's not even in our project's directory tree.

Using this mode of configuration, after we run `webpack`, we should see a `styles.css` file output with our processed stylesheet.

That should do it, and I'm happy that it works.  For a working codebase that's has working svelte postcss processing, check out my [svelte-with-react](https://github.com/jaketrent/svelte-with-react) repo.

Do you have a slick way to setup CSS preprocessing in Svelte?
