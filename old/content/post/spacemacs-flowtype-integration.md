---
categories:
- "Code"
comments: true
date: 2017-07-31T07:04:21-06:00
description: "How to integrate flow with Spacemacs."
draft: false
image: "https://i.imgur.com/rYPNoPw.jpg"
layout: post
metaKeywords: "flow, flowtype, flow watch mode, flow emacs, flow spacemacs, flowtype in spacemacs"
tags:
- "spacemacs"
- "flowtype"
title: "Spacemacs Flowtype Integration"
---

This is a way to integrate [flow](https://flow.org/) with Spacemacs.

<!--more-->

## Install Flow

First, [put flow somewhere](https://flow.org/en/docs/install/) in your PATH so that Spacemacs can find and use the binary no matter what project you're editing.  The best option I've found so far is [flow-bin](https://www.npmjs.com/package/flow-bin), installed globally:

```bash
npm install -g flow-bin
```

## Spacemacs File Watcher

Preinstalled in Spacemacs, you'll find [flycheck](http://www.flycheck.org/en/latest/), which forms the foundation of the [syntax-checking](https://github.com/syl20bnr/spacemacs/tree/master/layers/%2Bcheckers/syntax-checking) Spacemacs layer.  
 
The syntax-checking layer is not installed by default, but you can easily add it to your `.spacemacs` config:

```lisp
(defun dotspacemacs/layers ()
  (setq-default
   dotspacemacs-configuration-layers
   '(
     syntax-checking
     )
  ))
```

syntax-checking allows files that you're editing to be parsed for correctness as you edit, providing realtime feedback of any errors that you've written.

## Flowtype Watcher

Now we need something that can plug into flycheck and do the flowtype checks for us.  That package is [flycheck-flow](https://github.com/lbolla/emacs-flycheck-flow).

Type `SPC :` and run the command `package-install`.  The find and select `flycheck-flow`.

## Flowtype Feedback

Once you're installed, you can get feedback from Flow within Spacemacs.

Some of this will happen inline.  You'll get red dots in the gutter with red underlines in your code.  If you move your cursor to that point, you will get tooltips describing the problem.

There are also a [set of commands](https://github.com/syl20bnr/spacemacs/tree/master/layers/%2Bcheckers/syntax-checking#key-bindings) for opening a list of flycheck errors.

This is the best flowtype integration with Spacemacs that I know of.  What other ways have you found to make this integration better?
