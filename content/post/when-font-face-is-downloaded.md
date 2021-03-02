---
layout: post
title: "When a font-face is Downloaded"
date: "2021-03-02"
image: "https://i.imgur.com/DfBJ6Ms.jpg"
description: "When the font rules in the font-face declaration are detected in use."
metaKeywords: "font-face, css, browsers, performance, lazy load"
tags:
  - "css"
  - "browsers"
---

When is a `@font-face`-declared font file downloaded? When it's needed.

<!--more-->

## Font-face Declarations

`@font-face` declarations are one way of listing which fonts are available to a web page. Importantly, they point to a font file (.otf, .woff2, etc).  This is commonly done by a url.

```css
@font-face {
  src: url(https://example.com/myfont.otf) format('opentype');
}
```

## Unused Declarations

It is possible that a `@font-face` that is declared is never used (as, indeed, the incomplete example above will never be). 

If a font is not used, the font file in the `@font-face` declaration it is not downloaded.

To use a font, you must have a css selector on the page that references it.

Most basically, you'd reference a font by name using `font-family`.

```css
.my-usage {
  font-family: "My Font";
}

@font-face {
  font-family: "My Font";
  src: url(https://example.com/myfont.otf) format('opentype');
}
```

The `.my-usage` selector says it needs the "My Font" `font-family`. "My Font" is what you named the font file in the `@font-face` declaration. So it gets downloaded. The name "My Font" is arbitrary. You could call it whatever you want. It's an identifier in your code.

## Specifying a Font with Properties

The above example is the broadest possible selection of the font. But we can create more filters if we want. This [CSS Tricks article about @font-face](https://css-tricks.com/whats-deal-declaring-font-properties-font-face/) describes these filters as "gatekeepers". It's a great analogy.

If we want more things to have to be true before a font is downloaded, we'll add more font properties to the `@font-face` declaration. They will act as gatekeepers. For instance, if we only want the font to be downloaded and used for italic text, we'd add a `font-style: italic` property to the `@font-face` declaration. For specific `font-weight`s, a similar story, etc.

For instance, this is helpful in the case of many different font files for different styles and weights of the fonts.  For instance, one file could be for regular text, the other for italics.

```css
@font-face {
  font-family: "My Font";
  src: url(https://example.com/myfont.otf) format('opentype');
  font-style: normal;
}
@font-face {
  font-family: "My Font";
  src: url(https://example.com/myfont-italic.otf) format('opentype');
  font-style: italic;
}

.my-usage {
  font-family: "My Font"; /* will download normal myfont.otf */
}
.my-italic-usage {
  font-family: "My Font"; /* will download italic myfont-italic.otf */
  font-style: italic;
}
```

## Specifying Ranges for Variable Fonts

Variable fonts are a kind of font file that contains many different... variations within a single file. These often include font weight or italics (ie, obliqueness).  For these, you can specify a range in your `@font-face` font properties. For instance, a file that contains all the weights from 100 to 900 could be written as:

```
@font-face {
  font-family: "My Font";
  src: url(https://example.com/myfont-variable.woff2) format('woff-variations');
  font-weight: 100 900;
}

.my-usage {
  font-family: "My Font"; /* will download normal myfont-variable.woff2 */
  font-weight: 400;
}
.my-usage-weightier-matters {
  font-family: "My Font"; /* will use the same file, no additional download needed */
  font-weight: 700;
}
```

As we can see, the good news is that `@font-face` files are lazy loaded. They are downloaded as needed, when usages in css are detected.
