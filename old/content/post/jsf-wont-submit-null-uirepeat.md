---
layout: post
title: "JSF Won't Submit Null in ui:repeat"
date: "2008-12-11"
comments: true
categories:
  - "Code"
tags:
  - "facelets"
  - "jsf"
description: It stinks when your jsf components don't do what they're supposed to or even what they usually do.    This was the case with my h:inputText field when tryin
metaKeywords: facelets, jsf
draft: false
---

It stinks when your jsf components don't do what they're supposed to or even what they usually do.    This was the case with my h:inputText field when trying to submit a null value -- but!  only within a ui:repeat component.

<!--more-->

It stinks when your jsf components don't do what they're supposed to or even what they usually do.    This was the case with my h:inputText field when trying to submit a null value -- but!  only within a ui:repeat component.

So, the problem was that I could submit values like clockwork from a h:inputText field.  But, once I submitted a value, I could not submit a blank h:inputText to null out the value.  The old value would keep coming back.  

The solution is one of those "I don't know why this worked, but it fixed my problem" solutions.  If anyone has further light and knowledge to shed, that would be appreciated.  Once the h:inputText was removed from inside the ui:repeat that it was wrapped in, it worked like a charm.  So, still needing the repeat, I used a tomahawk dataList.  Were it available to me, I would have preferred an a4j:repeat, because I hear that t:dataList has problems of its own.

  
