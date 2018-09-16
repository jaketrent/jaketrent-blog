---
categories:
- "Code"
comments: true
date: 2017-08-22T21:28:18-06:00
description: "Here's a quick, easy setup for a JSON Rest API."
draft: false
image: "https://i.imgur.com/JnI3242.jpg"
layout: post
metaKeywords: "test json endpoint, json api, stub json endpoint, stub rest api, fake rest endpoint, static json"
tags:
- "rest"
title: "Stub a Json Api"
---

Here's a quick, easy setup for a JSON Rest API.

<!--more-->

## Quick and Easy

Sometimes you want a rest endpoint that you can use for some short-term purpose.  You're doing a demo.  You're trying to get a candidate to write a client that interacts with an API.  You want a fake API for testing.  

Whatever the purpose, if it's quick and easy to setup and use, you can get on to the interesting work.

## Setup Server

A great tool for this purpose is [`json-server`](https://www.npmjs.com/package/json-server).

To install:

```bash
npm install json-server
```

Then setup a json file that contains the data that will be represented as resources at your http endpoints.  Name this file `db.json`.  If you want a `books` resource, use that as a top-level attribute.  For example:

```json
{
  "books": [{ id: 1, title: "Moby Dick" }, { id: "The Tale of Two Cities" }]
}
```

Now start the server in the terminal with:

```bash
json-server db.json
```

By default, the server runs at `http://localhost:3000`.

## Query Server

Once your server is running, there are endpoints that are generated from your json file that you can query.  The above `db.json` would generate these urls:

- `GET    /books`
- `GET    /books/:id`
- `POST   /books`
- `PUT    /books/:id`
- `PATCH  /books/:id`
- `DELETE /books/:id`

You can use curl, a browser, or a tool like Postman to make HTTP requests against these endpoints.

There are many additional options for querying, such as filtering, sorting, and pagination. There are also other features for port changing, file watching, data generation, route creation, and network middleware.  Check it out.  It's a cool package!

What tools do you use for easy JSON API setups?
