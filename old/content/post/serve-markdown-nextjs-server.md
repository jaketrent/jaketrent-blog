---
categories:
- "Code"
comments: true
date: 2017-06-09T07:22:09-06:00
description: "Setup Next.js to be able to serve markdown content"
draft: false
image: "https://i.imgur.com/sxESnvo.png"
layout: post
metaKeywords: "next, next.js, zeit, markdown, serve markdown, markdown blog, blog posts, next.js blog"
tags:
- "js"
- "nextjs"
- "nodejs"
- "markdown"
title: "Serve Markdown with a Next.js Server"
---

Let's setup Next.js to be able to serve markdown content, such as blog posts.

<!--more-->

## Next.js Custom Server

Next.js has a nice feature set out of the box.  If you have a site that's more on the site end of the spectrum (rather than the app end), you'll likely be able to use the `next` server as-is. 

If, however, you'd like to do app-ish things on the backend, you'll likely need your own custom server.  This is not hard.

Serving markdown seems to be one of the things that needs a custom server.  I tried rendering the Markdown straight from React components, and it didn't seem to work.  This after adding custom markdown loaders to the webpack config and all that.  It still didn't work.  The big hang up, for some unknown reason, was that the markdown modules could not be found in order to be imported correctly.  

My solution was to build a custom server.  

## Basic Custom Server Setup

In Next.js terms, a custom server is simply some JavaScript that starts the next app in addition to doing any of the extra app stuff you need.

First, change your `package.json` `start` script:

```
{
  "scripts": {
    "start": "node server.js"
  }
}
```

Then do the basics in your `server.js` to initialize `next`:

```js
const { createServer } = require('http')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

;(async _ => {
  await app.prepare()
  createServer(async (req, res) => {
    // ...more custom stuff here later

    return handle(req, res, parsedUrl)
  })
  .listen(process.env.PORT || 3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + (process.env.PORT || 3000))
  })
})()
```

This can be done in Express, Koa, or any other http server library.  This example uses the Node built-in `http.createServer`.  Note that all this is doing is creating a `next` app, then using that app's request handler to handle all incoming requests.  Custom additions are yet to come.

## Reading Markdown

Since we're on the server, we have full access to the Node API.  This includes the `fs` filesystem API.  To get our markdown content, let's read markdown files out of a `posts` directory.  Once the file strings are read, let's use a library called [`front-matter`](http://npm.im/front-matter) to parse metadata out of the front matter (not the markdown content yet).  First install:

```bash
npm install front-matter
```

And let's put all this in a `posts-repo.js`:

```js
const path = require('path')
const { promisify } = require('util')
const frontMatter = require('front-matter')
const fs = require('fs')

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

const deserialize = parsed => ({
  title: parsed.attributes.title,
  date: parsed.attributes.date,
  body: parsed.body
})

async function fetch() {
  const postsDir = path.join(__dirname, 'posts')
  const filenames = await readdir(postsDir)
  
  return Promise.resolve(filenames.map(async filename => {
    const markdown = await readFile(path.join(postsDir, filename), 'utf-8')
    const parsed = frontMatter(markdown)
    return deserialize(parsed)
  }))
}

exports.fetch = fetch
```

## Serving Markdown

Now we have a module that can read and load into memory all the parsed markdown files.  Now we have to serve this markdown with our custom server.  

First, we need to detect that our client is making a request for the markdown.  We'll do an overly-simple check of the request path.  If the request url matches '/api/', we'll assume we're asking for this single endpoint to fetch all the markdown posts.  We can make this more complicated later.  

In `server.js`, we'll make the adjustments.  Inside the `createServer` callback, we don't just pass everything on to the Next.js `handle` function any  more.  We now parse the URL and call our `postsRepo.fetch` instead:

```js
const { parse } = require('url')

const postsRepo = require('./posts-repo')

const serialize = data => JSON.stringify({ data })

// ...

  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (pathname.includes('/api/')) {
      const posts = await postsRepo.fetch()

      res.writeHead(200, { 'Content-Type': 'application/json'})
      return res.end(serialize(posts))
    }

    return handle(req, res, parsedUrl)
  })
```

## Requesting Markdown from Next.js Component

Now we have an endpoint that can serve the markdown-based posts.  We need to get the React components to request the data they need.  In Next.js, this is done on the server and in the client.  We'll choose an http library that can function in both places.  We'll also install a markdown parser:

```bash
npm install isomorphic-fetch react-markdown
```

We're ready to rock and roll in our React component.  The top-level component in Next.js, called a "page", has a special hook called `getInitialProps`.  Here in `pages/indexx.js` we can do our data fetching:

```
import Post from '../components/post'

export static class Index extends React.Component {
  static async getInitialProps({ query }) {
    const posts = await Post.fetch()
    return { posts }
  }
  render() {
     {this.props.posts.map(p => <Post post={p} />)}
  }
}
```

And then `components/post.js`:

```js
import 'isomorphic-fetch'
import Markdown from 'react-markdown'
import React from 'react'

const Post = props =>
  <div>
    <h1 className="title">{props.title}</h1>
    <time className="date" dateTime={props.date}>{props.date}</time>
    <Markdown source={props.body} />
  </div>

class PostContainer extends React.Component {
  static async fetch() {
    const res = await fetch('<yourHost?/api/v1/posts')
    const json = await res.json()
    return json ? json.data : {}
  }
  render() {
    return <Post {...this.props.post} />
  }
}

export default PostContainer
```

Here we have the http code to fetch the post from the server, and we're finally rendering markdown.

There are a few steps here, aren't there.  We can still get the coolness of Next.js' server-rendering of React while doing our own custom markdown fetching on top of it.

Is this how you render markdown content in Next.js?  How have you improved upon the method?
