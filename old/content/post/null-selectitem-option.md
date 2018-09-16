---
layout: post
title: "Null SelectItem Option"
date: "2008-11-24"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "jsf"
description: Sometimes it's desirable to be able to have a null or "none of these" option for a dropdown.  I've gotten tripped up on the syntax a couple times and have f
metaKeywords: java, jsf
draft: false
---

Sometimes it's desirable to be able to have a null or "none of these" option for a dropdown.  I've gotten tripped up on the syntax a couple times and have found enough variance in "solutions" listed on forums that I'll just add to the mix and record what works well for me here.

<!--more-->

Sometimes it's desirable to be able to have a null or "none of these" option for a dropdown.  I've gotten tripped up on the syntax a couple times and have found enough variance in "solutions" listed on forums that I'll just add to the mix and record what works well for me here.

The code:

```jsp
<h:selectOneMenu value="#{missionaryDetailsBean.missionary.bloodType}">
   <f:selectItem value="#{null}" />
   <f:selectItems value="#{missionaryDetailsBean.bloodTypesList}" />
 </h:selectOneMenu>
```

Alternatively, you can put some text in to describe the extra option:

```jsp
<f:selectItem value="#{null}" itemLabel="Choose one..." />
```

  
