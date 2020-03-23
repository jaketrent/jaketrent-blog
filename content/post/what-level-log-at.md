---
categories:
  - "Code"
comments: true
description: "What level should I log this at?"
image: "https://i.imgur.com/FHZnQr6.jpg"
layout: post
metaKeywords: "log levels, fatal, error, info, debug, trace, how to level"
draft: false
tags:
  - "ops"
title: "What Level Should I Log At?"
date: "2020-03-23"
---

What level should I log this at?  This is my approach.

<!--more-->

## What is Logging?

Logs are developer-facing feedback.  Developers place lines of code in their source to prompt logs -- messages and associated data -- to be output.  It is output by a program at runtime.  It might go straight to stdout, a file, a UI or somewhere else.  Story short: Logging helps us as a developer see the health and activity of a program.

## What are Levels?

Logging comes in different levels.  The higher the level, the more urgent the message.  The lower the level, the more benign -- at least, usually.  Sometimes we want to see the "benign" messages so we can trace the activity of our program, which might be acting up.

## Setting a Log Level

Most logging libraries these days are controlled by a *log level*.  This is set as the *current* level of logging.  While the program runs at that level, messages that log at that level or higher will be output.  Log lines below that level will be skipped (not ouput).  

Most of the time, programs are run at the log level of `info`, which is in the middle of the log level scale. Ops usually likes this level because we're not filling up their log server hard drives and we can read logs that aren't too chatty, focused on important events.

## Deciding Log Levels

So how does one decide which lines of logging in our code should go to which log level?  It's an art.  It's us deciding what's important.

Here's my general practice on the bucketing, levels highest to lowest:

- `fatal` - Anything that endangers the program or should cause the program exit
- `error` - Any non-fatal error condition
- `info` - Informative, non-normal or significant events
- `debug` - Turn on this level when something goes wrong in our program.  Then we let the program run again for a while and watch data flow through the system. There is going to be more information coming through the logs, letting us get a sense of what's going on. We put these log lines into the code anticipating that we'll want to do this now and again.
- `trace` - Debug wasn't enough. We're getting crazy, logging everything. We have commits with just `log.trace()` calls added, later removed after the problem is resolved.

How do you decide what to log and at what level?
