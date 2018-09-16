---
layout: post
title: "Caching Ajax Requests in IE"
date: "2010-04-08"
comments: true
categories:
  - "Code"
tags:
  - "ajax"
  - "ie"
  - "java"
  - "js"
  - "xquery"
description: Have you ever had a problem with ajax requests caching in Internet Explorer.  I have, and recently I came across a nicer solution than I have traditionally 
metaKeywords: ajax, ie, java, javascript, xquery
draft: false
---

Have you ever had a problem with ajax requests caching in Internet Explorer.  I have, and recently I came across a nicer solution than I have traditionally used.  In the past, I have used a unique parameter on the url to keep IE from caching previous requests to the same url, like so:

<!--more-->

```javascript
$.ajax({
  ...
  url: "/r/e/s/t/?unique=" + new Date().getTime()
});
```

But, wouldn't it be nice to keep your urls clean and not have to add this chunk of code for every Ajax call.  On a recent project, we have a url rewriter through which all requests are routed.  I added a call to this function (in xquery), to tell the browser not to cache any response.

Xquery
------

```
declare function no-cache() {
  let $is-ajax := xdmp:get-request-header("X-Requested-With") eq "XMLHttpRequest"
  return if ($is-ajax) then
    let $expire-immediately := xdmp:add-response-header("Expires", "-1")
    let $no-cache := xdmp:add-response-header("Cache-Control", "no-cache, no-store")
    return ()
  else ()
};
```

For Java, there's something similar:

Java
----
```java
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

public class CacheUtil {
  public static Response BuildNoCache(ResponseBuilder builder) {
    return builder.header("Expires", "-1").header("Cache-Control", "no-cache, no-store").build();
  }
}
```

How do you control your ajax caching problems in the pseudo-browsr of IE?

  
