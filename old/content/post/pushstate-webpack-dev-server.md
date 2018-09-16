---
layout: post
title: "pushState with webpack-dev-server"
date: "2015-05-20"
comments: true
categories:
  - "Code"
tags:
  - "webpack"
  - "js"
description: Webpack's dev server for static assets can be quickly configured to handle JavaScript history api pushState.
metaKeywords: webpack, webpack-dev-server, pushState, history api, client router
draft: false
image: https://i.imgur.com/x0m2sTq.jpg
---

Webpack has a jolly little server for your development environment called [`webpack-dev-server`](http://webpack.github.io/docs/webpack-dev-server.html).  With a touch of configuration, it can be convinced to handle JavaScript history API pushState.

<!--more-->

## webpack-dev-server

Webpack is fast.  But once you have a growing number of static assets to process and a increasily-complex asset pipeline, you may wish for a faster build lifecycle in development mode.  [`webpack-dev-server`](http://webpack.github.io/docs/webpack-dev-server.html) was created for such a purpose.  

It is a small `express` app that handles building your assets according to your webpack configuration, keeping them in memory, and doing so automatically as you change your source files.

## html-webpack-plugin

In addition to webpack taking care of static assets like css and js for me, in dev mode I'll often include the [`html-webpack-plugin`](https://www.npmjs.com/package/html-webpack-plugin).  

This plugin generates an `index.html` file for you that will keep up to date with the correct references to your assets built inside of `webpack-dev-server`.  Use of this plugin is perfect in situations where you're building a client-side app that just needs a single html file to bootstrap on top of.

## History API

The [history API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history#Adding_and_modifying_history_entries) allows the browser to locally handle url changes that would usually signal a need to go back to the server for resources.  This allows client-side apps to include routers that can navigate from urls like `http://localhost:3000/one-place` to `http://localhost:3000/another` instead of having to use the url hash (eg, `http://localhost:3000#/one-place`).

## All routes to `index.html`

By default, `webpack-dev-server` is setup to serve assets directly from the http requests received.  For instance, if my `webpack-dev-server` was running on port `3000`, and my `webpack.config.js` was setup so that I was building a `main.js` for my application, I could make a request to get that build asset via `http://localhost:3000/main.js`.  

Likewise, if I'm using the `html-webpack-plugin`, I can make a request to `http://localhost:3000/` to get my `index.html` file, which contains the `script` tag to bootstrap my app -- again, likely something like `main.js`.

But if my app has a client-side router that is using the history API, how do I get `webpack-dev-server` to differentiate a client-side route from an asset request to `http://localhost:3000`?

## `historyApiFallback` Option

It turns out that we're in luck.  `webpack-dev-server` includes a useful option named `historyApiFallback`.  If this boolean flag is set to true, all requests to the `webpack-dev-server` that do not map to an existing asset will instead by routed straight to `/`, that is, the `index.html` file.  

This is exactly what we want.  If we want more customization in the fallback routes, we can specify that as well.  Internally, `webpack-dev-server` uses [`connect-history-api-fallback`](https://github.com/bripkens/connect-history-api-fallback) which takes several options.

These options include overriding the name of the index file or rerouting certain request url patterns to different html files in the case you have multiples.  These options can be set by passing an object to `historyApiFallback` instead of a boolean flag.

Finally, in order to not have to type this every time you want to run the `webpack-dev-server` cli, you can specify all of these options in the `webpack-config.js` under the `devServer` attribute.  

The simple example looks like this in `webpack-config.js`:

```js
{
  //...
  devServer: {
    port: 3000,
    historyApiFallback: true
  }
}
```

A more complex example might look something like:

```js
{
  //...
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: 'default.html',
      rewrites: [
        { from: /\/soccer/, to: '/soccer.html'}
      ]
    }
  }
}
```

Given the above configuration, routes like `/one-place` and `/another` would go to `/`, which is backed by the `default.html` markup.  Routes like `/soccer/schedule` or `/soccer/games/123` would go to `soccer.html`.

So, you don't need to write your own proxy.  The option is built in for you.  webpack excites again!

What other things have you been surprised that webpack already does for you?
