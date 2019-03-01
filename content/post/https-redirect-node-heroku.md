---
layout: post
title: "Https Redirect for Node on Heroku"
date: "2013-02-26"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "nodejs"
  - "heroku"
  - "express"
description: Make a NodeJs app on Heroku redirect to an https address when it is not using one.
metaKeywords: js, nodejs, node, heroku, https, https redirect, express
draft: false
---

When your app requires users to be using the `https` protocol to make requests and get responses, it's helpful to have an automatic redirect so the user is always in the right place.  Here's how to do that for a Node Express app on Heroku.

![NodeJs Https Redirect](https://i.imgur.com/5rZ8H.png)

<!--more-->

## Secure Express Requests

The [Express](http://expressjs.com) request object has a bunch of great information.  One of its attributes is `secure`.  It's a boolean.  Usually, `secure == true` will mean that you're on `https`.  When that is not true, you're ready for a redirect.  

Unfortunately for apps hosted on Heroku, `request.secure` will always be false.  The way that Heroku routing works, it will just never be set.  

## Heroku Https Header

Instead, Heroku forwards an http header that allows us to do the same "is secure" test.  On Heroku, `request.header('x-forwarded-proto')` will contain the actual protocol string (eg, 'http' or 'https').

## Express Middleware SSL Redirect 

If you're using the Express framework on Node, then you have it easy.  There's already a great middleware mechanism for you to send any or all requests through.  If you set your Express app (v4) up like this:

```js
const app = express()
```

Then you can use the `app.use` functionality to specify a middleware.  Since I only have certificates and want the redirect to happen in the production environment, I will likewise wrap this middleware inside a `process.env.NODE_ENV` check for prod.  This redirect will be pretty rudimentary, but it's just that simple, so here it goes:

```js
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}
```

If it's not `https` already, redirect the same url on `https`.  If it is, that's what I want, and you can pass on through my middleware function.  Note that this middleware will protect *all* urls on the site with an `https` redirect.  Your middleware could be more selective.  You could even create this as a stacked middleware per route if you wanted.  We could even enhance our middleware to use inspect both the http header *and* the `secure` flag.

Heroku threw us a for a minor, unexpected loop, but it was nothing that we couldn't easily code for.
