---
categories:
- "Code"
comments: true
date: 2017-04-21T07:22:24-06:00
description: "My favorite thing about React is how it simplifies the mental model of the developer when coding a UI.  The key is the repaint."
draft: false
image: "https://i.imgur.com/0dHFUCG.jpg"
layout: post
metaKeywords: "ui, spa, js, react, favorite, virtual-dom"
tags:
- "js"
- "react"
title: "Repainting My Mind with React"
---

My favorite thing about React is how it simplifies the mental model of the developer when coding a UI.  The key is the repaint.

<!--more-->

## Revolutionary

When I was first exposed to React, it was revolutionary.  And not in a good way.  I was skeptical.  It was weird.  Why would I just call `render` again and repaint an entire UI for just one change?  And what is JSX and why is HTML in my code?  What I didn't realize until I was willing to try it was that these were building blocks that would enable a new developer experience for me.  After trying it, I felt the lightening relief of a simplified mental model in UI development.

## One View at a Time

Of course repainting the whole UI would be expensive, right?  Why is anyone promoting that?  And yes, there's truth there.  But what if *mentally* or *conceptually* you're repainting the whole UI when something changes.  That's all you have to tell React to do.  And that's the essence of what you must think about as a developer.  That's liberating.

For a long time it seems, "best practices" kept our minds from innovating to this point.  Looking at it now, it seems like a treasure that stayed hidden too long:  For a certain state, there is a certain view.  We can think about single snapshots of our UI at a time, and we don't have to track one-off deltas between snapshots.

## Top-down Rendering

Render a whole snapshot of a UI is no stranger to some circles, such as games.  In a game, it is common to think in terms of frames and re-rendering a whole scene from the top, down.  

In React, it's the same.  When there's new data, there's a whole new UI representation.  We are not observing changes to single values and twiddling single UI bits.  We can instead call render at the top of our UI component tree and let the new data trickle down the entire component hierarchy.

## Declarative State

Since we are looking at snapshots and not transitions between states, we can simply declare what a state should be like.  

Do you remember the days of writing this to handle clicking on and activating a tab link?:

```js
$('.tab').on('click', _ => {
  $('.tab').removeClass('active')
  $(this).addClass('active')
})
```

It gives me a combo of lols and shivers.

In the style of React, we could register a click handler on each tab that sets active tab data.  Then each tab would simply declare what it looks like when active:

```js
const Tab = props => <div className={props.isActive ? 'tab active' : 'tab'}></div>
```

## The DOM, Abstracted

The repaint per frame and declarative UI are enabled by the foundational feature of an abstracted DOM.  In React, the developer doesn't usually deal with the actual browser DOM.  It only appears to be similar.  The developer deals with the virtual DOM in JSX returned from React components.  "Virrtual DOM" is an over-buzzed word and very useful feature.  

Yes, real DOM updates are still expensive.  So React takes care of knowing what DOM nodes are dirty and really need to have their in-memory or virtual states flushed to the real DOM.  This enables us to *think* about repainting every frame and let the library do the rest.  It's librating to not have to consider building up your own DOM fragments.

This must be a compelling pattern, because the current gen of most popular UI libraries and frameworks are using this strategy, I think, because of the vastly lighter mental model it affords the developer.  Try it, and you won't want to go back.

What are some of you favorite features of React?  Or how has React changed your mental model of UI development?

