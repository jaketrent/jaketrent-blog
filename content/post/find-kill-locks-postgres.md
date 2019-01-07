---
categories:
  - "Code"
comments: true
description: "Find locks on Postgres tables and kill processes that locked them"
image: "https://i.imgur.com/1yeod88.jpg"
layout: post
metaKeywords: "postgres, lock, pg_locks, pg_stat_activity, query hangs"
draft: false
tags:
  - "postgres"
title: "Find and Kill Locks on Postgres Tables"
date: "2018-12-18"
---

Let's say that you do something silly like run a query that hangs and never returns -- or open a transaction but never commit it.  Stuff like this could cause a database table lock in Postgres.  You need to be able to find those locks, the processes that caused them, and shut them down.  

<!--more-->

## Detecting a lock

The first thing that might give you a clue that there's a lock on a table is that you can't do simple things that you usually can, like deleting a row from a table:

```sql
design_system=> delete from search_hit where id = 154193;
^CCancel request sent
ERROR:  canceling statement due to user request
CONTEXT:  while deleting tuple (22286,5) in relation "search_hit"
```

I recently ran the query above, and it just hung there, so I killed it and tried to find out what was causing it.

## Listing Locks

Postgres has a ton of great stat information in tables with metadata about how the Postgres system itself is operating.  One of those tables is `pg_locks`, where we can join with `pg_class` to be able to search by our table name.  So, with a table name like `search_hit`, I could query:

```sql
select pid 
from pg_locks l 
join pg_class t on l.relation = t.oid 
where t.relkind = 'r'
and t.relname = 'search_hit';
```

And get: 

```sql
  pid
-------
 11337
 16389
 16389
 11929
(4 rows)
```

And sure enough, I have a few pids, or process ids.  These are the things that have created the locks on that table.  I'm probably doing some of the silly stuff that I mentioned above.

## Matching Queries with Locks

I can even see the queries that have cause those locks if I take a look at the `pg_stat_activity` table, filtering by those pids:

```sql
select pid, state, usename, query, query_start 
from pg_stat_activity 
where pid in (
  select pid from pg_locks l 
  join pg_class t on l.relation = t.oid 
  and t.relkind = 'r' 
  where t.relname = 'search_hit'
);
```

And get something like this:

```txt
  pid  |        state        |      usename      |                                           query                                           |          query_start
-------+---------------------+-------------------+-------------------------------------------------------------------------------------------+-------------------------------
 16389 | idle in transaction | appuser           |                                                                                          +| 2018-12-12 16:30:32.933695+00
       |                     |                   |         select count(r.id) as repos_count                                                +|
       |                     |                   |         , count(case when r.time_search is null then 1 end) as repos_unsearched_count    +|
       |                     |                   |         , count(case when sh.contents is null then 1 end) as search_hit_no_contents_count+|
       |                     |                   |         , s.time_complete                                                                +|
       |                     |                   |         from search s                                                                    +|
       |                     |                   |         left join repo r on s.id = r.search_id                                           +|
       |                     |                   |         left join search_hit sh on s.id = sh.search_id                                   +|
       |                     |                   |         group by s.time_complete                                                         +|
       |                     |                   |         , s.time_start                                                                   +|
       |                     |                   |         order by s.time_start desc                                                       +|
       |                     |                   |         limit 1                                                                          +|
       |                     |                   |                                                                                           |
 11929 | active              | appuser           |                                                                                          +| 2018-12-12 16:30:31.11427+00
       |                     |                   |         update search                                                                    +|
       |                     |                   |         set time_complete = now()                                                        +|
       |                     |                   |         where id = $1                                                                    +|
       |                     |                   |                                                                                           |
 11337 | active              | appuser           |                                                                                          +| 2018-12-12 16:31:01.764946+00
       |                     |                   |         update search                                                                    +|
       |                     |                   |         set time_complete = now()                                                        +|
       |                     |                   |         where id = $1                                                                    +|
       |                     |                   |                                                                                           |
 13098 | active              |                   | autovacuum: VACUUM public.search_hit                                                      | 2018-12-12 18:32:36.714039+00
(4 rows)
```

Once I have a query, I can go back to my code, find the query, and resolve the problem permanently.

You might find out that your lock is created from a long-running query that you're just not patient enough to let finish (or practiced enough to make more performant).

But at this point there might a process that simply needs killed.

## Killing Locks

There are a few ways to kill these processes that are causing the locks.  If you're running a query in an interactive mode, simply stop the query with a user cancellation (eg, using `ctrl-c` from the psql cli).

For those peskier processes, we'll use the pids we found from the earlier queries:

```sql
design_system=> SELECT pg_cancel_backend(11929);
 pg_cancel_backend
-------------------
 t
(1 row)
```

This feedback, unfortunately neither accurately indicates success or failure.  Instead, you'll likely have to run previous queries in order to determine if the process is still active.

That was the nice way to ask (ie, `pg_cancel_backend`).  The more forceful method is:

```
design_system=> SELECT pg_terminate_backend(11929);
 pg_terminate_backend
----------------------
 t
(1 row)
```

## Verify Locks Removed

Once you've canceled or terminated locks that existed, you should be able to query `pg_locks` and join with `pg_class` and create a filter for pids in `pg_stat_activity` as shown above in order to re-verify that the locks are gone.

And now that simple thing that I wanted to get done:

```sql
design_system=> delete from search_hit where id = 154193;
DELETE 1
```

Will actually work.  Your locks will live in fear of your power forevermore.
