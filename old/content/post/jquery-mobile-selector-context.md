---
layout: post
title: "jQuery Mobile Selector Context"
date: "2011-09-01"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "jquery"
  - "jquery-mobile"
description: As web developers we're used to being able to write a jQuery selector and easily get the DOM elements back on the page that we're looking for.
metaKeywords: javascript, jquery, jquery-mobile
draft: false
---

As web developers we're used to being able to write a jQuery selector and easily get the DOM elements back on the page that we're looking for.  In the case of jQuery Mobile, it's slightly more complicated because a "page" is a different beast.

<!--more-->

First Page Loads the Head
-------------------------

You can actually have multipe [pages on the DOM](http://jquerymobile.com/demos/1.0b2/#/demos/1.0b2/docs/pages/page-anatomy.html) at a time.  This is required for the slide animation, helps with page caching for the back button, and helps make things feel snappier.  When you request a brand new page from the server, that page's `<body />` is ajax'ed onto the DOM and the `<title />` is updated.

This means that the first page that you load that initializes requests the jQuery mobile script and initializes it is the one that loads the `<head />` tag is loaded.  From the [docs](http://jquerymobile.com/demos/1.0b2/#/demos/1.0b2/docs/pages/page-scripting.html):

When you click a link in jQuery Mobile, the Ajax navigation system uses the link's href to formulate an Ajax request. Although the full page is loaded with Ajax, the framework only pulls in the contents of the page, and ignores anything in the head except for title tag contents.

In other words, on subsequent pages, you better have already imported the scripts and styles in the head that you need for subsequent page loads.


Expanded Context
----------------

Now, if multiple "pages" are all on the DOM, when you craft a selector in jQuery, you have the potential of picking up lots of other elements than you were expecting.  We're used to our context being defined as a the single page served up from the server, so we can write a selector like this:

```javascript
$(".media-carousel li")
```

And only get back the `<li />`s that are on the page.  But now, if I nav to multiple pages with media carousels on them, on the 2nd one, when I execute this code, I'll select all `<li />` s from the 2nd *and* the 1st.  This quickly produces bugs that we don't have to watch out for in our normal server-assisted MVC architecture.

Constrain to Page Context
--------------------------------

The fix for jQuery Mobile, however, is super simple.  Per the [jQuery docs](http://api.jquery.com/jQuery/):
  
  By default, selectors perform their searches within the DOM starting at the document root. However, an alternate context can be given for the search by using the optional second parameter to the $() function.

In other words, we want to provide the currently-operating page in jQuery mobile as the context for the selector.  Here's a snippet of the what the multimedia carousel selection might look like:

```javascript
function carouselStuff($page) {
  $(".media-carousel li", $page).doStuff();
}

$('div').live('pageshow', function  (e, ui) {
  carouselStuff($(this));
});
```

When a `pageshow` event is triggered, that means the containing page (`<div class="ui-page"/>`) has been displayed with the newly ajax-requested content.  So, now our selections, bindings, and other jQuery goodness will only affect the current "page" context.  

  
