---
layout: post
title: "\"12-Factor App\" Summary"
date: "2015-02-28"
comments: true
categories:
  - "Review"
tags:
  - "deployment"
description: My take on the 12factor.net Principles
metaKeywords: 12 factor app, 12 factors, architecture, deployment, summary
draft: false
image: https://i.imgur.com/8aY0qiD.jpg
---

I recently had a chance to go through the principles of the 12-Factor App as listed on [12factor.net](http://12factor.net/).  It's written by some of the fine folk at Heroku.  The principles describe the best practices they see for how to get a modern web app deployed properly.  It's a short read.  This summary is even shorter.

<!--more-->

##### 1. Codebase

- Always in src ctrl
- One codebase per app (many repos = distributed system)
- A deploy = instance of app running

##### 2. Dependencies

- All app and system dependencies explicitly declared
- Do not dep on implicit existence of system tools (eg, ImageMagick)
- Required sys tools vendored into app

##### 3. Config

- Strict separation between code and config
- Config stored in env vars

##### 4. Backing Services

- Should be loosely coupled, swappable
- Changes in services (eg, db) should not require code change

##### 5. Build, release, run

- Strict separation: build (binary), release (binary + env config), run (exec runtime)
- Ordered -- can't make change upstream
- Every release has unique id

##### 6. Processes

- Independent, stateless, share nothing
- Sharing happens in backing service (eg, db)
- No sticky sessions w/ process affinity

##### 7. Port Binding

- Can talk a protocol (eg, HTTP) by binding comm to a port
- Allows an app to become a backing service for another app via a url
- What does the alternative look like here?  Seems like a given.

##### 8. Concurrency

- Process is first-class citizen patterned after unix service daemons
- Process can multiplex internally (eg, threads or something like node.js)
- Scaling becomes a simple addition of the same process

##### 9. Disposability

- Startups are fast
- Requests are short
- Shutdowns are graceful; requests can finish; jobs returned to queue

##### 10. Dev/Prod Parity

- Time from dev to prod deploy should be short (eg, hrs)
- Devs who wrote the code should be around to op the code
- Toolchains and tech stacks should be as similar as possible
- Backing servies should be the same, even if adapters supposedly abstract implementations

##### 11. Logs

- Logs are treated as streams, simply written by an app to stdout
- Let log storage, collating, and analysis be done in the env or or w/ other tools
- Logs should provide visibility to how an app works over time

##### 12. Admin Processes

- Run as one-off processes in REPL
- Env shares same code and config as long-running processes

If you have the extra little time required, I encourage you to check out [12factor.net](http://12factor.net/) and draw some of your own conclusions.

What other insights do you have on these principles?




