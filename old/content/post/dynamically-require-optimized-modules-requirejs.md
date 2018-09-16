---
layout: post
title: "Dynamically Require Optimized Modules in RequireJs"
date: "2012-07-12"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "requirejs"
description: Often when building a single-page app, you'll want to optimize all your js into a single asset.  RequireJs is a great mechanism for managing your js depende
metaKeywords: javascript, requirejs
draft: false
---

Often when building a single-page app, you'll want to optimize all your js into a single asset.  RequireJs is a great mechanism for managing your js dependencies.  It also comes with a great build tool for doing the optimization (r.js).  But sometimes you won't want to put all your js into a single asset.  For instance, perhaps you only want to load a large chunk of code when the user interacts with the app so that you know he intends to use that functionality, and so you load it dynamically.  But, you still want that dynamically-loaded set of modules to be optimized to increase the performance of your app.  It's a pretty simple desired functionality, but I didn't just stumble upon the solution.  

<!--more-->

## 3rd-party Modules

In my case, those dynamically-loaded collections of modules are written, potentially, by 3rd parties to be included in my webapp, requested dynamically at runtime.  Thus, I optimize my app, and each of the widgets that might appear on my app are optimized individually and independently.

## Optimized Modules

Once you run your RequireJs modules through the r.js build process via:

```bash
node r.js -o app.build.js
```

What used to be a single module per file, will now look something like this:

```js
define('MyWidget', ['SubCompontent1', 'SubComponent2'], function (S1, S2) {
  // widgety things
})
define('SubComponent1', [], function () {
  // more widget stuff
});
define('SubComponent2', [], function () {
  // more widget stuff
});
```

All of your define blocks now live in a single js file.

## Require Optimized Modules

How should you request such a thing.  Well, if you were going to request `MyWidget.js` dynamically from your `App.js`, it would normally look like this (non-optimized):

```js
define(['require'], function (require) {
  // when something happens dynamically load...
  require(['MyWidget'], function (Widget) {
    var widget = new Widget();
    widget.render();
  });
});
```

This will work fine in a dev, non-optimized module world, but as soon as you want to require an optimized module like this, you'll start having `Widget` come back as `undefined` in your require callback.

## Modules vs. Scripts

Maybe the old thinking cap was broken, but I could not figure out why this was for a while.  Now that I know the solution, the principle is simple and I've seen it hundreds of times before in RequireJs:  A RequireJs module will be made available via an alias in the require callback.  Everything else (eg, a regular js script file) will not.  And it turns out that when your optimize your widget, so that the resulting `MyWidget.js` file includes multiple define blocks, suddenly RequireJs no longer sees it as a module;  it's a script.

But, as soon as your script is loaded, the callback is still fired, and the multiple defines that you just requested are available to the app from that point on.  So, the final code ends up looking something like this:

```js
require(['MyWidget'], function (WidgetModule) {
  if (WidgetModule) {
    // dev mode -- one define per file = module
    var w = new WidgetModule();
    w.render();
  } else {
    // optimized file -- 2nd request yields a Require module
    require(['MyWidget'], function (Widget) {
      var w = new Widget();
      w.render();
    });
  }
});
```

So now the code covers two situations: dev mode and optimized mode.  In dev mode, there is one define block per file.  Modules are requested.  Easy cheesy.  In optimized mode, the first require loads the script (not seen as a module).  So, if the module alias in the callback is undefined, we have to require the widget again once that widget's define block is available to the code.  On the 2nd require, that script is already in memory, so there is no network request, but we can finally get a handle on `MyWidget` via the module alias in the callback.

So, it is a simple principle.  It was a simple solution.  It feels slightly weird to have to require blocks in order to get what I want.  All in all, I'm just happy James Burke made the thing.  It has made developing client-side Javascript much more pleasurable.  If anyone knows of a better solution, I'd be happy to hear it.



  
