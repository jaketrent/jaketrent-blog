---
layout: post
title: "Count number of characters w/ SQL"
date: "2009-04-30"
comments: true
categories:
  - "Code"
tags:
  - "oracle"
  - "sql"
description: There's no pre-defined method to count the number of occurrences of a certain character in a database table column using SQL.  There's a quick and dirty way
metaKeywords: oracle, sql
draft: false
---

There's no pre-defined method to count the number of occurrences of a certain character in a database table column using SQL.  There's a quick and dirty way to get it done however.  In my case, I wanted to figure out how many lines existed in a column that held address information, separated by line breaks.  Here's a spot of code that helped from the friendly neighborhood DBA, Reed.

<!--more-->

```sql
select addresstxt
,      length(addresstxt)
,      length (replace(addresstxt,chr(13),''))
,      length(addresstxt) - length (replace(addresstxt,chr(13),'')) 
from   contact_info 
where  length(addresstxt) - length (replace(addresstxt,chr(13),'')) > 4
```

I was actually looking for addresses that were over 4 lines long, hence the where clause.  The chr() function gets the character represented by the given ascii code.  13 is new line.  10 is line feed.  You may want to use one or the other depending on your data.

  
