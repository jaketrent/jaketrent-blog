---
layout: post
title: "Selecting a Directory in Electron"
date: "2016-03-21"
lastmod: "2020-02-03"
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

Electron will give you a couple ways to open a directory from the filesystem.

<!--more-->

**Note: This article has been substantially updated from Electron 0.37 to Electron 7 architecture and recommendations.**

## 1. Easy Street From HTML

In Electron, you use HTML for your views.  Thus, if you want the user to select a directory from the UI, you can use a `<input type="file" webkitdirectory />`, just like in a normal web app.

The `webkitdirectory` attribute is there to enforce selecting only directories.

This wouldn't be reliable in a cross-browser environment.  But since, on Electron, you're only targeting Chrome, you're golden with whatever Chrome has available to you.

This method, however, won't work whenever non-standard HTML attributes are removed from the rendered DOM.  For instance, this will be stripped if you're using React for your view.

## 2. More Complex and Reliable From Main Process

For something that will work more reliably but with lots more to do, try this:

Electron ships two kinds of processes: Main and Renderer.  There is one Main process that kicks off and controls the app.  The Renderer process is available in the view of the app.  The Renderer process is closer to the `<input type="file" />` that we have setup to allow a user to select a directory.  But the Electron API that controls opening a file dialog is only available in the Main process.  Thus, we need to navigate our way through a couple layers to pass the proper information.

#### #0 Set Up Secure Views

In your Main process you setup a UI (ie, a `BrowserWindow`):

```js
let mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    nodeIntegration: false,
    enableRemoteModule: false,
    contextIsolation: true,
    sandbox: true
  }
})
```

There are a bunch of `webPreferences` here.  `nodeIntegration` is false by default since Electron v5 and is the reason for several of the steps below.  This is considered a "secure" data flow setup.

#### #1 Markup the File Input Normally

`type="file"` will make it a file chooser.  Give it something that you can find in the DOM later, like `id="dirs"`.

```html
<input type="file" id="dirs" />
```

#### #2 Capture Click in Renderer

Our view has a script that executes in the Renderer process.  Here, we capture the DOM click event.  We send a message via [Window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) saying that directories are going to be selected:

```js
document.getElementById('dirs').addEventListener('click', () => {
  window.postMessage({
    type: 'select-dirs'
  })
})
```

This message is identifiable by the arbitrarily-named `type` field, with the value of "select-dirs". This message will be listened to in a special Renderer process script called the Preloader.  

#### #3 Listen to the Message in Preloader

Preloader is special because it's a bridge between the Rendererer processes and the Electron APIs.  (Remember that `preload` `webPreference` setup previously?)  This is the only place within a Renderer process that non-browser APIs like Electron are available.

Here we will make the jump from the Renderer process to the Main process using IPC, or Inter-process Communication:

```js
const { ipcRenderer } = require('electron')

process.once('loaded', () => {
  window.addEventListener('message', evt => {
    if (evt.data.type === 'select-dirs') {
      ipcRenderer.send('select-dirs')
    }
  })
})
```

We listened for the `postMessage'.  Then we filter based on the `type="select-dirs"`.  Then we send our command from Renderer to Main.

#### #4 Listen for the IPC message

In the Main process, now we want to pick up that message:

```js
const { dialog, ipcMain } = require('electron')

ipcMain.on('select-dirs', async (event, arg) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  })
  console.log('directories selected', result.filePaths)
})
```

The matching `ipcMain` module will receive the message listened for and then call `dialog.showOpenDialog()`.  This is the method that will finally OPEN THE FINDER dialog, and we can select a directory from there.  `openDirectory` used as a `properties` here allows selection of directories.

This final strategy is pretty crazy.  But any Electron app of much size should probably see quite a bit of this kind of communication anyway.

To see this code as a working example, check out [jaketrent/demo-electron-directory](https://github.com/jaketrent/demo-electron-directory).

What about you?  How do you see the data flowing best?  Are there other ways to select a directory in Electron?

