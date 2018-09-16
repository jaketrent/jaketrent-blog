---
categories:
- "Code"
comments: true
date: 2017-07-13T22:38:39-06:00
description: "How to set fallbacks for cssnext variables for which values aren't present."
draft: false
image: "https://i.imgur.com/kqH39ae.jpg"
layout: post
metaKeywords: "cssnext, postcss-cssnext, postcss-custom-properties, undefined and used without a fallback, cssnext css variables"
tags:
- "cssnext"
- "postcss"
- "css"
title: "CSSNext Variable Fallback"
---

How to set fallbacks for CSSNext variables for which values aren't present.

<!--more-->

## CSSNext Variables

[CSSNext](http://cssnext.io/) is a library that allows you to use tomorrow's CSS syntax and features today -- much as Babel does for JavaScript.  One such feature is CSS variables.  

The variables are defined like:

```css
:root {
  --superHot: red;
}
```

And then to use the variable:

```css
.vrOfTheFuture {
  color: var(--superHot);
}
```

And it's awesome -- variables in CSS (of the future).

## Lack of Fallback

But in the case that the variable isn't present, you have a problem.  Color doesn't get set at all in the above example of `.vrOfTheFuture`.  The variable value might not be present for any number of reasons: you forgot to import it or merely misspelled it.

Your CSS compiler will likely give you an error like:

```
(Emitted value instead of an instance of Error) postcss-custom-properties: 
/Users/.../my.css:24:3: variable '--superHot' is undefined and used without a fallback
```

As you can see in the error report, CSSNext gets its variable support from a subdependency library, [`postcss-custom-properties`](https://github.com/postcss/postcss-custom-properties).  In fact, CSSNext is simply a collection of [postcss libraries](https://github.com/MoOx/postcss-cssnext/blob/master/package.json) whose combined features are present or expected in the CSS spec.

## Setting a Fallback

A fallback is the value that will be used in the case that the variable is unavailable.  To set it, pass it as the second value to `var()`, like this:

```css
.vrOfTheFuture {
  color: var(--superHot, fuchsia);
}
```

Fallback present.  Superhot might look a bit odd when the fallback is used, but at least we have a fallback color.

Do you ever end up using fallbacks?  What are your favorite uses?
