---
layout: post
title: "Set Cookie on Rack Mock Request"
date: "2015-01-21"
comments: true
categories:
  - "Code"
tags:
  - "ruby"
  - "rack"
  - "unit-testing"
description: Add a cookie to mock requests in order to test your Rack app.
metaKeywords: ruby, rack, mock, mock request, set cookie, cookie header, testing
draft: false
image: https://i.imgur.com/044x6s6.jpg
---

Rack apps are generally straightforward to test because of their very basic public interface.  But where do we put specific things, in this case, a cookie for the request, on that `env` argument it takes?  Here's one way.

<!--more-->

# env

The `env` argument that is sent to `#call` in a Rack app is an variable that represents the [environment of the request](http://www.rubydoc.info/github/rack/rack/master/file/SPEC#The_Environment).  It is a hash of CGI-like headers: request method, query params, http headers -- that sort of thing.

The `HTTP_*` keys on the hash will be [read as request headers from the environment](https://tools.ietf.org/html/rfc3875#section-4.1.18).

# Rack MockRequest Cookies

Rack provides a great little `Rack::MockRequest` helper object in its library that will help us test our app.  This object has a class method called `env_for` which allows for quick construction of an `env` var that is a request to a specified url.

On the returned `env` we will continue to make modifications before passing it to our Rack app.  We'll add our cookie header with a key of `HTTP_COOKIE`.  The value will be of the format `cookieName=cookieValue`.  We can handle multiple cookies by separating the cookies with `; `.

Let's say we're testing a token authentication middleware with rspec.  Our spec may look something like this:

```ruby
it "accepts an cookie token in the request" do
  middleware = # ... instantiate rack middleware
  env = Rack::MockRequest.env_for("/protected")
  env["HTTP_COOKIE"] = "AUTH_COOKIE=123"
  status, _, _ = middleware.call(env)
  expect(status).to eq(200)
end
```

Then in our Rack app source, we can code for the availability of a cookie on the request.  It might look like:

```ruby
# ...
def call(env)
  request = Rack::Request.new(env)
  token = request.cookies["AUTH_TOKEN"]
  # ...
end
```

Is this the easiest or best way to set cookies on requests when testing Rack apps?  What do you do?
