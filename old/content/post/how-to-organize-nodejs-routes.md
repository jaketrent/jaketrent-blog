---
layout: post
title: "How to Organize NodeJs Routes"
date: "2012-10-02"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "nodejs"
  - "express"
image: https://i.imgur.com/basH6.jpg
---

A few routes in a NodeJs app -- no problem.  Just put them in your `app.js`.  More than a handful?  You'll probably want to look at organizing your routes a different way.  This will help keep your core `app.js` clean and make your actual routes easier to find.

<!--more-->

## Express Routes

The favorite http framework on [NodeJs](http://nodejs.org/) seems to be [Express](http://expressjs.com/).  I personally like it quite a bit.  It's simple, declarative, and allows you to set up all the normal HTTP commands with ease.

Did you know that Express comes with a binary/cli command called `express`.  This command will setup a project structure and a lot of the boilerplate code for you.  The docs contain a guide on [how to run this](http://expressjs.com/guide.html#executable).  It has support for other cool options like session support or various css preprocessors.

A sample run and the file structure that it will create looks something like this:

    $ express --sessions --css stylus --ejs myapp

    create : myapp
    create : myapp/package.json
    create : myapp/app.js
    create : myapp/public
    create : myapp/public/javascripts
    create : myapp/public/images
    create : myapp/public/stylesheets
    create : myapp/public/stylesheets/style.styl
    create : myapp/routes
    create : myapp/routes/index.js
    create : myapp/views
    create : myapp/views/index.ejs

In that generated code, your `app.js` references a route like this:

```js
var routes = require('./routes');
app.get('/', routes.index);
```

And the route, `index.js`, looks like:

```js
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
```

I like this, but it's still not the best.  I don't like having to list the `app.get()`, etc. in `app.js`.  This list will get long.  So, how would I adjust?

## All http commands in separate files

Instead, I want to tell `app.js` about my routes, but I want each route file to hook itself up to express directly.

Showing the adjustments, `app.js`:

```js
var app = express();
var indexRt = require('./routes/index')(app);
```

This time, more goodies in `index.js`:

```js
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index');
  });
}
```

The difference is somewhat slight.  Now, instead of each http command listed in your app, only each resource (in REST terms) is listed in app.  Each command for a resource is listed in that resource's route.js.

There are surely many ways to organize your NodeJs routes.  Express gives a great starting pattern.  Our adjustment adds a slight optimization.  Organizing your routes will help your main `app.js` file stay way cleaner, and you'll be able to find your routes more easily.

But this surely can't be the best way for everyone.  What are the ways that you've found successful in organizing your routes?

Note: this post uses express 3 syntax.
