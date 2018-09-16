---
layout: post
title: "Unexpected call to method or property access"
date: "2009-12-18"
comments: true
categories:
  - "Code"
tags:
  - "ie"
  - "js"
  - "browser"
description: In a recent admin tool I was creating, I was using SOUIT of Javascript... apparently more than I knew how to write well.  Eventually, it all worked wonderfu
metaKeywords: ie, javascript, web-browser
draft: false
---

In a recent admin tool I was creating, I was using SOUIT of Javascript... apparently more than I knew how to write well.  Eventually, it all worked wonderfully -- that is, until someone tried to use it in a lesser browser -- Internet Explorer. The error was thus:

<!--more-->

Unexpected call to method or property access

The usefulness of this error message led me to Google, where I soon found the many people had experienced this same awfulness on IE for a multiplicity of reasons, most wide-spread among them being appending children to elements that didn't exist and trying to remove elements from the head.  Neither of these scenarios seemed applicable, so being stuck without Firebug on the offending "browser", I devo'd back to the good 'ol alert box debugging.  I soon happened upon this method:

```js
function (data, prefix) {
  for (field in data) {
      $(prefix + field).html(data[field]).val(data[field]);
  }
}
```

It turns out that the elements that I'm selecting with the selector "prefix + field", gave me both input tags and other html elements.  This is why I do an update to the content with html() and with val().  This works in Firefox and Chrome.  But, on IE, it fails without pretense of working at all.  Eventually, I found that if I did an html() update on the html tags, and a val() update on inputs, it would work.  In this light, the error message actually makes a little sense.  Rewritten, it might say, "Hey naive web developer, you are trying to set an attribute that is not there.  I'm gonna die.  Bye now."

Rewritten for the express purpose of pleasing IE and to overcome my naivete, here it is:

```js
function (data, prefix) {
  for (field in data) {
      $(prefix + field).each(function () {
          if ($(this).attr('value') != undefined) {
              $(this).val(data[field]);
          } else {
              $(this).html(data[field]);
          }
      });
  }
}
```    

  
