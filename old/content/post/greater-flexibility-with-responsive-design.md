---
layout: post
title: "Greater Flexibility with Responsive Design"
date: "2011-05-18"
comments: true
categories:
  - "Code"
tags:
  - "css"
  - "design"
  - "html"
  - "responsive-design"
description: With the advent of mobile devices, tablets, and screens attached to your toaster, we as web developers -- er, ninjas -- can no longer be ok with creating ma
metaKeywords: css, design, html, responsive-design
draft: false
---

With the advent of mobile devices, tablets, and screens attached to your toaster, we as web developers -- er, ninjas -- can no longer be ok with creating markup and styles that only appear properly in a traditional desktop environment.  Well, I guess we could, but we'd soon be defeated by much more gnarly ninjas.  Based on work and ideas of the Unstoppable Robot Ninja himself, your css dexterity is sure to reach levels of cosmic explosion by reviewing just a few principles of responsive design.

<!--more-->

Ebb and Flow
------------

Programmers are lazy.  Designers are lazy.  I guess most people are, including those that are trying access our web content.  Historically, constraints, technical and cultural, made it easier for us to stay lazy as programmers and designers.  But now that you can view the web on screens many sizes and abilities, we can't live behind our naive constraints any more.  We must adapt or die -- that is, the exploding mobile web viewership will be lost to us and to our precious adwords.  Literally, if we don't adapt our designs, markup, and styles, it will break when viewed in a way that we didn't anticipate.

The Unstoppable Robot Ninja
---------------------------

In May 2010, Ethan Marcotte introduced his [article on Responsive Design](http://www.alistapart.com/articles/responsive-web-design/) at A List Apart.  I remember seeing the article pop up but obviously didn't realize the bodaciousness of the idea, because my ADD-prone website eyes couldn't finish the article.  (A List Apart articles are generally more well thought-out than the average blog muttering -- and longer!)  I first had my real exposure to the core ideas of responsive design at a webinar in Jan 2011.  Since then, I've dipped my toes in it a few times, and I like it.  The water's fine!  Come on in.  I really think it's a way to get some quick satisfaction that you're just a little closer to doing something -- anything -- for your mobile web users.

It's quick because the ideas are simple.  As Beep says, there are 3 main elements of responsive design:

* Fluid grid
* Flexible images
* Media queries

Responsive design seems to make people extremely... happy or mad.  Hehe.  I'm in the happy camp.  The mad camp seem to be those that believe that responsive design doesn't solve any real problems for mobile users.  I say, quit whining.  Take what good you can get from the ideas of responsive design and add something better to it.

I personally think it's almost easiest to just create a static width, unresponsive site first and then convert it to use more responsive styles.  Why?  Because a design is usually static (PSD).  And you can create the dimensions and ratios just right before trying to make them react to their environment.  

Fluid Grid
----------

So far, I've found myself ripping out blueprint, my previous static width grid system of choice and just doing my own thing.  Usually, the steps I follow are something close to this:

1. Build with static widths
2. Give max-width to outermost container and a percentage width
3. Search for widths or px values in stylesheet (Include things like left-right margin/padding, absolute positioning)
4. Comment each with:  current_width / container_width
5. Divide, multiply by 100, use % instead of px (Take full precision.  Ugly, but more precise)
6. Clean up -- figure out what shouldn't be variable width, instead fixed or mins, maxes

Note that I am usually changing only the widths because we're expecting that we didn't set heights, so the ratios will adjust automatically, and because vertical scrolling is acceptable and normal.

Fluid Images
------------

Really, most of the designs that I've converted to be responsive don't have images that go beyond their container's minimum width.  So, I haven't made my images of fluid width.  But, the idea with images is the same as the grid.  Set the width to be a percentage and probably some max-width as well.

Media Queries
-------------

These babies have been with us for a while (why, then, "babies"?), but it hasn't been long since we've started using them for responsive designs.  You've seen many a link to a stylesheet that specifies media="screen".  Well, now we'll add some compound logic and specify something about the screen or device dimensions.

Steps I usually follow for media query creation:

1. Choose your thresholds - I prefer simple lrg, med, sm versions
2. Use max-width on media query  (Put smallest at the bottom, so it will inherit all the attributes of the lrg and med stylesheets -- this cuts down on specific number of attributes in smaller dimension's stylesheets.)
3. Add viewport initial scale meta tag
4. Adjust elements that need to be different in smaller versions

My favorite combonation is usually 3 threshold sizes, approximately corresponding with a smartphone, tablet, and desktop-size screen.  I also tend to favor screen size queries instead of device mins and maxes.  It just seems more simple to me, and I don't have to know too much about devices. (And I don't -- they're too expensive. :)  Something like this (used for rockycode):

```html
	<link rel="stylesheet" href="media/styles/style-lrg.css" media="screen" />
	<link rel="stylesheet" href="media/styles/style-med.css" media="screen and (max-width:1023px)" />
	<link rel="stylesheet" href="media/styles/style-sm.css" media="screen and (max-width: 639px)" />
```

The max-widths are quite arbitrary and are really up to you.  I don't know if anyone's nailed down the "best" thresholds to make your media query jumps.  I tend to think it really depends on the vision for the site use and your main content.  How is that going to be best viewed?  And that potentially changes quite a bit between sites.

Now add this gem to make sure that you get no zoom out action happening when you load up your site on a small mobile screen that has a browser too smart for its britches:

```html
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Voila!  That's really it.  At least it's as awesome as I'm making any of my sites right now.  I'm sure I have much kung fu to learn.  Again, I'm happy because it's something, and it gets me excited to learn more because it's easy and with a cool effect.  If you want to learn more, there are resources a plenty -- so many that someone needs to make a resource to compile a list of other resources.  And Beep's new book is out in a month.  Oh, then what awesome shalt be spewn forth upon the responsive web!

Other Musings
-------------

* Images are easier to resize if they're `<img />` instead of background-images
* Limitation - using media queries only, content like a sidebar is only going to flowable on top of on bottom of the main content
* Flow can get messed up quickly.  Things that were floated side by side might now be one on top of the other.  Have to look at adjusting top/bottom margin, etc (eg, the article tags on rockycode)
* Inline styles are not your friends for media queries.  Can't override.  Unless you use !important, then it feels messy.
* Responsive design makes you question where you put things in the markup.  If things are related to one another, they probably belong beside one another in the markup.  (eg, the clear filter link on rockycode that ended up at the bottom of the page)
* Just because your design is fluid doesn't mean it'll show up well in mobile browsers as your small-windowed desktop browser.  Mobile browsers have their own quirks too.  Test.

Burning Horizons
----------------

* Images - background-image flexibility
* Fonts - not quite as directly adjustable by screen dimension
* Forms, apps - everyone's belly-aching about this; what's the deal?
* Small js frameworks- network latent device friendly replacements for monolith frameworks
* Flexible grid systems - might not have to roll my own for much longer
* User generated content -- accomodating for what's not on the site at launch.
* Modernizr - device feature availability mixed with media query awesome

Final Gem
------------

"At some point, everything breaks.  (But it's okay!  Really!)" - Ethan Marcotte, respected founding father of the responsive web

A File for a Workshop
---------------------

[responsive.zip](https://bitbucket.org/jtsnake/rockycode/downloads/responsive.zip) - static html version of an example article from this site roughly corresponding to a revision that was not responsive ([r124](https://bitbucket.org/jtsnake/rockycode/changeset/6d4d197239da)), ready for some coding to advance to the responsive revision ([r136](https://bitbucket.org/jtsnake/rockycode/changeset/fc4d96ec91f2)).

  
