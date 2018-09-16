---
layout: post
title: "i18n Strings in RequireJs"
date: "2012-01-10"
comments: true
categories:
  - "Code"
tags:
  - "i18n"
  - "js"
  - "requirejs"
  - "handlebars"
description: If you have to store your text strings for internationalization (i18n) on the server, that's <a href="http://rockycode.com/blog/i18n-strings-javascript/">on
metaKeywords: i18n, javascript, requirejs, handlebarsjs
draft: false
---

If you have to store your text strings for internationalization (i18n) on the server, that's <a href="http://rockycode.com/blog/i18n-strings-javascript/">one thing</a>.  But, if you can store them in Javascript, you might think about using RequireJs and its i18n plugin, because it makes it nice and easy.

<!--more-->

Get the Plugin
--------------

RequireJs is a single [download](http://requirejs.org/docs/download.html).  It's an AMD-style module loader.  And it rocks.  Especially if you dig those little arrows ![arrow img](http://requirejs.org/i/arrow.png)!  

The [i18n plugin](http://requirejs.org/docs/api.html#i18n) is another .js file to [download](http://requirejs.org/docs/download.html#i18n).


Specify your Strings
--------------------

The i18n uses the philosophy that you have a default/fallback language specified that usually the entire set of strings that your app will display.  Then, you can specify a set of those strings in another language or even partially implement them.  For instance, if my default language is English and I have 10 strings total but then I only specify 6 of those strings in the Spanish version of the bundle, then English will be used for the remaining 4 as the fallback language.

Your directory structure should look something like this:

```bash
js/
  nls/
    spa/
      str.js
    str.js
  main.js
  require.js
  i18n.js
```

The important thing is that there is a subdirectory as sibling to main.js, your main Require module, that is named 'nls'.  This is what the plugin looks for by default.  The names of the 'str.js' files don't matter.  In fact you can have as many and name them things with meaning in to app if you'd like.

Here's an example bundle of the English/default bundle:

```javascript
define({
  'root': {
    welcome: 'Welcome!',
    eng_only_idiom: 'You have got to be pulling on my leg!'
  },
  'spa': true
});
```

In the `root` property, we default an object with string keys and the English text that we want associated with that key.  The name 'root' specifies that this is the default set of strings.

Below, we list a new property for each language code that our app supports (or doesn't if it's listed as false, but I just leave them off if they're false).  You can use whatever language code you care to use.  On our app, the server is feeding us a three-letter language code with no locale.  Browsers will feed you a two-letter code, with locale if available (eg, 'es-mx').

The Spanish bundle would look something like this:

```javascript
define({
  welcome: '¡bienvenido'
});
```

Note that only the `welcome` string was implemented.  English only things or unsupported or not-yet translated strings can just remain unmentioned in the language bundle.

Specify RequireJs Locale
------------------------

In our main Require module, we want to specify which is the current language so the plugin knows which language bundle to look up and use.  That might look like this:

```javascript
require({
  locale: lang
}, ['myModule'], function (myModule) {
  var myMod = new myModule()
  myMod.doCoolStuff();
});
```

We haven't used the language string yet.  We've only specified the current user's language.  In my case, with the language code being provided by the server, `lang` is a global js var that gets rendered on the html page from the server.  You could interrogate the browser langugage here instead via Javascript if you'd like.

Use i18n Strings in a Require Module
------------------------------------

We know what strings we need to have translated.  We know our current user's language.  And now finally we need to use our bundles.  Here's how to import the bundle via the i18n plugin into your require module:

```javascript
define(['i18n!nls/str'], function(str) {
  return {
    doCoolStuff: function () {
      alert(str.welcome);
    }
  }
});
```

Note that we require as a dependency the main/English `str.js`.  And because we import it with the 'i18n!' prefix, it will be read as a language bundle and the appropriate language's bundle will be used.  So if the require `locale` was set to 'spa', then we would see '¡bienvenido' alerted to our screen.  Pretty dang exciting. 

Bonus:  With Handlebars!
------------------------

But you wouldn't normally just blast out strings via your Javascript code.  At least, if you love your sanity, you'll stop using string concatenation and a Javascript-based templating language.  There are many out there, but one that I have recent success with is [HandlebarsJs](http://handlebarsjs.com/).  It's a superset of mustache -- based on the same syntax but with built-in helpers and ability to extend with other custom helper functions.

So, if we were using a Handlebars template to blast our i18n strings plus markup to the DOM, our handlebars template could look like this:

```javascript
<h1>{{ str.welcome }}</h1>
<!-- you know, something super huge and inviting -->
```

And you could import it and use it in your module:

```javascript
define(['i18n!nls/str', 'text!template'], function (str, myTmpl) {
  return {
    doCoolStuff: function () {
      var compiledTmpl = Handlebars.compile(myTmpl);
      document.body.appendChild(compiledTmpl({ str: str }));
    });
  }
});
```

Note that I'm making a couple leaps here:  Have the RequireJs [text plugin](http://requirejs.org/docs/api.html#text) available, and have handlebars.js available. 

Compile the template with handlebars and then pass in the `str` module as a property called `str` (or whatever) to the template and then just access it like the Javascript objec that it is within the template, using `str.welcome` or `str.eng_only_idiom` or whatever other strings you invent in that wild, internationalized mind of yours.

  
