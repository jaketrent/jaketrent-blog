---
layout: post
title: "Cons of CSS Preprocessors"
date: "2012-11-14"
comments: true
categories:
  - "Code"
tags:
  - "css"
  - "less"
  - "stylus"
  - "sass"
description: They're awesome, but CSS preprocessors come with a few cons.  Don't dump your preprocessor, just work through the cons.
metaKeywords: css preprocessor, css, less, stylus, sass
draft: false
image: https://i.imgur.com/Mzozm.jpg
---

If you have any sizeable stylesheet these days, you should use a CSS preprocessor.  They're awesome, but they come with a few cons.  The pros still definitely out-weigh the cons.  Use the preprocessor.  The cons are just things you'll want to look out for to make your experience with CSS preprocessors better.

<!--more-->

## CSS Preprocessors are Popular

Chris Coyier recently [took a poll on the usage of CSS preprocessors](http://css-tricks.com/poll-results-popularity-of-css-preprocessors/).  About half use one of the preprocessor options available to them.  Of the languages used, [LESS](http://lesscss.org/) is the most popular.  ([Stylus](http://learnboost.github.com/stylus/) is my current favorite.  I like the HAML-style syntax.)

This means that half of the people who write CSS aren't, in fact, writing CSS.  They're writing in [some language](http://net.tutsplus.com/tutorials/html-css-techniques/sass-vs-less-vs-stylus-a-preprocessor-shootout/) that transpiles to CSS.  So, half of these developers are getting the pros, but there's a bit of baggage too.  

## Cons of a CSS Preprocessor

#### File Size is Deceiving

When you're writing in a higher-level styling language, it's often much smaller than the generated CSS will be.  Thus, you could be deceiving yourself thinking that your resulting CSS will be just as a small as what you're editing.  Why?  

1. Hiearchy will be flattened in the resulting CSS.  And the tree of selectors will be duplicated for every selector.
2. You can loop in a preprocessor, generating n items where you only see one.  All those items will be listed in the final, static CSS file.
3. In some of these languages, you don't have to write vendor prefixes.  This is a fantastic feature, but it makes you tend to forget that one attribut will expand into 5 or 6 in the resulting CSS. (Stylus' [nib](https://github.com/visionmedia/nib) is great for this, btw.)

Maybe not a big deal.  Remove an image from your site, and you've made up the difference in bits on the wire.

#### More Process

Because you usually won't be deploying your .less or .styl file, you'll need to have a point in your development lifecycle where the .css gets generated.  This can potentially slow you down, but there are great tools like [Grunt](https://github.com/gruntjs/grunt-contrib-stylus/) or [CodeKit](http://incident57.com/codekit/) to make this quite automagic.  These tools have good, logical defaults, but still require configuration for your specific project.

#### Hard to Go Back

After working with Stylus or another language for a while, you'll meet a project that is straight CSS, and the RoI on conversion to a preprocessor is small.  So, you'll be back in CSS land.  This will be hard.  You'll realize how nice you've had it.  The mechanisms you've grown to rely on won't be there.

#### Variety of Syntax

Each CSS Processor's syntax is different.  The features largely overlap, but they're implemented differently.  It's a polyglot world, so it's no big deal.  Still, it can be confusing switching between projects that have different styling syntax.  You'll write your styles twice after you realize that Stylus syntax doesn't work in a LESS file.

#### Team Coordination

You need to get everyone on your team on board when using a CSS preprocessor.  If someone starts editing a .css file, their changes will be overwritten.  Minify the generated .css.  That should make it less savory to edit.  It'll be a deterrent, but I can almost guarantee someone will edit it anyway. :)  Make the stylesheet workflow very clear.

## The Native Future

We really only have these CSS preprocessors because CSS is too strict, flat, unflexible, and verbose for the amazing things being written for the web today.  Wouldn't it be nice if these styling languages or some new, similar version of CSS was available natively in the browser?

Meanwhile, we'll use these tools.  What have you found your greatest challenge to be using a CSS preprocessor?
