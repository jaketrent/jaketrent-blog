---
categories:
- "Code"
comments: true
date: 2017-05-30T07:35:33-06:00
description: "The 'style' attribute in package.json is useful for importing CSS packages."
draft: false
image: "https://i.imgur.com/zZWYNAf.jpg"
layout: post
metaKeywords: "css, package.json, package.json style, css module, css npm package, css package, entry point"
tags:
- "css"
- "postcss"
- "webpack"
title: "Package.json \"style\" Attribute"
---

The `"style"` attribute in package.json is useful for importing CSS packages.  Here's a way to utilize it.

<!--more-->

## CSS on NPM

NPM is a great channel for distributing assets for JavaScript projects.  Traditionally, JavaScript code has been the most common thing to be stored in NPM, and that's what the repository was built for.  But there's nothing that really precludes storing other things in the repository, such as CSS.

UI components stored in NPM provide a compelling reason to store the CSS there as well.  UI components usually have a code or markup portion matched with some styles.  These styles are often stored in a `.css` stylesheet alongside the JavaScript. 

## Loading CSS from NPM

To get CSS out of NPM, you install it just like anything else:

```
npm install some-stylesheet-package
```

Once it's on your filesystem, you could reference it in `node_modules` straight from a script tag:

```html
<script src="node-modules/some-stylesheet-package/css/index.css"></script>
```

This bypasses any usage or need for the `"style"` attribute in `package.json`. There is probably a more sophisticated and flexible option with the use of a module loader like [webpack](https://webpack.js.org/).  Webpack provides [loaders](https://webpack.js.org/concepts/loaders/) that define how to transform source code (eg, '*.css') into something that your code can import and use.  

One of my favorite CSS loader stacks includes [postcss-loader](https://github.com/postcss/postcss-loader).  This loader, and [postcss](https://github.com/postcss/postcss) generally, has many plugins that allow it to do interesting things with CSS.  Of particular interest is the [postcss-import](https://github.com/postcss/postcss-import) plugin.  It's going to make use of the `"style"` attribute in `package.json`.

## postcss-import Uses "style"

`postcss-import` has a main purpose of inlining styles that it imports.  And there are some potential [hangups](/post/css-module-selectors-pileup-with-postcss-import/) to watch out for there.  The other great thing about it is that it helps us properly import CSS from the NPM packages like we've been talking about.

If I have a local stylesheet that imports the `some-stylesheet-package` that we just installed, `postcss-import` will help get it right.  In `local.css`, we see the import:

```
@import "some-stylesheet-package";

/* ... */
```

`postcss-import` will look in a number of places to make that import work.  Importantly, it considers the `"style"` attribute in the `package.json` file.  If the package author has specified this field, it will be the entry point for the CSS import.  The `some-stylesheet-package` `package.json` that includes this attribute:

```
{
  "style": "css/index.css"
}
```

Would direct the module loader to import the CSS from:

```
node_modules/some-stylesheet-package/css/index.css
```

## A Standard?

This approach is becoming more widely used, but is it really a standard yet?  It's a convention, at least, that a number of tools support the use of.  It would be great if this continues to develop to the point of being on more sure footing.  Right now, it seems like it's a de facto standard.  I would love to see it gain more official community or NPM support.

Do you use the `"style"` attribute in your `package.json`?  What tooling do you use around it to support and use it?
