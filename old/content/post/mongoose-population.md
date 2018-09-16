---
layout: post
title: "Mongoose Population"
date: "2013-06-18"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "mongo"
  - "mongoose"
  - "nodejs"
description: Mongoose is an object modeler for MongoDb in Node.js.  It has a great feature, population, for including references to other Mongoose models.
metaKeywords: nodejs, js, javascript, mongo, mongodb, mongoose, join, include objects
draft: false
image: https://i.imgur.com/pezEyw7.jpg
---

[Mongoose](http://mongoosejs.com) is an object modeler for [MongoDb](http://mongodb.org).  It has a particularly great feature, called [population](http://mongoosejs.com/docs/populate.html).  Population allows you to include other objects in a specified object.  It makes the process a lot easier and more automatic.

<!--more-->

## Document Design

Document databases provide a lot of flexibility in how data is modeled.  Just as the name suggests, data will often mimic real-world documents.  MongoDb isn't a document database per se, but it has enough flexibility to be treated as one.  Mongoose population can help.

A document is often optimized for reads.  All the data is included, such as it would be on a real-world piece of paper.

In Mongo, data is divided into collections.  Mongoose helps define discrete schemas for data in each.  This separates and makes data fields explicit.  This helps with data organization, storage, and writing.  Population helps bring data from different collections back together again easily.  From the [docs](http://mongoosejs.com/docs/populate.html):

> Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s).

So, let's try it out with a couple examples.

## Data Definition

Mongo will add a primary surrogate key to each object, called [ObjectId](http://docs.mongodb.org/manual/reference/object-id/), referenced as `_id` in the data.  This will be the key used to refer to objects in other collections.  If I wanted to model players in leagues -- foosball leagues of course --  I might create schemas like this:

```coffeescript
mongoose = require 'mongoose'
Schema = mongoose.Schema

playerSchema = new mongoose.Schema
  display_name: String
  leagues: [
    type: Schema.Types.ObjectId
    ref: 'League'
  ]

Player = mongoose.model 'Player', playerSchema
```

```coffeescript
mongoose = require 'mongoose'
Schema = mongoose.Schema

leagueSchema = new mongoose.Schema
  display_name: String
  created_by:
    type: Schema.Types.ObjectId
    ref: 'Player'
  players: [
    type: Schema.Types.ObjectId
    ref: 'Player'
  ]

League = mongoose.model 'League', leagueSchema
```

A few points of interest:

- Since we are using `_id` to refer to other objects, we use the `ObjectId` type in the Mongoose definition.  You can use other fields.  Just make sure the type matches.
- The `ref` attribute must match *exactly* the model name in your model definition.  Otherwise you'll get something like this little beauty: `MissingSchemaError: Schema hasn't been registered for model "Player".`.
- Note that `League.players` is an array.  Just surround the field definition in square brackets to get this functionality.

## Data Read

Reading data is where Mongoose population really shines.  This is the magic that makes reads of documents very straightforward, easy, and fast.  The magic is in the `populate()` function.

### Populate One Field

If I want to populate a single field in the query for an object, I specify the name of that field in a string to the `populate` function:

```coffeescript
Player
  .findOne({ _id: 'abc123' })
  .populate('leagues')
  .exec (err, player) -> #...
```

`leagues` will be populated with an array of full `League` objects when the resulting json returned, just like magic.

### Populate Multiple Fields

Populating multiple referenced objects is similarly easy:

```coffeescript
League
  .find()
  .populate('created_by players')
  .exec (err, league) -> #...
```

Just separate the field names in your `populate` parameter with spaces.  This query will return an array of `League` with the `created_by` and `player` fields populated with the associated `Player` objects.

### Populate Partial Objects

Populating objects like this can quickly bloat your payload size.  To limit included objects to only a subset of fields, you can specify exactly what parts you want populated.  For instance, if my client UI only needed to show a list of leagues that a player belongs to, I could ask for just the `display_name` of the included `League` object by using a 2nd parameter:

```coffeescript
Player
  .findOne({ _id: 'abc123' })
  .populate('leagues', 'display_name')
  .exec (err, player) -> #...
```

For listing multiple parts, separate the attribute names with spaces.

### Forget to Populate

You might get so used to having objects populated for some of your queries that you might wonder why they're not populated in your latest query.  You probably just forgot to call `populate()` in your query.  You must do this explicitly to get the inclusions you desire.  Otherwise, you the data you query will just include the `_id` values.

### Explicitly Exclude Field

It might not be that you forgot to populate, but that on some queries you don't want to populate.  In these cases, you might not want to be sending around unneeded `_id` values, especially if they make up a large portion of your data size.  You can explicitly exclude such fields.  For instance, if you wanted all `Player` models but weren't going to populate `leagues`, you might query:

```coffeescript
Player
  .find()
  .select('-leagues')
  .exec (err, players) -> #...
```

Note the `-` sign in the `select` clause.  This removes the field from the results.

## Data Write

When you go to read the data, it's quick, easy, and automatic.  But that's because some work was done previously to reference the correct objects and make sure these references are saved.  Therefore, the naturally more work-intensive part of the population story is the data writing.

When we write to our example models, we need to save the proper references.  For instance, when a new `League` is created, let's say it automatically needs a `created_by` `Player` reference saved and the creating `Player` will automatically join the league:

```coffeescript
league =
  display_name: myLeagueName
  created_by: currentPlayer._id

League.create league, (err, league) ->
  if err?
    # ... do smart things that are never shown in a tutorial
  else

    Player.update { _id: currentPlayer._id },
      $push:
        leagues: league._id
    , (err, numberAffected, raw) ->
      if err?
        # you know...
      else
        res.json league
```

A few points of interest:

- Lowercase `league` is just the json to populate a `League` model.  `league` is also the shadowed variable name in the `League.create` callback.
- `currentPlayer` is just an imagined `Player` reference that has an `_id` that you will use to associate `Player` to this `League`.
- [`$push`](http://docs.mongodb.org/manual/reference/operator/push/) is a special `update` attribute that appends new elements to a model's array.

Depending on how complex your model relationships become, you may opt for a difference code strategy besides nesting callbacks.  Don't like your pyramid of doom?  Try the awesome [async.js](https://github.com/caolan/async).

I don't know if Mongoose population is going to change your life, but I was very happy when I found this feature.  I had been doing junk like this manually.  What are some other great use cases that you've found?
