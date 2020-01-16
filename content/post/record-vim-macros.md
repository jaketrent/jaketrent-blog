---
categories:
  - "Code"
comments: true
description: "How to record ad hoc macros in Vim"
image: "https://i.imgur.com/G6ZIoUG.jpg"
layout: post
metaKeywords: "vim, macro"
draft: false
tags:
  - "vim"
  - "tools"
title: "Record Vim Macros"
date: "2020-01-16"
---

Macros are sequences of commands in Vim that can be recorded to build up more complex tasks and then run them again.

<!--more-->

## Record a vim macro

This will put you in a mode where you'll be recording your commands as they run until later, when you say to stop recording.

`q` - start the recording.

`a-z` - store the macro in a register (ie, any letter a to z) for later recall.

## Add commands to macro

Then you start typing commands in a way that's repeatable.  These can be any normal commands! They might include:

`0` - start at the beginning of the line.

`fX` - move next instance of a certain character (eg, "X").

`r'` - replace some character with another (eg, "'").

`bp` - paste from a register (eg, "b").

`j` - go the next line.

`q` - stop the recording.

## Run a vim macro

After you've recorded a macro, you can use it as long as it stays recorded. (Be careful not to overwrite any you want to keep.)

`0-9` - (optional) the number of times you want to run the macro.

`@` - indicate you're going to run the macro.

`a-z` - the register in which you previously stored your macro.

## Run the last macro again

`@@` - whichever was run last will be run again

Convenient, eh!

## See what macros are in your registers

If you ever forget what you have recorded, you can list them.  The hard part is reading what you've recorded. :)

`:reg` - list contents of all registers

Any other tips on running macros in vim?
