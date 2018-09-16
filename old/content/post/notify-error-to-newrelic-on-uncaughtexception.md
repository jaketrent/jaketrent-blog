---
layout: post
title: "Notify NewRelic of Error on UncaughtException"
date: "2016-09-27"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "monitoring"
  - "nodejs"
description: When your app goes down, call newrelic.notifyError with enough time to send
metaKeywords: js, javascript, express, nodejs, node, error handling, uncaughtException, newrelic, monitoring
draft: false
image: https://i.imgur.com/ApNvY7f.jpg
---

NewRelic is a monitoring vendor that has good support for Node.js apps.  When your Node app goes down, you'll want to tell NewRelic about it.  It's surprisingly easy.

<!--more-->

## `newrelic` npm Package

The `newrelic` npm package is super easy to integrate with.  First install:

```
npm install newrelic
```

Call it from early in your program (before errors can start to occur).  NewRelic docs say on the first line of your program.  I load config first.  Everything is fine.

```js
require('newrelic')
```

Then in order to let NewRelic have the data that it needs to run, you'll need to setup the config file.  The lib gives you a seed file to start from.

```
cd <proj_root>
cp node_modules/newrelic/newrelic.js .
```

Make sure to edit it with your changes.  With that file, you'll want to set your app name, your license key, and any other [options you desire](https://github.com/newrelic/node-newrelic/blob/master/lib/config.default.js).

## Calling NewRelic on `uncaughtException`

When your Node app goes down, you have [one final moment](post/handle-errors-node-app/) to send out your SOS signal -- this is in the `uncaughtException` handler.

Usually NewRelic will detect errors automatically, such as those that you return as HTTP responses to your clients of status 500 with some error json.  But in this case, we'll need to send the error manually.  The `newrelic` lib gives us a way to do this with the `notifyError` function.  It takes the error object and optionally some custom parameters.

So, at first glace, we'd do this:

```js
const newrelic = require('newrelic')

process.on('uncaughtException', err => {
  log.fatal({ err }, 'unhandled error')

  newrelic.noticeError(err)
  process.exit(1)
})
```

But this doesn't deterministically give NewRelic time enough to send the error off to their server.  The lib apparently sends errors on some sort of "harvest" cadence.  `process.nextTick` doesn't seem to provide enough time either.  But NewRelic does give another API that should help.  The `shutdown` function cleans up the agent.  It also allows to flush all the pending notifications via `collectPendingData` option previous to shutdown, which is what we want.

So to make this reliable, we change to:

```js
process.on('uncaughtException', err => {
  log.fatal({ err }, 'unhandled error')

  newrelic.noticeError(err)
  newrelic.shutdown({ collectPendingData: true }, err => {
    if (err) log.error({ err }, 'error shutting down newrelic agent')
    process.exit(1)
  })
})
```

And it works like a charm.  Any additional data that you send to monitoring when your app crashes?  Any ways that you know to make this more reliable?  Have fun logging those crashes!
