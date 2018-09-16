---
layout: post
title: "XQuery Browser Language Detection"
date: "2011-05-06"
comments: true
categories:
  - "Code"
tags:
  - "browser"
  - "http"
  - "marklogic"
  - "xquery"
description: If you've created an internationalized website lately, you've probably implemented some sort of language chooser widget in your site ui to allow your users 
metaKeywords: browser, http, marklogic, xquery
draft: false
---

If you've created an internationalized website lately, you've probably implemented some sort of language chooser widget in your site ui to allow your users to indicate which language they would like to see content displayed in.  What I often forget is that the user may have already made this indication previous to visiting your site, and you might be like to think about respecting their previously indicated preference.

<!--more-->

Within the browser, a user can store their preferred language.  The w3c has a [nice browser list](http://www.w3.org/International/questions/qa-lang-priorities#changing) to give some terse instructions on how to set your language in your browser.

Your app might read the browser preference differently, but at least one component is consistent.  Your browser is going to pass an [HTTP header](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html) called "Accept-Language" to your app.  In a recent app, I read this using XQuery:

```
xdmp:get-request-header("Accept-Language")
```
That's going to return a string something like this one, which is mine:

```
en-US,en;q=0.8
```

This is a comma-delimited list of 2-letter [language codes <http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes>`_ and 2-letter `locale codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), informally "language-locale".

The "q=#" describes the quality of the language.  The higher, the quality, the more preferred.  Notice that in my header, "en-US", American English, does not have a "q=" attribute.  The lack of "q=" indicates a default, actually the highest preference, of 1.0.

There's also a Content-Language header, that I suppose you could use if you were making a differentiation for what language the actual content was using compared to the site chrome.  But, as far as I can tell, this is used less.  Even less by myself.  (Never.)

Here's a full XQuery implementation for MarkLogic that will read the header and parse out the preferred language.  In my implementation, I don't care about the locale, so I'm paying attention only to the language code.  The regex used is an adjustment of [this original php regex](http://www.thefutureoftheweb.com/blog/use-accept-language-header):

```
xquery version "1.0-ml";

declare option xdmp:mapping "false";

declare function local:get-browser-lang() as xs:string? {
  let $header := xdmp:get-request-header("Accept-Language")
  return if (fn:exists($header)) then
    local:get-top-hit-lang($header)
  else
    ()
};

declare private function local:get-top-hit-lang($header as xs:string) as xs:string? {
  let $langs :=
    for $entry in fn:tokenize(local:parse-header($header), ",")
    let $data := fn:tokenize($entry, "q=")
    let $quality := $data[2]
    order by
      if (fn:exists($quality) and fn:string-length($quality) gt 0) then
        xs:float($quality)
      else
        xs:float(1.0)
      descending
    return $data[1]
  return $langs[1]
};

declare private function local:parse-header($header as xs:string) as xs:string {
  let $regex := "(([a-z]{1,8})(-[a-z]{1,8})?)\s*(;\s*q\s*=\s*(1|0\.[0-9]+))?"
  let $flags := "i"
  let $format := "$2q=$5"
  return fn:replace(fn:lower-case($header), $regex, $format)
};

local:get-browser-lang()
```

This implementation just takes the top language, no matter what.  You might want to check to see if your site actually supports the language before picking from the browser preference.  While you're looping through the list of acceptable languages in get-top-hit-lang(), you could add a where clause to check for support.

Do you find that the sites you visit respect this header?

Update
---------

Here's an updated version of the code that respects secondary language selections as well (not just first choice):

```
xquery version "1.0-ml";

declare option xdmp:mapping "false";

declare function local:get-browser-lang() as xs:string? {
  let $header := xdmp:get-request-header("Accept-Language")
  return if (fn:exists($header)) then
    local:get-top-supported-lang(local:get-browser-langs($header), ("en", "es", "it"))
  else
    ()
};

declare function local:get-top-supported-lang($ordered-langs as xs:string*, $translations as xs:string*) as xs:string? {
  if (fn:empty($ordered-langs)) then
    ()
  else
    let $lang := $ordered-langs[1]
    return if ($lang = $translations) then
      $lang
    else
      local:get-top-supported-lang(fn:subsequence($ordered-langs, 2), $translations)
};

declare private function local:get-browser-langs($header as xs:string) as xs:string* {
  let $langs :=
    for $entry in fn:tokenize(local:parse-header($header), ",")
    let $data := fn:tokenize($entry, "q=")
    let $quality := $data[2]
    order by
      if (fn:exists($quality) and fn:string-length($quality) gt 0) then
  xs:float($quality)
      else
  xs:float(1.0)
      descending
    return $data[1]
  return $langs
};

declare private function local:parse-header($header as xs:string) as xs:string {
  let $regex := "(([a-z]{1,8})(-[a-z]{1,8})?)\s*(;\s*q\s*=\s*(1|0\.[0-9]+))?"
  let $flags := "i"
  let $format := "$2q=$5"
  return fn:replace(fn:lower-case($header), $regex, $format)
};

local:get-browser-lang()
```


  
