---
categories:
  - "Code"
comments: true
description: "Tabbing with the keyboard approximate what a mouse does."
image: "https://i.imgur.com/MC138A0.png"
layout: post
metaKeywords: "accessibility, tab, tab like mouse, tab order"
draft: false
tags:
  - "accessibility"
title: "Tab Like a Mouse"
date: "2020-04-13"
---

Tabbing with the keyboard should approximate what a mouse does.

<!--more-->

## Like a Mouse

If you're not a keyboard-first or -only user, it can sometimes be a challenge to determine what the keyboard tabbing experience should be like.  This rule of thumb should help:

Try to make the keyboard tabbing approximate what the mouse interactions would do for a mouse-using user.

## Support Description

Another reason that this would be a good rule of thumb would be because of the support story:  

When the user calls support and asks for help on how to use something, what will support tell them?

Support almost assuredly won't know the keyboard tab order -- especially if it's different than what might seem the default.  They'll say things like, "Click on the bookmark button". That should also approximate the keyboard experience.

## Natural Tab Order

This is another good reason to keep the natural tab order. So don't set [positive numbers on tabindex](/post/accessibility-potential-tab-index-values/) for elements.  

Let the document/DOM order dictate the tab order.

## Empty Tab Stops

And if you're careful letting just natively-focusable elements be tabbable, you'll avoid another pitfall: empty tab stops.  If you can't focus on something with a mouse, don't focus on it with tab synthetically.  Only allow tabbing to things that the browser would be able to activate.

## Let the Tabs Happen

The fact is that a mouse user can jump straight to the visual element that he wants to click.  He doesn't have to go through all potential click points serially.  But with tabbing, you do have to process focusable elements one by one. 

This can feel like a lot when you're trying to design for the keyboarding user. But just let it happen. Make everything tabbable that is clickable, and use the natural tab order: approximate the mouse user experience.

What other accessibility tips do you have for dealing with tab interactions?
