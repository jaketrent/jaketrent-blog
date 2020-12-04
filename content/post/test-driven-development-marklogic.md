---
layout: post
title: "Test-driven Development on MarkLogic"
date: "2011-10-11"
comments: true
categories:
  - "Code"
tags:
  - "marklogic"
  - "tdd"
  - "unit-testing"
  - "xquery"
description: Unit testing is a required part of a healthy software development lifecycle and a balanced breakfast.  But test-driven development is a rockin' part of an *
metaKeywords: marklogic, tdd, unit-testing, xquery
draft: false
---

Unit testing is a required part of a healthy software development lifecycle and a balanced breakfast.  But test-driven development is a rockin' part of an *awesome* development lifecycle.  What's the difference?  If you don't test-drive the dev of your MarkLogic XQuery, you may never come back to test again.  Test-driven XQuery development will ease your headaches, put you into the plush seat of a developer with confidence, and rocket you down the road to making all your wildest dreams come true.  Kachow!

<!--more-->

Ok, it may be slightly <em>more</em> magical than that.  But, I don't want to get your hopes up.  Seriously, though, if TDD is fun in, say Java Land (and it still is in MarkLogic land with "the Swede"), then it's a required portion of fun in MarkLogic Land?  Why?  While you might imagine yourself going back and adding tests to your Java project and sometimes you do, if you imagine it and then attempt it in your XQuery project, I believe the likelihood that you shrivel in shame and tears under your desk is much higher than in some other environments.

I the difficulty of the test after development approach is higher in MarkLogic XQuery because of what I've called "camouflaged dependencies" -- essentially, access to the http request and respond and to the database.  

You can get access to request fields or headers or anything else dealing with the web context in which the code is executed at any place in your code.  This doesn't mean you have to code like this, but the language doesn't necessarily help you enforce your discipline.  This is where testing before you write the code will help.  Make you functions functional -- pass in parameters and make them the only data access.  

You can read the database natively in MarkLogic XQuery.  That means that you can be retrieving data anywhere in your code.  There is an extreme lack of ceremony in making a connection to the database -- it's always there;  they're connected.  This is both refreshing and a shiny nail strip upon which to puncture the tires of your test-driven sports coupe e're you drive it off the lot.  Resist the temptation to read from the database or write to the database save in very determined and specific parts of your app -- parts that you will not actually unit test [gasp] because they'll be doing nothing but saving xmls at given database uris, and MarkLogic already has internal testing for that.

So, respect what you might call your dependencies -- the network and the database -- and be thrilled with the adventure of testing the business logic that you write yourself and need to verify.  And test it first to help keep you on the strait and narrow.  Otherwise, you're "discipline" will crumble under deadlines and in the end it will "just work" -- until it doesn't -- and you won't know why.



Note:
Below are the slides to support a presentation given at an in-house development conference.  It is an evolution of a talk previously given on <a href="">unit testing XQuery on MarkLogic</a> with streamlined principles and skills section and a not-included coding portion surrounding the use of XqTest, our XQuery unit test framework, and its integration in our environment.  Tonight, as I say my prayers, I will continue to hope that someday XqTest will be released from its prison and "the Swede" will see the light of day!

<div style="width:425px" id="__ss_9651897"> <strong style="display:block;margin:12px 0 4px"><a href="https://www.slideshare.net/rockycode/testdriven-development-on-marklogic" title="Test-driven Development on MarkLogic" target="_blank" rel="noopener noreferrer">Test-driven Development on MarkLogic</a></strong> <iframe src="https://www.slideshare.net/slideshow/embed_code/9651897" width="425" height="355" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe> <div style="padding:5px 0 12px"> View more <a href="https://www.slideshare.net/" target="_blank" rel="noopener noreferrer">presentations</a> from <a href="https://www.slideshare.net/rockycode" target="_blank" rel="noopener noreferrer">rockycode</a> </div> </div>

  
