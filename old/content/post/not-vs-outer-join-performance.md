---
layout: post
title: "Not in vs. Outer join Performance"
date: "2009-09-17"
comments: true
categories:
  - "Code"
tags:
  - "oracle"
  - "performance"
  - "sql"
description: I was running an SQL query today and it was sooooo slow.  So slow, in fact, that it never returned.  I asked the DBA, Reed, who built the table what might b
metaKeywords: oracle, performance, sql
draft: false
---

I was running an SQL query today and it was sooooo slow.  So slow, in fact, that it never returned.  I asked the DBA, Reed, who built the table what might be up, and he informed me that it was not indexed.  And proceeded to show me some cool stuff I could do to actually get my query to return.  In the end, it was a comparison between the "not in" operator and a "left join".

<!--more-->

My original query was thus, names changed to protect the innocent:

```sql
select count(*)
from   temp_legacy_attachments i
where  i.person_id not in (
  select m.legacy_person_id
  from   new_attachment a
  ,      person p
  where  a.person_id = p.id);
```

I was trying to query the temp_legacy_attachments to get all rows that didn't have a record in the new_attachments table.  It never returned, and so Reed told me to give this one a try:

```sql
select count(*)
from   temp_legacy_attachments i
left join (
  select m.legacy_person_id
  from   new_attachment a
  ,      person p
  where  a.person_id = p.id) ea on ea.legacy_person_id = i.person_id
where ea.legacy_person_id is null ;
```

So, instead of using "not in" a set, I select all the legacy rows, then outer join to the new_attachment rows and filter where a column on the new attachment set is null (it's the smaller/less-available set).

I thought it was pretty sweet.  No magic bullet, though, as Reed tells me that there is a fair amount of debate over the performance difference between the two methods.  You just have to try it and find out.  For me, in this case, the outer join was more awesome.

### Update

Another savvy DBA, Bill, has graced us with another method yet:

```sql
select sum(cnt)
from (
  select p.legacy_person_id
  ,      count(*) cnt
  from   person p
  join   temp_legacy_attachments i on i.person_id = p.legacy_person_id
  where  not exists
    (select null
    from   new_attachments a
    where  a.person_id = p.id
    and    a.created_by = 'LEGACY_MIGRATION')
  group by p.legacy_person_id)
```
  
