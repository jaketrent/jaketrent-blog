---
categories:
  - "Code"
comments: true
description: "Docker is nice to run a bunch o server junk"
image: "https://i.imgur.com/C263IfH.jpg"
layout: post
metaKeywords: "docker, docker-compose, server, noops"
draft: false
tags:
  - "docker"
  - "devops"
title: "Docker Runs Server Junk"
date: "2020-02-03"
---

I ran Docker yesterday, and I thought to myself, "Docker is nice to run a bunch o server junk."

<!--more-->

## What, junk?

Of course, "junk" doesn't sound thrilling or particularly nice, and I guess that's how I felt the other day.  That's what makes Docker nice.  You can throw something into a black box and now have to worry too much about it.

For instance, I might throw in a database, a messaging server, and a REST API.

## Lots of "junks"

And once you have more than one junk, a tool called `docker-compose` is nice.  You get it when you install Docker Desktop.

It's nice because you can define several processes to run at once in a `docker-compose.yml` file.  It might contain the things mentioned above:

```
version: '2'
services:
  rabbit:
    image: rabbitmq:3.7.6-management
    hostname: rabbit
    ports:
      - "15672:15672"
      - "5672:5672"
  postgres:
    image: kiasaki/alpine-postgres:9.5
    volumes:
      - my-postgres:/var/lib/postgresql/data
    ports:
      - '5432:5432'
  my-api
    image: some-custom-image-host:latest
    ports:
      - "3000:3000"
    environment:
      VAR_NAME: valueHere
volumes:
  my-postgres:
```

You can see the many and sundry options: exposing ports, exposing filesystem volumes, and setting environment variables.

## Starting up the junk

If you never have to look inside `docker-compose.yml`, it's even better.  All you have to do is start the processes.  This is done with by going to the file path where `docker-compose.yml` is stored and typing:

```
docker-compose up -d
```

This will start it all. `-d` will fork the process as a daemon.

## Accessing the junk

Then what's available?  In the example, there will be a Rabbit messaging admin portal mapped to localhost:

```
open http://localhost:15672
```

And a postgres instance to access:

```
psql -U postgres -h localhost
```

And another REST API to access

```
open http://localhost:3000
```

## Not mixing junk

Note that once you start all these processes, resources like http ports on localhost or tcp ports for postgres are going to be shared.  Make sure you stop any local junk instances so that there are no conflicts.  

You wouldn't run local junk anyway, right?

## Monitor the junk

Once the junk is running, you might want to see what it's doing:

```
docker-compose logs -f
```

This will show a combined log of all processes. `-f` will show new logs continuously (`-f` = "follow").

If you're not sure things are running at all, you can run:

```
docker ps
```

## Throw junk away

Sometimes junk takes up a fair bit of space.  We could all use a bit of downsizing and decluttering.  Say "Thank you, junk" and let it go.  Type:


```
docker-compose down
```

A bit of cleanup, and you're back to a pristine state.  Docker's nice like that.  It seems junk contained.

Any other ways you like to run server junk?



