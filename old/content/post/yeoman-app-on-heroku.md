---
layout: post
title: "Deploy Yeoman App on Heroku"
date: "2013-04-23"
comments: true
categories:
  - "Code"
tags:
  - "heroku"
  - "yeoman"
  - "nodejs"
  - "js"
  - "grunt"
description: Yeoman will generate a static site.  Make a few changes, and you can have it running on Heroku.
metaKeywords: heroku, yeoman, nodejs, javascript, grunt
draft: false
image: https://i.imgur.com/1Mc2kXh.jpg
---

Yeoman is great developer tool that will help you generate a project format that is easy to get up and running quickly.  Out of the box, Yeoman only generates static sites.  But, with a few small tweaks, you can get it running on an app server, Nodejs, and up on Heroku.

<!--more-->

## New Project With Yeoman

To install Yeoman, run:

```
npm install -g yo
```

Now navigate to your new project directory and generate the scaffolding by running:

```
yo webapp
```

There are other generators, specifically for angularjs or a handful of other frameworks.  To see more options, run:

```
yo --help
```

## Add Node for Heroku

Since Yeoman creates a static site, it should be read to serve out of any old web server.  But Heroku specifically wants an app server.  Node is one of the options, and it's a great option for a lightweight app server.

To get the node dependencies you need, create a `package.json` via:

```
npm init
```

Then pull down the dependencies you'll need:

```
npm install gzippo express coffee-script --save
```

Now create your app server, `web.coffee`.  It's about as light as they come:

```coffeescript
gzippo = require 'gzippo'
express = require 'express'

app = express()
app.use express.logger 'dev'
app.use gzippo.staticGzip "#{__dirname}/dist"
app.listen process.env.PORT || 5000
```

It's going to be serving the static resources that you build w/ Yeoman/Grunt that end up in the `dist` directory.  In order for code to get to Heroku, it needs to be commited to your git repo.  Thus, you need to remove the "dist" line from your `.gitignore` file, and don't forget to add and commit the files to git as you build them.  You may also have to add more tasks to the `Gruntfile.js` to copy over any other assets to `dist` that your app needs to run.

Finally create a `Procfile` file for Heroku in the root of your project that points to the `web.coffee` server:

```
web: coffee web.coffee
```

Now it's time to push to Heroku.  You should have the Heroku Toolbelt installed and create a heroku url by running:

```
heroku create <my_project>
```

To test your yeoman app as it will be run in production, first build it:

```
grunt build
```

Then run the grunt server:

```
grunt server:dist
```

Or if you have foreman and want to run the app using your `Procfile`, run:

```
foreman start
```

It's time.  Commit your code, especially that `dist` directory, and... deploy!

```
git push heroku master
```

There are quite a few steps there.  What did we miss?  Or what needs more explanation?  Perhaps we just need a `yo heroku` target.
