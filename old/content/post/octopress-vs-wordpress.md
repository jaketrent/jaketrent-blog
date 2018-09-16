---
layout: post
title: "Octopress vs. WordPress"
date: "2012-11-12"
comments: true
categories:
  - "Announcment"
tags:
  - "blog"
  - "php"
  - "ruby"
  - "octopress"
description: Octopress vs. WordPress.  Which should I use for my blog?  I chose WordPress first, then went to Octopress.  Here are some points of comparison.
metaKeywords: octopress, wordpress, php, ruby, blog
image: https://i.imgur.com/uACBn.jpg
---

Why would one choose Octopress over WordPress?  What are the pros and cons?  I've recently implemented a blog -- this blog -- in WordPress.  It was a difficult decision for me.  At the time, I looked at Octopress, but I was jazzed by the success of others on WordPress, and I wanted to try it out.  I'm glad that I did try it out, but now I'm glad that I've switched to Octopress.  Here's why.

<!--more-->

## Just Posts
Octopress is so dead simple, it just makes sense.  The post is a file in a folder.  I edit it in my current favorite MarkDown editor, [Mou](http://mouapp.com/).  The workflow is thus very easy.  I'm not transferring my post which I wrote offline to a web interface only available online.

## Nerd Cred
Nerd cred or geek cred?  I don't know, but Octopress bumps it right up.  As it says, it's a "blogging framework for hackers".  Given that I'm a creator of software and that's the main topic of my blog, it seems fitting, doesn't it.  Plenty of coders have WordPress sites, I suppose.  Still, I didn't feel super awesome about running a WordPress PHP site as my home base.

## Performance
The whole idea of a generated static site seems genius.  It's blazing fast.  I'm on Heroku.  Currently, my site experiences very low volume traffic.  With one dyno, when the site goes without traffic for a certain amount of time, Heroku will power down the dyno.  WordPress takes a fair bit to come back up on the first request after that.  Octopress, no problem.  Pops back like it was never gone.  And why not?  There's really nothing to spin up.

## No Reinvention
I landed on Octopress for one of the same reasons I initially chose WordPress for this new blog.  It is a ready-made blogging platform.  I don't need to reinvent the wheel.  It works, and it works well.

## A Bit of Customization
I chose WordPress for the blog because I wanted to write blog posts, not tinker with the innards of the site.  (I do that plenty elsewhere.)  But it turns out that I couldn't quite bare just using an out-of-the-box theme.  I literally needed to add my own flair and customizations.  I still want to keep that to a minimum.  Octopress' classic theme (the only one?) is fantastic -- clean and crisp.  When I want to make a few changes, it's a much more straight-forward task to find the place that needs editing and get it done.  

## Ruby
I've hardly done any Ruby.  Octopress is an easy little touch of Ruby.  I don't have to mess with it unless I want to.  Ruby is much more appealing to me than PHP.

## Plugin Pluses
When I chose WordPress, I figured that if there was any feature that I desired, there was probably already a plugin for it.  And that turned out to be true.  Octopress certainly [has fewer options](https://github.com/imathis/octopress/wiki/3rd-party-plugins).  But on the whole, I think they cater well to the coder crowd.

## For Now
So, for now, I'm on Octopress.  It's nice to think that my data is just a folder of files that I could really recreate anywhere.  So, we'll see how long this lasts.  So far, it's a blogging platform for this hacker, and I'm liking it.

