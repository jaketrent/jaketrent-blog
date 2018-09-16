---
layout: post
title: "Test APIs Failing from Client"
date: "2016-01-25"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "testing"
description: A quick tip to make your APIs fail and test client error handling.
metaKeywords: js, api, spa, axios, promise, async await
draft: false
image: https://i.imgur.com/8Fm1cn2.jpg
---

In the case where you can't edit a local version of your APIs in order to cause them to fail, you need to be able to edit your client so that it *looks* like the API request fails.  Here's a quick code change that should make this easy for you.

<!--more-->

This is one of many possible manual testing techniques.  This allow you to see the change in your running app as you work through it.  For instance, I like to use this as I'm testing through the error alerting features that are common in an app when an API request fails.  

Go to the point in your app where your bits touch the network.  This is usually the place where you use your HTTP wrapper or, if you're a free spirit, call some XHR goodness yourself.  These days, I like using the venerable [axios](https://github.com/mzabriskie/axios) library.  Axios is promise based, so that means that we can use async/await as well, which is like a fine chocolate next to a warm fire in winter (which is good).

So, all my http code might look in essence like this:

```js
import axios from 'axios'

export const fetch = {
  // deserialize, etc ...
  request(url) {
    return axios({
      method: 'get',
      url
    })
  }
}
```

So, this `request` function returns a Promise.  The logic around the request might look like:

```js
import * as api from './api'

async function fetchWater() {
  const { request} = api.fetch

  try {
    const res = await request('/my/own/home')
    // ... handle success response
  } catch (res) {
    // ... handle error response, where failure code should execute (what we want to TEST!)
  }
}
```

To make this request fail, we need only make the Promise fail, rejecting it like a mouthful of stewed tomatoes.  So, just change `api.js`:

```js
import axios from 'axios'

export const fetch = {
  // ...
  request(url) {
    return Promise((resolve, reject) => {
      reject({
        status: 500,
        data: {
          errors: [{ detail: 'Shere Khan is back!' }]
        }
      })
    })
  }
}
```

Now note that you must be aware of what your format HTTP library, in this case axios, uses in its responses.  What you `reject` manually must be exactly the same format that usually is returned in an error situation (eg, `status` and `data`).  You must also know what your server is designed to return as an error response (eg, `errors`).  The above application code is using the [JSON API](http://jsonapi.org/format/#error-objects) format.

What other little tricks do you find useful in getting APIs to fail?  
