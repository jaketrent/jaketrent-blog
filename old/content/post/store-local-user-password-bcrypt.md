---
categories:
- "Code"
comments: true
date: 2017-04-03T19:59:24-06:00
description: "Be careful when you store a user password record locally.  Here's how to protect the password in node."
draft: false
image: "https://i.imgur.com/4f7B1QX.jpg"
layout: post
metaKeywords: "js, nodejs, massive, bcrypt, password hash"
tags:
- "js"
- "nodejs"
- "massive"
- "bcrypt"
title: "Store Local User Password with bcrypt in Node"
---

Be careful when you store a user password locally.  You can use bcrypt to make the password hash hard to break.  Here's a partial implementation in Node.

<!--more-->

Sometimes you might want to store a password with a local user record in your app.  You might do this if you didn't want to let Twitter, Facebook, or something other 3rd-party site take care of auth via OAuth or something like that (those are good options too).

## The User Record

First, we need a set of valid users.  With an SQL-ready database like Postgres, we can create a table in the database that will hold our valid userbase.  The migration script might look something like this:

```
begin;

create table auth_user (
  username varchar(255) primary key,
  password_hash varchar(255) not null,
  created date default now()
);

end;
```

Of course, you can add other fields as desired.  Side note: Don't try to create the table named `user` because Postgres already has one of those built in. :)

## Input Username and Password

Now to create a code abstraction to transfer data in and out of the database.  We'll make a module that can do a user `create` to insert a user into the database.

We'll use a light ORM here that I've come to like: [`massive`](https://github.com/dmfay/massive-js).  I'll leave the finer points of the ORM setup to the reader to implement based on the documentation.  For our purposes, it's enough to know that we have an ORM, and the intent of the code will still make sense.  For instance, `create` will perform an insert:

```js
function create(db, user) {
  return new Promise(async (resolve, reject) => {
    const record = await serialize(user)
    db.auth_user.insert(record, err => {
      if (err) return reject(err)

      resolve(user)
    })
  })
}
```

A few things to note:

- `create` returns a `Promise` to account for the async nature of database interactions
- We're using the `async/await` syntax for `Promise`s instead of `then` chaining.  The result is the same.
- `db` is an instance of the database (the ORM), which has a reference to the table we're `insert`ing into: `auth_user`.

And what about that `serialize` function?  Well...

## Serialize the Database Record

The user that we'll insert will have a `username` and `password` field.  But we don't want to store the `password` as plaintext in the database.  Therefore we need to let [`bcrypt`](https://github.com/kelektiv/node.bcrypt.js) create a hash of the password first.  

A hash of the original password text is a one-way operation, meaning that you cannot decrypt or rediscover the original value of the password by starting with the stored hash.  You must, yourself, know the original password *first*, and then another hash can be generated and then compared.  Thus storing this hash is much safer than storing plaintext passwords, which we should never do.  So, `serialize` might look like this:

```js
const bcrypt = require('bcrypt')

async function serialize(user) {
  const saltRounds = 10
  const hash = await bcrypt.hash(user.password, saltRounds)
  return {
    username: user.username,
    password_hash: hash
  }
}
```

- We're finally using `bcrypt`.  Make sure to `npm install --save bcrypt` first.
- `bcrypt.hash` is potentially long-running, so it's async.  
- `saltRounds` is a number that controls essentially how long and processor-intensive it is to recreate the hash.  I just took the `bcrypt` docs default value.  You can [be a lot more precise](https://security.stackexchange.com/questions/3959/recommended-of-iterations-when-using-pkbdf2-sha256/3993#3993) about it.
- This function returns an object that is usable by the ORM to insert as a record into the database `auth_user` table.

Now you have a user record in the database, password safely stored.

## Comparing Hashes

Of course, sometime you'll want to retrieve the user from the database and check to see if a user who is trying to log in is actually a valid user with a matching password in your system.  So you'll probably end up with a `find` function that returns a `user` object.  This user will have a `passwordHash`, and you'll be able to use another `bcrypt` function to recreate the hash:

```js
const bcrypt = require('bcrypt')
async function login(username, password) {
  // ..
  const user = await find(db, username)
  const matches = await bcrypt.compare(password, user.passwordHash)
  if (matches) {
    // .. login
  } else {
    // .. error
  }
}
```

Again, `bcrypt.compare` is async.  It takes the input `password` to check against the `user.passwordHash`, which we generated and stored previously.  If they match, you're golden.  If not, you've got an imposted.

We've made the round trip.  Bcrypt helps us keep the password safe.  How! could Success we make our implementation better?
