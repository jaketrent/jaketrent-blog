---
layout: post
title: "RequireJs Paths in Prod, Test, and Build"
date: "2012-12-07"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "requirejs"
  - "testacular"
description: One of the hardest parts of RequireJs can be the pathing.  Making your paths work in prod and in test environments -- even more adventuresome.
metaKeywords: js, requirejs, testacular, testing, r.js, build, paths
draft: false
image: https://i.imgur.com/xZqm5.png
---

RequireJs makes dependency management on the client mostly better.  Once it's setup, it's nice.  Getting the patterns of your paths to work correctly can be difficult to setup, depending on the constraints of your system.  Making the same paths work in a prod, test, and build environment can be even more adventuresome.  In my case, there were a few extra hoops.  My scenario might not fully match yours, but perhaps you can apply this solution to your own needs.

<!--more-->

## Prod: Loading Modules From a Different Server

Recently, we built a portal.  It contains a bunch of widgets that are served from domains different from the host page.  The portal requested these widget js files via [RequireJs](http://requirejs.org/).  

Because the widgets live on other domains, those widgets' subdependencies needed a path that would be relative to that other widget domain and not the portal domain.  In order to accomplish this, widget dependencies were specified in this way:

```js
define(['./widgetDependency.js'], function (dep) {
  // my widget code
});
``` 

The `.js` extension tells RequireJs to load the dependency [as a URL](https://github.com/jrburke/r.js/blob/2.1.1/require.js#L1521).  The `./` makes the URL relative to the widget domain.

## Test: RequireJs Paths in Testacular

When you go to test your modules in a test environment, you may not want to load your modules as URLs.  Such was the case for me, [running Testacular](http://jaketrent.com/post/test-requirejs-testacular/), where the source code is requested into the context of the test server already.

In prod, I needed the `.js` extension.  But, in test I didn't want to load modules from URLs.  So, I need to make the test environment ignore the extension.  The solution?  Override the regular expression that checks for the extension in my test runner to be something that was never matched:

```js
require.jsExtRegExp = /^pileOTest/;
```

This allows RequireJs to load the module by module name.

#### RequireJs Adds Double .js Extension

It's getting better in the test environment, but we still haven't totally appeased RequireJs.  It turns out that when it loads a module by name, it still has to [convert that name to a path](https://github.com/jrburke/r.js/blob/2.1.1/require.js#L1526).  

Given my constraints (widgets from another domain on a portal), my name actually includes a `.js` extension.  This isn't usually the case.  RequireJs doesn't test for this again (remember, we overrode the regex that did), so it just adds a `.js` extension on the end, creating two: `.js.js`.  

But there is one final way to trick it out:  Add a '?' to the name.  This rule was meant to apply to URLs that represented dynamic scripts (and would thus take query strings) as opposed to static js files.  That's not why we'll add it, but it will help us nonetheless.

So now your module dependencies will look like this:

```js
define(['./widgetDependency.js?'], function (dep) {
  // my widget code
});
``` 

And in your test environment they will load, and you will be happy.  Until...

## Build: Module Names for Optimization

When you go to [optimize your RequireJs modules](http://requirejs.org/docs/optimization.html#basics) you'll again need RequireJs to load your modules by module name instead of url.  If you don't, you'll get nice messages like:

```
>> Tracing dependencies for: MyModule
>> Cannot optimize network URL, skipping: nls/str.js?
>> Error: ENOENT, no such file or directory
>> '/Users/.../style.css?'
>> In module tree:
>>     MyModule
``` 

You may cry a little, but we're almost there.  Remember, your module dependency paths worked just fine in prod.  You only changed them to accommodate the test environment.  So, it's time to change them back when you optimize your module into one file for production use.

The `r.js` configuration in `app.build.js` includes an function called `onBuildRead()`'.  Call it to transform the code as it goes out the door for optimization.  We want to strip out the '?' question marks from our dependency arrays.  Stripping out all '?'s might be a bit too dangerous.  So, let's make a benign adjustment that will help us identify exactly what we're trying to strip out and replace our '?' string in our dependency paths with '?test', finally:

```js
define(['./widgetDependency.js?test'], function (dep) {
  // my widget code
});
``` 

And [implement `onBuildRead`](https://github.com/jrburke/r.js/blob/2.1.1/build/example.build.js#L417) as:

```js
onBuildRead: function (moduleName, path, contents) {  
  return contents.replace(/\?test/g, '');
}
```

#### "Shut off all the garbage smashers on the detention level!"

Take a deep breath.  That was a little much to make all that work.  You have made your RequireJs paths happy in 3 contexts:

1. In production, where modules are served from domains different from the host page and must be loaded by URL.
2. In test, where your modules must be loaded by module name.
3. In the optimization build, where modules must be loaded by module name.

I fill like I've tricked out RequireJs a bit to make this work.  How could we adjust the solution to be more straightforward?







