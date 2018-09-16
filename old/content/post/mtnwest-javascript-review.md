---
layout: post
title: "Mountain West JavaScript Review"
date: "2014-03-25"
comments: true
categories:
  - "Review"
tags:
  - "js"
  - "conf"
description: MountainWest JavaScript was a great conference for JS last week in Utah.  Here's my take.
metaKeywords: js, ember, emberfire, firebase, fireplace, emberfire to fireplace, ember-data
draft: false
image: https://i.imgur.com/VGtnQzX.png
---

MountainWest JavaScript was a great conference last week.  It was a jubilee. Well, if you can have a jubilee in the first year of a conference.   Here's my take.

<!--more-->

## Format

[MountainWest JavaScript](http://mtnwestjs.org/) started this year as a part of the larger Mountain West conference set, including [devops](http://mtnwestdevops.org/) and [Ruby](http://mtnwestrubyconf.org/) as well.  It was two full days.  There is a single track -- everyone (that stays) hears everything.  Love both these features.  Splitting the disciplines into separate conferences is genius.

## Speakers

The speaker lineup was exceptional.  There were many great minds assembled, fun experience shared, and great companies represented.  Following [ng-conf](/post/ng-conf-review/) earlier this year, I was again pleasantly surprised at the amount of great content.  I did not attend the devops or ruby portions, but it has been said by some that they were not as exceptional.

Thanks to the organizers for selecting great content and presenters.  Thank you to all the speakers for preparing some killer talks.

## Topics

The mix of topics seemed relevant and varied.  This was welcome.  There was just a bit of overlap on some topics.  Conference organizers put similar topics together, which was fine.  But in one case, the back-to-back speakers, from the same company and essentially the same topic had so much overlap that it was obvious.  Repetition is good, but it should be done in front of the YouTube recording of a single, great talk on the subject.  The conference was recorded, so hopefully we can see the sessions online soon.

## Venue

The conference met at the Salt Lake City Public Library.  It's a great city.  It's a cool building.  It has a location close to public transit lines.  The stadium seating in the conference room is good for visibility but bad for knees.  There were plenty of power sources.

Despite these good points about the location, I found myself not super-excited about showing up at the library for another conference.  I feel like it's time for something fresh.

## Swag

There was a nice shirt with mysterious symbols emblazened across the front.  Ruby was discernable.  I'm still up in the air over which represents JavaScript or devops.  There was also a nice, laminate sticker that they gave out with the conference logo.  Sponsors gave out nothing.  I was hoping for an O.C. Tanner gold bracelet and Instructure panda hoodie.  There was also a stunning lack of sweet treats and lunch. :(  In the place of actual food, there was an especially long, 2-hour lunch break -- oh, and a lot of water.

## I'd Go Again

I'd definitely go again if the speaker and topic lineup seemed as promising as it turned out to be this year.  Next year, hopefully I'll attend at a different location in Salt Lake City and enjoy a chocolate eclair whilst learning about how I can actually use es6 features in the then-current evergreen browsers.

## My Notes

As I've indicated, there were many topics touched upon that were interesting and helpful.  I've included my chicken scratch below (if you can actually type chicken scratch), mostly so you can grab some hyperlinks if you'd like.

```

react.js - Pete Hunt - made react look very interesting from a perspective of the underlying ideas
     - jsx - http://facebook.github.io/react/docs/jsx-in-depth.html
     - virtual dom
     - simplicity over familiarity
      - riot.js - super-small mvp lib - https://moot.it/riotjs/docs/


macros - James Long -
     - sweet.js

async js - Jafar Husain - simplicity of event handling, handling of race conditions, and description of handling looked very compelling
     - observable - combine iterator (‘i’m done’) with event (pub sub)
     - events are just arrays
     - vector programming - transformations over collections
     - practice and learn - http://jhusain.github.io/learnrx/

async -
     - same bit as above
     - rxjs - http://reactive-extensions.github.io/RxJS/ - https://rx.codeplex.com/
     - Reactive Manifesto - http://www.reactivemanifesto.org/

ball of mud - Brandon Hays - most entertaining; great
     - Ball of mud architecture - http://laputan.org/mud/
     - @tehviking

TDD ember - Andy Pliszka

Screenreaders - Ryan Florence - a humanistic appeal to do the right thing and help those with disabilities on the web
     - aria-role

seo - Jeff Whepley
     - fragment spec
     - make server render substates, js can pick up

teach kids js - Liz Abinante - fun and light encouragement to share programming concepts with children
     - children are moldable
     - creative, imagination
     - not limited by inhibitions
     - start early, have time for mastery by young age.

modules, packages - Guy Bedford
     - traceur - still use
     - es6-module-loader - es6 loader polyfill - used by addy osmani’s todomvc - http://addyosmani.github.io/todomvc-backbone-es6/
     - systemjs - shim require on top of es6 loader polyfill
     - jspm.io + systemjs - https://github.com/systemjs
     - addy osmani’s todomvc rewrite experience - http://blog.tastejs.com/rewriting-a-webapp-with-ecmascript-6

web animation - Jeremy Kahn
     - detect end of css animation - http://blog.teamtreehouse.com/using-jquery-to-detect-when-css3-animations-and-transitions-end
     - edit keyframe animation via js - https://github.com/jlongster/css-animations.js
     - js tweening - https://github.com/jeremyckahn/shifty/
     - stylie - viz tool create keyframe animation

hardware hack - Jamisson Dance
     - npm - johnny-five - node arduino
     - npm - xbox-controller
     - parrot ar drone
          - “That’s against the spirit of node to use something when you could rewrite it yourself.”
     - arduino uno w/ breadboard - ~$100

flight.js - Kassandra Perch
     - slides - http://kperch.github.io/mtn_west/

node error handling - Jamund Ferguson
     - Kraken - on top of express - https://github.com/paypal/kraken-js
     - try/catch - for json.parse
     - callback - first param is err
     - custom error - custom name, attach custom data (e.g., ServerError has a list of services hitting, ports, etc)
     - process.on(‘uncaughtException’) must always process.exit()
     - handle errors in middleware - call next w/ error as first param, call return right after
     - use default error handler in express - app.use(function (err, req, res, next) { res.send(500, etc) })
     - node core notes - https://nodefirm.hackpad.com/Node-Error-Handling-Summit-uXFi4FUg8Td

client error handling - Todd Gardner
     - error handling service - http://trackjs.com/
     - name your inner functions
     - stacktrace.js - normalizes format of stack trace
     - tracekit.js - get stack traces in old browsers
     - zone.js - long stack traces across async events

gulp - Eric Schoffstall
     - getfractal
     - still has problems with 3rd-party file-based builds, such as require.js
     - github.com/substack/stream-handbook

canvas animation - Josh Robertson

```
