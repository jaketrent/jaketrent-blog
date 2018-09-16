---
layout: post
title: "JSF ValidationError with Custom Converters"
date: "2009-02-10"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "jsf"
description: Here's an important tidbit...  JSF does not give any default validators for your data if you use a custom converter.  If you're getting a ValidationError ex
metaKeywords: java, jsf
draft: false
---

Here's an important tidbit...  JSF does not give any default validators for your data if you use a custom converter.  If you're getting a ValidationError exception, overriding equals and hashcode methods might be a good idea.  For more, read on...

<!--more-->

Here was my code:

```jsp
<h:selectManyCheckbox id="recipients-grp"
   value="#{email.sendToRecipients}"
   converter="#{entityConverter}"
   layout="pageDirection">
   <f:selectItems id="recip" value="#{r:convertSelectItemList(emailBean.allRecipients)}"/>
</h:selectManyCheckbox>
```

I was seeing a lot of this:

```java
assignmentCreateForm:j_id47:0:recipients-grp: Validation Error: Value is not valid
```

It [turns out](http://www.crazysquirrel.com/computing/java/jsf/converter-validation-error.jspx) that when you're using a custom converter, which I am (entityConverter), there are no default validators provided by JSF.  

This means that you are required to prove to JSF that the objects that you're retrieving from the f:selectItems collection will fit into the h:selectManyCheckbox value you have specified.  In order to help JSF determine the compatibility, you must provide a meaningful hashcode and equals method for your `f:selectItems` object.

  
