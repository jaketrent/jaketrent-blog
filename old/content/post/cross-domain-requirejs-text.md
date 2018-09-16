---
layout: post
title: "Cross-Domain RequireJs Text"
date: "2012-06-07"
comments: true
categories:
  - "Code"
tags:
  - "ajax"
  - "browser"
  - "js"
  - "requirejs"
  - "cors"
description: Through long-available browser quirks/features, javascript has been available for requests across disparate domains.  But, other resources, such as text fil
metaKeywords: ajax, browser, javascript, requirejs, cors
draft: false
---

Through long-available browser quirks/features, javascript has been available for requests across disparate domains.  But, other resources, such as text files (eg, handlebars templates) have had more restrictions placed on them.  Recently, CORS support has enhanced the ability to make these requests.  Here's how you get your text files from another domain via requirejs.

<!--more-->

## CORS
[CORS](https://developer.mozilla.org/en/http_access_control) is a great feature for modern browsers that allows a site on a domain A to request a resource from domain B without restriction, because domain B already said that it's willing to accept those requests. In an [article on CORS by Remy Sharp](http://remysharp.com/2011/04/21/getting-cors-working/), he outlines in more detail how to setup your server to be CORS ready.  Simply, it comes down to the server responding with an http header.  To allow all sites to request a server's resources:

```http
Access-Control-Allow-Origin: *
```

To allow a whitelist of sites to request resources, the server must give the same header with only certain sites listed:

```http
Access-Control-Allow-Origin: http://rockycode.com http://builtbyjake.com
```

What servers can [support CORS](http://html5please.com/#cors)?  Firefox and Chrome have supported it for some time.  IE8 has its own Microsoft flavor.  iOS and Android also have strong support for a few version back.  Check out the [detailed stats on caniuse.com](http://caniuse.com/cors).

## RequireJs

[RequireJs](http://requirejs.org/) Is a fantastic Javascript loader that allows for client-side async loading of js and other static assets.  For textual, non-code things, there is a [`text` plugin](http://requirejs.org/docs/download.html#text).  

Because RequireJs knows about non-CORS-enabled browser restrictions, by default it functions differently for cross-domain requests.  In the current (2.0.0) implementation of the text plugin, line 163, the plugin decides whether to do a normal XHR (more lenient on text assets) request or to skip to the `else` statement to require what it will [assume is javascript](https://groups.google.com/group/requirejs/browse_thread/thread/bc0608ef5f8943e7/3a1cafaa93869c32) because that's requestable across domains:

```js
//Load the text. Use XHR if possible and in a browser.
if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
  text.get(url, function (content) {
    text.finishLoad(name, parsed.strip, content, onLoad);
  }, function (err) {
    if (onLoad.error) {
        onLoad.error(err);
    }
  });
} else {
  //Need to fetch the resource across domains. Assume
  //the resource has been optimized into a JS module. Fetch
  //by the module name + extension, but do not include the
  //!strip part to avoid file system issues.
  req([nonStripName], function (content) {
    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                    parsed.strip, content, onLoad);
  });
}
```

To allow CORS-enabled servers to get resources requested from them, we [configure RequireJs](http://requirejs.org/docs/api.html#config) to override the `getXhr` function to return true:

(Note: 25 Oct 2012 - Syntax updated per Chris' comment below)

```js
require.config({
  config: {
    text: {
      useXhr: function (url, protocol, hostname, port) {
        // allow cross-domain requests
        // remote server allows CORS
        return true;
      }
    }
  }
});
```

Now you should be able to ask for various and sundry things across domains and continue enjoy the RequireJs goodness -- now multiplied:

```js
require('text!http://anotherDomain/my.html', function (my) {
  // have fun!
});
```

  
