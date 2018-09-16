---
layout: post
title: "Serve Json from Sinatra"
date: "2013-02-26"
comments: true
categories:
  - "Code"
tags:
  - "ruby"
  - "sinatra"
  - "js"
description: Your Sinatra webservice can be made to serve json quite easily.
metaKeywords: sinatra, json, sinatra-contrib, ruby
draft: false
image: https://i.imgur.com/ZyCgi56.jpg
---

By default, Sinatra knows how to serve up a rendered html page.  With a slight tweak, we can make it spit out Json too!

<!--more-->

## Data Format of the Web

Json is my favorite data format for web applications.  Really, who wouldn't want their webservice to expose Json?  It's mucho useful.  

First, add a line to the `Gemfile` that makes a Json helper method available to Sinatra:

```ruby
gem "sinatra-contrib"
```
Next, all you need to do is query the data that you want to return and actually return it, as in:

```ruby
require "sinatra/json"

get "/my-models" do
  json MyModel.all
end
```

The `json` helper will then serialize your objects into Json, much to the delight of your clients!
