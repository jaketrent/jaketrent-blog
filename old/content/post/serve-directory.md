---
layout: post
title: "Serve a Directory"
date: "2012-06-06"
comments: true
categories:
  - "Code"
tags:
  - "ajax"
  - "http"
  - "python"
description: Don't you hate developing a blasted simple webpage that does some asynchronous requests that gets you into cross-origin policy trouble.  If you just read a 
metaKeywords: ajax, http, python
draft: false
---

Don't you hate developing a blasted simple webpage that does some asynchronous requests that gets you into cross-origin policy trouble.  If you just read a `.html` file off the file system, this will bite you.  But, it's easy to get around.  Just host your .html file on a simple http server.  And it's easy to make that happen.  Here's one way.

<!--more-->

## Attacked by Snakes

First, Verify you have python installed:

```bash
> python --version
Python 2.7.3
```

##'Tis a Gift to Be Simple

Then navigate to the directory that you'd like to serve up and type:

```bash
python -m SimpleHTTPServer 5000
```

Where "5000" is the port you'd like to serve it on.  (Defaults to 80.)  Then point your browser to:

    http://localhost:5000

And rock your local dev.

  
