---
categories:
- "Code"
comments: true
date: 2017-05-01T07:21:31-06:00
description: "Give keyboard users a way to get to the main content of your site quickly."
draft: false
image: "https://i.imgur.com/x5v9QuQ.jpg"
layout: post
metaKeywords: "js, accessibility, skip to main content, skip nav"
tags:
- "js"
- "accessibility"
title: "Accessibility: Skip to Main Content"
---

Give keyboard users a way to get to the main content of your site quickly.

<!--more-->

## Keyboard Navigation

Users of your site might use a keyboard for a number of reasons.  They might suffer from a visual impairment and be using a screen reader which is controlled by the keyboard.  They might prefer the keyboard for quick mobility.  In either case, handling keyboard navigation on your site allows these kinds of users to access your content more quickly and happily.

## The First Thing on the Page

When a website is loaded and you tab into the page the first time, the focus will go to the first focusable element.  This first focusable element is almost never the main content.  If you consider the informational architecture of the page, often there is some sort of hierarchy that defines where within the larger site this particular page resides.  This means site or page navigation will often occur in the hierarchy previous to the main content.  And navigational elements links anchor tags and buttons are all focusable.

These navigational elements are useful but are hardly the main event on the page.  When you visit a page, do you pore over the page nav or layout?  It's more likely you try to gather the quick information you sought or you want to dive right in and experience the best material offered.  In short, you want to *skip to the main content*.

## Skip to Main Content

The accessibility feature of "Skip to Main Content" allows you to get past all the navigation and end up at the main event.  This is an element that usually appears high in the page hierarchy, often the first focusable element on the page.  When selected, it will move focus for the keyboard user or screen reader to the main content on the page, allowing reading or navigation to continue from there.

Often a "Skip to Main Content" feature isn't necessarily visually appealling or even useful to many users.  Thus one option is to hide this element except when focused upon by keyboard tabbing.  Just make sure to hide the element in such a way that it's still focusable.  For instance, if you apply the css `display: none` to this element, you won't be able to focus it.  One workable solution is to position it offscreen:

```css
.skip-to-main {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  transform: translateY(-50px);
}
.skip-to-main:focus {
  transform: translateY(0);
}
```

The design is really up to you, but the convention is generally to put the visual representation of the "Skip to Main Content" element in the top-left corner of the page, often overlaid above everything else. Here are a couple of variations on how the "Skip to Main Content" element can be shown:

![skip to main transition](https://i.imgur.com/if1Lzod.jpg)

## Single Page Applications

One method of accomplishing the navigation from the "Skip to Main Content" element to the main content is via an internal link.  But in the case of single page apps that use the URL hash for navigation, these features will easily clash.  The other implementation option is to simply change focus to the main content element when "Skip to Main Content" is clicked.  This works just as well.  Just make sure that the element you're moving focus to is actually focusable so that the tab order can pickup there after navigation to the main content:

```html
<button onclick="(_ => document.querySelector('.main-content').focus())()">Skip to Main Content</button>
<main class="main-content" tabindex="-1">Such Mainness</main>
```

Do you enjoy having a "Skip to Main Content" feature on sites you visit?  What are some other ways you've implemented it?


