---
layout: post
title: "Debug Ruby and Rails"
date: "2013-11-14"
comments: true
categories:
  - "Code"
tags:
  - "ruby"
  - "rails"
description: Interactive debugging is a nice dev tool to have.  It's easy to get in Ruby with a debugger gem.
metaKeywords: ruby, rails, debugger, interactive debugging, debug
draft: false
image: https://i.imgur.com/Z7WWtL0.jpg
---

Interactive debugging can sometimes be faster and more effective in helping you code than a `puts` statement.  It's easy to get interactive debugging in Ruby or on Rails with the help of a nice gem.

<!--more-->

## No IDE Required

There are Ruby IDEs that provide interactive debugging capabilities.  My favorite is [RubyMine by Jetbrains](http://www.jetbrains.com/ruby/).  But if you don't have or don't want an IDE, there's still hope.

## Debugger Gem

#### Include the dependency

My new buddy George showed me a sweet gem simply named `debugger`.  To use it, I first add the `debugger` dependency to my `Gemfile`:

```
source "https://rubygems.org"

gem 'debugger'
```

#### Add a breakpoint

Next, I need to add my "breakpoint" into my code that I'm going to run.  In this case, the breakpoint is defined by calling `debugger`.  On the same line, we'll also import the `debugger` library:

```ruby
  # ...
  def is_anagram?
    require 'debugger'; debugger
    same_length? and different? and has_same_letters?
  end
```

#### Run your code

In this example, I'm going to break right after I call the `is_anagram?` method.  From the terminal, now I exercise the code.  In this case, I'll run my unit tests:

```bash
ruby anagram_test.rb
```

#### Debug like a champ

And when execution of the script gets to the `debugger` line, execution will pause and output in my terminal will look something like this:

```ruby
/Users/jake.trent/dev/exercism/ruby/anagram/anagram.rb:13
same_length? and different? and has_same_letters?

[8, 17] in /Users/jake.trent/dev/exercism/ruby/anagram/anagram.rb
   8      @letters2 = @word2.split('')
   9    end
   10
   11    def is_anagram?
   12      require 'debugger'; debugger
=> 13      same_length? and different? and has_same_letters?
   14    end
   15
   16    def has_same_letters?
   17      same_letters = true
(rdb:1)
```

A snippet of my code is shown, an arrow points at line 13, and there's a prompt at the bottom (labeled 'rdb') that you can type in.  `debugger` gives you a few special commands to type, such as:

- `n` - next
- `s` - step over
- `c` - continue

These commands should be familiar to almost all debuggers.  The other fabulous thing is that the prompt functions as a sort of `irb` session from the current context of your code.  So, I can type variable names to see their contents or call functions to see what they'd return.  So, in the case of this code, I could try:

```bash
(rdb:1) has_same_letters?
true
(rdb:1) @letters2
["s", "t", "a", "n", "d"]
```

Pretty cool and pretty powerful all for the price of including the library and including a breakpoint in your code.

Are there tools similar to this that you love to use for debugging?
