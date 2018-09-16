---
affiliateUrl: "http://www.amazon.com/gp/product/B00JETLW32/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00JETLW32&linkCode=as2&tag=jaktre-20"
author: "Jamie White et al"
date: "2014-01-23"
categories:
  - "Book"
comments: true
description: "A great survey of the language API similar to the official Ember guides. It also includes half a book of the implementation of a real project."
draft: false
metaKeywords: ember, javascript, ember edge, book, learn ember
layout: "book"
tags: 
  - "js"
  - "ember"
image: "https://i.imgur.com/1JMwQPM.jpg"
title: "Developing an Ember Edge"
rating: 3
---

The latest book on The List at [emberwatch](http://emberwatch.com/books) is [Developing an Ember Edge](http://bleedingedgepress.com/our-books/developing-an-ember-edge/).  It's a great intro book to Ember.js.

<!--more-->

The book is published by Bleeding Edge Press.  Pretty awesome name.  It is written by Jamie White, Matthew Beale, Christopher Sansone, Wesley Workman, and Bradley Priest, quite the host of authors.  It turns out to be a very timely read for me.  The code in the book even uses some of ember-data 1.0 beta 3.  As of this writing, that's almost the bleeding edge.

I would compare the book to the [Ember.js official guides](http://emberjs.com/guides/).  It's introductory.  It definitely favors a breadth approach.  For me, but a wee Ember babe, it brings to light some interesting details about the Ember internals or at least the approach of the framework.

## Format

I read the book in digital form as a pdf.  I love the digitalness, but I wonder if it wouldn't have had a bit more editorial review if printed.  Perhaps this is what Bleeding Edge Press means.  The code in the snippets was all smashed to the left, destroying most indentation reading assistance.  The code bits were also a smaller font size than the prose which made the switch between the two slightly awkward to my over-taxed eyes.  By the end of the book, I wasn't surprised when I found a typo.  There were a lot but not too many.  For someone of lesser OCD, it probably would've largely gone unnoticed.  Of course, considering the engineer audience of the book, maybe that doesn't exist.

## The Zen of Ember

The book content is really good.  I felt like it helped me piece together why things are organized in Ember as they are.  I learned more of what the pieces are by themselves and how they're meant to interact together.  The authors were also kind to point out where some of the rough edges were in terms of design (or potential misdesign by app authors) and api changes.

I liked the mostly-breadth approach to the writing.  The book was good for a newb and remained pretty short.  Perhaps that's because there's not too much there as a general subject without bloating this book into an API reference book. [whew]  The book struck a good balance of being technical, readable, and giving good insight into the practical use of the framework.

## Ember Trackr

The first half of the book covers the concepts and layers of Ember, approaching mvc in general, objects, application, routes, handlebars, views, controllers, components, and models.  This takes 54 pages.  The other half(+) shows the development of a ticket tracking app.

The development process shown is thorough, even including the tool install, project file layout, and ui styling.  The TDD of the app in total was awesome.  It's really step by step.  Sometimes this was a little painful, but you definitely don't miss anything.  The screenshots of test runners in terminals and the app in browser windows could have been cropped for easier reading with less vertical blank space.  The testing walkthrough was really great.  They even worked through a few "unexpected" errors as one might actually encounter them.

The app dev portion could probably have been cut short.  About the time they start into the user management screens, we probably could have called it good.  But, they do introduce some good, new concepts in the app dev section of the book.  For instance, he covers a little on containers and `Ember.run` as it relates to testing.

I'm glad I read the book.  It was helpful to my slingshot into the Ember atmosphere.  Boom!  Go get it.
