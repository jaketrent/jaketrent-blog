---
layout: post
title: "Multiple Yields in an ERB Template"
date: "2013-02-08"
comments: true
categories:
  - "Code"
tags:
  - "ruby"
  - "rails"
  - "erb"
description: When you setup your Rails application, a single default yield block is created.  Learn how to setup multiple yields in your template.
metaKeywords: rails, erb, yield, multiple yield, template, code block
draft: false
image: https://i.imgur.com/YqUKEfw.png
---

When you setup a new Rails project, you'll have a single layout file which has a single default `yield` block.  This will soon be inadequate, and you'll want another.  Here's how to setup multiple `yield` blocks per ERB template.

<!--more-->

## Layout File

By default, Rails will create a file at:

```
app/views/layouts/application.html.erb
```

In this file, there will be a default `yield` block similar to this:

```ruby
<%= yield %>
```

It has no name.  It's just the default place for templates that use this layout file to put their content.

We can create new `yield` blocks.  We'll have to give them a distinguishing name.  They look about the same.  If I wanted to create a new `yield` block where, for instance, alerts could be displayed if the child template had them, I could put this in my layout file:

```ruby
<%= yield(:alert) %>
```

Now I would just need something to go in it.

## Child Templates

A child template that uses the `application.html.erb` layout file can just start blasting out markup that will go into the default `yield` block.  This will usually be the main content.  But in our example, there might be more focused content such as alerts that we want to display in a separate area.  Thus, our template could potentially look like this:

```erb
<h1>My main content</h1>
<p>Bacon ipsum…<p>

<% content_for :alert do %>
  <div class="alert alert-success">
    You created multiple yield blocks!
  </div>
<% end %>
```

Throw down a `content_for` block, matching the name of the `yield` block in your layout file, and you're set.  Order does not matter.  Your specific `content_for` blocks can come before, after, or in the middle of your main content.  Easy as Ruby pie.
