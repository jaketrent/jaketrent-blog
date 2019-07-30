---
categories:
- "Code"
comments: true
date: 2017-08-02T07:41:26-06:00
description: "How to upsert in Knex.js."
draft: false
image: "https://i.imgur.com/OCe3DLH.jpg"
layout: post
metaKeywords: "upsert in knex, knexjs, on conflict set in knex, raw sql in knex"
tags:
- "knexjs"
- "nodejs"
- "sql"
title: "Upsert in Knex.js"
---

How to upsert in Knex.js.

<!--more-->

## Postgres Upsert

Upsert is a fantastic feature in SQL that works kind of like "insert a new row, and if it already exists, update it".

In [Postgres](https://www.postgresql.org/docs/9.5/static/sql-insert.html), the syntax is handled as:

```sql
INSERT INTO table_name 
(column_name) VALUES (expression) 
ON CONFLICT (conflict_target)
DO UPDATE SET column_name = expression;
```

There are quite a few keywords there, but I think it reads rather close to the English sentence above.

In a scenario where we're inserting new users where the primary key is `email`, we could write this sql:

```sql
INSERT INTO users
(email, name) VALUES (:email, :name) 
ON CONFLICT (email)
DO UPDATE SET users.name = :name;
```

## Knex.js Upsert

[Knex.js](http://knexjs.org/) is a handy SQL query builder, database connection manager, and ORM for Node.  You already know you're in trouble, right?

Without Knex, you'd write your own upsert command, and in this case, that might be easier because Knex doesn't support this `ON CONFLICT` clause out of the box.  Surprise! But you can write it with Knex APIs fairly easily.  

The example SQL above, written in code with Knex is something like:

```js
const util = require('util')
const knex = // app's db instance

async function createUser({ email, name }) {
  const insert = knex('users')
    .insert({ email, name })
    .toString()

  const update = knex('users')
    .update({ name })
    .whereRaw('users.email = ?', [email])
  const query = util.format(
    '%s ON CONFLICT (email) DO UPDATE SET %s',
    insert.toString(),
    update.toString().replace(/^update\s.*\sset\s/i, '')
  )

  await knex.raw(query)
}
```

It's cool how Knex can output the queries that are build using `toString()`.  Those queries are later used as raw sql in the call to `db.raw()`.

Note the use of `whereRaw` instead of just `where` in the update.  This is required to get the table alias on the column.  Otherwise just the `email` column name in the where clause will be ambiguous.

:boom: 'Ya done been upserted!

Is there another way that you've gotten Knex to do this?
