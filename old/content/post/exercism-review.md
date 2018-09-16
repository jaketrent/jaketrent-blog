---
layout: post
title: "Exercism Review"
date: "2013-11-19"
comments: true
categories:
  - "Code"
tags:
  - "learning"
  - "ruby"
  - "elm"
description: Exercism.io provides a great resource for daily code exercises and review.
metaKeywords: exercism.io, exercism, daily exercise, ruby, javascript, objective-c, haskell, elixir
draft: false
image: https://i.imgur.com/2oAEqBZ.jpg
---

Exercism.io is a fantastic site and tool that provides a wealth of daily code exercises.  If you want to learn to be better in a language, it's a great resource to do exercises and receive feedback.

<!--more-->

## Origin

[Exercism.io](http://exercism.io) was introduced to me by Franklin Webber of gSchool and JumpStart Labs fame.  He and his colleagues use it as a part of their instruction, and it's a great, free tool available to the public.

## Languages

There is a fun array of language-learning possibilities inside Exercism.  It currently includes a varying number of exercises across these languages:

- clojure
- elixir
- haskell
- javascript
- objective-c
- python
- ruby
- scala

I'm currently running through the Ruby exercises.

## Starting Point

Based on what I've seen of the Ruby and JavaScript exercises, I don't think that Exercism's exercises are meant for an absolute beginner.  Some basic knowledge of the programming language is assumed and required.  You'll start a little deep if you know next to nothing.  These exercises are meant to expand your exposure to and understanding of language features.

## Installation

Installation consists of a few things:

0. Go to [exercism.io](http://exercism.io) and register using your Github credentials.
1. While on the site, download the CLI.  It's a pre-built binary that you just need to put somewhere that is tied to your system PATH.  That way you can execute it from the terminal.
2. Setup your environment for the language you'll be learning.  Again, this information is on the site.  None of the environments are automatic in their setup, and you must follow the written steps to be ready to develop in your weapon, er language of choice.

## Your First Exercise

After installation, you're ready for your first exercise.  On the terminal, type:

```bash
exercism fetch
```

This will download fresh exercises at the head of each of your language paths.  At first, you'll start on exercise 0 of each of the language paths.  Now, choose a language.  I chose Ruby first.  The first exercise was called `bob`.  Bob is a lackadaisical teenager who responds with smart remarks to whatever somewhat says to him.  Typical.

Bob comes with a suite of failing tests.  All the tests are written, and it's up to use to write the code that actually makes Bob function and the tests pass.  This is literally TDD or test-driven development, and yay for us, someone has already written the tests!  In the case of Ruby, the tests are written in a MiniTest syntax.  To run them, I'm typing:

```bash
ruby bob_test.rb
```

This is where I think we might be able to have a bit of a better setup with the exercises.  It would be nice to have the tests automatically run on a file watch as opposed to having to run them each time manually.  For this, I personally setup `guard-minitest`.  I would recommend the same.  Of course, I can only think that Exercism doesn't do this by default in order to simplify the environment setup process.

## Nitpicking

After you complete your first exercise in some form by getting all the tests to pass, you can submit it to the site for feedback.  For example:

```bash
exercism submit ruby/bob/bob.rb
```

The CLI will give you a link to your now-online code, and you can go there to see your submission.  Others who have completed the same exercise will also be able to see your solution.  And this is one of the coolest potentials of Exercism.  Others can give you feedback on your solution, called "nitpicks" by default.  This is a great learning opportunity.  We are ready to take feedback given from the perspective of others in their experience with the language.  We can also give feedback, training our eye to be more critical in our observation and future writing of code.  It feels like a great outcome and a great potential community.

I have given nitpicks.  Of course, that's easier to do.  But, I am sad to say that I have never received any.  It's hard to tell how active the community really is.  I see quite a few submissions, but there are definitely fewer nitpicks than submissions.  There's quite a bit untapped community learning potential here.  To help this, I wish the system allowed you to unlock the next exercise in your language path without closing opportunity for nitpicks on submitted exercises.

So, have you used Exercism.io before?  Do you know of similar sites?

