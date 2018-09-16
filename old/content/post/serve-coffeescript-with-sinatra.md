---
layout: post
title: "Serve CoffeeScript from Sinatra"
date: "2013-02-20"
comments: true
categories:
  - "Code"
tags:
  - "ruby"
  - "sinatra"
  - "coffeescript"
description: CoffeeScript is nice.  Sinatra is nice.  Get Sinatra to serve your nice CoffeeScript.
metaKeywords: sinatra, coffeescript, ruby
draft: false
image: https://i.imgur.com/Ta27Zd4.jpg
---

Sinatra is nice because it's super lightweight.  This will allow you to make it do exactly what you want, nothing more.  This is the opposite of Ruby on Rail's convention.  Likewise, it takes just a bit more configuration to make Sinatra serve CoffeeScript as compared to Rails.

<!--more-->

## Sinatra and CoffeeScript

Surprisingly, there are no fantastic gems, at least that I could churn up in a few Google searches, that make serving CoffeeScript bone head easy.  I found a few, such as the Sinatra Assetpack.  It looked like serious overkill, and my Sinatra app is very small, so I wanted a quick and easy way to serve the static goods.  

#### CoffeeScript Gem

Sinatra needs a Gem to compile the CoffeeScript.  Put this line in your `Gemfile`:

```
gem "coffee-script"
```

And run a:

```
$ bundle install
```

#### Public Directory

In my app, `web.rb` is the main controller file.  Next to that file, I have a directory structure like this:

```
public/
  js/
  coffee/
web.rb
```

By default, Sinatra will serve static assets out of this `public` directory.  

#### CoffeeScript Handler

I created the `coffee` directory separate from the `js` directory so that I could write this little handler in `web.rb`:

```ruby
get "/coffee/*.js" do
  filename = params[:splat].first
  coffee "../public/coffee/#{filename}".to_sym
end
```

This handler will pick up requests that match "/coffee/*.js", find the associated `.coffee` file, compile it to JavaScript and serve it.  I kept the file extension as `.js` to help avoid handling any potential mime-type setting requirements.  Obviously, this handler is simple and won't handle complicated cases.  But that is also a plus.

#### CoffeeScript in Templates

In my [Slim](http://) template, if I wanted to get the compiled contents of the file named `myscripts.coffee`, I would write a script tag like this:

```ruby
script src="/coffee/myscripts.js"
```

Sinatra.  Coffee.  Bam.
