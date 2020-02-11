---
layout: post
title: "PNG Gamma Correction Woes"
date: "2010-06-21"
comments: true
categories:
  - "Code"
tags:
  - "images"
  - "png"
description: PNG was a file format that, among the original reasons for conception, was created to show the same color over different computers, with different OS's, and
metaKeywords: images, png
draft: false
---

PNG was a file format that, among the original reasons for conception, was created to show the same color over different computers, with different OS's, and browsers.  To this end, gamma, or lighting, correction was added.  While solving the original problem, a new, bigger, badder problem was created.  Now, there was the potential for color inconsistencies on the SAME web page.  For example, the color of certain items rendered on the page with the same hex value will display differently than PNGs rendered on the page painted with the same hex value.

<!--more-->

It seems improbable that such a disgusting problem would have been conceived in a fairly new image file format.  But, the story is well-known:

* Chronicled in the [The Sad Story of PNG Gamma 'Correction'](https://hsivonen.iki.fi/png-gamma/)
* Gamma channel vs. browser [comparison](https://morris-photographics.com/photoshop/articles/png-gamma.html)
* Gamma correction [test page](https://www.libpng.org/pub/png/png-gammatest.html)

In my personal experience, I have been bitten by this little bugger.  As I was creating new graphics for my blog, I created a couple different images and saved them as PNGs.  Like any good web developer, I dev'ed this in Firefox and look at nothing else.  :)  My dad, one of the 4 people who frequent my blog reported some oddities in the look and feel, and sure enough, there they were:

Firefox 3.6

![image](https://lh3.ggpht.com/_5XZCKcD6--c/TB-aAhshi0I/AAAAAAAAM1s/XCrVWdh1Gsw/s400/aj4-ff.jpg)

Internet Explorer 8

![image](https://lh3.ggpht.com/_5XZCKcD6--c/TB-aAiB55JI/AAAAAAAAM1w/dxNlbywz5m0/s400/aj4-ie8.jpg)

After stumbling across the above Morris Photographics link, I tried the referenced [pngcrush](https://pmt.sourceforge.net/pngcrush/) utility, which was easily available via aptitude:

```bash
sudo apt-get install pngcrush
```

From "The Sad Story", supposedly "There is no way of making PNG images that match CSS colors in all  PNG-supporting browsers."  But, when looking at the Morris Photographics comparison chart, it seemed that when the gAMA chunk was removed, all listed browsers correctly displayed the PNG.  I tried a:

```bash
pngcrush -rem gAMA infile.png outfile.png
```

And it worked like a dream.  Now, my parents can see the blog in its splendor, free from discolored boxes.  Bam!  Now think about that.

  
