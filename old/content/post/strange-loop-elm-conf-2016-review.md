---
layout: post
title: "Strange Loop and Elm Conf 2016 Review"
date: "2016-09-20"
comments: true
categories:
  - "Review"
tags:
  - "conf"
description: Strange Loop and Elm conf review and highlight notes from 2016.
metaKeywords: elm, clojure, conf, peabody, st. louis, emerging languages, interesting conf
draft: false
image: https://i.imgur.com/SusCISQ.jpg
---

Here's a quick conference review and some highlight bullets from some of my favorite parts.  It was my first time going to Strange Loop.  It was also host to the first Elm Conf ever.  I was excited to go to both.  I was looking for new, eclectic content to consider.  I was not disappointed.

<!--more-->

## Venue
The city was awesome.  I got to hang out and explore St. Louis quite a bit.  I hadn't been there since I was a small child.  There's a great, historic downtown area.  The stonework is inescapable and very impressive.  Great craftsmanship on display from a fun era of architecture.  Highlights were the many elegant cathedrals and churches, including the [Cathedral Basilica](https://en.wikipedia.org/wiki/Cathedral_Basilica_of_Saint_Louis_(St._Louis)).

![cathedral bascillica](https://i.imgur.com/6RHY7b6l.jpg)

I had a good time visiting Forest Park, which is host to some great parks and a cool art museum which houses a wide variety of impressive paintings, sculpture, pottery, artifacts, etc. 

![cool art representing america, wish I captured the info plaque better](https://i.imgur.com/nIufoSal.jpg)

Union Station was the site of Elm Conf and the hotel for the conference.  It's built in a historic train station.  Parking was under the open rafters of the apparent train yard.  The lobby is in the grand hall of the main station where they do light shows on the ceiling on the hour after 6pm.  

![union station hotel](https://i.imgur.com/lT2TcbTl.jpg)

The Peabody Opera House was the site of all sessions for Strange Loop proper.  It's also an impressive venue, with an especially beautiful stage and impressive hall.  I could actually fit in the theatre seats too, so I was impressed.

![peabody opera house stage](https://i.imgur.com/5uo4devl.jpg)

## Content
The content was interesting and engaging.  The speakers were all quite good.  As with any conf, there are low points, but the average here was high and the lows few.  The talks were mostly technical, some deep, a few shallower.  There were a couple good soft and thought talks as well.  What I was going for, I got, which was *variety*.  I feel like my exposure at this conference was broad.

Language themes emerged around Elm, Clojure, Scala, and I think I was getting a general Java vibe there as well.  As a top tech, distributed commit logs in the form of Kafka and Kinesis were mentioned multiple times.

## Hosting

#### Food
Elm-conf had coffee and a few small snacks provided.  It didn't provide meals.  Somehow this was unclear to me.  Apparently there was a way to tack this on to your experience at registration that I missed.  In the end, I enjoyed going out to the city and finding something good with new friends, but that wasn't my initial expectation.  At Strange Loop, the Peabody Opera House provided breakfast, lunch, and snacks.  They were all solid and good.  In the end, I was made more solid and good.  Best food in the city I had was the day before the conf, when we visited Blues City Deli, and I ordered the Aporkalypse, a drippingly-delicious sandwhich of pork and more pork in the form of bacon.  Mmmm!, so good.

![blues city deli](https://i.imgur.com/AAdpY4Dl.jpg)

#### Swag
There was eventually a conference T-shirt.  Black.  With a coolish logo on it, that I had to ask about.  I'm still one of three people in the country who have not seen Stranger Things.  Apparently the logo was based on that show's logo.  There were a few vendors.  I got lucky with one of the contests.  That was awesome.  But holy cow, where were the stickers?  Apparently that's not a strong part of this conference's culture.  I got one cool sticker from Netflix -- Chaos Monkey :D.

#### Party
The conference party was at the singular City Museum.  It's not really a museum?  It's more like an anything-goes, go explore this, based on psychonauts concept art, adult playground.  I say adult because no where are predictable, little tikes-sized, plastic-covered platforms and slides.  Everything's made out of exposed rebar, inconvenient, twisted, gnarly, mixed with random art installments, and generally evoking of my laughter.  If you go to St. Louis, you just need to experience it.

![city museum st louis](https://i.imgur.com/55iusyGl.jpg)

In addition to the general review, here are some learnings that stood out to me:

## Some Favorite Talks

#### ["Code is the Easy Part"](https://youtu.be/DSjbTC-hvqQ) - Evan C - NoRedInk 
- Alternatives make each community stronger - we can gravitate around things we thing are good, beautiful, and we don't have to partake in what we don't like.  We don't have to rain on those parades either.
- Are bigger teams better? "Not really" Some things that are great about Elm haven't really been matched over even long time periods and with many resources.  (eg, great error messages, fast rendering)  Can have great products from small teams.
- Most people would judge a great open source project by those that get issues and resolve them immediately, keeping open issues at 0.  But Evan batches issues, letting them pile up, then designing around trends to maximize value and consider good design.
- Upcoming versions of Elm will focus on: debugger, code swapping, server render, packages improvements

#### ["Making Impossible States Impossible"](https://youtu.be/IcgmSRJHu_8?list=PLglJM3BYAMPH2zuz1nbKHQyeawE4SN0Cd) - Richard Feldman - NoRedInk
- Less to test is good. Nothing to test is better because it's impossible.
- Expose functions to access data - can control data access, structure for upgrades and refactor
- Make new types as combos of new fields are added to a data structure
- Spend time to design data structures and types to only allow valid states

Strange Loop and Elm Conf both did a great job hiring some solid videographers who did good video capture work and had it up incredibly fast.  I was browsing videos on Youtube at lunch that were just presented in the morning!

- [Strange Loop on YouTube](https://www.youtube.com/channel/UC_QIfHvN9auy2CoOdSfMWDw/videos)
- [Elm Conf on YouTube](https://www.youtube.com/playlist?list=PLglJM3BYAMPH2zuz1nbKHQyeawE4SN0Cd)

## Some Cool Ideas
- NoRedInk - Hiring after Elm adoption expanded greatly - "python paradox" - no programmers, but easier to hire/find a team because of tech interest and niche. (segment from ["Elm conf Q&A panel"](https://www.youtube.com/watch?v=LCNs92YQjhw&feature=youtu.be&t=7m55s) by Evan Czaplicki and Richard Feldman)
- In elm, most things not be a component, but a "triplet" - model view update - (segment from ["Elm conf Q&A panel"](https://www.youtube.com/watch?v=LCNs92YQjhw&feature=youtu.be&t=21m09s) by Ossi)
- Local concision is nice - I don't have to visit tons of files to make a change (eg, EJB) (somewhere in ["Agility and Robustness: Clojure spec"](https://www.youtube.com/watch?v=VNTQ-M_uSo8&feature=youtu.be) by Stuart Holloway)
- Clojure spec attempts to find a best-of-both world approach, being a thing kind of like typings and kind of like example testing.  Maintains generalized systems, dynamic types of clojure.  But allows for specificity, such as data shape definitions where desired.  Seems like it could be really cool.  A bit of a mind blow.  (segment from ["Agility and Robustness: Clojure spec"](https://www.youtube.com/watch?v=VNTQ-M_uSo8&feature=youtu.be&t=9m09s) by Stuart Holloway)
- Some well-loved tools (eg, React, Gemfile, and Git) are loved by us because they use pure functions leading to better mental models.  Obvious looking back, but was non-obvious to start.  We should build more tools this way. ([tweet](https://mobile.twitter.com/garybernhardt/status/777901423220490240) about "Reproducability" by Gary Bernhardt)
- Parable of pumpkin carver (segment from ["A Frontend Server, Front to Back"](https://www.youtube.com/watch?v=_1rh_s1WmRA&feature=youtu.be&t=22m25s) by Zach Tellman)
- Nice to have abstractions, but it might be too much work to build a "big tower of abstraction" with a bunch of new terms and concepts just for 300 lines of well-factored code. (somewhere in ["A Frontend Server, Front to Back"](https://www.youtube.com/watch?v=_1rh_s1WmRA&feature=youtu.be) by Zach Tellman)

## Some Cool Projects
- [hop](https://github.com/sporto/hop) - elm router 
- [elm-style-animation](https://github.com/mdgriffith/elm-style-animation) - tweeing values for animation
- [elm-horizon](https://github.com/abadi199/elm-horizon) - serverless realtime frontend experiment
- [atomist](https://www.atomist.com/) - yet-to-be-released  project for elm code gen [demo talk](https://youtu.be/jJ4e6cIBgYM)
- [swagger.io](http://petstore.swagger.io/#/) - API documentation
- [johnny-five](http://johnny-five.io/) - write nodejs on top of arduinos
- [sketch-n-sketch](https://ravichugh.github.io/sketch-n-sketch/) - prototype tool for syncing code and direct manipulation tools for making vector art [demo talk](https://www.youtube.com/watch?v=YuGVC8VqXz0)
