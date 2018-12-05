---
categories:
  - "Code"
comments: true
description: "Keep test data and results isolated in jest integration tests"
image: "https://i.imgur.com/Zvip3zy.jpg"
layout: post
metaKeywords: "jest, integration test, separate data for integration tests, shared database, clear database"
draft: false
tags:
  - "jest"
  - "testing"
title: "Isolate Jest Integration Tests in a Shared Database"
date: "2018-11-30"
---

When writing integration tests that use a persistent data store, it's important to isolate the tests as much as possible to provide stability in test results.

<!--more-->

Unit tests are easy to isolate: the test boundary is a function, we call it with arguments and assert the output.  Integration tests are more challenging to isolate.  In this case, the challenge is the shared database: create setup data in the database, run code that interacts with the database, then assert output.

To isolate, one might write data that is uniquely-identifiable to the test (eg, with queryable unique ids).  

What does this kind of test look like for [Jest](https://jestjs.io/)?  Let's say that we have a test for a bit of code that's meant to create a Book model record in the database:

```js
import * as uuid from 'uuid'

import * as bookRepo from './book'
import * as database from './database'

it('creates a book', async () => {
  const db = await database.connect()
  const title = uuid.v4()

  await bookRepo.create(db, title, 'An author name')

  const result = await db.query('select * from book where title = $1', [title])
  expect(result.rowCount).toEqual(1)
  expect(result.rows[0].title).toEqual(title)
  expect(result.rows[0].author).toEqual('An author name')
  database.disconnect()
})
```

By generating the title with a unique value, we can tie that data in the database back to this test successfully.  We just need to make sure to query by that unique data when we go to assert what's in the database.

Another method of isolation that can be useful is to ensure that the database is clean for every run of a test.  In this way, we know that data in the database is for the test and assertions can be more straightforward:

```js
import * as bookRepo from './book'
import * as database from './database'

it('creates a book', async () => {
  const db = await database.connect()
  await db.query('delete from book')

  await bookRepo.create(db, 'A title', 'An author name')

  const result = await db.query('select * from book')
  expect(result.rowCount).toEqual(1)
  expect(result.rows[0].title).toEqual('A title')
  expect(result.rows[0].author).toEqual('An author name')
  database.disconnect()
})
```

The important steps are:

- The setup - we delete all book records before our test runs so that we know that we're starting with a baseline of 0 books
- Exercising the code - we run the subject under test, as usual
- Assertion - we can easily test that there's one book in total, because that's what our code should create, and we started with 0 books

We used the same test of book insertion to show a comparison, but it's really too trivial of an example to show the advantages to to using this method.  Imagine, instead, that you were querying a 3rd-party service over which you didn't have direct knowledge of your input data but where you could make assertions on the number of rows, recency of timestamp or something like that.  Knowing all data in the database is related to the current test only could help.

This method, however, comes with a clear downside. Let's imagine that we had many tests where we follow this same pattern: clear db, run tests, assert what's in the db.  Most test runners will run tests in parallel.  This means that there are some tests that have cleared the database and others that have written to it, all asserting different things.  It's easy to see how the different tests will clobber each others' pristine environment and create unstable test results.

One solution is to run the tests serially, one at a time, so that the tests can use the shared environment one at a time before letting the test suite advance to the next test.  Jest provides an option to accomplish this, [--runInBand](https://jestjs.io/docs/en/cli#runinband):

```
jest --runInBand
```

And we can avoid that problem.  Of course, this has the downside of increasing the running time for your integration test suite.

There are likely other ways to make sure that we can isolate our tests where we use a shared database.  What methods have you found effective?

