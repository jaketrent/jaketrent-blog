---
categories:
- "Code"
comments: true
date: 2017-06-03T06:38:36-06:00
description: "Postcss offers JS-based CSS processing.  It's easy to make a plugin for this system."
draft: false
image: "https://i.imgur.com/Z8lOQJZ.jpg"
layout: post
metaKeywords: ""
tags:
- "css"
- "postcss"
title: "How to Make a Postcss Plugin"
---

PostCSS offers JavaScript-based CSS processing.  It's easy to make a plugin for this system.  Let's do it!

<!--more-->

## What is PostCSS?

PostCSS is a system that uses Javascript to parse and process CSS.  This means that if your JS can adjust your CSS, you can use the new, zany, or made-up features of CSS. PostCSS can compile it down to browser-ready CSS.  This makes PostCSS a lot like the Babel.js of the CSS world. 

PostCSS has little in the way of CSS processors built into it.  You have to provide it an array of processor plugins that you want your CSS to pass through:  

```js
postcss([<yourProcessorsHere>])
```

PostCSS provides a common API for each of these plugins to talk and then orchestrates the process.

## Invoking PostCSS Programmatically

We'll look at the programmatic PostCSS API here, but there are other ways of interacting with PostCSS, such as Webpack's [postcss-loader](https://github.com/postcss/postcss-loader).

PostCSS is exported as a single function that takes as an argument an array of your plugins.  We'll feed it our custom plugin, `postcss-css-var-selectors` and one more to show chain-ability -- a popular one, [autoprefixer](https://github.com/postcss/autoprefixer).  It returns an object on which you can call `process`, passing your source CSS:

```js
const { promisify } = require('util')

const autoprefixer = require('autoprefixer')
const fs = require('fs')
const postcss = require('postcss')

const postcssCssVarSelectors = require('./postcss-css-var-selectors')

;(async _ => {
  const css = await fs.readFile('./source.css', 'utf8')
  const { processedCss } = 
    await postcss([postcssCssVarSelectors, autoprefixer]).process(css)
})()
```

As you can tell, the `postcss.process` function is async and returns a Promise.

## PostCSS Plugin Public API

A plugin signature is a function takes `options` and returns a function that processes PostCSS-parsed CSS:

```text
options -> css -> ()
```

The parsed CSS object is mutated in place (not returned).  `options` is simply a JS object that contains any options that you want your plugin to adjust to.

To tell PostCSS about your plugin, you'll have to register it before using it:

```js
const postcss = require('postcss')

postcss.plugin('css-var-selectors', options => {
  return css = {
    // ...
  }
})
```

The first argument to `postcss.plugin` is the name of your plugin.  By convention, plugins are prefixed with `postcss-` and have dashified names.  When you identify the name of your plugin in this function call, just drop the prefix. 

## Example PostCSS Plugin

I'm quickly going to show an implementation of a `postcss-css-var-selectors` plugin.  This plugin will convert cssnext variables into vanilla CSS utility classes.  That is, convert this:

```css
:root {
  --colorsRed: red;
  --colorsPurple: rebeccapurple;
}
```

into this:

```css
.colors-red { color: red; }
.colors-purple { color: rebeccapurple; }
```

There is an extensive and powerful [PostCSS API](http://api.postcss.org/global.html).  This example will showcase just a few important bits of the PostCSS API.  First, the source of `postcss-css-var-selectors.js`:

```js
const dashify = require('dashify')
const postcss = require('postcss')

const defaultOptions = {
  formatPropName(name, options) {
    const tests = Array.isArray(options.propNameTests) ? options.tests : []
    const match = tests.find(t => t.match.test(name))
    return match ? match.prop : options.defaultPropName || 'color'
  }
}

const createSelectorForVar = (decl, options) => {
  const prop = dashify(decl.prop)
  const value = decl.value
  return postcss.parse(`
.${prop} { ${options.formatPropName(decl.prop, options)}: ${value}; }
`)
}

module.exports = postcss.plugin('css-var-selectors', options => {
  return css => {
    options = Object.assign({}, defaultOptions, options)

    css.walkRules(rule => {
      rule.walkDecls((decl, i) => {
        const isCssVar = /^--/.test(decl.prop)
        if (isCssVar)
          decl.root().insertAfter(decl.root(), createSelectorForVar(decl, options))
      })

      const isCssVarRoot = rule.selector === ':root'
      if (isCssVarRoot) rule.remove()
    })
  }
})
```

A couple interesting bits:

- `css.walkRules` will allow you to iterate through all the CSS selectors
- `css.walkDecls` will allow you to iterate through all the attributes per selector
- You can create a new selector (PostCSS `Node`) by invoking `postcss.parse` on a string of new CSS you dream up. For example: `postcss.parse('a { color: inherit }')`.

And just for completeness of the example, here are the options for making the formatting conversion that you might pass:

```
const propNameTests = [{ match: /colors/, prop: 'color' }]
// ...
const { processedCss } = await postcss([
    postcssCssVarSelectors({ propNameTests }), 
    autoprefixer
  ]).process(css)
```

Now this is just an example of what a particular plugin might do to process CSS.  Your plugin can be whatever you need or whatever you imagination dreams up.

What else have you done with PostCSS plugins?  And how else have you constructed them that has worked well for you?
