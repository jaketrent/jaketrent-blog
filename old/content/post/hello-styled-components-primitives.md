---
categories:
- "Code"
comments: true
date: 2017-08-03T14:41:40-06:00
description: "Styled components create components that take their styles with them.  Primitives style cross-platform components."
draft: false
image: "https://i.imgur.com/mSqJNBq.jpg"
layout: post
metaKeywords: "styled-components, react-primitives, styled-components/primitives, using styled components primitives"
tags:
- "styled-components"
- "css-in-js"
- "cross-platform"
- "react"
title: "Hello, styled-components/primitives"
---

[Styled components](https://github.com/styled-components/styled-components) create components that take their styles with them.  Primitives style *cross-platform* components.

<!--more-->

## An Imagined World

In his talk, [React as a Platform](https://youtu.be/hNwQPJy-XZY), Leland Richardson imagines what React would be like if it went from "learn once, write anywhere" to "write once, run anywhere".

He reasons that react web and react native code is *so close*, but different enough that it needs separately-developed versions.  The difference tends to come in the API of the platform (eg, `div` on the web and `View` in iOS). But the elements that make up a UI in these platforms are very similar.  

These similar bits -- primitives -- could be used to write `Text`, `View`s, `Touchable`s *once* and make them renderable via `react-dom`, `react-native`, or other platforms.

It's a cool vision.

## A Small Experiment

I made a [very small experiment](https://github.com/jaketrent/hello-styled-component-primitives), checking it out. I have a few observations.

### It's Very Early

This vision is in its early stages.  There are some early adopters.  From what I can tell, there's not a ton of movement.  Perhaps many have been like me: wait and see.

There are pretty much no docs.  You'll be left to get into the [styled-components/primitives](https://github.com/styled-components/styled-components/blob/master/src/primitives/index.js) and [react-primitives](https://github.com/lelandrichardson/react-primitives) source.  This is how I had to learn the API.

Even the `react-primitives` library, on which the talk was written, and `styled-components/primitives` relies, is still very young.  It is [admittedly hacky](https://github.com/lelandrichardson/react-primitives/blob/master/src/modules/Touchable.js#L20) at times.

### It's Heavy on the classNames

I don't know if this is how react-native does it or not -- I'm guessing it is -- but, there are a ton of classes on a single element.  This is what a text element looks like: 

![pile of selectors](https://i.imgur.com/VH57PeV.jpg)

Egh.

### It Lacks Semantic Markup

Perhaps because this project seems to have been inspired mostly by react-native and come out of that world, it doesn't seem to care too much about semantic markup.  I could be wrong.

In my usage, a `Touchable`, which defines an interactable element, was rendered as a `div` instead of a `button` or something similar.  Surely there's way to do that... No docs though, right?

### Has Awkward Selector Definitions

Writing CSS in a string inside JS is weird.  I'd rather write an object if in JS. There's no prettier formatting. 😩  

It'd be nice if attributes with shorthands, like `border` (unsupported) could be automatically split into the supported `border-width`, `border-style`, and `border-color` attributes.  It _is_ nice, however, to see a clear error message of which attributes are actually supported so you can fix your styles.

### Requires Thinking Primitively

Most of these observations are about how ready this library is and how well it works.  Here, however, the thing I observed mentally when working with primitives was that I needed to think differently.

Primitives are more basic building blocks.  The tools you are left to work with are more rudimentary.  I'm still learning when to add platform extensions and actually do platform-specific things.  I don't have a clear mental model of how to build this kind of components ...yet.

It felt odd to be thinking about keeping a component platform-agnostic when I'm writing the web app.  But the payoff could be really cool.

How has your experience with styled-components/primitives been?  What other observations would you offer?


