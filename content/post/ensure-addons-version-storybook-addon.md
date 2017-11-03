---
categories:
- "Code"
comments: true
date: 2017-11-03T06:36:23-06:00
description: "Storybook addons need a matching addons version.  Here's how to ensure it gets it."
draft: false
image: "https://i.imgur.com/tx0tmfY.jpg"
layout: post
metaKeywords: "js, storybook, react storybook, non-existent addons channel, no channel, npm, uninstall"
tags:
- "js"
- "storybook"
title: "Ensure addons Version in a Storybook Addon"
---

Storybook addons need a matching `@storybook/addons` version.  Here's how to ensure it gets it.

<!--more-->

## Addons Need a Channel

In Storybook, you preview the components you're writing with some nice surround UI to navigate and manipulate them.  For this UI to communicate with the preview pane, there is a channel construct for pub/sub communication.  Addons to Storybook utilize this channel.

This channel is accessible in this way:

```js
import addons from '@storybook/addons'

const channel = addons.getChannel()
```

## Non-existent Channel

When you're writing a Storybook addon, things will feel just fine.  It's easy.  It's straightforward.  But then you get the dreaded red screen announcing the problem that will eat up the next hours of your life:

```text
Uncaught Error: Accessing nonexistent addons channel, see https://storybook.js.org/basics/faq/#why-is-there-no-addons-channel
```

[The docs](https://storybook.js.org/basics/faq/#why-is-there-no-addons-channel) describe this error's root cause as commonly being that you have two versions of `@storybook/addons`.  If there are multiple channel instances they cannot communicate together.

[The](https://github.com/storybooks/storybook/issues/1981) [prescribed](https://github.com/storybooks/storybook/issues/1892) [solution](https://github.com/storybooks/storybook/issues/1369) is to remove `node_modules` and `package-lock.json`, reinstall, restart, and all will be fine.  

People [report](https://github.com/storybooks/storybook/issues/1892#issuecomment-339249184):

> In my experience this solves the problem 99% of the time.

The other day, I fell right into the remaining 1% of the time where this didn't work.  I might have been doing it wrong, but no combination of uninstalling, reinstalling, version locking, version downgrading, or installation location changes would help.  Finally, I got extreme.

## One Version of Addons

I reasoned that if there is only *one* installation of `@storybook/addons`, there will *never* be a version mismatch.  So I go to the addon I built and uninstall _all_ Storybook dependencies. Then I go to the component package I'm testing and install the needed Storybook dependencies:

```bash
npm install @storybook/react @storybook/addons
```

When I register my addon, I _pass_ the `addon` to it.  `mycomponent/.storybook/addons.js` looks something like:

```js
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import addons from '@storybook/addons'
import register from 'mystorybook-addon/register'
register(addons)
```

In this way, my addon's `register.js` doesn't need to import `addons` to call `addons.register()` or `addons.addPanel()`.  It uses the exact same version, even instance, of the `addons` that my component uses.

When I use my addon (a decorator) in my component story, my `mycomponent/stories/index.js` file looks something like:

```js
import addons from '@storybook/addons'
import myAddon from 'mystorybook-addon'

storiesOf('some sort', module).addDecorator(
  myAddon(addons)
)
```

Then my addon code internally has `addons` available to it to call `addons.getChannel()`.  Problem solved.

But now my addon API looks a bit different than some of your average addons.  But if this is such an issue and the singleton nature of the addons channel is so materially important, I wonder why this isn't the default addon design.

Does any body else use another strategy to line up the `@storybook/addons` version and the channel that isn't simply to reinstall it?