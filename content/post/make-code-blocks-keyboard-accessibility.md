---
layout: post
title: "Make Code Blocks Keyboard Accessible"
date: "2021-03-10"
image: "https://i.imgur.com/DLHqIvE.jpg"
description: "Allow keyboard users to horizontally scroll code blocks"
metaKeywords: "accessibility, keyboard navigation, code block navigation"
tags:
  - "accessibility"
---

This is how we can allow keyboard users to horizontally scroll code blocks.

<!--more-->

## The Need to Scroll

Why would a code block need to be accessible by keyboard?  It's just text after all. Yes, most of the time there's no additional keyboard accessibility required by text. Most visual designs preclude this.  But in the case, of code blocks, we sometimes have the problem of visibility. 

Some text in the block might not be visible because it's offscreen. It's sometimes offscreen because code blocks usually do not wrap lines, and so a horizontal scroll will be needed.

## WCAG 2.1.1

WCAG, the Web Content Accessibility Guidelines, version 2.1, gives an instruction that all content should be accessible through a keyboard as an alternate interface to a mouse. This is found in [WCAG 2.1.1](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html).

Thus, our users should be able to horizontally scroll the code block to see the entire text using only the keyboard.

## Focusable Blocks

This is accomplished by allowing the code blocks to be focused. Once focused, the left and right arrow keys on the keyboard can be used to scroll left and right to show the offscreen text.

Code blocks are usually rendered in a `pre > code` HTML hierarchy, such as:

```html
<pre>
  <code>
    printf("My extremely long line of code that you can not see to the end of.")
  </code>
</pre>
```

A `code` element is not natively focusable. But we can make it so by [adding a tabindex](/post/accessibility-potential-tab-index-values). To make this code accessible, we'd adjust it to be:

```html
<pre>
  <code tabindex="0">
    printf("My extremely long line of code that you can not see to the end of.")
  </code>
</pre>
```

Now we're ready we're ready to view all code contents in the block with our keyboard. W00t! You might want to also add a `:focus` CSS style to your `code` blocks to improve the visual navigation.

Do you agree with this interpretation of WCAG 2.1.1? Is there anything you do to make code blocks more accessible?
