---
layout: post
title: "Jquery, Ajax, Json on Django"
date: "2011-01-27"
comments: true
categories:
  - "Code"
tags:
  - "ajax"
  - "django"
  - "django-piston"
  - "jquery-templates"
  - "json"
description: Jquery, Ajax, Json, Django -- this is quite a laundry list of technologies.  In fact, it's pretty much the whole stack.
metaKeywords: ajax, django, django-piston, jquery-templates, json, sammyjs
draft: false
---

Jquery, Ajax, Json, Django -- this is quite a laundry list of technologies.  In fact, it's pretty much the whole stack: client tech, server requests, over-the-network data format, and a backend app server.  In the following slidedeck and example code, we're going to touch on the whole stack and not get too deep into any one area.  By the end, you should be able to at least have a grasp of what technologies one can use in an Ajax Django application, a little bit of what they're capable of, and then, hopefully, a list in your brain that you can go back, reference, and then drill into specific technologies when you want to go build something similar yourself.

<!--more-->

Here's the breakdown of the [slideshare slidedeck](http://www.slideshare.net/rockycode/jquery-ajax-json-on-django):

Jquery
---------

- A Javascript framework
- "Write less, do more"
- Select the dom - $(".selection")
- Traverse the dom - $(".my").parent()
- Manipulate the dom - $(".my").append("dectomy")
- Provides an Ajax API - $.ajax()
- Framework for providing your own functionality (plugins) - $(".new").operate()

Ajax
---------

- Asynchronous Javascript and Xml
- Jquery API - $.ajax(), $.get(), $.post(), $.getJSON()

Json
---------

- JavaScript Object Notation
- Terse
- Flexible, nestable
- Native in Javascript

Django
---------

- Web framework built on Python
- "encourages... clean, pragmatic design"
- Django-piston - mini-framework to create RESTful APIs for your data


Because this presentation was originally written for a Django-loving audience who wanted to know more about Jquery, Ajax, and Json, I decided to make the most basic Django app that could easily function with the other (mostly) client-based technologies.  

Sample App
--------------

The result was the "ask" app ([source here](https://bitbucket.org/jtsnake/ask>)).  In the app, we have what is basically an FAQ.  Previously on the Internetz somewhere, I saw a fun FAQ where two people answered every question and almost the most fun thing for me was comparing the answers of the two people to one another.  The difference in their answers was often humorous and entertaining in addition to answering the question.  The questions were also often ridiculous.  This seemed like a fun format, so I asked my friend, [Steve](http://rockycode.com/blog/author/steveo/) to answer a few questions with me, and we created the app.  Techs:

- [Jquery](http://jquery.com/)
- [Jquery Templates](http://api.jquery.com/category/plugins/templates/)
- [Sammy.js](http://code.quirkey.com/sammy/)
- [django-piston](https://bitbucket.org/jespern/django-piston/wiki/Home)
- [Django](http://www.djangoproject.com/)

On the backend, django-piston allows us to easily define handlers for the data that we want to expose through a RESTful API.  We define the urls to get to the handlers at, and boom!, we have json-flavored data being queried by Django, and displayed to requesters at the defined urls.

From here, we're very client heavy.  

Jquery Templates
--------------------

Jquery gives us an easy api to $.get() the data that we want.  We use Jquery Templates to do what Django templates may normally do for us:  Apply markup to our dynamic data.  With Jquery Templates, the server can send almost-raw data and the client, which seems to be a naturally fitting place for presentation transformation anyway, can now be fully in charge of what markup data should be displayed within.

Sammy.js
------------

We also used just a portion of Sammy.js, the routing feature, to take care of the controller logic.  I like the Sammy.js routing for the same reason that I like the Django urls.py routing: it's very imperative, which I feel is elegant:  "Here's my url pattern, and here's the logic that goes with that."

Why SOUIT
-------------

[SOUIT](http://souit.org/) = Service-oriented User Interface Technology.  Why would we want to create an app like this?  Doesn't Django have the ability to do this all for me -- url routing, templating?  It does.  But that doesn't mean that it wouldn't be more fitting to have this happen elsewhere, if only partially.  Since browsers are becoming beefier and more capable of handling client side transformations like templating and with tools like Jquery and Sammy that make request and response routing very clean, why not try it there?  Throw in the requirement of "asynchronous"ity, and you may just be happy you have the ability to do all this on the client.  And it's cool -- worth an additional 5 points.  Plus, now that our web client is essentially a single-page app with all the smarts it needs to function, we can consider different backend technologies too.  Hmmm, a database that exposes its data through mere REST APIs?  CouchDb, maybe?

What do you think?  This example 'ask' application is definitely not extremely compelling, but what are the best uses of this particular client-heavy technology stack that you can think of?


  
