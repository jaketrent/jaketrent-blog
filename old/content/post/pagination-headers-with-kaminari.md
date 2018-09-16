---
layout: post
title: "Pagination Headers with Kaminari"
date: "2015-01-15"
comments: true
categories:
  - "Code"
tags:
  - "ruby"
  - "rails"
description: Kaminari provides easy pagination in a rails app.  Add a little function to your controllers, and you'll have great pagination headers
metaKeywords: ruby, rails, kaminari, pagination, Link, http headers, pagination header
draft: false
image: https://i.imgur.com/XOUecnw.jpg
---

[Kaminari](https://github.com/amatsuda/kaminari) provides easy pagination in a rails app.  It's great to use.  We'll make it better by adding a little function to your controllers to provide useful pagination headers.

<!--more-->

## Pagination from Kaminari

Installation is easy with an addition to your `Gemfile`:

```
gem 'kaminari'
```

and an install:

```
bundle install
```

Now, you have a magical `page` method available on your models.  It works like a charm right out of the box.

Let's say that I have a `germs_controller.rb` (because it's a great time of year for that), where I have a list of germs that I want to paginate.  I could easily request `/api/v1/germs?page=2` and get the second page with this code in the controller:

```ruby
module Api
  module V1
    class GermsController < ApplicationController
      def index
        @germs = Germ.page params[:page]
        render json: @germs
      end
    end
  end
end
```

If you want to control the default page size, you can do that in the initializers (`kaminari_config.rb`):

```ruby
Kaminari.configure do |config|
  config.default_per_page = 20
end
```

## Pagination Headers

There's another feature that we want to add, and that's pagination headers.  These are going to be HTTP headers that come back in the response that indicate to clients where the relative pages are located in our API.  For instance, we asked for page 2, but where might one request the previous and next pages, 1 and 3?

Putting the pagination info into the header follows a pattern used in the [github api](https://developer.github.com/guides/traversing-with-pagination/).

We'll add a function to our `ApplicationController` to helps us out:

```ruby
class ApplicationController < ActionController::API

  protected

  def set_pagination_header(name, options = {})
    scope = instance_variable_get("@#{name}")
    request_params = request.query_parameters
    url_without_params = request.original_url.slice(0..(request.original_url.index("?")-1)) unless request_params.empty?
    url_without_params ||= request.original_url

    page = {}
    page[:first] = 1 if scope.total_pages > 1 && !scope.first_page?
    page[:last] = scope.total_pages  if scope.total_pages > 1 && !scope.last_page?
    page[:next] = scope.current_page + 1 unless scope.last_page?
    page[:prev] = scope.current_page - 1 unless scope.first_page?

    pagination_links = []
    page.each do |k, v|
      new_request_hash= request_params.merge({:page => v})
      pagination_links << "<#{url_without_params}?#{new_request_hash.to_param}>; rel=\"#{k}\""
    end
    headers["Link"] = pagination_links.join(", ")
  end
end
```

This code will provide a `Link` header in the HTTP response.  Its value might look something like this:

```text
<http://myapi.com/api/v1/germs?page=1>; rel="prev", <http://myapi.com/api/v1/germs?page=3>; rel="next"
```

The values of `first`, `last`, `next`, etc are populated from calls to [Kaminari methods](http://www.rubydoc.info/github/amatsuda/kaminari/Kaminari/PageScopeMethods) such as `first_page?`.

In order to have this header set on a response, we need to add it to a callback in our controller:

```ruby
module Api
  module V1
    class GermsController < ApplicationController

      after_filter only: [:index] { set_pagination_header(:germs) }

      def index
        @germs = Germ.page params[:page]
        render json: @germs
      end

    end
  end
end
```

Now, a fresh request to `/api/v1/germs` with or without the `page` query parameter should return back the `Link` header in the HTTP response which your client can use to traverse the other pages of data available in your API.

So, there's one way to get pagination info from Kaminari into your HTTP headers.  What would you improve?


