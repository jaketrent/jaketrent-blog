---
layout: post
title: "Gitignore System Files"
date: "2016-03-14"
comments: true
categories: [Code]
description: Ignore system files at the system level.  Keep your project clean.
metaKeywords: git, gitignore, idea, vscode, DS_Store
draft: false
image: https://i.imgur.com/ZYiky6R.png
---

There are many files that you don't want to store in your project's Git repo.  Some of these are even specific to the project.  Some are definitely not.  How do you ignore these that aren't related to the project?

<!--more-->

## .gitignore For the Project

In your project directory, you likely have a `.gitignore` file.  Here, you keep things that might show up in that directory out of the project's version-controlled source tree.  There's not much to it.  On each line of the file, list the file names, directory names, or partial patterns that you don't want Git to track or even know about.

For instance, if you're doing a Node.js project, you probably want to track all your own `.js` files, found in `src/`.  But you don't want to track all those 3rd-party modules in `node_modules`.  You probably don't want to track your code compiled for distribution either.  So, your project's `.gitignore` file might look like this:

```text
node_modules
dist
```

## .gitignore For Your System

Everything that goes in the project's `.gitignore` file should relate to the project.  And it should relate to everyone.  

There are many people and systems interacting with your project.  For instance, some developers might be on Mac OSX and get those nasty Finder thumbnail files, `.DS_Store` that end up popping up all over the place.  Others on the project might use the venerable Jetbrains editors which drop an `.idea/` directory in every project they edit.  These facts should be transparent to your project.  Every time someone picks up a new editor or switches an OS, the project shouldn't have another commit updating the `.gitignore` with yet another thing.

You can make Git ignore files that appear on your system but are unrelated to the project.  

Edit your top-level `~/.gitignore`.  Add all your system-related things there.  It might end up look like:

```text
.DS_Store
.idea
```
