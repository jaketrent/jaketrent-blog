---
layout: post
title: "Hotdeploy in Intellij 8"
date: "2008-11-22"
comments: true
categories:
  - "Code"
tags:
  - "deployment"
  - "ide"
  - "intellij"
description: Development on JEE projects can be a real pain sometime.  1/2 of this (sometimes in literal minutes) is because of the need to spin up the server in order t
metaKeywords: deployment, ide, intellij
draft: false
---

Development on JEE projects can be a real pain sometime.  1/2 of this (sometimes in literal minutes) is because of the need to spin up the server in order to run your code.  This server startup time can be a killer of one's development momentum. 

True to its mantra, IntelliJ IDEA delivers some goodness is making this pain a little more pleasurable -- if that's possible.

<!--more-->

Development on JEE projects can be a real pain sometime.  1/2 of this (sometimes in literal minutes) is because of the need to spin up the server in order to run your code.  This server startup time can be a killer of one's development momentum.  If one is trying to make a change to code and then follow through and check the resulting differences, it can be much like running downstairs in one's house to fetch something, forgetting what that something was upon arrival.

It seems that the solutions to this problem are varied.  For me, it has meant: - Coding webapps in interpreted languages
- Trying IDE-based hotdeploy schemes
- Trying 3rd-party plugins like JavaRebel.

I have had problems with all 3 solutions:
- These are fun, but not what my employer uses
- I haven't found an IDE yet that hotdeploys to my liking.  It's always extremely hard to tell if an IDE has really done its job and if what the browser is giving back to me is the new version. Eclipse has tried to give a visual indicator with its 'Published'/'Republish' verbage in its Servers view, but it seems that this indicator is often wrong.
- I haven't had hardly any luck with JavaRebel.  Pre-version 1.0, it seemed buggy.  Then, I had problems integrating it with my IDE's build/deploy process.  Since the version 1.0 release, I haven't tried it again, but I hear it's still buggy.

As imperfect as the solutions are, it seems to me that the current best solution to the Java webapp hotdeploy is still the IDE-based hotdeploy scheme.  As my favorite IDE is IntelliJ IDEA, here's a little 1-2-3 on how to get hotdeploy working in IntelliJ 8 (as of Milestone 1, Diana):

<h3>Select two important options</h3>

Go to Settings > Compiler, and set "Deploy web applications to server after compilation" to "Never"

<a href="http://picasaweb.google.com/lh/photo/qOoybG2F413C8IkbKljbug"><img src="http://lh5.ggpht.com/trent.jake/SNgOk1bJ1cI/AAAAAAAAENs/DTZhP4ZvYBk/s800/compileropt.png" /></a>

Go to Settings > Debugger, and set "Reload classes after compilation" to "Always" and optionally check "Reload classes in background".

<h3>Compile after a code change</h3>

Now, every time you make a change to compiled code (e.g., .java files), make sure you re-compile.  The shortcut is Ctrl-Shift-F9.

And that's it!  Pleasurable development was meant to be fast and simple.

I'm a little unclear as to the essentialness, but as a general rule, I also set another option in the deployment settings for static file hotdeploy:

Go to Settings > Project Settings > your web module > Java EE Build Settings and check "Build on frame deactivation" and check "Build Web resources only"

<a href="http://picasaweb.google.com/lh/photo/hsw-VeKzduwMGCANP4p5xg"><img src="http://lh4.ggpht.com/trent.jake/SNgSOwB4qyI/AAAAAAAAEOI/d07_gHC89nI/s400/projsettings.png" /></a>

I haven't tested the utter-most limits of this hotdeploy.  I'm not really sure at their limitations, but I would guess that changes to method signatures or changes to descriptor files would require a server restart.  I am, however, unsure.  How about you?

Besides just the handy hotdeploy, one should also keep in mind that other things can help startup time: viva los smaller projects!  But, for anyone wanting to enjoy a behemoth, enjoy Napi.

  
