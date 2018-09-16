---
layout: post
title: "Remove Whitespace in Html with Javascript"
date: "2009-09-15"
comments: true
categories:
  - "Code"
tags:
  - "html"
  - "js"
description: Lots of websites give you the ability to copy certain pieces of text/code/something off their website in a "copy to clipboard"-type functionality.  In the p
metaKeywords: html, javascript
draft: false
---

Lots of websites give you the ability to copy certain pieces of text/code/something off their website in a "copy to clipboard"-type functionality.  In the process of creating just such a function on a little page I was making, I wanted to make the html that was copied very tight and compact.  The most annoying things were the whitespace and the newlines.  Here's some javascript to strip out the whitespace between xml/html tags.

<!--more-->

I'm no regex guru, so I split this into 4 separate pieces:

```js
// remove newline / carriage return
str.replace(/\n/g, "");
    
// remove whitespace (space and tabs) before tags
str.replace(/[\t ]+\</g, "<");
    
// remove whitespace between tags
str.replace(/\>[\t ]+\</g, "><");
    
// remove whitespace after tags
str.replace(/\>[\t ]+$/g, ">");
```

Return the replacement string and set it to the value you want to save.  I wanted to use jQuery, so here's the final product:

```js
$("#copy-txt").val(
  $("#nn-results").html().replace(/\n/g, "")
    .replace(/[\t ]+\</g, "<")
    .replace(/\>[\t ]+\</g, "><")
    .replace(/\>[\t ]+$/g, ">")
);
```

I have a containing div with the id "nn-results", grab it's inner html, do the replacements on that html, and then set the id="copy-txt" input element value to be the results.  I have seen some posts where people tried to make all that replacement happen in one regex, but I wasn't good enough with the regex/js combo to make it work.  If someone is ready to go pro, and it isn't easy, please comment below.

  
