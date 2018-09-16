---
layout: post
title: "Define Methods Dynamically in Ruby"
date: "2013-11-26"
comments: true
categories:
  - "Code"
tags:
  - "ruby"
description: Ruby makes it very easy to define more methods on your classes.  The syntax is easy, and it's done every day.
metaKeywords: ruby, define_method, define new method, dynamic method, metaprogramming
draft: false
image: https://i.imgur.com/Z7WWtL0.jpg
---

In Ruby, it's common to see new methods defined dynamically or on the fly for your class.  And who doesn't want to have a piece of that metaprogramming?

<!--more-->

## An Example

For example, I just finished an [exercism code exercise](/post/exercism-review/) where I felt like there was a fair bit of code duplication.  I had a bunch of convenience functions that would show the conversion of a time in earth time to a time specific to a planet.  So, the API required something that looked something like this:

```ruby
class SpaceAge

  def on_earth
    seconds_on_planet :earth
  end

  def on_mercury
    seconds_on_planet :mercury
  end

  def on_venus
    seconds_on_planet :venus
  end

  # ...
end
```

Feeling that this might be an excessive number of similarly pattern methods, I considered ways that the API might stay in tact but the effort of maintenance of these many functions might be decreased.

## `define_method`

We could collapse these methods quite a bit in the visual code by defining them dynamically, using `define_method`:

```ruby
class SpaceAge
  def self.on_planets(*planets)
    planets.each do |planet|
      define_method "on_#{planet}" do
        seconds_on_planet planet
      end
    end
  end

  on_planets :earth, :mercury, :venus, :mars, :jupiter, :saturn, :uranus, :neptune
end
```

The exact same code would be generated.  It's better! But it's worse!  It's actually less readable than before.  `on_planets` as a new helper API might be nice.  But, we're not currently using this anywhere else.  The code is probably more maintainable, but it's also more stiff.  Previously, each of the methods was separate and therefore separately modifiable and customizable.  Now, there's one implementation of an "on_#{planet}" method.  This could be easier/harder to deal with, depending.  I think the readability is better because of the smaller amount of code, but the readability is worse because of the increased complexity and eye parsing required.  In the end, for my code, I stayed with the original solution for its 5-star readability.

But the ability to define methods dynamically is super awesome.  When do you find yourself using this super power?
