---
categories:
  - "Code"
comments: true
description: "Manage plugins in vim without a plugin manager.  Just use git."
image: "https://i.imgur.com/Nrtzl9D.jpg"
layout: post
metaKeywords: "vim, plugin manager, git submodule, vundle, pathogen, vim 8"
draft: false
tags:
  - "vim"
  - "tools"
title: "Manage Vim Plugins Without a Plugin Manager"
date: "2018-03-09"
---

Vim has a lot of great text editing features built in.  But if you want to do anything else to customize it -- and you probably do -- you'll want some Vim plugins, of which there are many.  What you may not want is a plugin manager.  Neither do I.  Here's how to take care of your plugins without a plugin manager.

<!--more-->

## Vim Version 8+

You used to need a version manager.  But if you have a vim of version 8 or later, you don't.  There are additional capabilities baked in.  Check your version.  This is required for the rest to work.

To check your version, open vim and type `:version`.

## A Place for Plugins

There are many plugins to be found.  Find one that suits some need you have.  

Once you have a plugin in mind, you just need put it in a specific place.

A place like `~/.vim/pack/bundle/asdf/start` will work.  What is special and specific about this path?

- `.vim/` is where you put all vim-related stuff
- `pack/` means packages
- `bundle/` the name of our package -- we can call this whatever we want (eg, `my-plugins`)
- `start/` loaded on vim startup

## Get the Plugin Code

Find your plugin online, probably on Github somewhere, and copy the git clone url.  If I was going to install `vim-javascript`, I'd find the url: `https://github.com/pangloss/vim-javascript`.

If you're like me, you put your [dotfiles](https://github.com/jaketrent/dotfiles) in a git repo. Within my dotfiles clone, the vim subdirectory looks like:

```text
.
...
├── vim
│   └── pack
│       └── my-plugins
│           └── start
```

Now you want to record the fact that your vim config uses a plugin but keep that plugin source code elsewhere -- in its original repo.  This is a great use case for [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules).  

To make the connection in git, we type:

```bash
cd ~/dev/dotfiles
git submodule init 
git submodule add https://github.com/pangloss/vim-javascript
git add .
git commit -m "add vim plugin for javascript"
```

Of course, please make adjustments for your own dotfiles repo paths.  Also note that `git submodule init` only needs run once ever.  Future plugins will only need the `git submodule add` command to be included.

## On Next Clone

Now you're set for your current install of vim.  But what about that next wipe of your harddrive and a reinstall?  To get all this back up and running, you'll need to clone your dotfiles:

```bash
git clone --recurse-submodules -j8 git@github.com:jaketrent/dotfiles.git
```

Note the special flag `--recurse-submodules`.  If you forget this, you won't get that plugin code, and vim won't be responding to your plugins, because that code won't be downloaded.

Now vim is ready to be loaded with plugins and you don't need special plugin managers Pathogen, Vundle, or the others to do it.


