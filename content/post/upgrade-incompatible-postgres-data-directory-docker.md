---
categories:
  - "Code"
comments: true
description: "Postgres docker image upgrades require postgres data upgrades."
image: "https://i.imgur.com/UXVuCdq.jpg"
layout: post
metaKeywords: "postgres, database files, incompatible data directory, docker, docker-compose"
draft: false
tags:
  - "postgres"
  - "docker"
title: "Upgrade Incompatible Postgres Data Directory in Docker"
date: "2020-05-04"
---

Postgres docker image upgrades require postgres data upgrades.

<!--more-->

## Incompatible Database Files

At some point, you'll have a docker image for Postgres that you want to upgrade.  I had been working on a certain version and upgraded to the next.  I got the image pulled down fine, but after that, the data that I had been using in the database was not.

The error I got:

```
postgres_1 | FATAL:  database files are incompatible with server
postgres_1 | DETAIL:  The data directory was initialized by PostgreSQL version 9.5
```

## Delete the Database Files

In my case, the data in the database was expendable.  I just needed to remove it.  

First, make sure that all the docker processes have stopped:

```
docker-compose down
```

Then determine the file volume that your postgres image was using:

```
docker-compose volume ls
```

That will list many volumes, depending on your docker usage.  You need to find the one that is connected to your docker image.  Mine was named by directory and image name combination.  Then remove it:

```
docker-compose volume rm myproject-postgres_data
```

After that, starting up the postgres image again will re-initialize the data directory for postgres:

```
docker-compose up -d
```

If it starts, you've been upgraded.  Again, just be aware that you've now started out in a new, clean database.  Database migrations likely need to be run.
