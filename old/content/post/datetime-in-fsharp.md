---
layout: post
title: "DateTime in F#"
date: "2017-01-04"
comments: true
categories:
  - "Code"
tags:
  - "dotnet"
  - "fsharp"
  - "functional-programming"
description: Should I use DateTime or DateTimeOffset for Utc or local time in F#?
metaKeywords: dotnet, .net, fsharp, f#, datetime, datetimeoffset, local, universal, utc
draft: false
image: https://i.imgur.com/L5olAv0.png
---

I've said jokingly, when coding through date/time-related problems, someone could do a PhD on this stuff.  Surely they have.  It can get complicated.  Here are a few core facts related to Utc time and the usage of .Net's `System.DateTime` and `System.DateTimeOffset` classes that you may find useful.

<!--more-->

## Universal vs. Local Time

Utc is universal time.  All hosts in the world can store a time in Utc and make comparisons between one another.  If your company had two hosts, one in Oregon and one in Hong Kong, and they did an operation at the exact same time, that time would be stored as the exact same value in Utc, or universal, time.  But the time value would be different locally, because there is a 16-hour time difference between what the local clock reads in Oregon vs Hong Kong at the moment of that operation.  If you want to make time comparisons or calculations or have interop between systems in different geographies, always use Utc time.

## System.DateTime

In .Net, `System.DateTime` can represent many things.  It might be a local time construct or a Utc time or neither.  This is determined by its <a href="https://msdn.microsoft.com/en-us/library/shx7s921(v=vs.110).aspx">`System.DateTimeKind` member</a>.  When instantiated, `System.DateTime` is of kind `DateTimeKind.Unspecified`.  You must add an additional line of code, assigning the `DateTimeKind` using the static method of `DateTime.SpecifyKind`.  Using the `DateTimeKind`, you can make a `DateTime` Utc.

## System.DateTimeOffset

In .Net, `System.DateTimeOffset` is a wrapper around a local `DateTime` and a `TimeSpan` offset from universal time.  (As a side note, the "Utc offset" is not the same as a time zone, even though the values might match up.  Time zone is a totally different construct with surrounding history and customs.)  The reason that it is a time *with* an offset is so that the original local time of the observer of the time (eg, Hong Kong host) can be stored *with* the offset from Utc at that moment, which allows it to represent a universal time as well.  Thus, `DateTimeOffset` can store *more* information: the local time and the offset that allows conversion to Utc time.  

Interestingly, however, one can erase this local time storage by using `System.DateTimeOffset.UtcNow` when trying to instantiate an object that is "the current time".  The current time that will be stored is the Universal time or the time in Greenwich, England (offset of +00:00).  You lose the local time storage.  `System.DateTimeOffset` can give you the best of both worlds if you store "the current time" using `System.DateTimeOffset.Now`, keeping a local time and also the offset to Utc, allowing easy conversion to universal time.

## Which is Best?

Which one you should use isn't as clear.  

`DateTime` requires 2 steps before it's clear what time it is.  This can require discipline that we might not want to give to our developers.  

`DateTimeOffset` infers a knowledge about Utc, because it includes an offset to Utc.  Thus Utc can always be determined from this object.  But transport of the `DateTimeOffset` to another system, such as a database, might not store the offset, effectively stripping it.  Before it was stripped, did you convert to Utc or is it still local time?  And after you query the data, how do you know what time it is?  So you might like the combo of `Sytem.DateTimeOffset` knowing about local time *and* the offset, but the potentially of handling this data in translation might make you think twice.

It does seem clear that it's easy to become unclear about what your dates mean.  Organizations, especially those with multiple systems that need to interop with dates and times, need to put forth effort to be clear about how they'll approach this.  Interoperating systems to need to handle dates and times consistently.  This should be written down and documented.  Guides for your approach should be shared for your tech stacks.

What date/time objects do you use and why?  How do you keep these straight between your systems?
