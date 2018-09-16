---
layout: post
title: "I Love CSS Modules"
date: "2015-08-25"
comments: true
categories:
  - "Code"
tags:
  - "css"
  - "icss"
  - "react"
description: CSS Modules will make your styling life, maybe the world, so much better!
metaKeywords: css modules, webpack, css-loader, modules, local modules, icss, interoperable css
draft: false
image: https://i.imgur.com/MtjAduk.jpg
---

I heard a fantastic yesterday by [Glen Maddern](https://twitter.com/glenmaddern) where Interoperable CSS was well-illustrated as the fantastic CSS language advancement that it is.  I was happy to hear hushed ooo's and ahh's from the audience as they realized the power of what they were seeing.  I have been enjoying the benefits of CSS modules myself and my team and would share some of my favorite features in hopes that others will be inclined to use this feature as well.  Cleanse the world of global stylesheets!

<!--more-->

## Local Variables

With CSS modules, your selector names are truly local.  They are FRD local variables!  They won't clash with any var names outside your module.  For You don't have to invent a giant namespace.  There's no BEM-style naming to describe a hierarchy.  There's no repetition in those names.  You can name it something much more simple, just related to what the component is.

For instance, if you're creating `Link` component, you'd previously have something like `.nav__item__link` selectors to apply style.  Knowledge of global markup structure would seep into your component through this selector and its name.  Now with a combination of encapsulated components and css modules,  you don't have to worry about the outside world.

Now, what would you call your `Link` component's outer-most `a` tag?  Well, maybe `.link` or `.root`...  Nothing fancy.  Just what it is.  You aren't required to think about the global stylesheet.  You can focus your mind on just the component stylesheet at hand.  The naming game, which can already be challenging, is made much easier.

## Explicit Dependencies

Now that all the CSS you write is, by default, local to the module you write it in, you have to explicitly pull in dependencies.  You have to explicitly import the stylesheet you are writing where you'll eventually want to use it.  You can write styles without fear that it might influence something else -- until you explicitly ask it to!

## Still CSS

I've tried some of the inlining styling techniques and libraries that are being made popular in the React community.  [Radium](https://github.com/FormidableLabs/radium) is my favorite there.  What makes me happy about CSS modules is that they're still CSS.  It's a language that was invented in order to create declarative styles.  It's not wonderful in many ways, but it's still the best tool available for this.

You can use all the selectors, strategies, and css abilities you're used to.  Pseudo selectors are all available.  Media queries work as expected.  Keyframe animations are easy to declare.  There is also a great ecosystem of CSS enhancements and transforms available from the PostCSS community.  No one should ever write a vendor prefix again with [autoprefixer](https://github.com/postcss/autoprefixer).

## Consistency for Components

Another thing I'd like to see in the web component community, specifically React for now, is a pattern around how to override CSS in reusable components.  This pattern would be well-used by component developers and well-known by component consumers.  This would help components be more immediately useful -- default styles could be included with components and custom styles would be easily applied.

My favorite solution to this so far is [react-styleable](https://github.com/pluralsight/react-styleable) -- full disclosure, I helped write it.  (Anything like this that gains steam, has broad appeal, and is used by many will make me happy.)  I love that CSS modules enable this and provide a foundation for this consistency.  I'll likely write more about this in the future.

CSS modules have changed the styling game for me.  It makes it so, so much better.  Who knows, maybe it'll change the world.

So, how have CSS modules changed your life?  What do you love?  What could still be better?

## Course on Styling React Components with CSS Modules

I've published a [course on Pluralsight on CSS Modules in React](https://www.pluralsight.com/courses/react-styling-components).  In the course, you'll learn the supporting toolset.  You'll experience the difference of using CSS modules in a project compared to other solutions with a hands-on demo.  If you're interested, [check it out](https://www.pluralsight.com/courses/react-styling-components).  Hopefully it's helpful for you.

![Styling React Components course screenshot](https://i.imgur.com/3mxagk7.png)

[Styling React Components course](https://www.pluralsight.com/courses/react-styling-components)
