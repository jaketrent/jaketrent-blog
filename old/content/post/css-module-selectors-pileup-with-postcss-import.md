---
categories:
- "Code"
comments: true
date: 2017-05-18T07:09:53-06:00
description: "Use of postcss-import in your CSS module processing can lead to more selectors than you realized."
draft: false
image: "https://i.imgur.com/mkC5IV3.jpg"
layout: post
metaKeywords: "css, css-modules, postcss, composes, composes from, css variables, css module dependencies, inline selectors"
tags:
- "css"
- "css-modules"
- "postcss"
title: "CSS Module Selectors Pile Up with postcss-import"
---

Use of postcss-import in your CSS module processing can lead to more selectors than you realized.  Here are some ways to deal with it.

<!--more-->

[postcss-import](https://github.com/postcss/postcss-import) is a useful [postcss](http://postcss.org/) plugin.  It allows loading CSS from npm modules by looking up module entry [via `package.json`'s `"style"` attribute](https://github.com/postcss/postcss-import/blob/ac9903b658b1d447f62b9021081051e8b8d42538/lib/resolve-id.js#L22). But if you don't realize that one of its main features is inlining what you `@import`, the consequences can be unexpected.  So what can you do?

## If You Don't Use postcss-import

It's one option to just not use it.  But the plugin does seem to smooth out importing.  You're able to import from `node_modules`, `web_modules`, and utilize that `package.json` `"style"` attribute.  So, I'm keeping it.  Ok, where from here?

## Scenario

Let's say that I have a source CSS file that I'm building into a module with [`css-loader`](https://github.com/webpack-contrib/css-loader), called `source.css`:

```css
.mySelector {
  color: red;
}
```

And something that wants to be imported, `dependency.css`:

```css
.dependencySelector {
  outline: 1px solid blue;
}
```

## No @imports Yet

If I don't import my dependency, then the export object for the `source.css` CSS module will look like:

```
{
  mySelector: "mySelector___oHNuy"
}
```

This is as expected.  No surprises.

## Top-level @import

If we make sure our [`postcss.config.js`](https://github.com/postcss/postcss-loader#config) is running with `postcss-import`:

```js
module.exports = {
  plugins: {
    'postcss-import': {}
  }
}
```

And then add an `@import` of the dependency to our `source.css`:

```css
@import "./dependency.css";
.mySelector {
  color: red;
}
```

We've done nothing to use the dependency or compose with it, but our module export object still changes to:

```js
{
  dependencySelector: "dependencySelector___2HjUz"
  mySelector: "mySelector___oHNuy"
}
```

This is because `postcss-import` is *inlining* everything we `@import`.

## Composes with Top-level Import

Once we use the imported dependency in a `composes` attribute:

```css
@import "./dependency.css";
.mySelector {
  composes: dependencySelector;
  color: red;
}
```

We change the output of the `mySelector` value, where both selector values now are composed:

```js
{
  dependencySelector: "dependencySelector___2HjUz"
  mySelector: "mySelector___oHNuy dependencySelector___2HjUz"
}
```

## Composes From

But let's say that we want to avoid having `dependencySelector` appear in our CSS modules export object.  We can use the `composes: <selector> from <import-path>` syntax:

```css
.mySelector {
  composes: dependencySelector from "./dependency.css";
  color: red;
}
```

This will yield the following CSS module export object:

```js
{
  mySelector: "mySelector___oHNuy dependencySelector___2BS8K"
}
```

This is because the `@import` of the dependency is done within the scope of the `.mySelector` selector, not the entire module.

## Import Variables

There's another way I've gotten around this issue.  That is to `@import` only variables.  If it is only variable values that you need, you can separate them into another file and import them without worrying about cluttering your CSS module export object.  Since this is one of the style elements that we share most often, it works pretty well.

Let's make a new file, `dependency-vars.css`:

```css
:root {
  --aDependencyVar: orange;
}
```

Then if I use it, even if imported at the top-level:

```css
@import "./dependency-vars.css";
.mySelector {
  color: red;
  border: 1px solid var(--aDependencyVar);
}
```

It still yields an uncluttered CSS module export object:

```js
{
  mySelector: "mySelector___oHNuy"
}
```

Have you run into this issue?  Or is it a non-issue for you?  What are some other ways that you've addressed it and kept your CSS modules uncluttered?

