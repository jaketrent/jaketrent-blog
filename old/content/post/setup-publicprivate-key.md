---
layout: post
title: "Setup Public/Private Key"
date: "2012-07-19"
comments: true
categories:
  - "Code"
tags:
  - "encryption"
  - "networking"
  - "ssh"
description: When you connect to a remote server, you're connecting over ssh or scp or a similar protocol.  In each case, you may have to provide some authentication cre
metaKeywords: encryption, networking, ssh
draft: false
---

When you connect to a remote server, you're connecting over ssh or scp or a similar protocol.  In each case, you may have to provide some authentication credentials to prove you are who you say you are.  This can come in the form of a user/password combo, but if you're connecting a lot or if you're trying to setup a non-interactive connection, this can become either really monotonous or really problematic.  Public/private keys will come to our rescue, and we'll never need to enter our password again.

<!--more-->

```bash
> ssh-keygen
```

You can, but don't need to protect your private key with a passphrase.  It is private, after all.  The default names are:

- Private: id_rsa
- Public: id_rsa.pub

Now you need to share your public key with the remote server:

```bash
> scp ~/.ssh/id_rsa.pub myUsername@remoteServer:
```

The trailing colon will separate your hostname from the destination path and drop it in your default/home directory on the server.  Now, get into the remote server for the last time using that antiquated password of yours:

```bash
> ssh myUsername@remoteServer
```

Once here, we need to put the public key in a file that will be used for incoming connections:

```bash
> mkdir ~/.ssh
> mv ~/id_rsa.pub ~/.ssh/authorized_keys
```

And make sure that the permissions are locked down for security reasons:

```bash
> cd ~/.ssh
> chmod 700 .
> chmod 600 id_rsa.pub
```

Jump back to your local box and prep your private key for your next ssh/scp connection:

```bash
> eval `ssh-agent`
> ssh-add ~/.ssh/id_rsa
```

Note that we're adding our private key only.  If you had a passphrase on your private key, you'll be prompted for it at this point.  Voila!  You're next connection to that remote server should not require a password.  Try it!:

```bash
> ssh myUsername@remoteServer
```
  
