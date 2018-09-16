---
categories:
- "Code"
comments: true
date: 2017-07-04T20:20:55-06:00
description: "Projects are simple and lightweight in Spacemacs, and it's awesome."
draft: false
image: "https://i.imgur.com/rYPNoPw.jpg"
layout: post
metaKeywords: "spacemacs, projects, find projects in spacemacs, project management"
tags:
- "spacemacs"
- "tools"
title: "Projects in Spacemacs"
---

Projects are simple and lightweight in Spacemacs, and it's awesome.

<!--more-->

## No New Project

In Spacemacs you never go to the Spacemacs menu and select "New Project".  What am I saying.. you keyboard to glory, typing `Cmd-N` for a new project.  But no, Spacemacs doesn't even do this.  You just start editing a file anywhere on the file system.  There is no ceremony in starting a new project, selecting tech, checking boxes, scaffolding junk, requiring project type support, or any of this.  It's simply editing.

## No Project Files

Lots of editors or IDEs have the idea of project files.  These are often in some hidden directory on the filesystem inside your code directory.  These might look like `.vscode` or `.idea` or some other such thing.  These often store project configuration or ditties like that related to the dev environment.  Spacemacs doesn't maintain file like this next to your code.

## Projects Tracked By Git

It's great that no new project/editor-specific files are created to support a project. Yet there is such a thing as projects in Spacemacs.  It is simply a list of local git repositories that Spacemacs remembers you as having edited.

To add a project to this list, edit a file within a local git repo (a directory with a `.git` subdirectory in it).

## Project Commands

To retrieve this list of projects, type `SPC p p` for `helm-projectile-switch-project`, select a recent project, and then a file within it to edit.

Once in a project, to open a file in that project, type `SPC p f` for `helm-project-find-file`.

Thus project starting, recognition, and navigation is super simple and lightweight.  There are many other useful project commands made possible by [projectile](https://github.com/bbatsov/projectile) within Spacemacs.

What other project features in Spacemacs do you appreciate?
