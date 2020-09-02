---
layout: post
title: "Ignore Dependency Types in Typescript"
date: "2020-09-03"
comments: true
categories:
  - "Code"
tags:
  - "typescript"
description: How to exclude typings files from dependencies when compiling TypeScript projects.
metaKeywords: typography, letterform, serif, anatomy, typeface
draft: false
image: https://i.imgur.com/QCnDJY9.jpg
---

Here's a method for how to exclude typings files from dependencies when compiling TypeScript projects.

<!--more-->

## Install a problem dependency

The problem comes when we install a dependency into our already-TypeScript project that has other typings that mess up the project we're in.

For example, I was working on a [hyperapp](https://github.com/hyperapp) TypeScript project and installed a new dependency.  Upon my next `tsc`, I suddenly had hundreds of errors similar to this:

```
error TS2605: JSX element type 'VNode<Props> | null' is not a constructor function for JSX elements.
```

When it went to type-check my code, TypeScript thought React was in charge of JSX and thus wasn't compatible with my Hyperapp components. 

I found out that there were new React typings by running:

```
npm ls @types/react
```

Sure enough, down in the subdependencies, something else was shipping with `@types/react`.  To fix this, I wanted to keep the new dependency but ignore those typings.

## Exclude doesn't work

My first adjustment to the long list of potential `tsconfig.json` configurables was [`exclude`](https://www.typescriptlang.org/tsconfig#exclude). This seemed to match the verb of what I was trying to do. But apparently it ignores `@types` directories in its exclusion. They're special. 

Blacklisting what I wanted to ignore seemed out, so I looked for the whitelist

## Whitelist with types and typeRoots

The two whitelist options that appear are [`types`](https://www.typescriptlang.org/tsconfig#types) and [`typeRoots`](https://www.typescriptlang.org/tsconfig#typeRoots). 

By default, all `@types` available to node module resolution (include those in parent directories) and available and used when type checking. `types` will whitelist override that by file (package name). `typeRoots` will override that by directory.

## Process to whitelist

My process to whitelist down to the correct types list was to:

1. Set `types` to an empty array in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": []
  }
}
```

2. Run `tsc` multiple times and interpret each class of type errors.

For instance, I ran once and got errors like:

```
error TS2304: Cannot find name 'expect'.
```

This came from a spec file and I use jest, so I added the `jest` type.  The next `tsc` produced:

```
error TS2951: Cannot find name 'require'
```

It was even prompting me to install `node` types.  So, my fixed up `tsconfig.json` looked like this in the end:

```json
{
  "compilerOptions": {
    "types": ["jest", "node"]
  }
}
```

And `tsc` was happy with no errors.

How else have you solved this problem and ignored the types that install dependencies puts into your projects?

