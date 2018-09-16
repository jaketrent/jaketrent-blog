---
categories:
- "Code"
comments: true
date: 2017-08-21T05:53:06-06:00
description: "How to set global styles in Storybook environment."
draft: false
image: "https://i.imgur.com/EdtchoI.jpg"
layout: post
metaKeywords: "global styles, react storybook, set storybook body style"
tags:
- "storybook"
title: "Global Styles in Storybook"
---

How to set global styles in Storybook environment.

<!--more-->

## Via Addons

There are some addons that allow you to set global styles.  One that I use is [addon-backgrounds](https://npm.im/@storybook/addon-backgrounds).  It allows you to set background colors to have your components appear upon.

To use it (or other style-affecting addons), install:

```bash
npm install @storybook/addon-backgrounds
```

Then register their existence inside `.storybook/addons.js`:

```js
import '@storybook/addon-backgrounds/register'
```

In your `stories/index.js` file, you can use it as a decorator:

```js
import backgrounds from '@storybook/addon-backgrounds'
import { storiesOf } from '@storybook/react'

const bg = backgrounds([
  { name: 'product color', value: '#181818', default: true }
])

storiesOf('something', module).addDecorator(bg)
  .add('here', _ => {})
```

## Via Head

If you don't have an addon at your disposal that makes adding a global style nicely controlled and declarative via a decorator, you can go the old-fashioned route and add your styles to the `<head />`.

You could do this in order to setup up an environment that has a proper font face on the page or to set up a reset stylesheet.

Create and edit a file called `.storybook/preview-head.html` and put whatever would usually go in the `<head />` here:

```html
<link rel="stylesheet" href="https://cloud.typography.com/abc/123/css/fonts.css" />
```

What other ways do you setup global styles or other environmental properties for your Storybook stories?
