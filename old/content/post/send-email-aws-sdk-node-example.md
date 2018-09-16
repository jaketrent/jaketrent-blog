---
categories:
- "Code"
comments: true
date: 2017-06-14T07:50:09-06:00
description: "An example of how to send email using the aws-sdk on Node.js."
draft: false
image: "https://i.imgur.com/Q5ui0SB.png"
layout: post
metaKeywords: "send email with node.js, send email with aws ses on node, aws-sdk ses node example, tutorial"
tags:
- "js"
- "nodejs"
- "aws-sdk"
- "email"
title: "Send Email with aws-sdk on Node.js Example"
---

Here's an easy example of how to send email using the aws-sdk on Node.js.

<!--more-->

## Install SDK

You have the full power of Amazon's AWS SDK as soon as you install it for Node/JavaScript:

```bash
npm install aws-sdk
```

## Get Authorized

Make sure you setup a user in Amazon's [IAM](https://console.aws.amazon.com/iam) service that has access to the SDK.  You'll need a key id and a secret access key.  You can set these AWS credentials for your whole system in `~/.aws/credentials` or you can apply them only in the project that will use them.  We'll choose the latter.

To store credentials, we're going to use environment variables.  To load them we'll use the venerable `dotenv` library:

```bash
npm install dotenv
```

Create a gitignored file `.env` in your project root:

```txt
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=yourKey
AWS_SECRET_ACCESS_KEY=yourSecret
```

First thing in our new `server.js` app file, let's load these variables making them available to the `aws-sdk`.  Let's run:

```js
require('dotenv').config()
```

## Verify Email Addresses in SES Sandbox

When you first sign up for Amazon [Simple Email Service (SES)](https://us-west-2.console.aws.amazon.com/ses), you'll want to verify your sending domain and email address (both to and from).  Amazon requires this, as well as keeping you in a non-prod sandbox with plenty of limits, in order to protect its users, the Internet, and your own email's trustworthiness to other mail servers.  Take care of this verification before trying to send any email.  If you don't, it'll just error out.  Later once this is all setup and working, you can request prod access.

##  SES in Node

Since we have the `aws-sdk` already installed, it's ready for us to use.  Let's require it and instantiate an SES instance:

```js
const AWS = require('aws-sdk')

const ses = new AWS.SES()
```

This instance has all the top-level [APIs for SES](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html) that we need, notably `ses.sendEmail`.  All `ses.sendEmail` needs is some config for the to and from addresses and email content that you want to send.  Set it up, and press send:

```js
const params = {
  Destination: {
    ToAddresses: ['to-email@example.com']
  },
  Message: {
    Body: {
      Html: {
        Charset: 'UTF-8',
        Data:
          'This message body contains HTML formatting, like <a class="ulink" href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide" target="_blank">Amazon SES Developer Guide</a>.'
      },
      Text: {
        Charset: 'UTF-8',
        Data: 'This is the message body in text format.'
      }
    },
    Subject: {
      Charset: 'UTF-8',
      Data: 'Test email from code'
    }
  },
  ReturnPath: 'from-email@example.com',
  Source: 'from-email@example.com'
}

ses.sendEmail(params, (err, data) => {
  if (err) console.log(err, err.stack)
  else console.log(data)
})
```

The params can take a formatted email body (`Message.Body.Html`) and an alternate text body (`Message.Body.Text`).  The `ReturnPath` is the place where bounce-backs will be sent back to.  Also note that the asynchronous method takes a callback.  The `data` that is returned in the callback to the callback will have the shape of:

```js
{ ResponseMetadata: { RequestId: 'f96abf23-5108-11e7-a0d8-5fe3d188b3b6' },
  MessageId: '0101015ca6e24030-7913ca02-de24-42d4-9a5d-83f877114974-000000' }
```

That's the shape you'll see if it sends once you run `node server.js`.  If it didn't work, you'll get one of a number of possible [error codes](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/api-error-codes.html) console logged instead.  

For a full example, see [this hello-ses repo](https://github.com/jaketrent/hello-ses).

Pretty easy, huh?  Is this how you send email over SES in Node?  What cool tricks have you learned while doing this?




