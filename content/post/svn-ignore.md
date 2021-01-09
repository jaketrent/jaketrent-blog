---
layout: post
title: "SVN Ignore"
date: "2008-11-23"
comments: true
categories:
  - "Code"
tags:
  - "svn"
  - "vcs"
description: In projects that create project meta data or compiled class files in the same directory as source, svn commits can be particularly cluttered with those file
metaKeywords: svn, vcs
draft: false
---

In projects that create project meta data or compiled class files in the same directory as source, svn commits can be particularly cluttered with those files that we really don't care to keep under version control.  This is where svn:ignore can beceome our good friend.
<!--more-->

In projects that create project meta data or compiled class files in the same directory as source, svn commits can be particularly cluttered with those files that we really don't care to keep under version control.  This is where svn:ignore can beceome our good friend.

For instance, in my django projects, the compile .pyc files are littered throughout my directory structure.  I don't want to commit them, so I want to ignore them.  

We need to edit the special property: svn:ignore.  The syntax is:

```bash
svn propedit svn:ignore target_dir
```

If you have multiple directories, you'll have to run this for each or list multiple directories in the command.  I have yet to figure out how to do this recursively.  Does anyone know?

Later, to see what you're ignoring, try this:

```bash
svn status --no-ignore
```

<h3>Update for Django</h3>
One of the main reasons I care about svn ignore is for my django projects.  I hate getting the .pyc files stuck in svn.  To purge your project of your *.pyc files, go to the project root and run this:

```bash
find -name '*.pyc' -print0|xargs -0 rm
```

  
