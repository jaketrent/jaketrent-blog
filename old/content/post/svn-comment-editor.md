---
layout: post
title: "SVN Comment Editor"
date: "2008-11-26"
comments: true
categories:
  - "Code"
tags:
  - "svn"
  - "vcs"
description: Comments are essential to Subversion checkins.  A good text editor is essential to a good comment.  Here's how to set the editor of your choice to pop up wh
metaKeywords: svn, vcs
draft: false
---

Comments are essential to Subversion checkins.  A good text editor is essential to a good comment.  Here's how to set the editor of your choice to pop up when you do an svn checkin.

<!--more-->

Comments are essential to Subversion checkins.  A good text editor is essential to a good comment.  Here's how to set the editor of your choice to pop up when you do an svn checkin.

Of course, the best plain text editor (and so much more) that I can think of is Emacs, so we'll use that for this example.

SVN will attempt these options in this order when trying to launch a text editor for checkin comments:
   
   1.Command-line option --editor-cmd
   2.Environment variable SVN_EDITOR
   3.Configuration option editor-cmd
   4.Environment variable VISUAL
   5.Environment variable EDITOR
   6. Possibly, a default value built in to Subversion (not present in the official builds)

I prefer option #2:

```bash
emacs ~/.bashrc

# add this line
export SVN_EDITOR="/usr/bin/emacs"
```

Reload your bashrc:

```bash
. ~/.bashrc
```

And now do your checkin:

```bash
svn ci information.html
```

And voila, Emacs pops up in all its glory!

For short comments, the inline option might be more convenient:

```bash
svn ci information.html -m "This is my comment"
```

For the section of the Subversion manual describing this, see <a href="http://svnbook.red-bean.com/en/1.4/svn-book.html#svn.advanced.confarea.opts.config">this page</a>.

  
