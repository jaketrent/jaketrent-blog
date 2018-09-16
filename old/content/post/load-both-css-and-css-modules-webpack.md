---
categories:
- "Code"
comments: true
date: 2017-05-22T06:51:25-06:00
description: "With a little webpack config, you can load both CSS stylesheets and CSS modules, no sweat."
draft: false
image: "https://i.imgur.com/IqJZE18.jpg"
layout: post
metaKeywords: "js, css, css-modules, webpack, load css modules, load traditional css, same webpack config"
tags:
- "js"
- "css"
- "css-modules"
- "webpack"
title: "Load Both CSS and CSS Modules With Webpack"
---

[CSS Modules](https://github.com/css-modules/css-modules) are das bombe, but you're still stuck in a land where the traditional CSS stylesheet exists, you may have to load both.  Here's a pattern that could potentially work for you.

<!--more-->

## Importing CSS

[Webpack](https://webpack.js.org/) is a tool for loading many different kinds of assets as modules into JavaScript.  This means, for instance, that you can import CSS into your JavaScript.  If you import a CSS module in this way, it'll allow you to use that module on a UI component that is built using JavaScript (eg, React):

```js
import css from './my-component.css'
import React from 'react'

const MyComponent = _ => <div className={css.someSelector}></div>
```

We can reference the `css.someSelector` from the `css` variable because it's a CSS module. 

Using Webpack, you can import a traditional CSS stylesheet in the same way:

```js
import './my-component.css'
import React from 'react'

const MyComponent = _ => <div className="someSelector"></div>
```

But the CSS is merely imported but not saved to a variable reference.  There's no need.  The CSS will be made available, usually via something like [`style-loader`](https://github.com/webpack-contrib/style-loader) in a stylesheet on the page.  Thus a simple `className="someSelector"` reference will be enough.

Those are the two worlds that we want to support.  These two methods are so different that they need to be loaded differently.

## Webpack Config

Webpack has a list of loader rules to determine how files get loaded as modules into your code.  Each rule is usually matched by file extension.  That is, the `*.css` files get loaded like stylesheets, and the `*.js` files get loaded like JavaScript code.  

Here we will only explore how to load CSS, but we have two totally different constructs for how our styles will be used: traditional stylesheet and CSS module.  We need to make another distinction to be able to load them differently.  We'll do something akin to making a new file extension by adding a file name suffix to the end of one of these types of files.  We'll choose the CSS module file names because CSS modules are the newcomer tech and a bit more specialized in their usage.  Here's the `webpack.config.js` snippet:

```js
{
  module: {
    rules: [
      {
        test: /^(?!.*?\.module).*\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.module\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      }
    ]
  }
}
```

Both `*.css` and `*.module.css` files are loaded using the [`css-loader`](https://github.com/webpack-contrib/css-loader), but the CSS modules are being loaded with a key extra option enabled: `modules: true`.

That first entry with the [gnarly regex](https://regex101.com/r/rS5uZp/1) is a "negative lookahead" that matches "`*.css` files that don't include a `.module` substring" file names.  If you don't include this negation of `*.module.css` files, your `*.module.css` files will go through both loader rules, causing an error.  Depending on your setup, another option might be to use the [`excludes`](https://webpack.js.org/configuration/module/#rule-exclude) option from Webpack.

Now both are loadable using the same tool in the same config.  All we need to do now is stay consistent in our file naming.

Are there other strategies you've taken to get the same support?
