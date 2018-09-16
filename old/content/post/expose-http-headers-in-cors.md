---
layout: post
title: "Expose HTTP Headers in CORS"
date: "2014-09-15"
comments: true
categories:
  - "Code"
tags:
  - "cors"
  - "http"
  - "superagent"
  - "rails"
description: If you don't see your HTTP response header in the browser, check your CORS policy.  It's likely the culprit.
metaKeywords: js, cors, http, access-control-expose-headers, superagent, expose, unsafe header, Link, github api
draft: false
image: https://i.imgur.com/JAce7py.jpg
---

For APIs, it seems more and more data is making its way into the HTTP headers.  Recently, whilst adding a `Link` header, for paging data, into the HTTP response, I realized that my browser code couldn't see it.  Who was the culprit?  CORS, of course.

<!--more-->

## Headers in Browser 

It was just another day, and I was developing in my browser of choice, Chrome, known, in part, for its unequaled developer tools.  The `Link` header that I had added onto my HTTP responses for my API were viewable from the Network tab.  It looked good.  The browser could see it, curl could even see it.

In the browser client code, I was using `superagent`, but the code failed to see it.  I'd run:
  
```js
var request = require('superagent')
request.get('myApi').end(function (err, res) {
  res.xhr.getResponseHeader('Link') // nothing
  res.headers.link // nothing
})
```

And the header was not coming through.  I ran the same command in the console, `res.xhr.getResponseHeader('Link')`, and got the error response:

```
Refused to get unsafe header ‘Link’
```

These are a classic CORS symptoms.  

## CORS Spec

Well, a few great [google results](http://blog.import.io/tech-blog/exposing-headers-over-cors-with-access-control-expose-headers) later, I ended up at the [CORS spec](http://www.w3.org/TR/cors/#simple-response-header), which drones on that only simple headers are allowable in CORS requests by default.  These headers include:

- Cache-Control
- Content-Language
- Content-Type
- Expires
- Last-Modified
- Pragma

`Link` is definitely not on that list.  So, how to add it?

## Access-Control-Expose-Headers in rack-cors

Like the other CORS headers, the `Access-Control-` prefix is present.  The one you're looking for is [`Access-Control-Expose-Headers`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).  It is a comma-separated list of header names. You can add this header manually to your response, or depending on the library you're using, it might be added differently.

I was using `rack-cors`.  Thus, my addition ended up looking something like this in `config/application.rb`:

```ruby
# ...
config.middleware.use Rack::Cors do
  allow do
    origins '*'
    resource '*', :headers => :any, :methods => [:get, :post, :put, :delete, :options], :expose => ['Link']
  end
end
```

Can you see that the `expose` key was the key for me?  Once that was added, the browser let the client code read the link, and all was safe and well.  

## Bonus:

As a bonus, here's a great client library for consuming a [GitHub API-style](https://developer.github.com/v3/#link-header) `Link` header, called [parse-link-header](https://www.npmjs.org/package/parse-link-header) 
