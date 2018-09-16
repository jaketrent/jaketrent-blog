---
layout: post
title: "Intellij Maven Source Downloads"
date: "2008-11-24"
comments: true
categories:
  - "Code"
tags:
  - "intellij"
  - "maven"
description: Debugging time is a blessed time in one's day where the hotkeys for continue, step into, step over, and others often grace the pads of the programmer's fing
metaKeywords: intellij, maven
draft: false
---

Debugging time is a blessed time in one's day where the hotkeys for continue, step into, step over, and others often grace the pads of the programmer's fingers.  This can be quite a rewarding experience.  Now ponder on the disappointment that materializes on the programmer's crestfallen brow when the step into button is pressed and upon the screen displays the all-descriptive and utterly useless "/** compiled code */".  Maven mixed with IntelliJ to the rescue -- download the sources!

<!--more-->

Debugging time is a blessed time in one's day where the hotkeys for continue, step into, step over, and others often grace the pads of the programmer's fingers.  This can be quite a rewarding experience.  Now ponder on the disappointment that materializes on the programmer's crestfallen brow when the step into button is pressed and upon the screen displays the all-descriptive and utterly useless "/** compiled code */".  Maven mixed with IntelliJ to the rescue -- download the sources!

In a project with many external dependencies, this can expand your view of the code your using at least 42-fold.

Here, Maven is your friend.  It's a great tool.  This command led to my discovery of this gem:

```bash
mvn idea:help -Ddetail=true -Dgoal=[insert name of goal here]
```

And now for the awesome one... When tooling your project for IntelliJ, run this:

```bash
mvn idea:idea -DdownloadSources=true
```

This can also be done when you're blowing away your dependency metadata, which is stored in your project .iml file by default:

```bash
mvn idea:module -DdownloadSources=true
```

Enjoy that source!

  
