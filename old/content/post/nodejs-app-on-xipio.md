---
layout: post
title: "Access NodeJs App on Xip.io"
date: "2013-04-23"
comments: true
categories:
  - "Code"
tags:
  - "ruby"
  - "nodejs"
  - "js"
description: Xip.io is a DNS wildcard initially created for use on Ruby projects.  It makes development much nicer in some respects, so it's worth a few steps to get working on a NodeJs project.
metaKeywords: nodejs, xip.io, pow, powder, ruby
draft: false
image: https://i.imgur.com/PJTnZmM.jpg
---

Xip.io is a DNS wildcard domain that was initially created for use on Ruby projects.  But its application is desirable across platforms.  Recently, I wanted to use Xip.io on a NodeJs project.  It was easy to make happen.

<!--more-->

## Update: "Proxying"

After having a handful of problems with these home-grown proxies, my search eventually led me to know that Pow 0.4.0+ includes proxying as a built-in feature.  So, you don't need your own `config.ru` any more.  Once you install pow, choose the port that your app will run on and at what pow address you want to access your app, and run one command in your terminal:

```
echo 3000 > ~/.pow/myapp
```

Then you'll access your app, running in the background on port 3000 via the web browser at `http://myapp.dev`.  Way better.  Skip the rest of this article.

## Install Pow and Powder

Pow is a development server that uses Xip.io.  Powder is a cli that makes working with Pow even easier.  To start, make sure that [Ruby](http://www.ruby-lang.org/en/downloads/) is setup with [Rubygems](http://rubygems.org) in your environment.  Then install Pow.  They have a short little install script you can run, as [referenced on the Pow site](http://pow.cx/).

Then install Powder:

```
gem install powder
```

## Proxy your NodeJs app

Pow only knows how to handle Rack apps, so we have to create one to be loaded into Pow.  Since we're writing the guts of our app on another platform -- in this case, Node -- we'll just create a proxy Rack app.

I found a bit of [proxy app code](https://github.com/linjunpop/node-with-pow), which you should save in your project root as `config.ru`, and which I paste here:

```ruby
require "net/http"

class ProxyApp
  def call(env)
    begin
      request = Rack::Request.new(env)
      headers = {}
      env.each do |key, value|
        if key =~ /^http_(.*)/i
          headers[$1] = value
        end
      end
      http = Net::HTTP.new("localhost", 3000)
      http.start do |http|
        response = http.send_request(request.request_method, request.fullpath, request.body.read, headers)
        [response.code, response.to_hash, [response.body]]
      end
    rescue Errno::ECONNREFUSED
      [500, {}, ["Server is down, try $npm start"]]
    end
  end
end
run ProxyApp.new
```

The only change you might have to make is the port number for your app (line 13).  In this case, I'm using port 3000 for my NodeJs app.

## Link Your App

Now all we have to do is link our app to Pow.  Powder helps us do this easily.  Go to your project root directory and type:

```
powder link <project_name>
```

Now run your app with whatever command starts NodeJs.  It's probably something like this:

```
node app.js
```

Now you should be able to access your app via your web browser at `http://<project_name>.dev`.  One of the great things about Xip.io is that it makes running your local app [extremely easy from a local Virtual machine](http://jaketrent.com/post/run-pow-server-on-vm/) as well.  To get the address of your app to use in your VM, type this from your native terminal:

```
powder open --xip
```

And copy the resulting URL into your VM web browser.

Ah, the fusion of Node and Ruby is pretty sweet.
