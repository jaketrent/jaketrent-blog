---
categories:
- "Code"
comments: true
date: 2017-07-18T06:01:56-06:00
description: "With some magic, change webpack without ejecting from create-react-app"
draft: false
image: "https://i.imgur.com/D8zGG04.jpg"
layout: post
metaKeywords: "change config without ejecting, create-react-app webpack customization, customize without ejecting"
tags:
- "webpack"
- "react"
title: "Change Webpack Config in create-react-app Without Ejecting"
---

With some magic, change webpack without ejecting from create-react-app.

<!--more-->

## No Customizations Supported

create-react-app was never built to be cracked open.  It has so many secrets to hide.  It was born in an era of frustration, where JavaScripters wanted to get on the React train but didn't want to go through the work of a custom project build setup.  create-react-app was [born as a no-config way](https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html) of making this happen.  

The Internet responded with joy and used create-react-app for 7 minutes before the feature requests began piling up.  This dev used this particular webpack loader, and that dev used a different CSS preprocessor.  Would the team mind, awfully, if we could add that to create-react-app?  Ok, if not for everyone, just for me?

But that was the original point: no configuration.  And yet, cake... eating...

## react-app-rewired

You could eject from create-react-app, but that would bring back the entire world of writing code -- for a build configuration no less!  Ha!    

But where there's an Internet, there's a way.  [react-app-rewired](https://github.com/timarney/react-app-rewired) is a library that supports making adjustments to your setup without committing to an ejected way of dev.

In your project, install the red pill:

```
npm install react-app-rewired --save-dev
```

## Adjust your Webpack Config

Now create a specially-named file, `config-overrides.js` in your project's root directory.  Therein, react-app-rewired is going to give you access to the original webpack config.  You can mutate it, always a good idea, and send it back to work in create-react-app.  You might add support for CSS modules:

```js
module.exports = (config, env) => {
  config.module.rules.push(
    {
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]___[hash:base64:5]'
          }
        }
      ],
      include: path.resolve('src')
    }
  )
  return config
}
```

Ah, sweet victory.  Totes worth it!

## Adjust your npm-scripts

Finally, to bypass the create-react-app scripts entry point, we are going to use some scripts provided by react-app-rewired.  In `package.json`, change `start`, `build` and `test` to be:

```json
{
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom"
  }
}
```

If this all feels a bit magical, that's because it is.  It feels likely to break to me.  But it works -- for now, hee hee hee.

Now running `npm start` or `npm run build` will engage your franken-config.  

Was it worth it?  Is it worth peanut butter in your jelly just to save washing one knife?

Hehe, anyway, do you avoid ejecting from create-react-app?  If so, confess -- how do you do it?
