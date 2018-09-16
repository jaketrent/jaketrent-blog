---
layout: post
title: "Encrypt your IMs in Pidgin"
date: "2011-04-20"
comments: true
categories:
  - "Code"
tags:
  - "chat"
  - "encryption"
  - "pidgin"
  - "security"
description: Around the office, when someone security-minded finds out that I instant message (IM) over Pidgin (using Google Talk's service), there tends to be wailing a
metaKeywords: chat, encryption, pidgin, security
draft: false
---

Around the office, when someone security-minded finds out that I instant message (IM) over Pidgin (using Google Talk's service), there tends to be wailing and gnashing of teeth, because I am chatting in clear text over the wire.  I am encouraged to use a clunky, Windows-only, proprietary, corporate, different tool that is for internal talk with internal people.  "It's secure."  "It's encrypted," they say.  I never though I said too much of worth over chat, and what was occasionally awesome was well-encoded in l33t.  But, now my friend Dean teaches me the goodness of encrypting your IMs in Pidgin.

<!--more-->

First, install Pidgin and the pidgin-encryption plugin.  For Debian'ites, it's easy:

```bash
sudo apt-get install pidgin pidgin-encryption
```

For users who like to download their own binaries from the web, go to the [pidgin-encryption site](http://pidgin-encrypt.sourceforge.net/).

Once you install, start up [Pidgin](http://www.pidgin.im/) awesomely in [gnome-do](http://do.davebsd.com/):

![image](https://lh4.googleusercontent.com/_mA-9kCcx0bs/Ta7_wER1voI/AAAAAAAAAB8/FupSAZdUz0c/s800/PidginGnomeDo.png)

On the Pidgin Buddy, go to Tools > Plugins, and enable the Pidgin-Encryption plugin:

![image](https://lh3.googleusercontent.com/_mA-9kCcx0bs/Ta7_wur-zRI/AAAAAAAAACI/160M7IL5Ajs/s800/PidginPlugin.png)

Next, inform Pidgin that you want to start using encryption whilst chatting with someone who also has their chats through Pidgin encrypted.  In your chat window, there's a new padlock icon on the top menu bar.  Click it and "Enable Encryption":

![image](https://lh6.googleusercontent.com/_mA-9kCcx0bs/Ta8R2IMyHNI/AAAAAAAAACs/RAAczsPJFkI/s800/PidginEnableEncryption.png)

Once you start chatting with someone you'll both have to accept the public key that the other person is sending with their chats:

![image](https://lh5.googleusercontent.com/_mA-9kCcx0bs/Ta8BbyPeIrI/AAAAAAAAACU/G9hf5dV0ObA/s800/PidginEncrypt.png)

Finally, if you don't want to accept keys and do the hand shake every time, you can enable encryption on every chat with that person.  Go to your buddy list, find the person on the list, right click on them, and select "Turn Auto-Encrypt On":

![image](https://lh6.googleusercontent.com/_mA-9kCcx0bs/Ta7_wMsvbKI/AAAAAAAAACA/dSIeOT7_QnI/s800/PidginAlwaysOn.png)

Well, now you can chat freely with the best of them.  Open tool.  Open protocol.  Linux support.  Google contact list.  All for the low cost of zero.

  
