---
categories:
  - "Code"
comments: true
description: "A shell command to find and replace over multiple files recursively in MacOS."
image: "https://i.imgur.com/9C9HAfO.jpg"
layout: post
metaKeywords: "unix, macos, search and replace, sed, find and replace, find recursive files"
draft: false
tags:
  - "terminal"
title: "Find and Replace Over Multiple Files in the Shell in MacOS"
date: "2020-10-05"
---

This is a shell command to find and replace over multiple files recursively in MacOS.

<!--more-->

This is [surprisingly](https://stackoverflow.com/a/17308739) difficult to figure out how to do. There are many options an nuances. This may work for your particular OS version, Terminal, Shell, and installed tools.  Lol, what a disclaimer!

Anywho, the command that works for me at this moment is:

```
fd -0 package.json ** | xargs -0 sed -i "" "s/npm run/yarn/g"
```

Let's break it down:

- `fd` is an [alternative](https://github.com/sharkdp/fd) to the unix `find` command. It looks for files that match the name given.
- `package.json` is the name of the file we're looking for.
- `-0` is an option to `fd` that preps it for `xargs` later. It puts results on one line, separating them with NULL characters.
- `**` tells `fd` to checkout all the directories listed at this level. It's recursive by default.
- `|` is a pipe that connects and forwards commands.
- `xargs` is a command that takes the output of the previous command and appends it to the next command
- `-0` has the same purpose as the last `-0` and makes the connected commands compatible.
- `sed` is a string replace command. The options and args that follow feed into it
- `-i` edits files in place. The `""` empty string that follows indicates that no backup to the edited files should be made.
- `s/npm run/yarn/g` This is the string to find (indicated by`s/`) and replace (ie, change "npm run" for "yarn") globally (indicated by the `/g`).

So there it is.  Save that one to your cranium.

While searching for how to perform this command, I came across a great tool that will expose the `man` pages for much of this in a combined web gui, called [explainshell.com](https://explainshell.com).  Pretty cool!

What other solutions for search and replace have you used on MacOS?
