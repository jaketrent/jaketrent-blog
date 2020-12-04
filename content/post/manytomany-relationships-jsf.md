---
layout: post
title: "ManyToMany Relationships in JSF"
date: "2008-09-22"
comments: true
categories:
  - "Code"
tags:
  - "java"
  - "js"
  - "jquery"
  - "jsf"
description: What a journey of discovery!  I haven't done much many-to-many relationship management in JSF.  Django makes it quite easy.  But at work recently, I did it 
metaKeywords: java, javascript, jquery, jsf
draft: false
---

What a journey of discovery!  I haven't done much many-to-many relationship management in JSF.  Django makes it quite easy.  But at work recently, I did it in JSF.  It was quite the experience, hereafter chronicled.

<!--more-->

What a journey of discovery!  I haven't done much many-to-many relationship management in JSF.  Django makes it quite easy.  But at work recently, I did it in JSF.  It was quite the experience, hereafter chronicled.

To the unseen challenges of this task, I was caught unawares.  Who would have thought that a select-many gui component would be so bothersome?  But, now that the first in JSF has been done, the rest will be more straightforward...

My task was to maintain a person<->citizenship many-to-many relationship.  After a couple funny exchanges with our designers over multiple dropdowns (selectOneMenu's), hehe, the design was switched to one dropdown, one select multiple list (hidden), and a list of (nicer-looking) text to represent the selection.

<a href="https://picasaweb.google.com/lh/photo/N707BgyvgcUm1uxzGq1G1w"><img src="https://lh6.ggpht.com/trent.jake/SNf6P_v3CRI/AAAAAAAAENk/TPIYGn4KCpA/s800/selectmany.png" /></a>

Without going into too much detail on the pitfalls that I found myself stumbling into, I'll give the final solution (for me) here:

<h3>The JSF:</h3>

```jsp
<dl>
  <dt>Citizenship</dt>
  <dd>
      <h:selectOneMenu styleClass="citz-choice" converter="#{entityConverter}">
          <f:selectItems value="#{r:convertSelectItemList(personDetailsBean.countries)}" />
      </h:selectOneMenu>
      <a class="add-link-icon add-citz-btn" href="#" style="text-decoration:none;">&#160;</a>
      <br />
      <h:selectManyListbox styleClass="citz-list" value="#{personDetailsBean.person.personCitizenshipList}"
          converter="#{entityConverter}" style="display:none;" >
          <f:selectItems value="#{r:convertSelectItemList(personDetailsBean.countries)}" />
      </h:selectManyListbox>
      <div class="citzs">
          <ui:repeat var="citz" value="#{personDetailsBean.person.personCitizenshipList}">
              <a id="cit_#{citz.entityConverterString}" class="delete-link-icon" href="javascript:removeCitz('#{citz.entityConverterString}');">#{citz.longName}</a>
          </ui:repeat>
      </div>
  </dd>
</dl>
```

<strong>Things to note:</strong>
<ul>
<li>The comprehensive country list is in both the selectOneMenu and the selectManyListbox.  I made a big mistake in trying to copy options from the selectOneMenu on an html menu, with just having select items in the selectManyListbox specific to the person like so:
```jsp
<f:selectItems value="#{r:convertSelectItemList(personDetailsBean.person.personCitizenshipList)}" />
```
, but that did not work!</li>
<li>r:convertSelectItemList is a custom JSF method for converting pojo's into SelectItem object lists.  The important thing is that this f:selectItems component is fed with a collection of SelectItem's.</li>
<li>I'm not showing the selectManyListbox.  It could be that you want to and could thus cut out the whole "nice" display in &lt;div class="citzs"&gt;.</li>
<li>#{entityConverter} is specific to our development shop.  The most important thing is that the mechanism that renders the select items must render the values the same in the selectOneMenu and the selectManyListBox.</li>
</ul>

<h3>The Javascript:</h3>
```javascript
jQuery(document).ready(function() {
  jQuery(".add-citz-btn").click(function() {
      jQuery(".citz-choice").copyOptions(".citz-list");
      jQuery(".citzs").append(genCountrySelection());
  });
});

function genCountrySelection() {
    var val = jQuery(".citz-choice").selectedValues();
    var label = jQuery(".citz-choice").children("[@selected]").text();
    return "&lt;a id=\"cit_" + val + "\" class=\"delete-link-icon\" href=\"javascript:removeCitz('" + val + "');\"&gt;" + label + "&lt;/a&gt;";
}

function removeCitz(poldiv) {
    jQuery("[@id=cit_" + poldiv + "]").remove();
    jQuery(".citz-list").deselectOptions(poldiv);
}
});
```

<strong>Things to note:</strong>
<ul>
<li>I used <a href="https://jquery.com/">jquery</a> and the <a href="https://www.texotela.co.uk/code/jquery/select/">jquery.selectboxes.js</a> plugin.  I added the deselectOptions() function to the .js file (shown below).</li>
<li>I used a <a href="https://aprilandjake.com/tech/article/12">jsf-safe id selector</a>.</li>
</ul>

<h3>deselectOptions() Function Addition:</h3>
```javascript
/**
 * Deselect given value(s)
 * @author jtsnake, based on selectValues() above
 */
$.fn.deselectOptions = function(value)
{
	var v = value;
	var vT = typeof(value);
	// has to be a string or regular expression (object in IE, function in Firefox)
	if(vT != "string" && vT != "function" && vT != "object") return this;
	this.each(
		function()
		{
			if(this.nodeName.toLowerCase() != "select") return this;
			// get options
			var o = this.options;
			// get number of options
			var oL = o.length;
			for(var i = 0; i < oL; i++)
			{
				if(v.constructor == RegExp)
				{
					if(o[i].value.match(v))
					{
						o[i].selected = false;
					}
				}
				else
				{
					if(o[i].value == v)
					{
						o[i].selected = false;
					}
				}
			}
		}
	);
	return this;
};
```

<h3>Java Models:</h3>
```java

// Person.java
/* ... */
@ManyToMany
@JoinTable(name="person_citizenship",
           joinColumns=@JoinColumn(name="person_id"),
           inverseJoinColumns=@JoinColumn(name="country_id"))
private List < PoliticalDivision > personCitizenshipList;
/* ... */

// PoliticalDivision.java
/* ... */
public String getEntityConverterString() {
    return this.toString().split("@")[0] + ":" + id;
}
/* ... */

```

<strong>Things to note:</strong>
<ul>
<li>"The stack" is a set of technologies specific to our development shop.  You probably won't have to handle this stuff in your implementation.  The thing to remember is that the values in the selectOneMenu must match those in the selectManyListBox.  This is a facilitator of that in our environment.</li>
</ul>

As with any solution to a problem, there are likely many other options.  I would be very interested to see what other people have come up with!  Please post links if you have them.



  
