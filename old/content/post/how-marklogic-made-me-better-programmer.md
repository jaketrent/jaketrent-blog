---
layout: post
title: "How MarkLogic Made Me a Better Programmer"
date: "2013-08-08"
comments: true
categories:
  - "Code"
tags:
  - "marklogic"
  - "xquery"
description: MarkLogic was a very new experience for me.  I don't program in it these days, but it helped me become a better programmer.
draft: false
image: https://i.imgur.com/32OKIUH.png
---

I started programming on the [MarkLogic](http://www.marklogic.com/) platform in 2010.  It was a very new experience for me.  I don't program in it these days, but I still think back on the experiences I had with MarkLogic and in general believe that they made me a better programmer.  Here's how.

<!--more-->

## First Functional Language
MarkLogic is a proprietary platform that uses the XQuery language.  This is MarkLogic-flavor XQuery, augmenting the vanilla.  There are first-level functions.  There are sequences.  There are no side effects.  There is no state outside of function scope.

This language proved to require a new way of thinking.  I came from coding Java at the time.  I was without my `StringBuilder` class.  I remember the first time I tried to build up a string dynamically in code.  There is no such thing as throwing substrings in a builder or a buffer and building it up (no side effects).  Of course, there is a way to build a dynamic string; it is just different.  I became a lot more comfortable with recursive methods for solving problems.

As a side note, the language isn't 100% functional.  For instance, there actually are side effects.  For example, the [`map`](https://docs.marklogic.com/map) api sets values on preexisting maps and returns the same map.  And the terrible [`xmdp:set`](https://docs.marklogic.com/xdmp:set) will bypass all of the functional sauce and set whatever whenever and is to be avoided.

## First NoSql Store
MarkLogic has its own database built in.  It's a document store.  It was the first place I implemented real NoSQL work and pushed it to production.  Here, I learned document design.  I practiced optimizing for reads or writes depending on the use case.  The experience helped me think beyond well-formed tables and embrace the messier data that is more true to life.  I was thinking more in terms of search engines and less in terms of spreadsheets.

Coding in MarkLogic utilizes XQuery which encompasses XPath.  Given that much X technology, the data format was almost assuredly going to be XML.  And so it is.  Every document stored in MarkLogic is XML.  I became a lot better at tree traversal as a result.

## Lack of Libraries
The MarkLogic ecosystem at the time was really lacking.  I don't follow its current state, but it's probably safe to say that there is less going on here than in the world of Node or Ruby.  You won't find a MarkLogic package manager a la `npm` or `gem`.  You probably won't even find a library to reuse.  There are literally just a handful of libraries that are shared widely in my experience, and these are lower-level utility libraries of the flavor of UnderscoreJs.

This meant that if I needed code, I was going to write it.  So, I wrote a lot of code.  I learned to produce everything I needed and not rely on any 3rd party code.

This was the same when it came to utilities on the platform.  For instance, there was not a unit test library at the time I started into XQuery.  There was a framework that was written in Java that would exercise XQuery code, but that didn't fit my environment needs very well and felt odd, so we wrote our own unit testing framework a la Junit or Jasmine, called [XqTest](https://github.com/irinc/xqtest).  We finally open sourced it (also rare for the MarkLogic ecosystem), but by then several similar frameworks had been created.

## Lack of Help
MarkLogic is a proprietary system.  There aren't many people using it, but those that do license it from the MarkLogic company.  They also pay for support.  Most of the expertise I encountered in MarkLogic was either a visiting consultant from MarkLogic, an engineer I met at the one MarkLogic conference, MarkLogic world, or a fellow in-house engineer.

This means that when you go to StackOverflow, there is a woeful lack of good solutions for common problems.  So, I learned to do a lot of debugging by myself and just keep on keeping on until I figured out the problem.  We had to write almost all of our code, so I was mostly reading my own code, which is easier.  Google wasn't a lot of help, and that's pretty odd in this age of programming.  Upside was that once I wrote the web article about the subject, I was the first-page [result](http://rockycode.com/blog/tech/marklogic/).

## Playing Ops
MarkLogic has its own web server as well, built into the monolith MarkLogic server product.  It was a new beast for the ops guys I worked with.  I was as new to it as them, thus I got to play ops a lot more than I would have on our older, more traditional systems.  I got to help keep the thing running.

I also got to help keep the apps tuned.  It turns out that MarkLogic can be either really performant or really *not* performant.  Often, I wrote the "not" way, and I had to help optimize (of course, via our in-house performance monitoring tools).

## The Experience
I was excited to learn MarkLogic at the time.  It was something new.  I enjoy that.  New code, new team, new thinking.  It was a high-profile product.  It was really a good experience.

I felt like I became very productive on the platform and was able to produce quality and quantity code.  In the end, I chose to not do more more MarkLogic.  I was doing more heavy client-side apps.  The XML just became a stumbling block where Json is king.  The functional paradigm is cool.  I really like it.  But I really don't like the XQuery language.  Its api is not very expressive, and its syntax requires a ton of typing.  MarkLogic is growing in its acceptance and use, but not at a huge pace.  It still seems like a niche product, used mostly in the publishing and defense industries.  It didn't seem like a great investment to keep spending my golden dev years on the platform.

 But for all the pros and cons of the platform and all the ups and downs of the experience, I feel like one of the net effects was that I became a better programmer in new, interesting ways.  For that, I'm grateful.  I'm glad I did it, and I'm glad to move on.  There are, after all, soooo many cool things to try in this age of software development.
