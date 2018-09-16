---
layout: post
title: "Ruby CLI Options Parsing"
date: "2015-02-24"
comments: true
categories:
  - "Code"
tags:
  - "ruby"
description: Making a CLI tool in Ruby is made more straightforward with an OptionParser in stdlib.
metaKeywords: ruby, OptionParser, OpenStruct, cli, command line, terminal, tool, options
draft: false
image: https://i.imgur.com/Z7WWtL0.jpg
---

Ruby's stdlib never ceases to amaze.  If you're making a CLI tool in Ruby, your efforts are made more straightforward by the existence of the [OptionParser](http://ruby-doc.org/stdlib-2.2.0/libdoc/optparse/rdoc/OptionParser.html) class.  Use it, and let happiness fill your heart.

<!--more-->

We're used to some nice CLI tools these days -- ones that have many useful options that allow for easier scripting and more powerful, quick usage.  Ruby's `OptionParser` will help us make our own and not disappoint the masses of fevered CLI users.

All terminal input from initial execution will enter our Ruby program via the `ARGV` variable.

To have the `OptionParser` class available to us, we must require the `optsparse` package.

`OptionParser` options are defined similar to how you'd expect event handlers to be defined: with the `on` keyword.  You can pass it a string to match a short option, a string to match the verbose option, and finally a block to be executed when the option is detected.  In the block, we generally will want to store the option state.  We'll choose to use an `OpenStruct` for that (and will need the `ostruct` package).

For example:

```ruby
require "optsparse"
require "ostruct"

options = OpenStruct.new
opt_parser = OptionParser.new do |opts|
    opts.banner = "Usage: luchador [options]"
    opts.separator ""
    opts.separator "Options:"

    opts.on("-t, "--twist", "Apply the nipple twist") do |t|
      options.twist = true
    end

    opts.on("-a a", "--anaconda-squeeze a", "The degrees of anaconda squeeze pressure") do |a|
      options.anaconda_squeeze = a
    end

    opt_parser.parse!(ARGV)
    options
end
```

Now we can we might run CLI tool something like this:

```
luchador -t --anaconda-squeeze 130
```

And run with both options engaged for ultimate luchador power.  Notice we used both short and verbose-style options (choosing to write out the longest of the options for its added poetic punch on that whopping 130 degrees of pure squeeze pressure!).

A few more points to note:

- `opts.banner` and `opts.separator` can be used to format usage information.
- Usage information, stored in `opts` can be `put` to the screen.  A `-h`/`--help` option is automatically built in for this purpose.
- Remember to call `parse!` after configuring the options so the input is actually processed.
- Here, the `--anaconda-squeeze` option is defined differently than the first: there is a trailing `a`.  For options that require a non-boolean, this is required.  Otherwise, the argument to your handling block will always be a boolean `true`.
- Note that this example code only shows option parsing -- nothing about the `luchador` binary itself.

This gives you the basic tools.  It's very easy, and it's built in!  To do more, you might take required options first through the CLI options and then read them interactively from the console.  What other neat additions do you see that we could add?


