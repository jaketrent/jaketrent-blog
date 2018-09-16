---
layout: post
title: "Call Dynamic Method in Ruby"
date: "2013-11-25"
comments: true
categories:
  - "Code"
tags:
  - "ruby"
description: Sometimes it's useful to be able to call a different method in your code at runtime depending on a parameter.  Ruby easily does the job.
metaKeywords: ruby, dynamic method, send, send with parameters
draft: false
image: https://i.imgur.com/Z7WWtL0.jpg
---

I love Ruby's syntax for method calls.  The syntax for calling dynamic methods is pretty nice, and it's easily mastered.

<!--more-->

## `send` method

The `send` method is one of the best and most basic ways to call a method dynamically on your object.  Let's say we have an object with multiple methods like this:

```ruby
class Fezzik
  def show_sportsmanship
  end

  def be_colossus_for(person_1, person_2=nil, person_3=nil)
  end
end
```

The method you want to call might be represented as a string or a symbol.  Your method call might look like this:

```ruby
Fezzik.new.send(:show_sportsmanship)
# or
Fezzik.new.send("show_sportsmanship")
```

## Calling `send` with parameters

Now, some of your methods might have parameters.  How are those called?  Simply pass the argument values into the `send` call as the final argument, which is a variable length argument:

```ruby
just_one_person = Person.new
Fezzik.new.send(:be_colossus_for, just_one_person)
```

You can also pass the parameters as a splat array, such as this:

```ruby
people = [Person.new, Person.new, Person.new]
Fezzik.new.send(:be_colossus_for, *people)
```

In Ruby, the splat operator destructures the array into parameters, so the above code essentially becomes:

```ruby
people = [Person.new, Person.new, Person.new]
Fezzik.new.send(:be_colossus_for, people[0], people[1], people[2])
```

So, `send` turns out to be pretty easy to deal with and really useful.  Use it, and be happy.


