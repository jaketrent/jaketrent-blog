---
layout: post
title: "These Aren't the Tables You're Looking For"
date: "2008-10-14"
comments: true
categories:
  - "Code"
tags:
  - "oracle"
  - "sql"
description: Sometimes you have a large database schema and a lot of tables that you're not sure what they contain.  You do know, however, the nature of the data'ific ne
metaKeywords: oracle, sql
draft: false
---

Sometimes you have a large database schema and a lot of tables that you're not sure what they contain.  You do know, however, the nature of the data'ific needle that you're trying to find in your schema'ific schema.  Oracle provides some cool dictionary tables that might help you in your quest.

<!--more-->

Sometimes you have a large database schema and a lot of tables that you're not sure what they contain.  You do know, however, the nature of the data'ific needle that you're trying to find in your schema'ific schema.  Oracle provides some cool dictionary tables that might help you in your quest.

Try to find what you're looking for by table name: 

```sql
select *
from   dba_tab_cols
where  owner = 'SCHEMA_NAME'
and    table_name like '%SWEET%';
```

Try to find what you're looking for by column name:

```sql
select *
from   dba_tab_cols
where  owner = 'SCHEMA_NAME'
and    column_name like '%COOLNESS%';
```

  
