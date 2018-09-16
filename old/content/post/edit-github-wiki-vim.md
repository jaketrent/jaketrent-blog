---
categories:
- "Code"
comments: true
date: 2017-07-07T06:39:31-06:00
description: "Edit your Github repo's wiki in your favorite editor."
draft: false
image: "https://i.imgur.com/cqFYnP7.jpg"
layout: post
metaKeywords: "vim, spacemacs, edit github wiki, offline github wiki, editing github wiki locally"
tags:
- "github"
title: "Edit Github Wiki in Vim"
---

Edit your Github repo's wiki in your favorite editor.

<!--more-->

## Github Wiki

You likely have many of your code repos on Github.  They have this nice feature of a built-in wiki per repository, so you can put helpful documents right next to the code.  

![github wiki web interface](https://i.imgur.com/5tIy3O3.jpg)

Perhaps you have wondered where these docs are stored, or perhaps you have wished that you could edit these files outside the web interface.  The web interface is nice and convenient, but it might not have the editing power you want if you're going through lots of documentation edits.

## Wiki Repo

Each wiki has its own git repository.  It's named exactly the same as your source code repository, but it has a `.wiki` suffix.  

If you clone your code with this command:

```bash
git clone git@github.com:jaketrent/container-ship.git
```

Your wiki clone command would be:


```bash
git clone git@github.com:jaketrent/container-ship.wiki.git
```

## Editing in Vim

Once you're cloned, all you have left to do is edit.  You can use your favorite editor.  I've been enjoying [Spacemacs](/tags/spacemacs/) lately, but you can use `vim` or something similar.

Change to the wiki directory and start editing files:

```bash
cd container-ship.wiki
vim Home.md
```

When done editing, commit and push as normal in a git repo.  You will see your changes reflected in the web interface.

## Special Files

There are a few specially-named files that could be useful to you:

- `Home.md` - this is the default entry point for a wiki.  When you click the 'Wiki' tab in the web interface of Github, you go here.
- `_Sidebar.md` - if you want a sidebar navigation element in your wiki, you can put navigational (or whatever) content here
- `_Footer.md` - like the Sidebar, just at the bottom of each wiki page.

![wiki sidebar](https://i.imgur.com/EEWO6Wl.jpg)

## File Placement

When you edit your wiki in the web browser, it drops all the wiki pages' `*.md` files in the wiki root directory.  This is fine and simple.  

If you have a lot of content or want to organize things for easier editing later, you can create arbitrary directories and naming to match your organizational theme.  For instance, you could create subdirectories for `docs`, `api`, and `guides` -- whatever you like.

Then when you link to pages using the Github-flavored markdown language, you can disregard the subdirectory paths.  For instance, if you put the file in `api/users.md`, you could link to that page by using just the filename: `[[user]]`.

What other interesting benefits have you found to editing Github wikis offline?

