---
layout: post
title: "Authenticated Supertest Tests"
date: "2013-01-14"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "mocha"
  - "supertest"
  - "superagent"
description: Integration tests against authenticated urls will require a login first.  Here's a way to maintain your session in your supertest tests.
metaKeywords: js, javascript, mocha, supertest, superagent, login, authentication, session, session cookie
draft: false
image: https://i.imgur.com/PFUGV.jpg
---

When you're trying to test your authenticated URLs via supertest, there are just a couple things you'll need to do that aren't spelled out in the docs.  

<!--more-->

## Supertest

[Supertest](https://github.com/visionmedia/supertest) is a library written by the prolific TJ Holowaychuk.  It is a companion to [superagent](https://github.com/visionmedia/superagent).  Superagent provides a clean API for issuing HTTP commands.  Supertest ties into superagent for allowing easy assertions on top of those HTTP requests.

## Authenticated Requests

Lots of webapps have portions of their sites that require authenticated to access, so it makes sense that there's a great need to test requests against these portions.  Yet in supertest, there's not a totally-straightforward way to login for the sake of a test and do subsequent requests under that login.  At least there's no explicit API for it in the current release.  But there have been [many](https://github.com/visionmedia/supertest/issues/26) [requests](https://github.com/visionmedia/supertest/issues/46) for it.  Who knows if it will come.  Given that we know the mechanism for session continuity between requests, cookies, we can make it happen ourselves.

## Login for Supertest

#### Use Superagent

Supertest has no cookiejar for holding cookies like the sessionid.  But, superagent does.  So, we're going to need to import it explicitly.  A login helper could look something like this:

```js
var superagent = require('superagent');
var agent = superagent.agent();
var theAccount = {
  "username": "nacho",
  "password": "iamtheluchadore"
};

exports.login = function (request, done) {
  request
    .post('/login')
    .send(theAccount)
    .end(function (err, res) {
      if (err) {
        throw err;
      }
      agent.saveCookies(res);
      done(agent);
    });
};
```

A few points:

- `theAccount` information could come from anywhere.  You could use the same pattern from this login process to setup a newly-registered user as well.
- The `request` parameter to `login()` is the supertest request.  
- After we post to '/login' and a response returns in the `end()` function, we are saving the cookies from that response (a login response should return with a 'Set-cookies' header).  This superagent agent (with the login cookie) is what we send back to the caller of the login helper via `done()`.

#### Attach the Cookies to Supertest

Now that we've made login request and saved the cookies, it's time to make our authenticated request(s).  Easy cheesy.  A simple test to see if the login worked might look like this:

```js
var request = require('supertest')(app);
var login = require('./login');

describe('MyApp', function () {

  var agent;

  before(function (done) {
    login.login(request, function (loginAgent) {
      agent = loginAgent;
      done();
    });
  });

  it('should allow access to admin when logged in', function (done) {
    var req = request.get('/admin');
    agent.attachCookies(req);
    req.expect(200, done);
  });

});
```

More jabber about the code:

- `app` is my Express app.  This is your webserver.  
- We're importing the login helper, and we've called it one time before all the tests in our `MyApp` spec via `before()`.  This call to `before()` is asynchronous, just like our test in this case, because we have to do a full login to setup our test.  When the `loginAgent` is returned, we save it for use in our actual tests.
- The test gets the best of both worlds.  When doing `request.get()`, we're using the supertest request.  So, we can then do cool `expect()`s on it.  Right before the request goes out the door, we grab the superagent `agent` and attach its cookies to our new request.

In the future, perhaps there will be a more expressive way to do this that's worked into the supertest API.  For now, this strategy is the best I've found.  It's based on the method I originally found in [visionmedia/supertest#46](https://github.com/visionmedia/supertest/issues/46#issuecomment-11679706).

Is there a better way that you've found to do this kind of authenticated test?


