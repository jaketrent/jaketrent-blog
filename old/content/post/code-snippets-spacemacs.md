---
categories:
- "Code"
comments: true
date: 2017-05-05T14:37:36-06:00
description: "Snippets are prebaked bits of code.  Creating them and accessing them in spacemacs is easy."
draft: false
image: "https://i.imgur.com/rYPNoPw.jpg"
layout: post
metaKeywords: "spacemacs, emacs, snippets, evil-mode"
tags:
- "tools"
- "spacemacs"
title: "Code Snippets in Spacemacs"
---

Snippets are prebaked bits of code that can make your coding experience faster.  Creating them and accessing them in [spacemacs ](http://spacemacs.org/) is easy.

<!--more-->

## yasnippet

In spacemacs the default snippet manager is [yasnippet](https://github.com/joaotavora/yasnippet).  Its snippet format is inspired by Textmate.  We're going to look at the very basics of creating and using a snippet.  For more goodies, see the [official docs](http://joaotavora.github.io/yasnippet/index.html).

## Creating Snippet Files

A snippet is stored as a file on the file system.  There is one file per snippet.  There are a few ways to get a snippet file created.  Here are my two favorites.

### `yas-new-snippet`

To run a command in spacemacs, type `SPC :`.  Then execute the `yas-new-snippet` command.  This will open a new buffer with the template of a snippet setup for you to fill in:

```txt
# -*- mode: snippet -*-
# name: 
# key: 
# --
```

Lines that start with `#` are comments.  Everything below the comment will be the snippet content.  The comment fields are used to identify and use the snippet later on.  

- `name` is the human-readable description
- `key` is the shorthand text that you will write while coding to expand your snippet

### `helm-yas-create-snippet-on-region`

`helm-yas-create-snippet-on-region` is another way to create the snippet file.  You run this command after you're in a source file and you have a bit of source code selected.  After you have selected that code and run this command, the snippet template will be prepopulated with your selection as the snippet content.  This is great to use when you realize that you'd really like to make your tired fingers work so hard in the future.

## Defining Snippets

A snippet can be any text.  Usually it's some bit of code you write frequently. Snippets can be static or dynamic.  A dynamic snippet is one where the content includes values you decide when you go to use the snippet.  In yasnippet, these are called tab-stop fields.  They're defined by their tab order.  After you insert a snippet, you can tab through the fields to enter your dynamic values. 

Let's say that you wanted to create a snippet for a barebones React component.  You might define a snippet like this:

```txt
# -*- mode: snippet -*-
# name: React component
# key: rc
# --
import React from 'react'

export default props => 
  <$1>
    $0
  </$1>
```

- Tab-stops are defined by the `$`, followed by their tab index.
- `$1` will be the first tab-stop, allowing for dynamic value insertion.  Specifying the same tab-stop multiple times means that when inserting your dynamic value, it will appear in each place but only needing to be typed out once.
- `$0` is always where the cursor ends, with no opportunity for value insertion.

## Saving and Organizing Snippets

After you've edited your snippet to your satisfaction, you want to make sure that it's saved for later use.  Snippets are saved in:

```txt
~/.emacs.d/private/snippets/
```

In that directory, there are subdirectories named after the emacs major modes that the snippet should be available within.  For our React snippet above, we're going to save it to:

```txt
~/.emacs.d/private/snippets/js2-mode/rc
```

After you save a snippet, you need to load it into yasnippets in memory.  To do this, enter the command `yas-reload-all`.  

After you've spent time and effort creating a set of snippets that works well for you, make sure to back them up on a place like github.

## Inserting Snippets

You've done all the work -- now for the reward.  If I am writing a bunch of new React component modules, I'm ready with this new snippet.

I work in evil mode (vim keybindings within emacs), and the easiest way I've found to insert snippets is to execute the `spacemacs/helm-yas` command which is bound by default to `SPC i s` (think "insert snippet").  Once you've typed this, you'll get a mini buffer that allows you to fuzzy search over the `name` or `key` of your snippet.  We'll type `rc`, select it, and it's inserted into our code buffer.  You are ready to tab to tab-stops as soon as the snippet is inserted.  You can edit tab-stops by entering insert mode.

Snippets take some setup but can help save time later.  

How else do you handle snippets in spacemacs?  Do you have any better ways of creating, defining, or inserting them?










