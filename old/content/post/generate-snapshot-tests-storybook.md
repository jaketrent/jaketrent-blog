---
categories:
- "Code"
comments: true
date: 2017-08-17T05:57:36-06:00
description: "How to generate snapshot tests for Jest from Storybook."
draft: false
image: "https://i.imgur.com/572W82u.jpg"
layout: post
metaKeywords: "snapshot tests, generate jest tests, generate snapshot tests, storybook snapshot tests"
tags:
- "jest"
- "storybook"
- "unit-testing"
title: "Generate Snapshot Tests from Storybook"
---

How to generate snapshot tests for Jest from Storybook.

<!--more-->

## Snapshot Testing

[Snapshot tests](https://facebook.github.io/jest/docs/snapshot-testing.html) are a type of test that takes your UI in a certain state and serializes it to a string.  If this string changes, it means that your UI, for that state, has changed output.  Because it's a simple string serialization, a diff can be generated so you can see a representation of what changed.  

## Storybook

[Storybook](https://github.com/storybooks/storybook) is a UI component development environment.  You write a bit of code to create a state for your UI.  You get quick visual feedback.  You can use it to generate visual documentation for how your component works or looks.

## Storyshot

Now those two technologies and their purposes sound pretty similar.  And it's true, when I'm writing Storybook code, it often feels a bit like I'm writing JEst snapshot code.  

There's an interesting project that combines these two.  It's called [Storyshots](https://www.npmjs.com/package/@storybook/addon-storyshots).  

It allows you to write your UI state scenarios once in Storybook as stories and have Jest snapshot tests generated for you.

If you have a project with Jest and Storybook already integrated, then all you have to do is install the Storyshots addon via:

```bash
npm install --save-dev @storybook/addon-storyshots
```

And then create a spec file for your component.  If I was testing `./src/my-component/index.js`, I'd create a spec file at `./src/my-component/__specs__/storyshots.spec.js`.  In it, just call Storyshots:

```js
import initStoryshots from '@storybook/addon-storyshots'
 
initStoryshots()
```

Now run your tests by calling `jest`.

The Jest output will now include the Storyshot specs, generated from whatever Storybook stories you have setup. 

For instance, if you have a story in `./stories/index.js` like:

```
storiesOf('size', module)
  .add('small', _ =>
    <MyComponent size="small" title="Small Row" />
  )
```

Then when Jest runs you'll have an output something like:

```txt
 PASS  src/my-component/__specs__/storyshots.spec.js
  Storyshots
    size
      ✓ small (6ms)
...
```

## The Value Add

You now have the great pleasure of only writing these scenarios once.

This is a compelling way to write your snapshot tests.  You have the nice development experience the first time you write your UI within Storybook.  You can do all your initial visual checks then.

Later, as you make changes, a visual walkthrough all your Storybook stories is not required.  Instead, your snapshot tests will alert you to diffs.  You can scan those quickly and update where necessary.

If the implications of the diff are too difficult to pass off on quickly, you can pop open the exact scenario in Storybook and see it visually.

There's value to having these scenarios closely linked.

What do you think of the approach of generating snapshot tests like this?  How else have you worked this into your UI testing process?
