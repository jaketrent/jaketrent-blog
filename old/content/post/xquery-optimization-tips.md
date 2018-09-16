---
layout: post
title: "Xquery Optimization Tips"
date: "2010-07-01"
comments: true
categories:
  - "Code"
tags:
  - "marklogic"
  - "performance"
  - "xquery"
description: My first xquery experience has been on the MarkLogic platform.  The project that we just released was written entirely in xquery and on that platform.  As o
metaKeywords: marklogic, performance, xquery
draft: false
---

My first xquery experience has been on the MarkLogic platform.  The project that we just released was written entirely in xquery and on that platform.  As our site continues to gains popularity, we continue to realize how little about xquery we knew or know.  Sometimes and in some places, the site is just really not that performant.  "But I thought MarkLogic/xquery is super-scalable," some exclaim indignantly.  If you do it right, an Oracle relational database can be made to scale.  Done wrong, a MarkLogic database can be made to not scale at all.  There's a lot to be said about knowledge of the platform, the language, and how to wrestle it to do your bidding.  Here are a few optimization ditties that I've collected as of late that might help in your future xquery dev.

<!--more-->

* Flatten your query - This means push your where clause into the xpath at the beginning of your FLOWR statement, limiting the amount of work you have to do once you're inside the for statement.

* Limit your data set - Do whatever it takes.  You just want to get to the smallest set of data possible in the most direct way.  For us, that has meant putting the most specific predicate first or keeping active datasets in a collection (king of AoP-like, not affecting persisted XML data)

* Query once, reference later - This comes pretty naturally in a, say, Oracle world, because it takes so much work to get down to the persistence layer and retrieve the data.  In xquery, the data sits so much closer to your app layer, giving you plenty of easy access.  Just think of it as taking another needless roundtrip to the database every time you want to run a little xpath action.

* Favor xdmp:estimate() - If you can, use xdmp:estimate() because it's faster.  And, it's accurate if counting at fragment boundaries (doc roots).

* Beware calculations - "select count (id)" might work snappy quick in sql, but do the same thing in xquery, and depending on your xpath or where clause, it's gonna work as slow as snot.  The biggest difference?  Probably that documents may need read into memory in their entirety for even a simple result like a count.  Lots of times, it might be good to design for pre-calculations, that happen before the calculation is actually even needed.  For instance, you could put all id's for docs in a certain state inside of a single doc, which is much cheaper to query than many.

* Know your indexes - I'm definitely still learning this one:  which ones are being used implicitly w/o being setup by an admin.  Here's a pearl that we just picked up: Range indexes will significantly increase the performance of your order by clauses that use those indexed elements/attributes (including fn:distinct-values()).

* Limit logging - By nature, file i/o can be expensive.  If you want to keep it in, but turn it off, protect it with a conditional (it's a lazy calculation and hopefully a cheap one too).

* Beware the double slash - This is a given, even for the xquery newb.  This is tree traversal galore.  Then again, don't be afraid to use it, when helpful, for data sets that are always guaranteed to be known and small.

* Utilize search functions - MarkLogic, for instance, has many performance optimizations built into its search capability.  Sometimes it will be more performant to use a search function as opposed to raw xpath.  For example, if an element personId is supplant deep in the bowels of an xml document, requiring xpath muscle to get in, find docs with a particular personId, and return the set, you could do something simple like cts:search(/doc,cts:element-word-query(xs:QName("personId"), $personId)) that could be legions faster.

Those are some dev tips, here are your tools, really quickly:

* Known and love [CQ](http://developer.marklogic.com/code/cq) and its profiler

* xdmp:query-trace() and  xdmp:query-meters()

* Some code to generate large amounts of data for you to test on

Finally:

* There are a few more tips in the Priscilla Walmsley [XQuery](http://www.amazon.com/XQuery-Priscilla-Walmsley/dp/0596006349/ref=sr_1_1?ie=UTF8&s=books&qid=1278002233&sr=8-1) book, chapter 15.

- Performance guide available at [developer.marklogic.org](http://developer.marklogic.com/docs).

Happy coding.  And remember, it's always possible to write bad, unperformant code.



  
