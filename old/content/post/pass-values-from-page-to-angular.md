---
layout: post
title: "Pass Values From the Page to AngularJs"
date: "2013-02-22"
comments: true
categories:
  - "Code"
tags:
  - "angularjs"
  - "js"
description: Bootstrap your Angular script with data from your page.
metaKeywords: angularjs, js, bootstrap, data passing, server-side page rendering
draft: false
image: https://i.imgur.com/wVBKD.png
---

There are simple mechanisms for passing data from your web page to AngularJs.  One directive is called `ngInit`.  You may well need it.

<!--more-->

## The Use Cases

The use cases don't make a ton of sense without a concrete example.  There are several ways to implement even the most simple example.  If the solution doesn't seem to fit the problem, try another way.

For our purposes, let's say that we're displaying a list of comments on the screen.  

#### Angular Requests Data

It's easy to put data into scope for AngularJs to use if Angular is the one to request the data initially.  This often will look something like this:

```coffeescript
$http.get('/comments')
  .success((comments) ->
    $scope.comments = comments
  )
```

Then your template will automatically have the data in scope.  And the template ([Slim](http://slim-lang.org) syntax used below) can look like this:

```ruby
h1 Comments
ul
  li ng-repeat="comment in comments" 
    | {{ comment }}
```

Now when we add a new comment via Ajax, we can push it right into the comment collection, and the page is updated by Angular with the appropriate data.  Or if we want to perform an operation on a pre-existing comment, it's easy to do via an AJAX operation and display the result.

#### Server Renders Data Initially

Sometimes it'll make sense for the server to render the data.  Often this kind of data will be the main content on the page.  When the client receives the page, we want the data display to be immediate.  We don't want them to load a page with a spinner for the main content, then wait and watch it spin while the real content is requested secondarily.  

If the server was to initially print the comments, like so:

```ruby
h1 Comments
ul
  - comments.each do |comment|
    li 
      = comment
```

We still might want to do AJAX'y things with a comment, such as like it.  When I like it, I don't want the browser to have to refresh, so I want to make Angular do this for me.

## ngInit Passes Angular Server Data

Angular provides a nice directive, `ngInit` for passing Angular data.  It's a mechanism by which you can bootstrap your scripts with the data they need to function.  A mixture of server rendering and client-side AJAX requests on the same data will probably mean that you're going to use this directive.  

From the `ngInit` docs:

>  The ngInit directive specifies initialization tasks to be executed before the template enters execution mode during bootstrap.
  
Our server/client mixture code might look something like this:

```ruby
h1 Comments
ul
  - comments.each_with_index do |comment, i|
    li ng-init="commentLikeCount[i]=#{comment.likeCount}"
      = comment
      | Likes for this comment: {{commentLikeCount[i]}}
      a ng-click="like(commentLikeCount[i])"
```

It's important to realize where data is coming from in this example.  The syntax `=` as in `= comment` and `#{}` as in `#{comment.likeCount}` are server-rendered bits.  As you know, the curlies and the ng attribute syntax is for Angular's client side rendering. 

So how has this mixture bought us anything?

1. The server renders the comments initially.  This makes the display immediate when the browser loads the page.
2. We init the value of `commentLikeCount`, making it available for Angular to display once the client compiles the template.
3. Since Angular has a count of the likes, it can easily update it and redisplay without a page reload after calling `like()` to increment the count.

Frankly, the mixture feels a little bit odd to me.  I've seen it work.  I know there are different ways to get this done.  I think there are probably better ways.  What has worked well for you in similar use cases?
