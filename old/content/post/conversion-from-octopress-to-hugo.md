---
layout: post
title: "Conversion from Octopress to Hugo"
date: "2017-02-16T20:28:34-07:00"
comments: true
categories:
  - "Code"
tags:
  - "hugo"
  - "blog"
  - "markdown"
description: A story of my migration from Octopress to Hugo static site generator
metaKeywords: hugo, static-site, static site generator, golang, fast, octopress, migration, markdown
draft: false
image: https://i.imgur.com/EksouVh.jpg
---

Several weeks ago, I decided it was time for me to move on from Octopress.  It's given me a good run.  But there were a couple of causes that pushed me over the edge.  My experience has been good with a few pains in the conversion.

<!--more-->

## Outgrowing Octopress

The most fundamental and important reason for me converting from Octopress is that it was getting slow to build my site.  I'd write an article, run `rake generate`, and it'd take (anecdotally) 45 seconds.  Wow, impatient, right?  Well it was apparently enough to make it less fun to write on as a platform.

Updating my site's layout on Octopress was also troublesome.  I had written my own theme, but I had worked my custom theme into the existing `sass` and template hierarchy that exists in Octopress' default theme.  These files are a tangle and hard to work with.

Octopress has made rumblings about being updated and improved upon.  But these efforts have been silent as of late.  The last commits on Jekyll's Ferrari (v3), as of this writing, were a full year ago.

Finally, I usually welcome an opportunity to learn something new.  I was on the hunt for a platform that would enccourage my writing.

## Tried Hexo

I looked at Hexo.  It looked rather promising.  It's based on Node.  The docs were extensive.  Initial speed tests were pretty good.  It seems like a pretty cool project.  But then I pushed close to 300 articles into it, and it slowed down significantly -- about 30 seconds to build the site.  Then I read some github issues about how people were having similar problems.  Then I tried to extend it with different types of content beyond blog posts (a core use case for the next generation of my blog), and got lost in creating new Hexo generators.  So I kept looking.

## Fun with Hugo

Hugo was another static site generator that appeared high on a number of top 10 lists.  It is written in golang.  I picked it up.  I identified with a marketing slogan high on their list: "Make the web fun again."  Yes!  This is essentially how I wanted to feel when I thought about adding another post to my blog.

### Hugo is Fast

Initial tests with speed were mind blowing -- near instantaneous.  Then I added almost 300 articles.  The live server and blog generation were still quite fast (606ms):

```
278 regular pages created
210 other pages created
2 non-page files copied
287 paginator pages created
198 tags created
8 categories created
total in 606 ms
```

This is a fresh build.  The caching, however, makes it even faster.  Two builds in a row will yield a second build that's faster (barely, 596ms). 

I realized that part of the fast speed was because it wasn't doing code highlighting, which I wanted on.  I read through the docs at how to turn those on.  They're actually run in python by pygments, and the docs say they're slow.  Yes, the build time went way up (15s). But again, caching still helps significantly here (in a tests, anywhere from a total 800ms to 3s) -- and is a lot more important.  The dev cycle response time is enjoyably fast.

### Templates are Easy & Intuitive

As I have rebuilt my blog on Hugo, I've been pleasantly surprised at how easy things have been to figure out and implement.  Templates are written in go templates, which are pretty nice.  There are good built-in parameters for the site and each page available in the templates.

Creating arbitrary types of content is super easy with its cli tool (via `hugo new`) that doesn't really assume anything and doesn't try to be too clever.  I can easily start new "sections" of content.

Most things are driven by a template.  They go in intuitive locations and are easy to override -- for different sections, the sitemap, and rss feeds.  There's good template fallbacks with the `_default` section.  I can find simple instructions for desired features in the docs.

### Things I Wished Hugo Had

The theme install instructions are odd.  I suppose if you want a plug n play theme, they're fine.  But I have just put my custom theme straight into my blog git repo, not using a git submodule as instructed.  

There are a few features that I miss from Octopress, including the ability to give code snippets file names.  That's apparently not generally-accepted markdown, but it's super nice.  I could write a shortcode, equivalent to Jekyll's plugins, but I'm trying to keep my Markdown vanilla parseable.  It also seems that Jekyll was more forgiving of my sloppy markdown formats.

## Data Conversion

In order to make the migration to Hugo from Octopress, my source content markdown files needed some changing.  Lots of this was in the front matter.  There were a few issues in the body of the content as well where I was using things that Octopress supported but that Hugo did not.

### Date Format

The publish date in the front matter for Octopress was in the format of:

```
date: 2015-02-28 16:20
```

Hugo wanted it in the format of:

```
date: "2015-02-28"
```

I changed this with a sed script:

```
find ./ -type f -exec sed -i '' -E "s/(date: )([^ ]+).*$/\1\"\2\"/" {} \;
```

### Split Categories

As far as I know, Octopress didn't support categories.  So I mixed my categories in as tags for my posts.  Hugo can treat them as separate things, so I split out what looked like this:

```
from: categories: [Code, heroku, dns]
```

Into this:

```
categories: 
  - "Code"
tags: [heroku, dns]
```

This is partial step, not the final format.  We'll finish it soon. 

To get categories onto a new line, it turned out that I needed a new version of `sed`.  Instead of the BSD version that's on the Mac by default, I had to install the GNU version:

```
brew install gnu-sed
```

This is apparently because the BSD `sed` can't read newline charaters `\n` in a regex.  It needs the literal new line (as in, press enter).  That seems like a pain for a nice, copy-pasteable regex.  So, in this command, I used `gsed`:

```
find . -iname "*.md" -exec gsed -i -E "s/categories: \[(\w+)(, ?)(.*)$/categories:\n  - \"\1\"\ntags: \[\3/" {} \;
```

### Format Tags

The remaining comma-separated array of tags that I was using in Octopress land wasn't apparently real yaml at all.  Anyway, Hugo didn't like it.  So, I was going to make a bulleted list.  To go from this:

```
categories: [heroku, dns]
```

To this:

```
tags:
- heroku
- dns
```

I needed to run a couple `sed` commands in a row (because I couldn't figure out how to do this with a single command).  The first command is for the posts that have one tag, then 2 tags, and so on.  I'll show you the first two.  You can extrapolate from there:

```
find . -iname "*.md" -exec gsed -i -E "s/tags: \[([a-z-]+)]$/tags:\n  - \"\1\"/" {} \;
find . -iname "*.md" -exec gsed -i -E "s/tags: \[([a-z-]+)(, ?)([a-z-]+)]$/tags:\n  - \"\1\"\n  - \"\3\"/" {} \;
```

### Moving Cover Image Into Front Matter

For a couple years, I've put a cover image in the body of the post text, right at the end of the summary section.  I wanted to move this into the front matter.  It would give me a little more visual control.  I tried many, many `grep`, `sed`, and even `perl` commands to try to make this happen.  In the end, I went through articles manually.  That turned out to be a blessing in disguise (at least I tried to squeeze lemonade out of it), and I could make other adjustments to data, where my style has changed in various ways over the years.

I found files with images using this `grep` command:

```
grep -o -c "^\!\[.*\]\(.*\)" * | awk -F: '{if ($2 > 0){print $1}}'
```

### Remove Code Snippet Filenames

One of the features I really liked from Octopress was the out-of-the-box support for showing file names on code snippets blocks (the ones that use 3 backticks surrounding the block). Apparently, however, this is not standard Markdown trickery, or at least Hugo doesn't like it and stops all formatting if it detects it.  It would be much nicer if it just ignored it.

Again, I was stifled in my automated solution to this.  I spent a bit of time on this, but since it affected a relatively small amount of files, I learned my lesson from the pain of time spent on the cover image transform and just went for the manual editing. I think the problem had to do with the backticks not being well-supported (or at least understood by me) in the `sed` replacement command.  So I just found the files like this:

```
grep "^\(\`\{3\}[a-z]\+\) [a-zA-Z_\-\.\/\-]\+" *.md
```

### Strict Hash Separation

In markdown, you make header text using the leading hashes.  Apparently, I had hashes that butted right up next to the header text in some cases.  Octopress dealt with that ok, but this new parser used by Hugo didn't like it and would render hash literals.  To make the strict separation, I ran:

```
find . -iname "*.md" -exec gsed -i -E "s/^(#+)(\w+)/\1 \2/" {} \; 
```

In all, the Hugo conversion has led to a fast development cycle of a fast static site.  It has brought some of the blogging fun back.  I did a visual redesign at the same time, and that's been fun too.  If it still looks like a painterly celestial scene when you read this, let me know what you think of it.  

Are you using Hugo?  What do you think of it so far?

