---
affiliateUrl: "http://www.amazon.com/gp/product/B008Z5OEUY/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B008Z5OEUY&linkCode=as2&tag=jaktre-20"
author: "Guillermo Rauch"
date: "2013-01-29"
categories:
  - "Book"
comments: true
description: "Node.js is hot. This book is green. Read it. It’s a survey of Node and a variety of interesting features."
draft: false
image: "https://i.imgur.com/cMkY2aM.jpg"
layout: "book"
metaKeywords: js, nodejs, smashing mag, smashing node, guillermo rauch, javascript everywhere
tags:
  - "js"
  - "nodejs"
title: "Smashing Node"
rating: 3
---

Node.js is everywhere.  There's a lot of room for people to learn and get into it.  A good starter book is [Smashing Node by Guillermo Rauch](http://amzn.to/14ttetp).  Here's what I thought and what I learned while reading it.

<!--more-->

## Overall

Overall, I would call Smashing Node an introduction to Node book.  This is a good thing.  It does a nice job of building on itself.  It starts with the JavaScript that everyone knows and advances to the new places that Node allows you to go.  The chapters are incremental.

It's a good length.  This is not a tome that you might pick up in a level 3 dungeon in order to boost your fire magic.  You can read a couple chapters a day and be done in a week.  Thankfully, it's in consumable-sized bits.  Maybe you'll end up boosting your fire magic a bit too.

The book boasts a fair breadth of subjects.  It introduces purely syntax subjects.  It also expands into working examples dealing with real network protocols and database apis.

## Style

Guirremo has a very easy-to-read, conversational style.  I value this more and more in books -- perhaps even especially in technical books.  It helps me engage.  It helps me read faster and more.  I can read API docs when I need them.  A book should not read like an API doc.

Most subjects in the book were chosen well.  I enjoyed almost all of them.  There always is a bottom of the list, however, and mine ended with the MySQL, HTTP, and TCP chapters.  Knowledge on those subjects is probably good to have, but I had to slog through these chapters.

The code examples were enjoyable because they eventually turned into functional prototypes.  We built a Twitter client, an IRC chat, a social DJ program, and more.  That's pretty cool.  The downside was that the code examples could get a little long.  And with the entire working example, complete with all the npm commands and boilerplate code, sometimes the meaningful bits got a little obscured.  I read the book as a [Kindle book](http://amzn.to/14ttetp) on a phone, so the long code snippets probably seemed even longer than they were.

## Highlight Subjects

#### Express Features

I use [Express](http://expressjs.com/) more than any other library in Node.  It's a great HTTP request/response wrapper that makes creating web servers fun and easy.  Even so, this book introduced a number of features of the library that I was previously unaware of.  Generally, I think it helped illuminate for me a lot of the bits of Connect, which functions underneath Express.  Specifically, did you know that you can modify the Express logger to log specific request tokens of your choosing?  

#### Redis

There was a great section that took a look at [Mongo](http://www.mongodb.org/), [MySQL](http://www.mysql.com/), and [Redis](http://redis.io/).  I enjoyed the chapter on Redis the most.  This is probaby somewhat because I have the most to learn in Redis and have used it the least.  I was also impressed at the ease with which Guirremo layed out a simple social graph using the Redis API.  The chosen tools, Node and Redis, made it simple, short, and elegant.  

Try writing many of the code examples in this book in Java and printing them on dead trees.  You'll need a bigger backpack.

#### Testing

I enjoyed the fact that testing was even mentioned.  A few testing styles and frameworks were introduced.  It was enjoyable but very light.  It would be cool to see a more thorough treatment, perhaps with applicable tests worked into the examples throughout the book.  

In this same vein, I think the book did an ok job at addressing the subject of error handling.  I think this book and other Node resources and educators should focus more on this issue.  It is, after all, more important in Node's single-threaded environment than on most platforms.

#### Web Sockets

I had only previously done web sockets via [Socket.IO](http://socket.io/), a web socket wrapper written by the author of the book.  It was good to see vanilla web sockets in action so I could better understand the technology, its limitations, and be grateful for the great libraries that help it be more useful and easy to use.

#### Great Libraries

The booked worked in usages of some great libraries throughout the coding examples.  As mentioned, [Socket.IO](http://socket.io/) is a great web socket wrapper.  [Superagent](https://github.com/visionmedia/superagent) is a great higher-level request API.  [Mocha](http://visionmedia.github.com/mocha/) is a fantastic test framework.  And [Mongoose](http://mongoosejs.com/) provides a nice model layer on top of the native MongoDb calls.

So, what are you waiting for?  Go learn Node!  Use this book to help you.
