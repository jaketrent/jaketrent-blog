---
categories:
- "Code"
comments: true
date: 2017-10-04T07:15:08-06:00
description: "A way to hide an app from the application switcher UI in MacOS."
draft: false
image: "https://i.imgur.com/yzeLJoq.jpg"
layout: post
metaKeywords: "hide app from app switcher, remove icon from command tab menu"
tags:
- "macos"
title: "Remove App from Cmd-Tab Menu"
---

Here's a way to hide an app from the application switcher UI in MacOS.

<!--more-->

## App Switcher 

The application switcher UI is what shows up when you press `Cmd-Tab` in MacOS.  It allows easy switching between apps.  

If, for some reason, you don't want your app to show up there, you can do that with a small change to that app.

## Hiding Your App

First, identify the app that you want to hide.  Let's say I want to hide Audacity.

First, go to the terminal and find your app:

```bash
cd /Applications/Audacity.app/Contents
```

Then edit its `Info.plist` file:

```bash
vim Info.plist
```

Be careful when editing this file.  Insert the following snippet:

```xml
<key>LSUIElement</key>
<string>1</string>
```

Make sure that you insert this within the outer `<dict />` and in order so that `<key />`s are followed immediately by values and you're not inserting between one of those pairs.

Save `Info.plist`, and quit the Audacity application.  Start the app again, press `Cmd-Tab`, and you should not see an icon for that app.

## Side Effects

Now that you're hiding the app from the switcher, you need another way to open it and access it. This change also hides the app from the Dock. The way I access the app after this is via Spotlight/Alfred.

Once you open the app, you'll also notice that the menu bar options for this app (at the top of the screen) is also hidden.  This can be a big problem for app interactions that rely on that interface.

Given the side effects, you'll have to weigh whether the solution is worth it.  This may vary based on scenario. But at least now your screen recording session can capture without having your screen or audio recording software as a part of the film when switching apps.

Are there other ways you take care of this?
