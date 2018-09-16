---
layout: post
title: "Testing Express Validator"
date: "2014-03-10"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "nodejs"
description: Express-validator is a great library for validating input.  Here's how you might test code that uses it.
metaKeywords: js, javascript, node, nodejs, express-validator, test, unit test
draft: false
image: https://i.imgur.com/ZfK9bv4.png
---

[Express-validator](https://github.com/ctavan/express-validator) is a [middleware for Express](http://expressjs.com/api.html#middleware) on Node.js that can help you validate user input.  It's a lovely library.  Here's a pattern for testing code that uses it.

<!--more-->

## Install

To get `express-validator` in your project, install with npm:

```bash
npm install express-validator --save
```

## Plug in the Middleware

To use the middleware in your code, crack open the part of your app that sets up Express middlewares, and add in a reference to this lil beaut:

```coffeescript
expressValidator = require 'express-validator'

# ...

app.use express.json()
app.use expressValidator()
```

Note that you should insert the new `express-validator` middleware directly after the `json` middleware.  Also note that the `json` middleware, used in conjunction with `urlencoded` now [replace `bodyParser`](http://andrewkelley.me/post/do-not-use-bodyparser-with-express-js.html) to avoid deprecation warnings on startup.

## Validate Something

Let's say you're writing a validator for new posts to a blog.  That code might look like this.

```coffeescript
module.exports = (req) ->

  req.checkBody('title', 'Title is required').notEmpty()
  req.checkBody('body', 'Body is required').notEmpty()

  !req.validationErrors() or req.validationErrors().length is 0
```

It checks to see if there is a title and a body given.  If there is not, the validator will return false, and there will be a validation errors array on the `req` object.  There are many [other assertions (provided internally by validator.js)](https://github.com/chriso/validator.js) besides `notEmpty` that you can use.

## Validating the Validator

First, setup a test helper that stubs the request, `req`, for validation:

```coffeescript
expressValidator = require('express-validator')()

exports.stubForValidation = (done) ->
  req =
    query: {}
    body: {}
    params: {}
    param: (name) ->
      @params[name]

  expressValidator req, {}, ->
    done(req)
```

There's nothing too incredibly special here.  It's just abstracted out of your test into a reusable helper.  The `req` object has empty objects to slap fixture data onto in your tests.  It includes a stubbed `param` function that can return params by name.  Finally, the `express-validator` middleware is called with the stubbed `req` object.

Now, in your test, you can simply:

1. Stub the request before each test
2. Setup your fixture data to make the test pass (or not)
3. Assert validation errors' existence and messages

```coffeescript
stubReq = require('req').stubForValidation
validateNew = require 'blog-new-validator'

describe 'blog-new-validator', ->

  req = null

  beforeEach (done) ->
    stubReq (r) ->
      req = r
      done()

  it 'is invalid without title', ->
    validateNew(req).should.be.false
    req.validationErrors(true).title.msg.should.eql 'Title is required'

  it 'is invalid without body', ->
    validateNew(req).should.be.false
    req.validationErrors(true).body.msg.should.eql 'Body is required'

  it 'is valid with title and body', ->
    req.body.title = 'New Blog Title'
    req.body.body = 'The body of the blog.'
    validateNew(req).should.be.true
```

What do you think?  Is there an easier way?  A way to get better assertions?


