---
categories:
  - "Code"
comments: true
description: "How to change colors for the UI in Vim"
image: "https://i.imgur.com/ZZvFs0E.jpg"
layout: post
metaKeywords: "vim, vim theming, vim color overrides, vim highlight colors"
draft: false
tags:
  - "vim"
title: "Set Colors in Vim"
date: "2020-10-02"
---

Here's are some methods on changing colors for the UI in Vim.

<!--more-->

## Color one-offs in .vimrc

Most of the colors you have will probably come from a theme. I've been using [Dracula](https://draculatheme.com/vim) lately, and it's great.

But if you want to make one-off color adjustments yourself, you can stick those in your `.vimrc` file.

## Highlight command

The `highlight` command, or `hi` for short, is the key to setting colors on things. You set highlights on groups, by `group-name`.

In `.vimrc`, you'd start with something like:

```
hi LineNr 
```

Where `LineNr` is the group name to target. But the command is incomplete.  There are no colors set yet. Let's set some foreground (fg) and background (bg) colors.

## Color codes depend on Terminal or App

You can run vim in a few different ways. The most basic categories are to run vim through your terminal app (eg, zsh from iTerm) or through a standalone app (eg, macvim). You have to set colors for both.

```
hi LineNr ctermfg= ctermbg= guifg= guibg=
```

Usually you make cterm (for terminal) match gui (for standalone app) so that the colors are the same no matter how you run. But when you define the colors, the coding for each is different. What a pain!

Terminal colors are specified in a 256 ANSI color scheme. GUI colors are specified in my modern hex colors.

To finally finish the `LineNr` coloring, let's do a:

```
hi LineNr ctermfg=59 ctermbg=222 guifg=#ffb86c guibg=#282a36
```

There are other options you can learn in the help file via `:h hi`.

## Reload using latest .vimrc

After you save, you can see the colors applied in the current editor without restarting vim, using:

```
:source ~/.vimrc
```

## See current colors and things to color

If you want to learn the other color group names or see all the current color scheme, you can use the command:

```
:hi
```

The great thing is that the group-names that are standard to vim *and* those that your plugins add are all available to see here. 

How else do you like to set colors in vim?
