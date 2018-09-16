---
layout: post
title: "When to Use Curlies in Angular Directives"
date: "2013-06-24"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "angularjs"
description: Angularjs has some sweet built-in directives.  Sometimes it can be confusing when to use the curly braces around expressions in directive attributes and when not to.  Here are a couple rules.
metaKeywords: js, javascript, angular, angular directives, angular direct curlies, curly braces
draft: false
image: https://i.imgur.com/wVBKD.png
---

Angularjs has some sweet built-in directives.  Sometimes it can be confusing when to use the curly braces around expressions in directive attributes and when not to.  Here are a couple rules.

<!--more-->

## Curlies

By "curlies", I mean curly braces.  The difference of when to use or not use them looks like the following.

Use them:

```html
<element ng-attribute="{{valWithCurlies}}" />
```

Or despise them:

```html
<element ng-attribute="valWithNone" />
```

## Two Rules of Thumb

Here are two rules that will serve you well when deciding whether or not to use curlies.

1. Assume no curlies in Angular directive attribute values.  Most directives don't use them.
2. If you would conceivably want to mix strings with Javascript code in the attribute, use curlies.

## Two Examples with Curlies

There are only a few examples of directives using curlies in their attributes.  These examples are both relating to pathing.  Apparently that's a common use case for mixing strings with JavaScript-borne values.

### ngSrc

As in the source of an image, such as:

```html
<img ng-src="/images/{{tool.icon_name}}.png" />
```

### ngHref

As in a link to an html page, such as:

```html
<a ng-href="http://google.com?q={{query}}">See Google Results</a>
```

## Something more Precise?

Is there something more precise than these two rules of thumb?  Why does Angular make an exception for these two cases, thus causing us to try to remember our rules of thumb?

As I surmised above, I can only guess that because the pathing use case often wants to mix strings with JavaScript values, the exception was made.
