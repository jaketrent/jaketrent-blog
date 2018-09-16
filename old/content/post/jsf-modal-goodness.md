---
layout: post
title: "JSF Modal Goodness"
date: "2008-11-30"
comments: true
categories:
  - "Code"
tags:
  - "hibernate"
  - "jquery"
  - "jsf"
  - "seam"
  - "spring"
description: Meet the new web.  The simpler the better. The cleaner the better.  The more pleasing the colors the better.  The fuzzier feelings the better.  The latest f
metaKeywords: hibernate, jquery, jsf, seam, spring
draft: false
---

Meet the new web.  The simpler the better. The cleaner the better.  The more pleasing the colors the better.  The fuzzier feelings the better.  The latest fuzzies have been brought on by a slew of modals.  Previously, we haven't used many modals in our layouts and designs, so here's the first working pattern on how to get this kind of stuff working.  

This solution allows content to appear in a modal, validation errors to post back to the modal, edits made in a modal to persist back to the database, and success messages to appear on parent page.

<!--more-->

Meet the new web.  The simpler the better. The cleaner the better.  The more pleasing the colors the better.  The fuzzier feelings the better.  The latest fuzzies have been brought on by a slew of modals.  Previously, we haven't used many modals in our layouts and designs, so here's the first working pattern on how to get this kind of stuff working.  

This solution allows:
<ul>
<li>Content to appear in a modal</li>
<li>Validation errors post back to the modal</li>
<li>Edits made in a modal persist back to the database</li>
<li>Success messages appear on parent page</li>
</ul>

Example uses these technologies:
<ul>
<li>JSF/Facelets</li> 
<li>Spring 2.5</li> 
<li>JPA/Hibernate</li> 
<li>Hibernate validators</li> 
<li>Seam</li> 
<li>JQuery</li> 
</ul>

This includes these pieces:
<ul>
<li>Parent JSF</li> 
<li>JQuery for Modal - using <a href="">jQuery</a> and <a href="">jqModal</a></li> 
<li>Modal JSF</li> 
<li>Seam pages.xml for navigation</li> 
<li>View bean</li> 
<li>Model object</li> 
</ul>

Overall, the flow occurs as follows:
<ul>
<li>Nav to parent page</li> 
<li>Trigger modal with link</li> 
<li>Modal appears </li> 
<li>Content is loaded in modal</li> 
<li>Submissions occur via AJAX to the view bean</li> 
<li>View bean logic and Seam determine outcome</li> 
<li>If errors, AJAX re-renders in modal</li> 
<li>If save successful, parent page is re-rendered with message</li> 
</ul>

<br />
<h2>The Parent Page (person-info-personal.xhtml)</h2>

<h3>Javascript for Modal:</h3>
```javascript
<script type="text/javascript" src="#{request.contextPath}/scripts/jquery.pack.js"></script>
<script type="text/javascript" src="#{request.contextPath}/scripts/jqModal.pack.js"></script>
<script type="text/javascript">
    jQuery(document).ready(function() {
        jQuery('#modal-edit-personal').jqm({
            ajax: '#{request.contextPath}/person-info-personal-edit.jsf?personId=#{personDetailsBean.person.id}&amp;conversationId=#{conversation.id}&amp;time=#{personDetailsBean.currentMillis}',
            trigger: '#btn-edit-personal',
            modal: true
        });
    })
</script>
```

<strong>Note:</strong>
<ul>
<li>The Seam conversation object is just available.  No convenience method required to retrieve it.</li>
<li>Additional url parameter required to get around an IE caching issue.  We just need a unique value so that the AJAX request isn't assumed cached by IE.  In this case, I used the current time in milliseconds (Method on view bean).</li>
</ul>

<h3>Trigger for Modal:</h3>
```jsp
<a id="btn-edit-personal" class="edit-link-icon edit-link float-right" href="#">Edit</a>
```

<h3>Modal Container:</h3>
```jsp
<div id="modal-edit-personal" class="jqmWindow smallWindow"></div>
```
<strong>Note:</strong>
- Just include this right before the end of the html body.  

<h3>Style for Modal</h3>
```css
.smallWindow {components.css (line 105)
  margin-left:-250px;
  top:15%; 
  width:500px;
}
.jqmWindow {components.css (line 84)
  background-color:#FFFFFF;
  border:5px solid #DDDDD3;
  color:#333333;
  display:none;
  left:50%;
  margin-left:-375px;
  padding:5px;
  position:fixed;
  top:8%;
  width:750px;
  z-index:3000 !important;
}
```

<h3>Success Validation Message</h3>
```jsp
<h:panelGroup rendered="#{param['saveSuccess'] ne null}">
    <div id="edit-success" class="alert" style="display: block;">
        <p>Success: Changes saved for #{personDetailsBean.person.name.fullName}.</p>
    </div>
</h:panelGroup>
```
<strong>Note:</strong>
<ul>
<li>The parameter to determine ability to render is just a param[].  It's not bound to the bean, which means it disappears on subsequent requests, which is what we want.</li>
</ul>

<h2>Seam Navigation</h2>

<h3>pages.xml Entry for modal:</h3>
```xml
<page view-id="/person-info-personal-edit.xhtml">
    <begin-conversation join="true" flush-mode="MANUAL"></begin-conversation>
    <param name="personId" value="#{personDetailsBean.personId}"></param>
    <action execute="#{personDetailsBean.loadPerson}" if="#{personDetailsBean.person eq null}"></action>
    <navigation>
        <rule if-outcome="saved-person-edit">
            <redirect view-id="/person-info-personal.xhtml">
                <param name="personId" value="#{param['personId'] != null ? param['personId'] : personId}"></param>
                <param name="saveSuccess" value="true"></param>
            </redirect>
        </rule>
    </navigation>
</page>
```
<h3>pages.xml Entry for parent:</h3>
```xml
<page view-id="/person-info-personal.xhtml">
	<begin-conversation join="true" flush-mode="MANUAL"></begin-conversation>
	<param name="personId" value="#{personDetailsBean.personId}"></param>
	<action execute="#{personDetailsBean.loadPerson}" if="#{personDetailsBean.person eq null}"></action>
	<!-- ... -->
</page>
```
<strong>Note:</strong>
<ul>
<li>The "saveSuccess" parameter is the key to showing the success message on the parent page.</li>
</ul>

<h2>The Modal Page (person-info-personal-edit.xhtml)</h2>

<h3>Modal Markup:</h3>
```jsp
<a4j:form id="info-edit-form" ajaxSubmit="true" reRender="alerts">

    <a4j:outputPanel id="alerts">
        <ldsp:alerts />
    </a4j:outputPanel>

    <div class="target">
        <h2>Edit Personal Information</h2>

        <p>Please make the necessary changes and press "Save" when finished.</p>

        <div id="notes">
            <dl>
                <dt>Official Name</dt>
                <dd>
                    #{personDetailsBean.person.name.fullName}
                </dd>
            </dl>
            <dl class="short-inputs">
                <dt>Preferred Name</dt>
                <dd>
                    <h:inputText styleClass="input-text pref-name-field" value="#{personDetailsBean.person.preferredFirstName}" required="true" requiredMessage="Preferred first name required." />
                </dd>
                <dd>
                    <h:inputText styleClass="input-text pref-name-field" value="#{personDetailsBean.person.preferredMiddleName}" required="true" requiredMessage="Preferred first name required." />
                </dd>
                <dd>
                    <h:inputText styleClass="input-text pref-name-field" value="#{personDetailsBean.person.preferredLastName}" required="true" requiredMessage="Preferred first name required." />
                </dd>
            </dl>
            <dl>
                <dt>Blood Type</dt>
                <dd>
                    <h:selectOneMenu value="#{personDetailsBean.person.bloodType}">
                        <f:selectItem value="#{null}" itemLabel="None given" />
                        <f:selectItems value="#{personDetailsBean.bloodTypesList}" />
                    </h:selectOneMenu>
                </dd>
            </dl>

            <!--[if IE 6]>
            <dl>
            <dt>&nbsp;</dt>
            <dd>&nbsp;</dd>
            </dl><![endif]-->

            <p class="buttons">
                <h:commandButton action="#{personDetailsBean.savePerson}" value="Save" styleClass="button-default" />
                <input type="button" class="button-nondefault jqmClose" value="Cancel" />
            </p>
        </div>
    </div>
</a4j:form>
```

<strong>Note:</strong>
<ul>
<li>&lt;ldsp:alerts /&gt; - custom component to display Alerts.</li>
<li>The ajaxSubmit attribute on the a4j:form must use a capital S for 'Submit'.  (My code renderer on this page is lowercasing that for some reason.)  Same with the 'r' on 'reRender'.</li>

<h2>Server-side Logic</h2>

<h3>Java Model:</h3>
```java
@Entity
public class Person implements Serializable {
    @Column(name = "PREF_FIRST")
    private String preferredFirstName;

    @Column(name = "PREF_MIDDLE")
    private String preferredMiddleName;

    @Column(name = "PREF_LAST")
    private String preferredLastName;

    @Column(name = "BLOOD_TYPE")
    private String bloodType;

    /** ... */
}
```

<h3>View Bean:</h3>
```java
@Controller
@Scope("conversation")
@SuppressWarnings("serial")
public class PersonDetailsBean implements Serializable {
   public String savePerson() {
       String retval = null;
       try {
            personDetailsService.modifiyPerson(getPerson()); // saves missionary
            retval = "saved-person-edit"; 
       } catch (OptimisticLockException e) {
            Alert.addErrorAlert("Optimistic Lock: The object was modified out from under you.");
       }
       return retval;
   }
   // Method to circumvent IE caching issue
   public long getCurrentMillis() {
       return new Date().getTime();
   }
   /* ... */
}
```


  
