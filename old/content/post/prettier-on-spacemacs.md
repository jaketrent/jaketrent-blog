---
categories:
- "Code"
comments: true
date: 2017-06-23T18:14:18-06:00
description: "These days, getting prettier into spacemacs is easy."
draft: false
image: "https://i.imgur.com/rYPNoPw.jpg"
layout: post
metaKeywords: "spacemacs, emacs, prettier, javascript formatting"
tags:
- "tools"
- "spacemacs"
- "js"
title: "Prettier on Spacemacs"
---

These days, getting [prettier](https://github.com/prettier/prettier) into spacemacs is easy.

<!--more-->

I've tried a few different methods, and recently I tried again and found one that worked well out of the box.  There is a repo for `spacemacs-prettier` at [praveenperera/spacemacs-prettier](https://github.com/praveenperera/spacemacs-prettier) that is the best I've found so far.

## Install

To install, clone [the repo](https://github.com/praveenperera/spacemacs-prettier) into `~/.emacs.d/private/`:

```bash
cd ~/.emacs.d/private/
git clone git@github.com:praveenperera/spacemacs-prettier.git
```

Next, use `SPC f e d` to open your `.spacemacs` file.  Add `spacemacs-pretter` to your config there:

```lisp
(defun dotspacemacs/layers ()
    (dotspacemacs-configuration-layers '(spacemacs-prettier))
)
```

## Format on Save

There are some great setups to [format on commit](https://jaketrent.com/post/format-javascript-with-prettier/).  If you want to format with prettier every time you *save* within Spacemacs, you can also add some config for that.

Open your `.spacemacs` file again, and a hook for every mode you care to format on save in:

```lisp
(defun dotspacemacs/user-config ()
    (add-hook 'js2-mode-hook 'prettier-js-mode)
    (add-hook 'web-mode-hook 'prettier-js-mode)
)
```

## Adjust Prettier Config

And of course, you want to add the one true prettier options to your formatting:

```lisp

(defun dotspacemacs/user-config ()
    (setq prettier-js-args '(
                             "--no-semi"
                             "--single-quote"
                             ))
)
```

:) 

Now you should be set.  Slap some nasty js in the buffer, `SPC f s`, and it's pretty!

Do you have any other interesting prettier configurations within Spacemacs?
