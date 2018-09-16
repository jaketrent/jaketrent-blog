---
layout: post
title: "Setup Slim on Sinatra"
date: "2013-02-19"
comments: true
categories:
  - "Code"
tags:
  - "ruby"
  - "sinatra"
  - "slim"
  - "rails"
description: Sinatra is quick.  Slim templates are quick.  Together, Slim fits Sinatra quite nicely.
metaKeywords: sinatra, ruby, slim, slim templates, rails, slim-rails
draft: false
---

[Sintra](http://www.sinatrarb.com/) is a light web server that's easy to start writing Ruby on.  Coming from Node/Express, I feel quite at home there.  Slim also feels like another JavaScript-world templating language, Jade, that I've had good experiences with.  [Slim](http://slim-lang.com/) makes for quick templating and feels quite nice compared to ERB if you can handle the Haml style.  It's likewise quick and easy to get working on Sinatra.

![Slim templates](https://i.imgur.com/Dsnu3jA.png)

<!--more-->

## Quick Sinatra Setup

#### Require Sinatra

Sinatra is super easy to setup.  Create a `Gemfile` with the dependencies as follows:

```ruby
source "http://rubygems.org"

gem "sinatra"
gem "thin"
```

Then create a default `web.rb` webserver with contents that look something like:

```ruby
require "sinatra"

get "/" do
  "Hello, world!"
end
```

Then if you run the command:

```
$ ruby web.rb
```

You should get a startup message like:

```
== Sinatra/1.3.4 has taken the stage on 4567 for development with backup from Thin
>> Thin web server (v1.5.0 codename Knife)
>> Maximum connections set to 1024
>> Listening on 0.0.0.0:4567, CTRL+C to stop
```

Go to `localhost:4567` in your browser to try out your server.

#### Require Slim

Returning a string is all well and good, but let's include Slim to be able to create more sophisticated templates. Include your Slim dependency in your `Gemfile` with the line:

```ruby
gem "slim"
```

Then from the Terminal, run:

```
$ bundle install
```

#### Setup your Views

Then create a directory next to your `web.rb` file called `views`.  Inside `views`, you can create your templates.  You can create a layout template aptly named `layout.slim`.  By default, your templates will extend from this layout.  Most simply, these files might look like this:

layout.slim:

```haml
doctype html
html
  head
    title My Slim Templates App
  body
    == yield
```

And, index.slim:

```haml
h1 Loving Slim
```

#### Serve a Slim File

And now to adjust our `web.rb` file to serve the new `index.slim` file:

```ruby
require "sinatra"
require "slim"

get "/" do
  slim :index
end
```

Finally restart your server, and you should see your new template shown in all it's glory.  Pretty easy cheesy.  

## Setup Slim on Rails

Want something even easier?  Well, if you know [Rails](http://rubyonrails.org/) already, this will be a cinch.  The hardest part of getting Slim running on Rails is Rails itself.  Slim integration is even easier than on Sinatra.  Simply add this line to your Gemfile:

```
gem "slim-rails"
```

And then in order to activate the Slim handler, merely add the `.slim` extension onto the end of any of your template file names.  Your file names probably end in [`.erb` by default](http://guides.rubyonrails.org/layouts_and_rendering.html).  Change the ones that you want to convert to Slim templates to look like:

```
index.html.slim
```

Now the Rails are even slicker.
