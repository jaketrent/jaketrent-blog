---
categories:
- "Code"
comments: true
date: 2017-05-24T07:33:20-06:00
description: "Next.js is a framework for writing server-rendered React apps."
draft: false
image: "https://i.imgur.com/sxESnvo.png"
layout: post
metaKeywords: "js, react, server-side react, react node framework"
tags:
- "js"
- "nextjs"
- "nodejs"
- "react"
- "server-rendering"
- "universal-rendering"
title: "What is Next.js?"
---

[Next.js](https://github.com/zeit/next.js/) is a framework that most notably allows you to write server-rendered React apps easily -- amongst other cool things.

<!--more-->

## It's a Framework

Next.js is opinionated and provides structure for how you build your app.  Like Rails, the file-system is often the API.  You name your file something special and put it in a special directory, and it Just Works.  In this way, Next.js feels like a framework.

## The Main Event: Server-Rendering

Anyone can create an `index.html` page and call `ReactDOM.render` on it to get a client-side React app running.  Something that simple hasn't existed for the server.  Next.js attempts to be that thing.  "Put a file in this directory," it muses, "and I will create a Node.js server that renders that React component as HTML at this route".  And it really does seem that easy.

Next.js allows for things like data-fetching and app state via Redux and all that.  But you must bring that stuff to the party yourself.  And it'll work just fine.  If your game is rendering HTML via React from server and client, Next.js has that all in the box.

## CSS 

The default CSS approach in Next.js is [styled-jsx](https://github.com/zeit/styled-jsx).  You define string blocks of CSS as a child `<style />` tag in the component you want the styles to apply to, a la:

```js
const MyComponent = _ =>
  <div>
    <p>Style only applies to this paragraph</p>
    <style jsx>{`
      p { color: red; }
    `}</style>
  </div>
```

In definition, this feels a lot like the defunct [scoped css](http://caniuse.com/#feat=style-scoped).  In practice, it outputs selectors that match data- attributes that Next.js adds to the component's HTML output:

```html
<p data-jsx="123456789">Style only applies to this paragraph</p>
<style>p[data-jsx="123456789"]</style>
```

There are (so many!) other options for CSS.  Your able to customize this to your own flavor.

## Pages

The most magical directory in a Next.js project is `/pages`.  This is where your top-level React component modules will live.  These files will be used to generate routes in your app.

If you have a `./pages/about.js` component file, your app will have an `/about` route that will execute the component in that file when requested.

These top-level components have a Next.js-specific lifecycle hook, called `getInitialProps`.  It has access to route-related data like the requets (`req`), response (`res`), etc.

Pages are cool because, with a couple exceptions, they feel just like any other React component.  A valid (and boring) About page component:

```js
export default _ => <div>The About page!</div>
```

## Routing and Splitting

Next.js does automatic code splitting.  The splitting is done at page boundaries.  This means that you can be certain that any page you request from your Next.js app only includes the JavaScript that is needed to run that page.  How nice to not have to configure that.

There are other cool things that Next.js provides in order to make this even better.  It has its own router that supports lazy loading.  It allows for dynamic route creation.  There is a `<Link />` component that allows adding an attribute, `<Link prefetch />` that will fetch the route contents and scripts for quick execution down those paths.

## Escape Hatches

The power of Next.js and any framework is the mileage it gets you if its use cases match up to yours.  You can use the framework happily, and it gives you what you want.  Use cases rarely match up 100% of the time.  Next.js seems to realize this and gives you some useful escape hatches to customize what the framework provides by default:

- You can use your customized CSS-in-JS solution, eg postcss
- You can add your data fetching library, eg [`isomorphic-fetch`](https://www.npmjs.com/package/isomorphic-fetch)
- You can add your app state management, eg redux
- You can add a type system, eg Typescript
- You can override the babel config
- You can override the webpack config
- You can provide your own error handling
- You can override some of the Next configuration, eg provide your own magic directories

I haven't used Next.js on anything worthy of interesting overrides, but I am glad for the forethought here.

## Easy Deployment

With all your app wrapped up nicely inside the Next.js framework, it's not surprising that it's easy to deploy.  Ahhhh, yes.  Love me something easy to deploy.  To get a Next.js app to Heroku, add three scripts to your `package.json`:

```
{
  "scripts": {
    "build": "next build",
    "start": "next start -p $PORT",
    "heroku-postbuild": "npm run build"
  }
}
```

Procure your app on Heroku and push your code, and you're one with the Internet.

```bash
heroku create my-next-app
git push heroku master
```

Next.js seems pretty impressive.  That React server render -- so easy!

What have you used Next.js for?  What do you think its sweet spot is?
