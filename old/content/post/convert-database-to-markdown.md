---
layout: post
date: "2017-02-19T06:59:14-07:00"
title: "Convert a Database to Markdown"
comments: true
categories:
  - "Code"
tags:
  - "hugo"
  - "markdown"
description: You have a site with a cms and a database.  Would it work as a static site based on markdown?  Maybe.
metaKeywords: hugo, static-site, static site generator, markdown, database, cms
draft: false
image: https://i.imgur.com/mJ02xsf.jpg
---

Once you get a bunch of data that you want to put on your site, it's common to reach for a database.  Then you'll write an app that consumes that database and renders a dynamic site.  What if, instead, you could create a static site from that data.  What would that buy you?

<!--more-->

## Dynamic Database

If you have a dynamic site backed by a database (eg, postgres), you'll have some good and some bad.  The good:

- Your data is well-defined, segregated into clean columns of data
- You can plug your data in anywhere in your dynamic site
- You can change data without having to redeploy your site

The bad:

- Your code is more complicated.  There are more moving parts to support the dynamic render of the site.
- Your site requires more computing power to run.  Simple crud is no big deal per se, but your site could be stressed under load.
- Your dynamic site is more expensive to host.  You have tons of options, but many will cost money.

## Markdown as a Database

But what if you could use markdown files as a database.  Instead of columns accessed by a database process, your data is stored on the filesystem as files.  The most database-like part of a markdown file is the front matter.  This is a meta data section at the top of the document that maintains some info about the document itself.  What if it contained all or some of the significant data of your doc?  

Front matter can be presented in a couple of formats like yaml, toml, or json.  I prefer yaml.  The front matter is demarcated with `---` on both sides, like:

```
aName: "for my front matter data"
```

Hmm, there are possibilities here.  It almost looks like a key-value store.  Once you have a key-value pair in the front matter, you can pull it out in the template and have access to it.  For instance, in [Hugo](http://gohugo.io/), a static site platform, you can access custom variables in your templates on the page's `.Params` object, like: `{{ .Params.aName}}`.

## Database for a Static Site

When you use markdown files as the database for your site, you get some great things:

- Good-enough data segregation with key-value pairs in the front matter.
- You get a simple, light-weight site that will take a load beating. 
- Likely cheaper and simpler infrastructure

And a couple downers:

- You redeploy to update data.  If your site doesn't change much, this might not matter to you.  Use automated build and deploy tools to make this less time-consuming.
- Mass updates are harder and less precise.  You are not writing sql update statements.  You're writing `sed` statements for string find and replacement.
- You cannot join over data sets in any meaningful way.
- You lose the flexibility to code everything else that you might want a dynamic site for

## Export Your Postgres Data

If you want to make the conversion, get your data out of your database.  There are tools for this, like [pg_dump](https://www.postgresql.org/docs/9.1/static/backup-dump.html).  I'll use my data in postgres on heroku as an example:

```
heroku pg:backups:capture            # export binary dump of database
heroku pg:backups:download           # get the dump onto your computer
pg_restore -f latest.sql latest.dump # convert to plaintext .sql file
```

Now cleanup your data in the .sql file.  Get rid of all that table, key, and sequence creation in the .sql file that won't matter in this new world.  The dumps use the postgres `copy` command.  Pare down to one data collection per file, just the rows of data for the `copy` command.  For me, a couple of those rows might look like:

```
25	The Innovator’s Dilemma	The simultaneous need and danger to reinvent oneself and one's business is the dilemma.  Do we disrupt ourselves or do we double-down on core competencies?  A dilemma indeed!	https://i.imgur.com/exW4j8F.jpg	2014-08-20		2014-11-28 19:05:28.153598	2014-11-28 19:05:28.153598	Craig Christensen	http://www.amazon.com/gp/product/B00E257S86/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00E257S86&linkCode=as2&tag=jaktre-20&linkId=5CDH2BHJK7TZT52R
26	Steve Jobs	Jobs is revealed as a man of many passions.  Reading the formative moments of the personal computing technology and industry is very interesting!  However, the coarse language in the book causes me to not recommend it.	https://i.imgur.com/hpwhvgx.jpg	2014-09-10		2014-11-28 19:08:29.530743	2014-11-28 19:08:29.530743	Walter Isaacson	http://www.amazon.com/gp/product/B004W2UBYW/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B004W2UBYW&linkCode=as2&tag=jaktre-20&linkId=KPZUBQVLGURNA3RW
```

## Create the Markdown Files

If you have a lot of data or just a little or just like writing code, you might want to automate this.  I chose to write my script in javascript.  Here it is (or this [gist](https://gist.github.com/jaketrent/87d0695ab865d4a739be59434261bbd0)) -- helper functions are at the top; actual steps are shown at the bottom.  If you read the steps at the bottom, you should see rather quickly what this script is meant to do:

```js
const fs = require('fs')

const separateColumns = line => line.split('\t')
const nameColumns = line => ({
  id: line[0],
  title: line[1],
  description: line[2],
  coverUrl: line[3],
  completionDate: line[4],
  reviewUrl: line[5],
  createdAt: line[6],
  updatedAt: line[7],
  author: line[8],
  affiliateUrl: line[9]
})
const nonEmptyColumns = line => line.id !== ''
const deriveColumns = line => Object.assign({}, line, {
  descriptionSummary: line.description.substr(0, 150),
  fileName: __dirname + '/books/' + line.title.split(' ').join('-').toLowerCase() + '.md',
  reviewUrl: line.reviewUrl.replace('http', 'https')
})
const deriveFrontMatter = line => Object.assign({}, line, {
    fileContents: `---
affiliateUrl: "${line.affiliateUrl}"
author: "${line.author}"
date: "${line.completionDate}"
categories:
  - "Book"
comments: true
description: "${line.descriptionSummary}"
draft: false
metaKeywords: ""
layout: "book"
image: "${line.coverUrl}"
reviewUrl: "${line.reviewUrl}"
title: "${line.title}"
---

${line.description}
`})
const writeFiles = line => fs.writeFileSync(line.fileName, line.fileContents)

// the steps!
const file = fs.readFileSync(__dirname + '/latest.sql', 'utf8')
const lines = file
  .split('\n')
  .map(separateColumns)
  .map(nameColumns)
  .filter(nonEmptyColumns)
  .map(deriveColumns)
  .map(deriveFrontMatter)
  .forEach(writeFiles)
```

What do you think about this idea?  Would it be a good idea for any of your projects to push your database into markdown files?  Would you have anything to gain by it?
