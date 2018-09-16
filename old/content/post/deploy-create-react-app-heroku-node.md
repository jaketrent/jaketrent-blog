---
layout: post
title: "Deploy create-react-app to Heroku on Node.js"
date: "2017-01-19"
comments: true
categories:
  - "Code"
tags:
  - "react"
  - "nodejs"
  - "heroku"
description: Create-react-app sets up your static asset build.  Now learn how to deploy that easily to an app server on Heroku.
metaKeywords: heroku, react, node.js, create-react-app, create react app, webpack, koa, express, deploy
draft: false
image: https://i.imgur.com/6DUwRKt.png
---

Create-react-app is Facebook's no-config solution to starting a React project.  This setup does not support a server out of the box.  You can create that easily enough.  Node.js can be a good choice for your app server.  Once it's made and functioning, you might want to deploy your static app and app server.  Here's a few tips on getting them up onto Heroku.

<!--more-->

## Two Builds

Create-react-app comes with two npm-scripts targets.  One is the live dev server that builds assets in a development configuration and serves them out of webpack-dev-server.  This is run with `npm start`.  When you're ready for prod, however, there is a `npm run build` script that will build all assets for a production setting.  In this configuration, it's up to you to provide the server to serve such assets.

## Serving Static Assets on Koa

Koa is a nice web framework for Node.js that is fun to write little app servers in.  If you want to tack on web server abilities like serving static assets, that's easy to do as well.  

Assuming that you have the basics of your koa server already going, you now want to:

```
npm install koa-static --static
```

Now you need to use the static middleware.  The main thing you need to know in order to use it is the location of your static assets.  When you previously ran `npm run build`, create-react-app puts the built files into a `build/` directory in the root of your project.  You want to point the middleware there:

```js
const koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = koa()
app.use(static(path.resolve('build')))
// ...
```

Now requests for static files that your app might make will route to that `build/` directory.  For instance, your main js bundle, probably called something like `/static/js/main.f682b6a1.js` will be addressable because of this middleware.  

It's important to note that the assets in the `build/` directory will only exists (or be updated) when `npm run build` is run.  The directory does *not* contain the live-updated assets that you might be used to seeing in your development cycle of changing a file, refreshing your browser, and getting the change.

## Serving Your React App

Since you've decided to serve all static assets via your app server, this includes the `index.html` which will bootstrap your React app.  Create-react-app is setup to build this file as well, depositing it at `build/index.html`.  You'll want a route in your app server that can serve this as the html that will request the other js and css static assets needed to get your React program fired up.

Koa has a nice helper for establishing route patterns.  Let's grab that:

```
npm install koa-route --save
```

And then setup our index route:

```js
const fs = require('fs')
const route = require('koa-route')

function* index() {
  this.body = fs.readFileSync(path.resolve(path.join('build', 'index.html')), 'utf8')
}

app.use(route.get('*', index))
```

The reason to map the index route to `*` instead of `/` is because your React app likely has *client*-side routes.  So if the client-side router has an `/about` route to the about page, you'll want a user to be able to deep link straight to that experience: the user refreshes the page, makes a request to your koa server at your domain, it doesn't have a server route for `/about`, but drops to the `*` route handler, serves the `index.html`, which invokes your React app, starting the client router, which has a route for `/about` and serves that UI via React.

## Build When Deploying

Now that you have an app that is served successfully from a koa server locally, you want to get that on Heroku.  That's one of the best things about Heroku: the ease with which you can put your app on the Internet.  Now you just need to get the deployment to automatically do what you did locally.  

After you pushed your app to Heroku, you could manually run:

```
heroku run npm run build
```

Then your static assets would be in the expected spot.  But you don't want to have to remember to do this every deploy.  Thankfully, Heroku gives you a nice hook to automatically do things after you run a deploy.  

In your `package.json` file, add a new script:

```json
{
  "scripts": {
    "heroku-postbuild": "npm run build"
  }
}
```

Commit and push this to Heroku, and you'll get your assets building automatically on every deploy.  Create-react-app with a Node.js server on Heroku will be yours!

Are there better or simpler ways that you've found to get this done?  


