---
categories:
- "Code"
comments: true
date: 2017-05-27T14:09:19-06:00
description: "Zoho Mail is a great mail host that supports free custom domains.  Here are the steps to setup."
draft: false
image: "https://i.imgur.com/Da72MWa.jpg"
layout: post
metaKeywords: "blogging, business, custom domain, email, gmail, zoho, dns, free"
tags:
- "email"
- "networking"
title: "Setup Email Address With a Custom Domain for Free"
disclosures: 
- "affiliate" 
---

[Zoho Mail](https://www.zoho.com/mail/) is a great mail host that supports free custom domains.  Here are the steps to get it all put together.

<!--more-->

## Olden Days

Gmail is a great email web app. They have great spam filtering, and the UI is snappy.  In the olden days, they offered free custom domains if you used the Google Apps for Business.  That has all been monetized by a subscription these days.  The G Suite will cost you $5-10 a month.  This is reasonable, but free is better.

## 0. Buy a Domain

If you want an email (eg, `hi`) on a custom domain (eg, `jaketrent.com`) -- together something like `hi@jaketrent.com` -- you first need a domain.  I buy new domains these days at [Namecheap](https://affiliate.namecheap.com/?affId=116695).

## 1. Setup DNS

Once you have bought and registered the domain, you want to have DNS management somewhere.  I use [Cloudflare](https://www.cloudflare.com/).  They have a free tier that is great.  After you've signed up for Cloudflare, point your Namecheap domain to the DNS servers on Cloudflare.  For details, follow this [Namecheap tutorial](https://www.namecheap.com/support/knowledgebase/article.aspx/9607/2210/how-to-set-up-dns-records-for-your-domain-in-cloudflare-account).

## 2. Sign up for Zoho Mail

The only mail host I know of that will support free hosting with a custom domain is [Zoho Mail](https://www.zoho.com/mail/).  They have have cloned a few Google Apps-like programs, including Mail.  

It's free to sign up for Zoho Workplace (like Google Apps).  This is not a trial.  As far as I can tell, it's permanently free.  The usage limits for the [free tier of Mail](https://www.zoho.com/workplace/pricing.html) are reasonable enough.  5GB mail storage is kind of low.  $2/mo will bump you to 30GB.  But hey, free, right?

When you sign up for Zoho Workplaces, use your new/intended email address (eg, `hi@jaketrent.com`).  The password you choose will be your email password.

The rest of the steps here are included in a nice Zoho Mail wizard on "Domain Setup" that you are automatically brought into after signing up...

## 3. Verify the Domain

Zoho will ask you to add a `CNAME` entry to your Cloudflare DNS setup.  In Cloudflare, go to "DNS", then select your new domain.  In the DNS records, select type `CNAME` and enter the verification value as prompted by Zoho.  Once you've saved this DNS record, Zoho will immediately verify it.

## 4. Setup MX Records

Now Zoho knows you own the domain and the DNS record, so they want you to create two `MX` records for your email that point to Zoho's mail server: `mx.zoho.com` and `mx2.zoho.com`.  Set these according to the Zoho wizard instructions.

## 5. Setup Mail Protection

There are a couple steps to make your email more secure that Zoho will prompt you to make.  The first is to setup SPF (Send Policy Framework).  This is accomplished by adding a `TXT` record to Cloudflare that makes it harder for the bad guys to send email and make it look like it came from you.  The second step is to setup DKIM (DomainKeys Identified Mail).  This will make it more likely that your email, the mail host, and the domain all look legit and don't end up in spam folders.  Zoho walks your through both these steps in its wizard.

## 6. Setup Email Client

Zoho has a nice web app for email.  It looks like they're taking their design cues from Outlook.com.  If you want just the web client, you're set.

If you want to setup a desktop client, you have an additional step.  First of all, Zoho Mail is not IMAP-enabled by default.  You need to open the Zoho mail webapp, click the gear in the top right to see settings.  Under Mail Settings > Email Forwarding and POP/IMAP, you'll find IMAP Access.  Change the status to `Enabled`.

Next, find a desktop client you like.  I have been messing with [Spark.app](https://sparkmailapp.com/). Inside your mail client, create a new account.  Supply the new email address and password used to sign up with Zoho Workplace in the beginning.  The custom domain incoming mail server is `imappro.zoho.com`.  The outgoing mail server is `smtp.zoho.com`.  The Zoho Mail setup wizard will have more details about the mail servers.  

Once you've setup your email client, send an email from some other existing email account your own to your new Zoho Mail account using your custom domain email.  Seeing it come through is prety fun.

Are there parts of this process that trip you up?  How about different providers you've found that work better?  Good luck, and enjoy your new custom domain email address!
