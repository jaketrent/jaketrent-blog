---
layout: post
title: "Jumpstart Lab Ruby Training Review"
date: "2013-02-19"
comments: true
categories:
  - "Review"
tags:
  - "ruby"
  - "rails"
description: Jumpstart Lab offers a Ruby and Rails training.  I participated.  Here's what I thought.
metaKeywords: jumpstart lab, ruby, ruby on rails, rails, training, franklin webber
draft: false
image: https://i.imgur.com/DniDljD.png
---

[Jumpstart Lab](http://jumpstartlab.com/) offers a [Ruby training](http://www.jumpstartlab.com/courses/).  I recently attended.  I had a great experience and learned a lot in my first real introduction to Ruby and Ruby on Rails.  I would highly recommend the course.  Here are a few more details on my experience.

<!--more-->

## Format

#### Length

Jumpstart sent a great instructor, [Franklin Webber](https://twitter.com/franklinwebber), to come lead us through the exercises.  The course was on site at our company.  It was 5 days in length.  Instruction went from 9am to 4pm daily, with a 1 hour break at lunch time.

#### Breaks

Exercises throughout the day were split up into 25 min time chunks with 5 min breaks following.  Some will recognize this usual time chunks for the [Pomodoro technique](http://www.pomodorotechnique.com/).  Frank, as the leader of the exercises, was more strict in his observance of the Pomodoro time slices than I'm used to seeing.  Many people I've worked with would work right through a short break, but we took breaks quite religiously.

#### Content Split

In our 5 day training, we spent about the first 3 days going over vanilla Ruby.  The next 2 days, we focused on the Ruby on Rails framework specifically.

## Approach

#### TDD

Probably about the coolest aspect of this training was its relying on [TDD](http://en.wikipedia.org/wiki/Test-driven_development) to get stuff done.  Often training courses, especially those that introduce brand new languages and concepts, leave testing as a tack-on feature, meantioned in parting near the end of the course.  Thankfully, Jumpstart did a great job integrating this best practice into most of its instruction.  

We used [Rspec](https://www.relishapp.com/rspec) as a test runner.  We used [Guard](https://github.com/guard/guard) to help us go faster through our test iterations.  We discussed what to test, how to make our tests more readable, how to isolate tests using [mocks](https://relishapp.com/rspec/rspec-mocks/docs), and practiced doing lots of tests.  

Only the Rails portion of the course was taught using error-driven development.  This actually worked quite well, as learning to use a framework requires learning how the pieces connect and trying not to test the framework.

#### Instructor-Led

Frank made the class successful.  He is super knowledgeable about the subject matter.  He is fun and funny.  He is great at introducing topics that built upon each other.  He is great at letting the students figure things out for themselves and jumping in at the right moment to help clear hurdles.  It was great to meet and work with Frank, and I hope to do so again.

## Bonuses

#### Hack Night

We do a [hack night](http://tannerhack.eventbrite.com/) every other week at work anyway.  Since Frank was here, he led the hack night.  We did a Codemash kata exercise where we created code to generate a [Minesweeper](https://github.com/jaketrent/minesweeper) board.  We split into teams and pair-programmed our different solutions.  Everyone came up with unique solutions, we compared them, and then iterated.  I had so much fun with the exercise, I put a frontend on the game and made it [playable](http://minemopper.herokuapp.com).

#### Tutorial Content

Jumpstart printed materials for us in a booklet.  The [tutorials](http://tutorials.jumpstartlab.com) are also available online.  Frank took a unique path through the content, and we talked through our specific approach.  As he worked, Frank also [uploaded the code](https://github.com/burtlo/training-021113) from our instruction to Github.  I did the same for [my code](http://github.com/jaketrent/ruby-training).

#### Recommendation

I think that this training series was about the best I've attended.  I'm doing a lot more Ruby and Rails in my current job than I expected even a few weeks ago, so it was very timely and useful for me.  The content was good, but it was the instruction that made it top notch.  Thanks, Frank and Jumpstart, for the great experience!
