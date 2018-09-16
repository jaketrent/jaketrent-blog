---
layout: post
title: "Facelets Template Includes and Params"
date: "2009-03-24"
comments: true
categories:
  - "Code"
tags:
  - "facelets"
  - "java"
  - "jsf"
description: Facelets is a great template framework that sits on top of JSF.  They have some fun template includes and parameters that you can pass into the included tem
metaKeywords: facelets, java, jsf
draft: false
---

Facelets is a great template framework that sits on top of JSF.  They have some fun template includes and parameters that you can pass into the included templates.  Here is an example with one gotcha pertaining to the parameter name.

<!--more-->

If I want to do an include and pass in some sort of parameter value, I could do this:

```xml
<ui:include src="inclusion.xhtml">
  <ui:param name="ilikebeans" value="true" />
</ui:include>
```


Thus, in the inclusion.xhtml file, I could reference #{ilikebeans}, and the value would be "true".

Parameters can also be included on child templates and then read on parent templates.  Here's an example:

Parent:

```xml
<ui:composition>
  <!-- ... -->
  <ul>
    <li class="#{tab eq 'info' ? 'selected' : ''}">Info tab</li>
  </ul>
</ui:composition>
```

Child:

```xml
<ui:composition template="parent.xhtml">
  <!-- ... -->
  <ui:param name="tab" value="info" />
</ui:composition>
```

Thus, the child template can have certain values that affect the parent.  As seen in the example, this could be useful for showing certain tabs in a list as selected when that particular page (the child) is shown.

One note on my findings for parameter names...  they cannot have hyphens (-) in the name!  Otherwise, the value does not come thru properly.  Beats me!

Have fun with Facelets!

  
