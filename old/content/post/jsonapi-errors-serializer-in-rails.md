---
layout: post
title: "A JSON API Errors Serializer in Rails"
date: "2014-12-04"
comments: true
categories:
  - "Code"
tags:
  - "rails"
  - "ruby"
  - "jsonapi"
description: You can write a custom error serializer in rails to match something like jsonapi.
metaKeywords: rails, ruby, jsonapi, serializer, errors, custom
draft: false
image: https://i.imgur.com/XOUecnw.jpg
---

The default serialization of error states in Rails might not be what you want for your app.  In that case, it'd be worth knowing how to write a custom serialization format for your needs.  In my case, I am trying to match the [JSON API format for errors](http://jsonapi.org/format/#errors).  Here's a potential implementation...

<!--more-->

## JSON API Errors Format

JSON API is cool because it is a standard format for REST APIs to serialize data.  It would be even cooler if it was well-established and it was standardized more than it currently is.  As it is, it's a standard that seems to fluctuate a fair bit.  Nevertheless, it has many worthy ideas and might be worth using as a format on your app.

The [errors format](http://jsonapi.org/format/#errors) specifically asks for JSON that looks something like this:

```json
{
  "errors": [
    {
      "id": "name",
      "title": "Name cannot be empty"
    } // ...
  ]
}
```

There must be an `errors` root attribute.  Its value is an array.  That array has individual errors that may include a number of different attributes.  Here, I have highlighted just two -- `id`, a unique id of the problem and `title`, the human-readable error message.

## Rails Default Error Serialization

A common place for errors to be reported are in the HTTP responses for requests to the resources in your REST API.  For instance, in your model for your resource -- in this case, let's say it's a book -- you may have some validation rules for what constitutes a well-formed book.  That model might look like:

```ruby
class Book < ActiveRecord::Base
  validates :title, presence: true
end
```

Thus, if I try to create a new book without a title, I should get some sort of error.  And indeed, I do.  If I have a `books_controller.rb` that looks like this:

```ruby
class BooksController < ApplicationController
  def create
    book = Book.new(book_params)
    if book.save
      render json: book
    else
      render json: book.errors  # Allowing default serialization
    end
  end

  private

  def book_params
    params.permit(:title)
  end
end
```

By default, Rails 4 will return an error serialization that looks like this:

```json
{
  "title": [
    "can't be blank"
  ]
}
```

## Custom Error Serializer in Rails

But I wrote a client that doesn't consume errors in the default Rails format, so I want a custom error serialization format -- specifically one to match the JSON API specs.

On the line in `books_controller.rb` that was returning `book.errors`, now we'll introduce a new function to call:

```ruby
render: json: ErrorSerializer.serialize(book.errors)
```

We're going to write the serializer method in a separate file, `error_serializer.rb`, so it can be used in many controllers.  To gain access to it in our controller, we need to include the line:

```ruby
include ErrorSerializer
```

The contents of your `error_serializer.rb` can be whatever fits your use case.  For my simple JSON API implementation, it looks like:

```ruby
module ErrorSerializer

  def ErrorSerializer.serialize(errors)
    return if errors.nil?

    json = {}
    new_hash = errors.to_hash(true).map do |k, v|
      v.map do |msg|
        { id: k, title: msg }
      end
    end.flatten
    json[:errors] = new_hash
    json
  end

end
```

Note the format includes an `errors` root attribute and an `id` and `title` for each error object.

Now, the errors serialization format from the API in the case of an error appears like:

```json
{
  "errors": [
    {
      "id": "title",
      "title": "Title can't be blank"
    }
  ]
}
```

Just what we wanted.

I'm sure there are better places to put your error serialization logic, ways to call it, or great libraries you've worked with that do a similar thing.  Any suggestions?  Have fun!
