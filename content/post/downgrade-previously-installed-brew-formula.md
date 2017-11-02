---
categories:
- "Code"
comments: true
date: 2017-11-02T05:40:20-06:00
description: "How to install an old, previously-installed brew formula."
draft: false
image: "https://i.imgur.com/GDUoBF7.jpg"
layout: post
metaKeywords: "brew, homebrew, brew install old version, brew downgrade, brew versions"
tags:
- "homebrew"
- "osx"
title: "Downgrade to a Previously-installed Brew Formula"
---

Here's how to install an old, previously-installed brew formula.

<!--more-->

(tested on Hombrew 1.36)

## Deprecated: List Available Versions on Tap

There used to be a command, `brew versions`, where you'd try to list the versions of a formula ready to install.  If I was looking for `hugo` versions, I'd type `brew versions hugo`.  

This no longer works.  I get:

```bash
$ brew versions hugo
Error: Unknown command: versions
```

## List Previously-installed Versions

You can use a different command, however, to list versions of a package that you have previously installed on your machine:

```bash
$ brew list --versions hugo
hugo 0.18.1 0.21 0.30.2
```

I have 3 versions I've installed before.  Thankfully, `0.18.1` is still there, because that's the one I want to downgrade to.

## Switch to Different Formula Version

There's an easy switchero I can pull to downgrade to the previously-installed version:

```bash
$ brew switch hugo 0.18.1
Cleaning /usr/local/Cellar/hugo/0.18.1
Cleaning /usr/local/Cellar/hugo/0.21
Cleaning /usr/local/Cellar/hugo/0.30.2
28 links created for /usr/local/Cellar/hugo/0.18.1
```

My task is now essentially done.  I did try a couple other things along the way though.

## Install Specific Version

I saw a bunch of Internet advice to install specific versions using the `@VERSION` suffix, a la npm, such as `brew install hugo@0.18.1`.  This does not work in most cases.  

It only works in the case of those packages that publish a formula actually named using that format.  `postgresql` is such a package.

You can list the published formulas related to a package name using the command:

```bash
$ brew search postgresql
==> Searching local taps...
postgresql                             postgresql@9.4                         postgresql@9.5                         postgresql@9.6
==> Searching taps on GitHub...
caskroom/cask/navicat-for-postgresql                                           caskroom/cask/photo-supreme-postgresql
==> Searching blacklisted, migrated and deleted formulae...
```

There was also some advice that I read about how to install *any arbitrary version* of a formula previously published on homebrew by [finding the git commit hash](https://www.fernandomc.com/posts/brew-install-legacy-hugo-site-generator/) and using that.  I never went through the trouble of trying this. 

How to do you install old formulas on homebrew?

