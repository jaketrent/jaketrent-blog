---
categories:
- "Code"
comments: true
date: 2017-09-19T06:37:22-06:00
description: "How to render the current route's active links on the server."
draft: false
image: "https://i.imgur.com/0dHFUCG.jpg"
layout: post
metaKeywords: "react-router, render active state links on server, react-router ssr, react-router navlink activeclass, react reuse markup"
tags:
- "js"
- "react"
title: "Render Current Route Active Links on the Server"
---

How to render the current route's active links on the server.

<!--more-->

## Client-side Active Links

On the client, the tool you might usually reach for is the obvious one: `window.location`.  If my current location matches the link's intended location, I can style an anchor tag as active route.

This might look like:

```js
const Link = props =>
  <a {...props} className={window.location.pathname === props.href ? 'isActive' : null} />
```

## No Window on Server

The next problem we encounter, however, will be that `window` is not defined on the server.  So if we intend to server-render _and_ client-render our React app, we want to protect from this.

We might adjust the above code to be more safe:

```js
const Link = props =>
  <a {...props} className={typeof window != 'undefined' && window.location.pathname === props.href ? 'isActive' : null} />
```

This will allow us to check for the existence of window before we try to check its location.

This will work, but we can do better.

## Checksum the Markup

In the best case, React on the server calculates what the markup will be and we serve that to the client.  When we rehydrate that markup into a React app on the client, React can doesn't need to re-render on that initial load because everything was figured out beforehand on the server.  

To determine if the server state is renderable as-is, React calculates a checksum for the app on the server and compares it against current calculations on the client. If the checksum matches, no re-render is required.  If it is different, re-renders are made, and we're given this warning:

```txt
Warning: React attempted to reuse markup in a container but the checksum was invalid. This generally means that you are using server rendering and the markup generated on the server was not what the client was expecting. React injected new markup to compensate which works but you have lost many of the benefits of server rendering. Instead, figure out why the markup being generated is different on the client or server:
 (client) className="isActive"
 (server) className=""
```

This is a problem because `window` doesn't exist on the server but it does on the client, thus the `isActive` class is applied only on the client after the initial page load.

How do we solve this and render `isActive` appropriately on the server as well?

## Location on the Server Too

We need to check for `location` in a place that exists on the server too.

Remember that we're considering the initial state of the page.  This is the route that is called when the server is _requested_.  Therefore, on the server we can use our app server's current route (eg, something like Express' `request.url`).

## Check Location in One Way

Now that we know what to check, we need to get that `request.url` value to be available in the component. 

This can be accomplished in many ways.  One ways is via a React-friendly router, such as react-router.  react-router allows us access to the current route on the server and on the client via its `withRouter` wrapper.

Thus we can write our `Link` component this way:

```js
import { withRouter } from 'react-router'

const Link = withRouter(props =>
  <a {...props} className={props.location.pathname === props.href ? 'isActive' : null} />)
```

When we wrap our component in `withRouter`, `location` becomes available on `props.location`.

## Setting Up react-router

Now we just need to make sure that our app is rendered via react-router on the server and the client.  

On the server, we use react-router's `StaticRouter`, and we feed it the current request's url.  

If I was to code this in an Express request handler, it might look like:

```js
import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom'
import { StaticRouter, Route } from 'react-router'

import Link from './link'

const app = express()
app.get('/some/route', (req, res) => {
  ReactDOM.renderToString(
    <StaticRouter context={{}} url={req.url}>
      <Route path="/some/route" render={props => 
        <div>
          my app, etc, down to Link usage...
          <Link href="/some/route">A Link</Link>
        </div>
      } />
    </StaticRouter>
  )
})
// ...
```

When you render on the server this way, when `Link` is rendered, it will be populated with `props.location` from the router.

And now to setup the browser:

```js
import { BrowserRouter, Route } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'

import Link from './link'

ReactDOM.render(
  <BrowserRouter>
      <Route
        path="/some/route"
        render={props => 
        <div>
          my app, etc, down to Link usage...
          <Link href="/some/route">A Link</Link>
        </div>
      } />
  </BrowserRouter>,
  document.getElementById('app')
)
```

It looks the same in the browser, except the surrounding router is now `BrowserRouter` which looks to `window` for its location.

Now we should be setup for server and browser render.  What else would you do to make this setup better?
