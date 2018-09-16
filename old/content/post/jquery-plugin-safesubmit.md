---
layout: post
title: "Jquery Plugin: safesubmit"
date: "2010-06-28"
comments: true
categories:
  - "Code"
tags:
  - "ajax"
  - "js"
  - "jquery"
  - "plugins"
description: Jquery gives a great, easy-to-use mechanism for extending its API and creating your own plugins.  For stuff that looks like it could be useful generally, yo
metaKeywords: ajax, javascript, jquery, plugins
draft: false
---

Jquery gives a great, easy-to-use mechanism for extending its API and creating your own plugins.  For stuff that looks like it could be useful generally, you should really try to put it into a nice little plugin package.  For submit buttons, there is a general thought that they shouldn't be clicked twice (especially for functions such as financial transactions), so I created a plugin that fits an app that I have been working on recently, where there are many, many submit buttons, saving very granual pieces of content through ajax requests.

<!--more-->

The "safesubmit" plugin is going to disable submit buttons when clicked and, in most cases, re-enable them when the ajax request has completed.  On your app, if you had a class called "safe" on all the submit buttons that you wanted to exhibit this behavior, you could enable the plugin functionality with one line:

```javascript 
$(".safe").safesubmit();
```

And that's it.  It's simple and powerful.  It's likely, however, because this happened on my project as well that the client code is going to have more complicated business rules.  In our case, someone added extra form validation where the length of the submitted field was checked -- if it passed, it was submitted; otherwise, it was not.  In that case, the plugin never re-enabled the button to be again pressable.  So, I exposed the functions of the plugin to be public, allowing you to shortcircuit the normal flow, essentially notifying the plugin to the submit failure.  For example, here's a submit's onclick event snippet:

```javascript
if (valid()) {
  $.ajax ({ ... });
} else {
  $.fn.safesubmit.failsubmit($(this));
}
```

If you need, the "safe" and "unsafe" methods are also made public.  You can call them whenever needed.  "safe" is the state of having the click disabled.  "unsafe" means you can click the button. 

You can also change default settings.  For instance, by default when you put the button in "safe" mode, it adds disabled="disabled" attribute to the button and adds a class of "disabled".  You have the option of changing all 3 opts.  For instance, maybe you have a different class:

```css
.dead {
  background-color: #ababab;
}
```

and want to apply that class instead.  Try this:

```javascript
$.fn.safesubmit.defaults.disabled_class = "dead";
$(".safe").safesubmit();
```

Download the script on [Github](https://github.com/jtsnake/jquery-safesubmit).

  
