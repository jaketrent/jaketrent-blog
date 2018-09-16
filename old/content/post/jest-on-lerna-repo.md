---
categories:
- "Code"
comments: true
date: 2017-06-26T17:13:34-06:00
description: "Jest is easy to use on a Lerna repo with a bit of config."
draft: false
image: "https://i.imgur.com/qWEbvEa.jpg"
layout: post
metaKeywords: "js, jest, unit testing lerna project, jest test lerna repo"
tags:
- "js"
- "jest"
- "lerna"
title: "Jest on a Lerna Repo"
---

Jest is easy to use on a Lerna repo with a bit of config.

<!--more-->

## Lerna Manages the Mono Repo

[Lerna](https://github.com/lerna/lerna) is a fantastic library for managing a mono repo.  A mono repo is a version control repository that contains many separate but often related artifacts.  These artifacts might be separate projects.  They often have dependencies on one another.  Lerna helps manage these dependencies, versioning, and publishing.  

## Jest Does JavaScript Testing

[Jest](https://facebook.github.io/jest/) is a testing library for JavaScript codebases.  It has its own runner and assertion library built in.  It is low on configuration.  It has some well-developed tools with great developer ergonomics. 

To use Jest, simply install it:

```bash
npm install jest --save-dev
```

Set it as the `"test"` npm-script in `package.json` in the root of your monorepo:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

And write a test, like `app.spec.js` inside one of your `packages/`:

```js
import app from './app'
test('the app is for realz', () => {
  expect(app.doesSomething()).toEqual('realsies')
})
```

`*.spec.js` files are automatically picked up and run by the test runner. Specs and source are also automatically run through a transformer, in this case [babel](http://babeljs.io/), in order to support esnext features and syntax.

## Lerna Local Dependencies

When you have multiple projects in a lerna repo, by convention they live as subdirectories under the `packages/` directory.  One project, `my-project-a` can have a dependency on `my-project-b` and declare it as such in its own `package.json`:

```json
{
  "name": "my-project-a",
  "dependencies": {
    "my-project-b": "^1.0.0"
  }
}
```

When you run `lerna bootstrap` in your repo, lerna automatically detects that this dependency is available within the `packages/` directory and instead of trying to download these packages from npm, takes care of the symlinking on the local filesystem.  In this case, a link is created in `node_modules` for `my-project-a`:

```
lrwxr-xr-x  1 jaketrent  staff  14 Jun 16 11:00 my-project-b -> ../../my-project-b
```

## Jest to Test All Local Dependencies

Now if you want to test all local `packages/` with one runner of jest, you need to run it from the root `package.json` of the mono repo.

But at this point we might have a small problem.  We have code that is local and requires dependencies, also local, via filesystem links within the `node_modules` directory.  This will be a problem out of the box, because the `node_modules/` directory is ignored by the jest transform by default.  This means that we'll get errors like:

```bash
import myProjectB  from 'my-project-b
^^^^^^
SyntaxError: Unexpected token import
```

To be able to also babel-transform the files that are local dependencies, allowing them to be tested via jest as well, we'll take advantage of a [config](https://facebook.github.io/jest/docs/configuration.html#testpathignorepatterns-array-string) option called `transformIgnorePatterns`.  This is an array of regex strings that describe what should be skipped by the transform.  This will override the default `node_modules` ignore pattern.  It would be a lot simpler to be able to whitelist local packages we want to transform, but instead jest asks us to tell it what *not* to ignore.  Something like this in `package.json` will do the job:

```json
"jest": {
  "transformIgnorePatterns": [
    "<rootDir>.*(node_modules)(?!.*my-project-b.*).*$"
  ]
}
```

There are a couple things of note here.  `<rootDir>` is a special token that jest understands to be the directory containing your `package.json`.  The fancy regex bit containing `?!.*my-project-b.*` is called a regex negative look ahead.  Together, the pattern means "ignore transforming anything in `node_modules` that doesn't include `my-project-b` in the file path."  This is what we want, but this is a gross regex.

What else have you had to set up in order for Jest to work in your Lerna repo?
