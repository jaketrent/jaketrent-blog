---
categories:
- "Code"
comments: true
date: 2017-05-16T07:38:13-06:00
description: "If you use React to render your static site and browser app, you'll need routing to work in both places."
draft: false
image: "https://i.imgur.com/XFiva32.jpg"
layout: post
metaKeywords: "js, react, react router, static site, webpack, static-site-generator-webpack-plugin"
tags:
- "js"
- "react"
- "react-router"
- "static-site"
- "webpack"
title: "Routing in React in a Static Site and Browser"
---

If you use React to render your static site and browser app, you'll need routing to work in both places.  With a little setup, you're golden.

<!--more-->

## Generate a Static Site from React

React is most commonly used to render in-browser single page apps.  But the React component abstraction so pleasant to work in that some want it in the server realm as well.  In this case, we want to use React to help us pre-render our entire site as a static site that we can deploy it as pure html.

To accomplish this, we'll use Webpack and a Webpack plugin, `static-site-generator-webpack-plugin`.  We won't cover all the [`module.rules`](https://webpack.js.org/configuration/module/) setup for loaders for React and what not, but you'll still have to do that.  We'll focus on the Webpack setup that the static site requires.

First, install the plugin:

```bash
npm install static-site-generator-webpack-plugin --save-dev
```

And add it to your `plugins` list in your `webpack.config.js`:

```js
{
  plugins: [
    new StaticSiteGeneratorPlugin({
      crawl: true
    })
  ]
}
```

Your `webpack.config.js` also includes an entry point.  Make this the entry point of your site where React will call render.  The give out output directory for where you want the static files to end up. Something like this:

```js
import path from 'path'

// ...
{
  entry: 'index.js',
  output: {
    filename: 'index.js',
    path: path.resolve('dist'),
    libraryTarget: 'umd'
  }
}
```

## react-router on the Server

The entry point for the `StaticSiteGeneratorPlugin` is a little different than most React app entry points.  It needs to be a module that has a default export of a function that takes a `locals` argument from the plugin:

```js
export default locals => {}
```

Inside the function, we're going to engage the router.  We could route a number of ways.  Why not use the venerable `react-router` which supports server-side routing?  So go'on, install it:

```js
npm install react-router-dom --save-dev
```

We'll use its `StaticRouter`.  To tell the router which route the `StaticSiteGeneratorPlugin` is trying to render, we need to pass it a `location` prop.  The `locals` argument to our function has that exact information in `locals.path`:

```js
import { StaticRouter, Route } from 'react-router-dom'

export default locals =>
  <StaticRouter location={locals.path} context={{}}></StaticRouter>
```

We also supply `StaticRouter` a `context` prop with an empty object to keep the router from whining at us.

The routes for our site are defined just like any other React app that uses `react-router-dom`:

```js
const routes = (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
  </div>
)
```

That errant wrapping `<div />` is so `react-router` will be happy with a single element as a child of `StaticRouter`.

Finally, we realize that what usually exists in a React app, a pre-made `index.html` for bootstrapping our application on to, doesn't exist.  So we'll make a React component that represents just that:

```js
const Html = props =>
  <html>
    <head><title>My Static Site</title></head>
    <body>
      <div id="app">
        {props.children}
      </div>
      <script src="/index.js"></script>
    </body> 
  </html>
```

Now let's put it all together.  To get the `routes` to work, we have to nest them within `StaticRouter`.  Then we need to make sure to call `ReactDOMServer.renderToString` to get the static html to be generated.  All together now:

```js
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, Route } from 'react-router-dom'

export default locals =>
  ReactDOMServer.renderToString(
    <StaticRouter location={locals.path} context={{}}>
      <Html>
        {routes}
      </Html>
    </StaticRouter>
  )
```

Now if we run the site generation with the command `webpack` in the terminal, we will look in our `dist/` directory and behold:

- An `index.html` file for our `Home` view
- An `about/index.html` file for our `About` view 
- An `index.js` file for the generated JavaScript

Because the `StaticSiteGeneratorPlugin`'s `crawl: true` mode was on in our `webpack.config.js`, it started a path at `/` and followed links from there.  Presumably we had some `ReactRouterDOM.Link` components for nav to the other pages in our site (ie, the `/about` page) for this to work.

Now the files are generated, and we're ready to go.  Well, almost.  What if we want to have an active client-side React app in the browser?  At this point, it won't happen. We'll need to add something to make that work as well.

## react-router in the Browser

If we pop open our `dist/index.html`, we'll see that we are including a `<script src="/index.js"></script>` at the bottom of our markup.  But this isn't actually running anything when the browser interprets it.  Remember that when we defined our app's entry point for the `StaticSiteGeneratorPlugin`, we exposed a function (`export default locals => {}`).  But we need some code to run when the file's interpreted on the page, and we don't have that yet.  But we do have a whole app that knows how to respond to a router and routes, and now we have a browser, so let's use `BrowserRouter` from `react-router-dom`.

At the bottom of our site's `index.js` file, let's insert our addition:

```js
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'

//...

if (typeof document != 'undefined') {
  ReactDOM.render(
    <BrowserRouter>{routes}</BrowserRouter>,
    document.getElementById('app')
  )
}
```

A few things to note:

- We check to see if `document` exists before we run this code.  If it does exist, it means there's a DOM -- we're in the browser.  This check keeps the `document.getElementById` call from bombing in the server render.
- We are not wrapping the `routes` with the `<Html />` component here.  This is because the HTML is on the page already from static render time.

Since this code is not wrapped in a function, it'll execute as soon as it's included on the page.  `ReactDOM.render` will be called, and we'll now be able to have React handle things for us in the browser (eg, `onClick` or anything interactive).

It took a bit of doing, and now we have an `index.js` file that is the entry point for a static server-rendered site and the live browser app as well.  

What's your approach to this kind of thing?  What could we do to adjust this to be even better?
