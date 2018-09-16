---
layout: post
title: "Read Request Body in Spring Bean"
date: "2012-11-27"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "spring"
  - "http"
description: Want to read the body of a request within a Spring bean?  It takes a surprising amount of code.
metaKeywords: java, spring, http, request body
draft: false
image: https://i.imgur.com/w8Ezm.jpg
---

Spring is a great addition to your Java stack.  It helps you access the request for inside your Spring beans easily.  Maybe I'm doing it wrong, but reading the request body seems blasted verbose after that.  It takes a surprising amount of code.  

<!--more-->

## Access the Request

Spring's bread and butter, of course, is inversion of control.  So, to get to the request object itself is no big deal.  Just inject it (canonical packages shown for… fun, mostly):

```java
@javax.inject.Inject
javax.servlet.http.HttpServletRequest req;
```

And now for the pile of non-abstracted code.

## Parse the Body

Number one, the body is accessed from the [`HttpServletRequest`](http://docs.oracle.com/javaee/6/api/javax/servlet/http/HttpServletRequest.html) object it a place that wasn't obvious to me: `request.getReader()`.  Heads up, we've got a BufferedReader here.  Hey, at least we don't get a stream that we have to wrap in more than one reader!

```java
private String getBody() {
  String body = "";
  if (req.getMethod().equals("POST") )
  {
    StringBuilder sb = new StringBuilder();
    BufferedReader bufferedReader = null;

    try {
      bufferedReader =  req.getReader();
      char[] charBuffer = new char[128];
      int bytesRead;
      while ((bytesRead = bufferedReader.read(charBuffer)) != -1) {
        sb.append(charBuffer, 0, bytesRead);
      }
    } catch (IOException ex) {
      // swallow silently -- can't get body, won't
    } finally {
      if (bufferedReader != null) {
        try {
          bufferedReader.close();
        } catch (IOException ex) {
          // swallow silently -- can't get body, won't
        }
      }
    }
    body = sb.toString();
  }
  return body;
}
```
    
The code.  There is to much.  Let me sum up.  There's only going to be a body if you are doing a post.  Otherwise, don't worry about it.  If there is data, pull it into a string.  Everything else is for (not) handling errors.

There's a bit there.  It's not the worst.  But after getting used to [Express' bodyParser](http://expressjs.com/api.html#req.body), it was hard to see this.
