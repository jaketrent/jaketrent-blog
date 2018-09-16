---
layout: post
title: "Show Full SQL Developer Timestamp"
date: "2009-04-08"
comments: true
categories:
  - "Code"
tags:
  - "sql"
  - "sql-developer"
description: In Oracle's SQL Developer 1.5 tool, there seems to be a crazy bug where one can't see the full timestamp value (including time) by default.  You can change 
metaKeywords: sql, sql-developer
draft: false
---

In Oracle's SQL Developer 1.5 tool, there seems to be a crazy bug where one can't see the full timestamp value (including time) by default.  You can change this by running this awesome piece of code...

<!--more-->

```sql
alter session set nls_date_format = 'MM/DD/YYYY HH24:MI:SS';
```


  
