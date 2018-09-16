---
layout: post
title: "Selecting a Directory in Electron"
date: "2016-03-21"
comments: true
categories:
  - "Code"
tags:
  - "js"
  - "electron"
description: Two ways to select a directory to open in Electron
metaKeywords: electron, directory, open, file input for directory, electron.js
draft: false
image: https://i.imgur.com/Vp8Zuix.jpg
---

Electron will help you make some sweet native desktop apps using web tech.  Now that you're on the desktop, one of the cool things you can do is access the filesystem.  There are a couple ways to access the filesystem via the file open dialog using user input events.

<!--more-->

## From HTML

In Electron, you use HTML for your views.  Thus, if you want the user to select a directory from the UI, you can use a `<input type="file" />`, just like in a normal web app.

#### Select Only Directories

To select only directories, there is an attribute you can add to the `input` tag:

```html
<input type="file"
       webkitdirectory />
```

This wouldn't be reliable in a cross-browser environment.  But since, on Electron, you're only targeting Chrome, you're golden with whatever Chrome has available to you.

#### Bonus: Programmatically click on `input[type="file"]`

As a bonus, Electron doesn't have the sandbox security restrictions that you would have in a standalone browser like Chrome.  In browsers, sometimes the file open dialog will fail if anything triggers the dialog besides the user clicking with their own mouse on the file input field.  Sometimes getting at the contents of the file will fail.  I'm too lazy to test which browsers do what at this point, but sad past experience has determined that this is unreliable.  

But in Electron, you are again liberated.  For instance, `input[type="file"]` is ugly and sometimes hard to style into exactly what you want.  So, it's often that you'll want to create a custom widget, that when _it's_ clicked, the `input[type="file"]` is clicked and the file open dialog is popped.  

Given:

```html
<button id="party" class="very-sweet-looking">Open</button>
<input id="business" type="file" style="display: none" />
```

This totally works:

```js
document.getElementById('party').addEventListener('click', _ => {
  document.getElementById('business').click()
})
```

## From Electron API

In the main process, you have access to an Electron API, `dialog`.  [`dialog#showOpenDialog`](http://electron.atom.io/docs/v0.37.2/api/dialog/#dialogshowopendialogbrowserwindow-options-callback) is a programmatic API that allows you to open the same open file dialog that you're used to in the browser.  What's even better is that here you can set that only directories should be openable rather easily:

```js
// mainWindow is your instance of BrowserWindow
const electron = require('electron')
const dialog = electrong.dialog
function selectDirectory() {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  })
}
```

In order to integrate this main process code with user interaction, we need to do a few things.

First, export the code from your main process module:

```js
exports.selectDirectory = function () {
  // dialog.showOpenDialog as before
}
```

And then in the renderer process, capture user events as before and call the main process function, `selectDirectory`:

```js
const electron = require('electron')
const remote = electron.remote
const mainProcess = remote.require('./main')
document.getElementById('party').addEventListener('click', _ => {
  mainProcess.selectDirectory()
})
```

Works pretty nicely, but feels weird that you have to go back to the main process to access a view-related API (as of Electron 0.37).

So, if there are two ways to do this, there has to be another, right?  What are you doing to select a directory in Electron?
