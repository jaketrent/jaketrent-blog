---
categories:
- "Code"
comments: true
date: 2017-04-24T07:18:46-06:00
description: "Format your code automatically on commit with pretter.js."
draft: false
image: "https://i.imgur.com/H0nj6Gd.jpg"
layout: post
metaKeywords: "prettier, formatting, static, precommit, lint, semicolons, tabs, jsx, react"
tags:
- "js"
title: "Format JavaScript with Prettier"
---

Want to never have to think about or argue about your JavaScript code format again?  Install Prettier on your project today.  Be within the first 5M npm downloads to receive free semicolon demolition.

<!--more-->

## Prettier.js

[Prettier](https://github.com/prettier/prettier) is a code formatter that parses your JavaScript, converts it to an AST, and then pretty-prints the AST back to the file.  This means that you can write your code in any format that you want, run it through Prettier, and then afterward it will comply to a standard format.  

The changes are purely stylistic, not changing any of the meaning or output of your code.  The style changes are deal with layout and flow and symbology (eg, spacing) and don't deal with any code construct styles (eg, ternary expressions vs if statements) like eslint might.  It's a tool in the same vein as [`gofmt`](https://golang.org/cmd/gofmt/).

## Yaks to Shave

Of course, code style has been the subject of innumerable programmer pow wows.  That is required no more.  You can stop the formatting arguments.  And you get the added benefit of a codebase that you are confident conforms to a consistent code style.

Prettier brings its own opinions and applies most of them automatically.  There are a few holy wars that it allows to continue, like tabs vs spaces or semicolons vs freedom.  It exposes a few [options](https://github.com/prettier/prettier#api) that allow you to choose your favorite flavors.  These include options for tabs, line wrap, tab width, quotes, trailing commas, spacing inside object literals, jsx bracket spacing, the parser used, and usage of semicolons.

## Use Prettier Today

Using prettier is very simple.  Just add it to your codebase today.  First, install:

```
npm install prettier lint-staged husky --save-dev
```

These packages are:

- `prettier` - the big man, himself
- `lint-staged` - a lib that allows the rewriting of files staged in git
- `husky` - a lib that will easily support a git hook for precommit

A great setup for Prettier is to format all code right before you commit code to version control.  This will help keep your codebase pristine.  To hook these newly-installed libraries up and make them work for you, let's pop open `package.json` and add:

```
{
  "scripts": {
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.js": [
      "node_modules/.bin/prettier --single-quote --no-semi --write",
      "git add"
    ]
  }
}
```

This setup will trigger a git hook that points to the `lint-staged` setup right before a commit.  There, we apply two commands to each `*.js` file that is staged.  We run it through `prettier`, which is installed locally.  I'm applying the 2 non-default options that I usually use here.  `--write` will then persist the file changes in place.  Finally, we re-add the formatted files with `git add`.

It's awesome and easy!  What JavaScript formatting discussion are you going to forego because you now have Prettier in your project?

