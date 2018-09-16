---
layout: post
title: "Jasmine Unit Testing with RequireJS"
date: "2011-12-21"
comments: true
jscategories:
  - "Code"
tags:
  - "js"
  - "nginx"
  - "unit-testing"
  - "requirejs"
  - "jasmine"
description: As more application logic gets pushed into the browser for client-heavy apps, the need for javascript testing increases.  Lately, I've been doing some Jasmi
metaKeywords: javascript, nginx, unit-testing, requirejs, jasmine
draft: false
---

As more application logic gets pushed into the browser for client-heavy apps, the need for javascript testing increases.  Lately, I've been doing some Jasmine unit testing of an application that uses RequireJS.  Here are some general pointers and potential pitfalls to watch for.

<!--more-->

Jasmine Standalone
------------------

After messing with potentially running the tests with the Jasmine Maven plugin, inside NodeJS, and headless webkit, I came back to the simplest solution.  I came back because after much heartache, I just wanted something to work.  [Jasmine standalone](http://pivotal.github.com/jasmine/download.html) has done the trick.  

Test Runner Setup
-----------------

[RequireJS paths](http://requirejs.org/docs/api.html#config) can be tricky.  For some reason, the trickiness seems to increase inside the testing environment.  To try and make relative pathing easier, I've included my test directory inside my app's js directory, like so:

```bash
js/
  test/
    tests/
    runner.html        
```

Jasmine standalone just uses a plain old HTML file for its runner.  My RequireJs Jasmine runner structure looks like this:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Spec Runner</title>
  <!-- Jasmine lib / testing includes -->
  <link rel="shortcut icon" type="image/png" href="vendor/jasmine_favicon.png">
  <link rel="stylesheet" type="text/css" href="vendor/jasmine.css">
  <script type="text/javascript" src="vendor/jasmine.js"></script>
  <script type="text/javascript" src="vendor/jasmine-html.js"></script>
  <!-- ... -->

  <!-- global lib includes -->
  <script type="text/javascript" src="../vendor/jquery.js"></script>
  <script type="text/javascript" src="../require.js"></script>
  <!-- ... -->

  <script type="text/javascript">

    // This is key!
    require.config({
      baseUrl: '../'
    });
    
    require([
      '../test/tests/MyCode.spec'
    ],
      function() {
        $(function() {
          jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
          jasmine.getEnv().execute();
        });
      });
    
  </script>
</head>
<body>
  <!-- empty on purpose -->
</body>
</html>
```

Import everything that is global via the old-fashioned method -- just a `<script/>` tag in the `<head/>`.  Then, write and import your specs as RequireJS modules, and just require them in your runner.  

A Runner Per main.js
--------------------

When I'm writing RequireJS modules in the app, I'm using relative paths.  These paths are always relative to the main module that uses these other require modules.  Thus, when you configure your runner, the `baseUrl` *needs* to point to the directory of the main module that in turn imports the modules under test.  And thus it follows that you'll actually need a separate runner for each main module in your app.  So, if you're a true single-page app, you'll only have one module.  But, for example, in the app I'm currently dev'ing, we have a public main.js and an admin main.js, so we have a public-runner.html and an admin-runner.html.

This is only an issue if your app uses relative paths.  If you use absolute paths in your app modules, the new issue will be that you'll have to be able to run your tests from the exact context from which your app usually runs.  

Require and Jquery
------------------

Just a note:  Even though I use `require-jquery.js` in my app, I found that for some reason Jasmine didn't appreciate that, and I had to import `jquery.js` and `require.js` separately.  If anyone knows why, I'd love to be enlightened.

Run on an HTTP Server
---------------------

This probably goes without saying for anyone that has used require for some time, but since require dependencies are asynchronously loaded, you're going to run into problems with cross domain policies in your local dev.  I use Chrome, and I immediately start seeing errors if I run from the filesystem:

```bash
XMLHttpRequest cannot load file:///.../MyCodeDependency.js. Cross origin requests are only supported for HTTP.
Uncaught Error: NETWORK_ERR: XMLHttpRequest Exception 101
```

You could start Chrome with a flag to ignore this cross-domain policy, but I prefer to just spin up a little http server action with [nginx](http://nginx.org/en/) and edit `/etc/nginx/sites-available/default` to point the server root at your projects `js/` directory and restart nginx (`sudo service nginx restart`).  Then get to your runner at something like `http://localhost/test/runner.html`.

Require Test Fixtures
---------------------

Another reason to run your tests on an http server is for ease of importing text fixtures.  The way we've set up our runner, the baseUrl is configured to be the js root directory, which allows our app code to work unchanged, but now we've made it potentially harder for us to get to test dependencies that aren't in the application code area.  This may just be my own ignorance of RequireJS shining through, but when I set `baseUrl: '../admin/'` for my `admin-runner.html` and try to import a test fixture w/ relative paths in the test, the paths are supremely messed up.  Thus, with this directory structure:

```bash
js/
  test/
    tests/
      admin/
        TestNeedingFixture.spec.js
      fixtures/
        data.js
    admin-runner.html    
```

I'm forced to import with server absolute paths like this:

```javascript
define(['OtherAdminCode', '/test/tests/fixtures/data.js'], function (OtherAdminCode, data) {
  describe('AdminCode', function () {  
    it ('is awesome', function () {
      expect(somethingWithData).toBeAwesome();
    });
  });
});
```

So, again, if I wasn't running tests on an Http server, this wouldn't work.

Secrets of the Fire Swamp
-------------------------

RequireJS has made my heavy-Javascript app dev much more enjoyable.  I don't have to deal with massive, monolithic js files.  Instead, I have lots of little cohesive files, and I have a nice tool that helps me import them where needed.  RequireJS does still have a little bit of mystique for me, however.  The paths can be hit and miss.  Once I find a pattern that seems to work, I stick to it like glue.  And that usually works for me, but as we've seen, once we switch contexts (like into the context of the jasmine test runner), those paths may again be in question.  That's why, as we've seen, you should do the wacking one-off pathing on the test side of things so your app code can remain clean and unchanged.  Eat, test, and be merry.

  
