---
categories:
- "Leadership"
comments: true
date: 2017-03-27T06:31:56-06:00
description: "When you go against the grain, just doing what you think is best, you're branded a rebel.  Later, you might be a visionary."
draft: false
image: "https://i.imgur.com/nteQalv.jpg"
layout: post
metaKeywords: "confidence, autonomy, solution mismatch, right tool for the job"
tags:
- "confidence"
- "autonomy"
title: "First Rebels, Then Visionaries"
---

You are just doing what you think is best.  You might not go with the flow.  You might go against the grain.  For this, you gain a bit of a reputation as a rebel.  Later, that might change.  It may be found that you indeed a visionary.

<!--more-->

## Solution Mismatch

At Pluralsight, our architecture recommendations used to include Cassandra as a primary data store.  There were a number of reasons for this, based on valid interpretations of current use cases and reasonable predictions of future use cases.  There was a basic problem, however.  Most teams didn't know how to use this tool very well.  But most wanted to be good citizens, so projects adopted it and tried to figure it out anyway.  Overall, expertise and competent use increased, but there was still continuing pain.  Sometimes it felt like a solution mismatched to the problem space.

One of the project teams didn't understand the whys or hows of this tech recommendation either.  They had other expertise in another database tech, Postgres.  So they refused to use Cassandra.  This team shared their good experiences.  They helped others understand the gains they had experienced.  Soon other projects started picking up Postgres and having their own success.  Soon the usefulness and fit of Cassandra in the architecture was being widely questioned.

## Enacting Change

This led to a change in the basic architectural recommendation.  It was clear the need for Cassandra wasn't there in most cases and that real use cases were better addressed with something else.  Postgres became the de facto replacement recommendation, and soon most were happy to use it instead of the previous thing.  Thus the rebels became visionaries.  They had followed a method that they felt worked for them, shared it with others who were interested, and eventually the results of what they were doing spoke for themselves. 

If you're on a path that works well for you, be true to it.  Don't abandon it if other recommendations don't make sense.  Give it time to shake out.  Help others that might be feeling the pain of a potential mismatch as well.  You may eventually be re-branded visionaries.

What is a tech decision that your team has made that went against the grain but eventually was seen for its own merits and adopted more widely?
