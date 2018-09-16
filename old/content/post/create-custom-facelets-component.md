---
layout: post
title: "Create Custom Facelets Component"
date: "2009-02-20"
comments: true
categories:
  - "Code"
tags:
  - "facelets"
  - "java"
  - "jsf"
description: Facelets is a great addition to jsf.  It is very extensible, and it makes creating custom components even easier.  It's fantastic.  This is almost TOO easy.
metaKeywords: facelets, java, jsf
draft: false
---

Facelets is a great addition to jsf.  It is very extensible, and it makes creating custom components even easier.  It's fantastic.  This is almost TOO easy.  If you have a pile of view markup and/or client-side logic, then this is a good option.  And by good, I mean awesome.

<!--more-->

In memory of a good [sandwich post](http://bentanner.blogspot.com/2009/02/lets-talk-about-sandwiches-baby.html), I present this to you al la phases.


#### 1. Create stub source file

This custom component is to wrap together a many-to-many picker than I made <a href="http://aprilandjake.com/content/manytomany-relationships-jsf/">earlier</a>.

```jsp
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
    xml:lang="en" lang="en">

  <ui:component>
    <!-- everything here will be in the component -->
  </ui:component>

</html>
```

#### 2. Create Taglib

```xml
<?xml version="1.0"?>
<!DOCTYPE facelet-taglib PUBLIC
    "-//Sun Microsystems, Inc.//DTD Facelet Taglib 1.0//EN"
    "http://java.sun.com/dtd/facelet-taglib_1_0.dtd">
<facelet-taglib>
    <namespace>http://www.lds.org/records</namespace>
    <tag>
        <tag-name>largeManyToManyPicker</tag-name>
        <source>components/large-many-to-many-picker.xhtml</source>
    </tag>
</facelet-taglib>
```

#### 3. Implement the component

```jsp
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
    xmlns:ui="http://java.sun.com/jsf/facelets"
    xmlns:h="http://java.sun.com/jsf/html"
    xmlns:f="http://java.sun.com/jsf/core"
    xmlns:r="http://www.jtsnake.com/reallycool"
    xml:lang="en" lang="en">

  <ui:component>
    <style type="text/css">
          .selected-list a {
              display: block;
          }
      </style>
  
    <h:selectOneMenu id="list-choice" converter="#{entityConverter}">
      <f:selectItems value="#{r:convertSelectItemList(allChoices)}"/>
    </h:selectOneMenu>
    <a class="add-link-icon add-btn" href="#" style="text-decoration:none;" title="Add">&#160;</a>
    <br/>
    <h:selectManyListbox id="many-list" value="#{selectedChoices}"
               converter="#{entityConverter}" style="display:none;" required="#{requireSelection}"
               requiredMessage="#{requiredSelectionMsg}">
      <f:selectItems value="#{r:convertSelectItemList(allChoices)}"/>
    </h:selectManyListbox>
  
    <div class="selected-list">
      <ui:repeat var="choose" value="#{selectedChoices}">
        <a id="cit_#{r:getEntityConverterString(choose)}" class="delete-link-icon"
           href="javascript:removeSelection('#{r:getEntityConverterString(choose)}');">#{choose.label}</a>
      </ui:repeat>
    </div>
  
    <script src="#{request.contextPath}/scripts/jquery.selectboxes.js" type="text/javascript" charset="utf-8"></script>
  
    <script type="text/javascript">
      jQuery(document).ready(initLrgManyPicker);
  
      function initLrgManyPicker() {
        jQuery(".add-btn").click(function() {
          jQuery("[@id=#{idPrefix}:list-choice]").copyOptions("[@id=#{idPrefix}:many-list]");
          jQuery(".selected-list").append(addSelection());
        });
      }
  
      function addSelection() {
        var val = jQuery("[@id=#{idPrefix}:list-choice]").selectedValues();
        var label = jQuery("[@id=#{idPrefix}:list-choice]").children("[@selected]").text();
        return "&lt;a id=\"cit_" + val + "\" class=\"delete-link-icon\" href=\"javascript:removeSelection('" + val + "');\"&gt;" + label + "&lt;/a&gt;";
      }
  
      function removeSelection(poldiv) {
        jQuery("[@id=cit_" + poldiv + "]").remove();
        jQuery("[@id=#{idPrefix}:many-list]").deselectOptions(poldiv);
      }
    </script>
  </ui:component>
</html>
```

#### 4. Use the tag

```jsp
<!-- ... --->
<dl>
  <dt>Recipients</dt>
  <dd>
    <r:largeManyToManyPicker allChoices="#{bean.emailBean.allRecipients}"
                 selectedChoices="#{email.sendToRecipients}"
                 requiredSelection="false"
                 idPrefix="form:emailrepeat:0" />
  </dd>
</dl>
<!-- ... --->
```

We're throwing in page-level scripts and styles.  We're also linking to one external javascript.  That external file must be available at the stated location.  There's nothing special to ensure that this dependency is loaded otherwise.

  
