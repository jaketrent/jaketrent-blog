---
layout: post
title: "How to Make a Pinterest Webservice"
date: "2013-01-18"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "nodejs"
  - "social"
description: Pintereset doesn't currently have an API.  Here's how to use NodeJs to make a simple Pinterest webservice.
metaKeywords: pinterest webservice, pinterest api, js, javascript, node
draft: false
image: https://i.imgur.com/7cv9d.png
---

Pinterest currently does not have an official webservice API.  It seems kind of crazy in this day and age.  They really should have one.  I can't think what the business reasons might be for not having one.  

They've not had one for long enough that it's high time we write our own.  It'll be surprisingly easy with a few choice tools

<!--more-->

## Webservice API on NodeJs 

[NodeJs](http://nodejs.org/) is just a fun platform to write IO-heavy applications for the web.  We're going to write a quick [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) endpoint using the [Express](http://expressjs.com/) library that allows us to consume real Pinterest content that's not available via a pre-existing service.

#### Screen Scrape Pinterest

Given no API, we're left to our own devices.  The data for Pinterest is only exposed via the UI on the website.  We're going to have our service visit that UI and grab the data that we need as a user of a web browser would see it.  This is screen scraping.  There a lot of downsides here, but we wouldn't be trying it if there was an API already.

One down side is that our service will be brittle.  If Pinterest ever changes the layout of the page, our service won't be able to bring back the right data.  Our solution will be simple, so it'll be easy to update, but this should be a red flag not to do anything mission critical via screen scraping unless you're giving it your full attention.

Another down side might be speed.  Screen scraping a UI is not the fastest way to get data.  We'll try and help mitigate this with the fastest tools that we have.  NodeJs is a blasted fast web server.  A library called [cheerio](https://github.com/MatthewMueller/cheerio) is supposedly best-in-class for screen scraping (advertised as 8x faster than [jsdom](https://github.com/tmpvar/jsdom)).

#### Caching

To make this retrieval even faster for repeat use, caching could be very helpful.  We could cache in our service what we get back from pinterest via some datastore or we could cache in our client.  Best practices here will be very dependent on your use case.  These kind of enhancements have been made over and over again and would only clutter the simple Pinterest interaction, so I will exclude them for now.

## Getting Pinterest Data

Here's the final solution in all its glory.  This snippet only includes only the code inside the Express route.

```js
// request is a library for making http requests
var request = require('request');

// cheerio is a lib for screen scraping
var cheerio = require('cheerio');

// req and res are express vars for the request and response
exports.list = function (req, res) {

  // this is the actual request to the pinterest page I care about
  request('http://pinterest.com/jaketrent/pins/', function(err, resp, body){
  
    // get ready for scraping
    var $ = cheerio.load(body);
    var pins = [];
    var $pin;
    var $pins = $('.pin');

    var i = 0;
    
    // scraping only the 1st 10 pins;  you could get them all
    for (i; i < 10; ++i) {
      $pin = $pins.eq(i);
      
      // Finding the bits on the page we care about based on class names
      pins.push({
        img: $pin.find('.PinImageImg').attr('src'),
        url: 'http://pinterest.com' + $pin.find('.ImgLink').attr('href'),
        desc: $pin.find('.description').text()
      });
    }
    
    // respond with the final json
    res.send(pins);
  });
};
```

When I wrote it out for my own use, I was surprised at the brevity.  I love it.  Given, there's no handling of any errors or attempts to make this semi-robust.  This just gets us the data on a good day.

The final json that's exposed at our chosen Express endpoint looks like it this:

```js
[ {
    "img": "http://myimg.jpg",
    "url": "http://pinterest.com/pin/mypin",
    "desc": "Sweetest pin ever"
  }, {
  // ...
]
```

It's ready for use by a json-ready client.  So stinkin easy.  We're connecting the web together, and it's awesome!  Now the world will know of the baked goods and flower arrangements that we love the most.


