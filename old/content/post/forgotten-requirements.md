---
layout: post
title: "Forgotten Requirements"
date: "2010-09-03"
comments: true
categories:
  - "Code"
tags:
  - "project-management"
  - "requirements"
description: Recently, I had the opportunity to look at a set of user stories on an upcoming project and apply a high level estimate to each.  These estimates were going
metaKeywords: project-management, requirements
draft: false
---

Recently, I had the opportunity to look at a set of user stories on an upcoming project and apply a high level estimate to each.  These estimates were going to provide a starting point for determining project timeline and schedule.  Every time I'm presented with a request for estimation, I shiver a little because I'm so bad at it.  As I understand it, I'm not alone in this weakness.  I have found, however, that the more requirements that can be defined and the more detail that can be described for each, the more accurate a timeline can be established.

<!--more-->

The focus of requirements on every project is different.  This fact is influenced by many things: the type of project, the members of the team, the culture of the company, the maturity of your process, the number of specialists with eyes on your project (eg, think of the equivalent of a security Nazi in your organization), and so on.  This list is definitely not definitive or all-inclusive, but I'd call my favorite animal a liger before I'd bet that no half-awesome software type has forgotten to specify one of these requirements.  Just let your Internet-bored eyes glaze over those bullets that aren't applicable to your project.

In no particular order, try not to forget...

* Integration with authentication system

* Version control repository setup

* Test environment setups

* Hardware - requirements, setup, VIPs, clustering, load balancing

* Uptime / Service Level Agreement (SLA) - consider lowest SLA of integrated subsystem

* Bug-tracking system setup

* Local development environment setup

* Unit test environment and actual unit testing

* Integration and automated tests

* Test case-tracking environment

* Web framework selection and setup

* Coding standard

* Targeted environment/browser, screen resolutions, capabilities, required plugins, graceful degredation, and cross-browser testing

* Training for new platforms/environments

* 3rd-party library selection and integration

* Urls - exact paths required

* Errors - conditions, handling, messages, triggers

* Performance - response times, page sizes, http requests

* UI - corporate standards, validation, max lengths, empty views

* Timeouts - requirements/limitations of request, session, server

* Privacy - terms of agreement

* Data - backup, security

* Scalability - future growth model

* Deployment - method, schedule, automation

* Operations - support after launch

This list is born of my experience -- both triumphs and frustrations.  What are some of the requirements that you would either add or remove?

After listing all these potentially missed requirements/activities, I'm driven to also say that the best projects are the ones that meet the business need by delivering the simplest product for the least cash.  So, don't make it more complicated than requirements come to dictate.

  
