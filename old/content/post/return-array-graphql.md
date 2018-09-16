---
layout: post
title: "Return an Array in GraphQL"
date: "2016-08-16"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "graphql"
description: How to return an array or a single item from Facebook's graphql
metaKeywords: js, javascript, graphql, graphqllist, array, multiple items, return array, return multiple
draft: false
image: https://i.imgur.com/RitF21I.jpg
---

[GraphQL](http://graphql.org/) provides a query language to define the shape of data you'd like returned from an HTTP API on a server and a library to help make it happen.  It's easy to return a single item or multiple items.

<!--more-->

# Query Many Items

To [query in graphql](http://graphql.org/docs/queries/), you setup what looks like a json payload without the values.  For example, to get the `id` and `title` fields of *all* books in your API, you might write:

```
{
  books {
    id,
    title
  }
}
```

# Query a Single Item

To query a single item, filtered by a unique id, you'd add a predicate to the books query:

```
{
  books(id: 123) {
    id,
    title
  }
}
```

Otherwise, everything remains the same.

The sameness or similarity with the single item query feels good from someone coming from a REST API, where resources similar to the above would be queried from URIs something like:

```
/books          # multiple
/books/123      # single
```

But keeping the same query field, `books`, for both queries will provide a challenge because we will have to support both the single and multiple query from the same place.

# Define a Schema

On the server, you need to define a schema for possible supported shapes of data you can query.  We currently have one field that we can query -- `books`.  In the case where we provide no filter (known as args in a schema), we want to return all books.  If there is a filter, we want to use it, and return a single book.  The schema might look like:

```js
const { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql')

const bookType = new GraphQLObjectType({
  name: 'book',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString }
  }
})

const schema = new GraphQLSchema({
  name: 'root',
  fields: {
    books: {
      type: new GraphQLList(bookType), // <-- note type
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, args) { // <-- the interesting part
        return args.id
          ? repo.find(args.id)
          : repo.findAll()
      }
    }
  } 
})
```

The decision to return a single item or multiple items happens in the `resolve` function for `books`.  And the `books` field config shows that the return type will always be a `GraphQLList` of `bookType`.  This means that whether a single item or multiple items, an array will always be returned.  This doesn't feel to terrible -- even familiar when comparing to things like JSON-API.  More importantly, it's _required_ for this return type to work.  

At one point, I attempted to use [`GraphQLUnionType`](http://graphql.org/docs/api-reference-type-system/#graphqluniontype) to have two potential return types, but I got an error like:

```
books may only contain Object types, it cannot contain [the array type]
```

...meaning that I couldn't mix a single object type with an array type in the unioned return type.

So in our chosen, working solution above where we always return an array, any consuming client will query with the`books` field.  An array of one or many items will be returned.  In the case of returning an array of a single item, the deserialization code will probably want to unwrap the item from the array and expose it as a single object, but obviously this is up to your preference.

There it is.  Have you learned how to do this in a better or more elegant way?   

