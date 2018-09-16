---
layout: post
title: "Import Erb Into Karma"
date: "2013-09-20"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "coffeescript"
  - "karma"
  - "ruby"
  - "rails"
description: Rails asset pipeline allows you to use erb helpers in your CoffeeScript.  You'll still need to bring get these files into Karma runner.
draft: false
image: https://i.imgur.com/i5fJT6j.png
---

Rails asset pipeline allows you to use erb helpers in your CoffeeScript.  You'll still need to bring get these files into Karma runner.  It's really easy.  You just need to get to know your Karma config options.

<!--more-->

## erb in JavaScripts

Why in the world would you want to use erb helpers inside your script files?  You might not.  I definitely think this should be a limited practice.  In some cases, it can be very helpful.  For instance, if you use Ruby/Rails (via [`asset_sync`](https://github.com/rumblelabs/asset_sync)) to upload your static assets to an external server, such as S3, you can help your scripts know where static assets live after upload.

So your script might use the `asset_path` helper and end up looking something like this:

```coffeescript
angular.module('app', []).config ($routeProvider) ->

  $routeProvider
    .when '/admin',
      controller: 'AdminIndexCtrl'
      templateUrl: "<%= asset_path('admin/index.html') %>"
```

## Import erb Files into Karma

Well, now you have an `app.coffee.erb` file.  You need to get it into [Karma runner](http://karma-runner.github.io).  Normally `*.coffee` files will be brought straight in and compiled automatically by the runner as needed.  In this case, however, the Karma defaults won't recognize the `.coffee.erb` file as a CoffeeScript file need compilation.

To tell Karma to process your erb file as a CoffeeScript file, add this to your `karma.conf.coffee`:

```coffeescript
module.exports = (config) ->
  config.set
    # ...
    preprocessors:
      '**/*.coffee.erb': ['coffee']
      '**/*.coffee': ['coffee']
```

That's it.  That's the key to getting your Erb files processed into JavaScript and ready for Karma to use.

Now, what are your thoughts on putting your CoffeeScripts through the erb filter of the asset pipeline at all?

