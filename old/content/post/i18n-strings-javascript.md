---
layout: post
title: "I18n Strings in Javascript"
date: "2011-08-23"
comments: true
categories:
  - "Code"
tags:
  - "i18n"
  - "js"
  - "marklogic"
  - "xquery"
description: I've seen a number of different ways that internationalized strings get put into Javascript code.  Of all of them, I kind of like just bundling the resource
metaKeywords: i18n, javascript, marklogic, xquery
draft: false
---

I've seen a number of different ways that internationalized strings get put into Javascript code.  Of all of them, I kind of like just bundling the resource bundle of key value pairs in Javascript files themselves, one for each language or something close to that.  But, in a recent project, there were a few other constraints, so we did it another way.

<!--more-->

The Situation
-------------

* We're using MarkLogic on the backend -- our data is stored in xml.  Our server-side code is XQuery.
* Some of these strings are needed on the server side as well, so storing them all on the client in .js files wasn't going to cut it.
* We wanted to get all of the strings into the same place to make the list more manageable to update and maintain.

So, now there are two parts to getting internationalized strings available in the front-end code: The data transform on the backend and the strings made available on the front-end.

The Backend Transform
---------------------

The resource bundle data looks like this:

```xml
<resource-bundle xml:lang="spa">
  <resource key="my.key.name">
    <value>Translated String</value>
  </resource>
<!-- ... more ... -->
</resource-bundle>
```

The transform a la:

```
declare function get-lang-dict($bundle-collection as xs:string, $lang as xs:string?, $keys as xs:string*) as xs:string* {
  let $eng :=
    if (fn:exists($keys)) then
      get-resource-bundle($bundle-collection, "eng")/resource[@key = $keys]
    else
      get-resource-bundle($bundle-collection, "eng")/resource
  let $translations :=
    if (fn:exists($keys)) then
      get-resource-bundle($bundle-collection, $lang)/resource[@key = $keys]
    else
      get-resource-bundle($bundle-collection, $lang)/resource
  let $max := fn:count($translations)
  for $translation at $i in $translations
  let $engTxt := $eng[@key eq $translation/@key]/value/text()
  let $key := if (fn:exists($engTxt)) then
    json:escape(fn:normalize-space(fn:string($engTxt[1])))
  else
    fn:string($translation/@key)
  return fn:concat("'", $key, "': '", json:escape(xdmp:quote($translation/value/text())), "'",
    if ($i eq $max) then () else ",")
};

declare function get-resource-bundle($bundle-collection as xs:string, $lang as xs:string) as element()* {
  fn:collection($resource-collection-uri)/resource-bundle[@xml:lang eq $lang]
};
```

Now we have our xml transformed into a sequence of xs:string, each a json object where the English text is the key and the language text is the value, like this:

```json
{ "English String": "Translated String" }
```

The XQuery expression that renders the html page includes a call to populate the Javascript "lang" object with the json:

```
declare function lang-dictionary($lang as xs:string?) as element(script) {
  <script type="text/javascript">
    jQuery(document).ready(function(){{
      lang.dict("{$lang}", {{
        {get-lang-dict("bundle-collection", "spa", ("keys", "if", "any"))}
      }});
    }});
  </script>
};
```

Note that if you provide a pre-known set of i18n string $keys to the get-lang-dict() function, it will only add those resources to the dictionary.  Otherwsie, all the resources in your bundle are added.

Front-end Usage
---------------

The lang object that stores the dictionary of translated strings is like so:

```javascript
var lang = (function () {

  var current_dict = "eng";
  var dicts = {};

  var is_array = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
  var set_lang = function (lang_code) {
    current_dict = lang_code;
  };
  var dict = function (lang_code, dict) {
    dicts[lang_code] = dict;
    set_lang(lang_code);
  };
  var get_translation = function (key, number) {
    var isPlural = number != undefined && number != 1;
    var dict = dicts[current_dict];
    var entry = dict == undefined ? undefined : dict[key];
    var val = null;
    if (is_array(entry)) {
      val = isPlural && entry[1] != undefined ? entry[1] : entry[0];
    } else {
      val = entry;
    }
    return val == null ? key : val;
  };

  return {
    dict: dict,
    _: get_translation,
    get_current_lang: function () {
      return current_dict;
    }
  };

})();
```

And when you want to grab a string from the language dictionary, just call:

```javascript
lang._("English String")
```

Plurals
-------

Note that the lang object implementation also allows for storage of a plural form of the translated word.  In practice, it was decided not to store our resource bundles in a parallel format.  Still, you provided data to the lang.dict() populating function that looked like this:

```json
{ "Result": ["Resultado", "Resultados"] }
```

And then got the translation like this:

```javascript
lang._("Result", results.length)
```

If it had a plural form, it would use it, falling back to the singular (1st) form.

Thoughts
-----------

So, what are the pros and cons here?  The main design issue that I felt created a bit of give and take was the keying of the strings by the English word.  The pro: If the string doesn't exist, the intelligible English string is shown in its place.  The con: It's less reliable and more brittle because you have to be able to control and escape properly the text that appears in the key.  What alternate solutions might you create?

Update: "RequireJs"
-----------------------
Or if you're using some sweet new Javascript tech, check out `this article on i18n in RequireJs <http://rockycode.com/blog/i18n-strings-requirejs/>`_.

  
