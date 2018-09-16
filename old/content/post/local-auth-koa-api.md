---
categories:
- "Code"
comments: true
date: 2017-04-04T19:42:34-06:00
description: "Local auth for an API in Koa will take a few pieces working together.  Here's one way to do it."
draft: false
image: "https://i.imgur.com/k629FhL.jpg"
layout: post
metaKeywords: "local strategy, local auth, local user, koa, node, js, passport"
tags:
- "js"
- "nodejs"
- "koa"
- "api"
- "auth"
- "bcrypt"
title: "Local Authentication in a Koa API"
---

Local auth for an API in [koa](http://koajs.com/) will take a few pieces working together.  Here's one way to do it.

<!--more-->

## The Flow

We're going to require authentication on our rest APIs for a single page app web client.  We're going to maintain a session in the API.  If you're logged in, you have a session.  When a request is made to an API endpoint, a session cookie is passed.  In the API, the cookie value is used to lookup the session.  If there's a valid session matching the cookie, you're allowed to continue on an fetch the resource you addressed.  If there is not a valid session, it means you're not authenticated, and the an error response is sent back to the client.

## Session Libs

There are many libraries that will help you establish a sesssion.  We're going to use [`koa-generic-session`](https://github.com/koajs/generic-session).  This requires another library choice for the session store.  There are many options.  We're going to use postgres, so [`koa-pg-session`](https://github.com/TMiguelT/koa-pg-session) is a great choice.  

`koa-generic-session`, as of this writing, doesn't natively support koa v2 middleware, so you need to use [`koa-convert`](https://github.com/koajs/convert) to make it compatible.

We're also going to use [`koa-passport`](https://github.com/rkusa/koa-passport) to give us access to `login`, `logout`, and `isAuthenticated` functions.

Install them all:

```
npm install koa-generic-sesion koa-pg-session koa-convert koa-passport --save
```

## Session Store

I made a `auth/session.js` module:

```js
const PgStore = require('koa-pg-session')

const store = new PgStore(process.env.DATABASE_URL)

function init() {
  return sessionStore.setup()
}

exports.init = init
exports.store = store

```

A few things to note:

- It's important to connect your `PgStore` with a full database connection string, like: `postgres://username:password@host:port/database`.  Don't store this in source code.  We're loding this from the environment variable `DATABASE_URL`. 
- We expose `store` for use in multiple places later, and it's important that it's the same instance, so this is a singleton in our app. 
- We'll use `init` later... stay tuned. 

## Session Middleware Stack

Now it's a matter of getting your koa (v2, btw) middleware setup the correct way.  I'll lay out what I have in my `server/index.js` file first, and we'll talk through it:

```js
const convert = require('koa-convert')
const koa = require('koa')
const passport = require('koa-passport')
const session = require('koa-generic-session')

const { store } = require('./auth/session')

// ..
const app = new koa()
app.keys = [process.env.SECRET_KEY]
app.use(convert(session({
  cookie: {
    path: '/',
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
    rewrite: true,
    signed: true
  },
  key: 'myAppId',
  store
})))
app.use(passport.initialize())
app.use(passport.session())
// ..
```

- The setting of `app.keys` is for the cookie signing.  Make sure you have this set or you'll get a funky error saying that there's a cookie setting error and the key needs to be a Buffer.  (agh!)  For me, I'm setting this in an environment variable, `SECRET_KEY`.
- The first middleware is the `koa-generic-session` middleware.  Make sure you `convert` it to make it compatible with koa v2.
- The `cookie` attribute contains all the options for how cookies are set in the browser.  Notice we're setting `signed: true`, hence the need for `SECRET_KEY`.
- The `key` attribute is the cookie name, customizable by you.
- The `store` is the singleton `PgStore` that we instantiated in the `auth/session.js` module.  Remember to always use this one instance.

## Session Store Initialization

Before you start up your app and listen for incoming requests, you want to make sure that the `store` you plugged into your session middleware above is fully armed and operational.  To do this, make sure you're calling `store.setup()` and waiting until that async action is done before going on.  We wrapped this in the `auth/session.js` module's `init` function.  We might call that in this order:

```js
const session = require('./auth/session')

async function startApp() {
  await session.init()
  app.listen(process.env.PORT)
}
```

Now your app is fully initialized and ready to receive requests.  Now, to protect the endpoints.

## API Endpoint Authentication

To protect an endpoint, we are going to add a middleware that checks for the existence of a valid, active session.  First let's write that middleware in `auth/login.js`:

```js
module.exports = async function requireLogin(ctx, next) {
  if (ctx.isAuthenticated()) {
    await next()
  } else {
    ctx.status = 401
    ctx.body = {
      errors: [{ title: 'Login required', status: 401 }]
    }
  }
}
```

- `ctx.isAuthenticated` comes from `koa-passport`.  This is checking for a valid session.  
- If we are authenticated, let the request continue.
- If we are not authenticated, the request cannot continue, and we return a response of `401`, "Unauthorized".

Now let's use that middleware, putting it in front of a resource that we want to protect.  Let's say that our `/ringsofpower` are precious to us, so we want to require authentication there.  We might write this in the controller:

```
const koa = require('koa')
const route = require('koa-route')

const requireLogin = require('./auth/login')

const app = new koa()

// ..
app.use(requireLogin)
app.use(route.delete('/:id', mountDoom))
```

- We're using another library here, `koa-route`, which simply lets you define urls for your endpoints, mapping them to request handlers.  You definitely don't need this library for this to work, but it's really nice.
- `requireLogin` becomes the local alias for the `auth/login.js` function we wrote above.
- We stack `app.use(requireLogin)` before our precious resources later in the `app.use` stack in order to require its execution before anything else.

At this point, all of our requests will start to fail with `401`s because we haven't created any way to actually login and create a new session.

## Valid Users

To have a set of valid users, we'll need to create user records and store them in our database.  We will need to take extra care in storing passwords -- in fact, we'll just store password hashes, no more -- using [bcrypt](https://github.com/kelektiv/node.bcrypt.js).  For the down low on how this might look, check out the post [on storing local user passwords using bcrypt](/post/store-local-user-password-bcrypt/).  Once we have valid users in the system, we're ready to login.

## Logging In

We're assuming that your web app client has a UI for a user to enter their username and password.  We're just going to look at the server-side flow for logging in for now.  We're going to make a module, `auth/index.js` that will be the controller to create our new session.  First, we register our route for session creation:

```js
const koa = require('koa')
const route = require('koa-route')

const app = new koa()

async function create(ctx) {
  // ..
}

app.use(route.post('/', create))
```

This is all as expected.  Now what goes in `create`?  It might look like this:

```js
const bcrypt = require('bcrypt')

const repo = require('./repo')

function serialize(user) {
  return {
    data: {
      username: user.username
    }
  }
}

async function create(ctx) {
  const { username, password } = ctx.request.body
  try {
    const user = await repo.find(username)
    if (!user) {
      ctx.status = 401
      return ctx.body = { errors: [{ title: 'User not found', status: 401 }]}
    }

    const matches = await bcrypt.compare(password, user.passwordHash)
    if (matches) {
      ctx.status = 201
      ctx.body = serialize(user)
      return ctx.login(user)
    } else {
      console.log('u, p', username, password)
      ctx.status = 401
      return ctx.body = { errors: [{ title: 'Password does not match', status: 401 }]}
    }
  } catch (err) {
    ctx.status = 500
    return ctx.body = { errors: [{ title: err.message, status: 500, stack: err.stack }]}
  }
}
```

There's a lot here:

- The `username` and `password` come from the client via the `ctx.request.body`.
- We lookup the user using a `repo.js` module.  This is some code that takes a username and matches it to a user in your database.  The implementation is up to you and not super important here.
- `bcrypt.compare` is the line that determines if the passwords match.
- The `serialize` function makes sure we only expose fields we desire to the client.
- `ctx.login` is provided by `koa-passport`.  It will actually trigger the session creation, storage in our session store, and setting of the cookie.

Now for the response options based on the logic branches in this function:

- 401 - if username is not in our user database
- 401 - if the password does not match
- 500 - if any part of this fails
- 201 - if password matches a valid user

There is one more piece to setup.  We need to teach passport how we want the user record that we're `ctx.login`ing in with to be serialized.  So in this same file, we can add:

```js
const passport = require('koa-passport')

passport.serializeUser((user, done) => {
  done(null, { username: user.username })
})

passport.deserializeUser((user, done) => {
  done(null, user)
})
```

In this configuration, we show we only want to store the user's `username`.

## Logging Out

Now the user has had exposure to the precious resources of our REST API long enough.  Before the grow wizen and corrupt, let us revoke their access.  They might not come willingly, so we must be firm.  Thankfully, revoking access is much simpler than revoking just about anything else in real life.  Let's register another endpoint in `auth/index.js`, and we'll be ready:

```js
async function destroy(ctx) {
  ctx.logout()
  ctx.status = 204
}

app.use(route.delete('/', destroy))
```

That's all there is to it.  The session record in the store will be removed as will the session cookie.

So it turns out there are lot of things to get in place for a full auth flow through an API.  Do you do this in a similar way?  What could be simplified or made better?



