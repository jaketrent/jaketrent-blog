---
categories:
- "Code"
comments: true
date: 2017-07-11T06:58:34-06:00
description: "Feature flagging in your frontend code will allow you to release continually."
draft: false
image: "https://i.imgur.com/LPdaaIr.jpg"
layout: post
metaKeywords: "continuous delivery of frontend code, feature flags in browser, bootstrap feature flags"
tags:
- "continuous-delivery"
title: "Feature Flag Frontend Code"
---

Feature flagging in your frontend code will allow you to release continually.

<!--more-->

## Continuous Delivery

Continuous delivery means that we release often, getting developed value to our users as quickly as we can. The master branch remains ready for production and contains all that we've written into our products.

This includes early-stage features that we'll release as well. 

## Feature Flags

Early-stage features still need feedback and testing so we can adjust them to the actual needs of our users as we learn them.  

Before we feel they're ready for all users, we'll release them to a subset of our users.  This can be accomplished with feature flags -- conditionals around who sees a feature.

Once a particular user is flagged _on_ for a specific feature, they will see or experience that feature.  If they have not been whitelisted into it, the app will look to them as though the feature doesn't exist yet.

There are many ways to implement the backend for feature flags.  Let's focus on the frontend.

## Frontend Feature Flags

The frontend in this scenario is a JavaScript-rendered UI in the browser where feature flags are simply implemented as JavaScript conditionals.

Let's say that there's a new login experience that we want to test out.  To determine if a users should see the new or old login experience, the server bootstraps the JavaScript application with data about the feature flags:

```html
<html>
  <body>
    <div class="app"></div>
    <script>
      window.env = {
        featureNewLogin: <%= serverRenderedBoolForUser %>
      }
    </script>
  </body>
</html>
```

You can use whatever data structure suits you.  This one is simple and provides the data needed for the conditional.

Then in the login UI code, we can read the feature flags:

```js
const renderLogin = _ =>
  window.env.featureNewLogin
    ? renderNewLogin()
    : renderOldLogin()
```

Simple and powerful. This allows both versions of the code to live side by side, be deployed simultaneously, but have different users experience the site differently.

What do you do to support continuous delivery of new features in your frontend code?

