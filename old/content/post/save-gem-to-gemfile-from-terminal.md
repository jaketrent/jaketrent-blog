---
layout: post
title: "Save a Gem to Gemfile from Terminal"
date: "2013-11-18"
comments: true
categories:
  - "Code"
tags:
  - "ruby"
  - "rubygem"
description: Add a gem to your gemfile without opening the file.  Do it straight from your terminal
metaKeywords: ruby, gem, gemfile, gemrat, gem install save
draft: false
image: https://i.imgur.com/x2I31sl.jpg
---

Have you ever wished you could save a gem to your `Gemfile` straight from the command line?  I wish Rubygems had this built in, but it's easy to add.  After all, there's a gem for that.

<!--more-->

## From npm

Coming from Node/Npm previous to Ruby/Rubygems, I wished I could do something like this:

```bash
npm install express --save
```

This would take my specified npm module and append it to the end of my `package.json` dependencies list.

There is no equivalent for this built into Rubygems.

## Gemrat

But, there is a mutant beast that skulks through the gem-lined sewers of Rubyland -- and it's name is `gemrat`!  What a great, image-provoking name.  Once you install `gemrat`, you will have the power of 20 npms at your fingertips.

First, install it:

```bash
gem install gemrat
```

Next, decide what gem you want to save to your `Gemfile`.  Let's choose a gem of a gem to try called `guard`:

```bash
gemrat guard
```

Now, install the dependencies listed in your `Gemfile`:

```bash
bundle install
```

Kaboom.  You have learned the secrets of the Fire Swamp and could live there for some time.
