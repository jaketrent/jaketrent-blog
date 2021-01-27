---
description: "A bash script for running a lot of separate git commits."
image: "https://i.imgur.com/7BlT0az.jpg"
layout: post
metaKeywords: "react, testing-library, keyboard accessibility, enter to click button"
statuses: 
  - "draft"
tags:
  - "bash"
  - "git"
  - "lerna"
title: "Automate Separate Commits in Bash"
date: "2021-1-14"
---

Here's a bash script for running a lot of separate git commits.

<!--more-->

Don't you feel like a 10th level terminal mage whenever you get any sort of bash script to run?  Bash is nice because it'll usually just work in the terminal. You don't need another runtime to get it to work. But wow, is it not a skill that I use often, and it has sharp edges I get myself caught on every time.

In this example, I had a monorepo that relies on conventional commit using commitlint to generate change logs. Thus, changes for every package had to be committed separately. 

First, I made [changes over multiple files](/post/search-replace-multiple-files-macos) using a method similar to one I've written about before.

Then, I made and ran this script:

```bash
for FILE in $(git diff --name-only); do
  PACKAGE=`echo $FILE | sed "s|packages/\(.*\)/src.*|\1|"`
  git add "packages/$PACKAGE"
  git commit -m "refactor($PACKAGE): message about the thing done to all packages"
done
```

So, what's here?

- The for loop should look pretty familiar. Be careful to include that semicolon. The body can be multi-line, no problem.
- The thing being looped over is a list of files that have changed. Using the `--name-only` flag, only the file names are listed, not the other instructional text from git.
- `PACKAGE` is being defined here as another variable. Don't try to put spaces around that assignment operator. 
- The backticks for the command in the variable declaration are one way of surrounding a command. The dollar parenthesis in the for loop is another.
- When you use a variable previously declared and want the value of it, you prepend the dollar sign, as in `$FILE`.
- In the `sed` command, I'm using `|` pipes instead of the traditional forward slash. `sed` doesn't care what you use for delimiters, and in this case pipes require fewer escapes on the forward slashes in the pattern.
- The parenthesis in the pattern have to be escaped. This is odd, since this is the standard syntax for capture groups. Later, `\1` represents the group.
- And did you know that a `git commit` can have 2 messages?  One for the subject line: `-m`, and one for the body: `--message`.

Amazing. See, 10th level terminal mage.

