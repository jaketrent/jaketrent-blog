---
layout: post
title: "XSD Validation in MarkLogic"
date: "2011-01-04"
comments: true
categories:
  - "Code"
tags:
  - "marklogic"
  - "xml"
  - "xquery"
  - "xsd"
description: Sometimes you want to ensure that your xml document matches a given schema (xsd).  Xquery on MarkLogic gives you a few tools to do this.  If you want to val
metaKeywords: marklogic, xml, xquery, xsd
draft: false
---

Sometimes you want to ensure that your xml document matches a given schema (xsd).  Xquery on MarkLogic gives you a few tools to do this.  If you want to validate your xml against an xsd, read on fair reader.

<!--more-->

First of all, you need an xsd schema to show the database what you expect your data to look like.  From the w3schools xsd example , [here's a sweet schema](http://www.w3schools.com/schema/schema_howto.asp):

```xml
<?xml version="1.0"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
	targetNamespace="http://www.w3schools.com"
	xmlns="http://www.w3schools.com"
	elementFormDefault="qualified">

	<xs:element name="note">
	  <xs:complexType>
		<xs:sequence>
		  <xs:element name="to" type="xs:string"/>
		  <xs:element name="from" type="xs:string"/>
		  <xs:element name="heading" type="xs:string"/>
		  <xs:element name="body" type="xs:string"/>
		</xs:sequence>
	  </xs:complexType>
	</xs:element>

	</xs:schema>
```

First, save the xsd in the Schemas database.  If you want to webdav in, connect to port 8902 and create a directory structure that matches the xsd target namespace:

```
http://  >  www.w3schools.com 
```
	
And drop your schema in there.

If you want to verify the location of your xsds, run a little cmd in CQ against the Schemas db:

```
fn:base-uri(/xs:schema)
	
```
Next, let's get us a document to validate (again, from w3schools' example):

```xml
<note>
  <to>April</to>
  <from>Jake</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
```
	
And finally to validate.  There are two modes, strict (default) and lax.  I've been using strict, because lax really is.  And a little more CQ action:

```
	import module namespace functx = "http://www.functx.com" at "/MarkLogic/functx/functx-1.0-nodoc-2007-01.xqy";
	let $document := 
		<note>
		  <to>April</to>
		  <from>Jake</from>
		  <heading>Reminder</heading>
		  <body>Don't forget me this weekend!</body>
		</note>
	let $doc-to-validate := functx:change-element-ns-deep( $document, "http://www.w3schools.com", "awesome" )
	return validate strict { $doc-to-validate }
```
	
To explain, we pull in our doc, we attach a namespace to it (since we didn't already specify one), and validate away.  If your doc fails validation against the schema, prepare to see the first error encountered.  In another experiment, I was getting beauties like these:

- validate strict { $doc-to-validate } -- Missing element declaration: Expected declaration for node ...
- validate strict { $doc-to-validate } -- Missing required attribute: Found () but required (@type & @uuid? ...
- validate strict { $doc-to-validate } -- Invalid node type: @type lexical value "asdf" invalid for expected type ...

Beauties, eh?

The one-at-a-time error reported stinketh a bit to me.  With a function whose job it is to provide a picture of how well (or not) a document matches a schema, I think it would be more fitting to provide a report (perhaps in beautiful xml) of what all the issues are that were found.  

Cheers!  And a happy new year filled with valid documents.

  
