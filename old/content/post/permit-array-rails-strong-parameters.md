---
layout: post
title: "Permit Array in Rails Strong Parameters"
date: "2014-01-22"
comments: true
categories:
  - "Code"
tags:
  - "ruby"
  - "rails"
description: Exercism.io has great JavaScript exercises that are made better by a better test runner.  Use grunt-init to set up.
metaKeywords: grunt, grunt-init, exercism, jasmine_node, watch, js, javascript
draft: false
image: https://i.imgur.com/XOUecnw.jpg
---

Rails 4 introduced the pattern of strong parameters at the controller layer.  As a best practice, you will explicitly list the parameters that an endpoint should accept in payloads.  Arrays are specified just slightly different.

<!--more-->

## Strong Parameters

You don't want those blackhats to update any field they want on your poor models.  Raise the shields -- strong parameters!  In ye olden days, `attr_accessible` could add some protection to your models.  Since Rails 4, it has been best practice to move this responsibility to the controller.  At that layer, you can make adjustments and allowances on a per-endpoint basis (eg, admin functionality has more power over a particular model than the layman user).

So, create a private function in your controller where you can filter your params for your model.  It might look like:

```ruby
private

def luchador_params
  params.require(:luchador).permit(:favorite_move, :weight)
end
```

You have two main methods to use:

- `require` - ensures that the parameter is present (as in this root `luchador` key)
- `permit` - whitelist filters the parameters to the set specified

## Arrays in `permit`

The most standard use case for `permit` is to pass it a collection of :symbols.  These keys must represent scalar values (string, number, that sort) only.  But what about arrays?  They're represented differently by an empty array:

```ruby
params.require(:luchador).permit(:favorite_move, :weight, wins: [])
```

But wait -- one more problem, and I don't like the answer here.  My client might send back a `nil` instead of an array (ie, when the luchador has no `wins`).  If this happens, cue ugly error:

```text
Unpermitted parameter: wins
```

To fix, default to empty array:

```ruby
params[:luchador][:wins] ||= []
params.require(:luchador).permit(:favorite_move, :weight, wins: [])
```

What have you done that looks better?  Please! :)
