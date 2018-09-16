---
categories:
- "Code"
comments: true
date: 2017-08-19T07:18:51-06:00
description: "Enforce a git commit message format for your project."
draft: false
image: "https://i.imgur.com/kqffmMV.jpg"
layout: post
metaKeywords: "git commit message format, enforce commit message, conventional commit"
tags:
- "git"
title: "Enforce a Git Commit Message Format"
---

Enforce a git commit message format for your project.

<!--more-->

Updated: 28 Aug 2017 to use commitmsg hook.  Thanks to [marionebl](https://github.com/marionebl).

## Power of a Convention

You could choose any format.  One git commit message format that I like is [conventional commits](https://conventionalcommits.org/).  With a convention, you can [generate a changelog](https://github.com/conventional-changelog/conventional-changelog) or use tools like lerna to automatically determine what package versions to [publish](https://github.com/lerna/lerna#--conventional-commits).

## Commitlint

In order to get the automation benefits, the commits have to be consistent and predictable.  You need to ensure they follow the convention.  There are a few tools that do this.  One nice one is [Commitlint](https://github.com/marionebl/commitlint).  

Using this tool you can set one of about 2 dozen [rules](http://marionebl.github.io/commitlint/#/reference-rules) about your commit message.  These coincide nicely with conventional commit message segments.

You can run commitlint via cli:

```bash
npm install @commitlint/cli
echo "Some commit message" | commitlint
```

## Checking Message on Commit

However, you're not usually going to want to run the cli on an echoed string.  We want to write a commit message in our regular git workflow, it would fail the formatting check, and you'd be denied the privelege to commit until you'd committed with a well-formatted message.

To do this you'll want a package that helps you handle commit hooks:

```bash
npm install husky --save-dev
```

And add a script to `package.json`:

```json
"scripts": {
  "commitmsg": "commitlint -e $GIT_PARAMS",
}
```

Using the `-e` flag, `commitlint` will automatically go to the `COMMIT_EDITMSG`, your latest commit message, to do its linting.

In the case of bad commit, you'll get the errors telling you what formatting rules you need to fix to let your commit through.

![commitlint output](https://i.imgur.com/a7RFcY7.jpg)

How do you ensure a conventional commit message format on your projects?
