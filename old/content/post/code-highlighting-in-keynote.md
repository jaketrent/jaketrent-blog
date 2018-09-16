---
categories:
- "Code"
comments: true
date: 2017-06-21T07:40:53-06:00
description: "Easy and fully-highlighted code in Keynote presentations."
draft: false
image: "https://i.imgur.com/RKcCt88.jpg"
layout: post
metaKeywords: "code highlighting keynote, syntax highlighting, code editing, powerpoint code highlight"
tags:
- "keynote"
title: "Code Highlighting in Keynote"
---

Easy and fully-highlighted code in Keynote presentations.

<!--more-->

## Code in Presentations

You're prepping to give your next big talk on some technical subject.  You want a slide deck, and you want some nice code samples complete with syntax highlighting.  You could get these a number of ways.  You could take screenshots of your code editor or manually do the code beautifying and syntax highlighting inside Keynote or Powerpoint.  

The images are not very maintainable -- because we know we don't get the code right the first time.  We'd like something editable. The text entry into keynote solves that problem, but the time it takes to code highlight all of this text can be costly -- especially when we get done and then realize our color scheme isn't super legible.  That's never happened.

## Tools to Highlight Presentation Code

I've tried the above methods which are essentially manual.  I'd like something a bit more automated.  Every time I google for this, I end up on this [gist on code highlighting](https://gist.github.com/jimbojsb/1630790) and proceed to `brew install highlight`.  This method works fine.  There's a lot of copy and pasting in and out of the cli util.  And the final highlighting really isn't that impressive.  

Well, recently I found something better.  It's the best thing I've found so far.  And the tool is obvious: a code editor.  Code editors these days have some of the most fun, bright, and cheery syntax highlighting schemes around.  Let's use them!

## From VSCode to Keynote

First, download [VSCode](https://code.visualstudio.com/insiders).

Then write some code.

The select it and press `cmd-shift-c`.  This is different from a normal copy.  This will "Copy with Syntax Highlighting".  Paste that into Keynote, and you're done.  Just like that!  If the key shortcuts are different for you, you're looking for this one to bind:

```json
{
  "command": "editor.action.clipboardCopyWithSyntaxHighlightingAction",
  "key": "shift+cmd+c"
}
```

Here's to beautifully-formatted code slides!

Are there other ways that you've accomplished this?

<div class="video-container">
<iframe width="853" height="480" src="https://www.youtube.com/embed/8vQXJSn3Nlo?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
