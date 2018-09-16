---
categories:
  - "Code"
comments: true
date: 2017-02-28T06:50:04-07:00
description: "Chrome has a nice tool for running an easy accessibility audit."
draft: false
image: "https://i.imgur.com/w0DFSZA.jpg"
layout: post
metaKeywords: "accessibility, chrome, testing, axe-core, aria"
tags:
  - "accessibility"
  - "tools"
title: "Accessibility Audit in Chrome"
---

Did you know that you can run an accessibility audit on your site from Chrome?  Simply add a Chrome extension, read the errors and warnings, and you're on your way to fixing the issues.

<!--more-->

## Chrome Extension

The tooling for running the audit is available in the Chrome Web Store as an [Accessibility Developer Tools extension](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb?hl=en).  Download and install to add the extension to Chrome.

Once installed, access the new panel in the developer tools.  Press `cmd-opt-i` or the equivalent to open the Developer Tools.  Click the Audit tab, and you should see this panel:

![chrome dev tools audit panel](https://i.imgur.com/nEpwQc0.jpg)

From here, select the 'Accessibility' audit, and you can click `Run` to run the audit.  Note that you can run this on local webpages as well, so this is a great local dev tool.

## The Results

Once you click run, you'll get a list of accessibility issues, either at the level of error or warning.  Go from top to bottom, and you should be resolving issues in order of severity.

![list of accessibility infractions](https://i.imgur.com/mwMLRcD.jpg)

To get more information on the errors, there are great links to small explanations of the [rules](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).  For instance, this one about [AX_ARIA_10](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules), "This element has an unsupported ARIA attribute".

![specific AX_ARIA_10 infraction](https://i.imgur.com/fw4snXc.jpg)

For even more information about things like ARIA properties, the w3c has some more comprehensive documentation, such as its [Supported States and Properties](https://www.w3.org/TR/wai-aria/states_and_properties) page.

Once you fix up your markup, you can re-run the audit to see the errors go away.  Wouldn't it be cool if there was a hot-reload type feature here for auto rerunning of the audit?

## Run Automated Accessibility Tests

The underlying library that powers this accessibility audit in Chrome is called [axe-core](https://github.com/dequelabs/axe-core).  It can be run programmatically, thus dropped into any of your browser-running test suites (eg, functional tests in Selenium).

Thank you [Maureen](https://twitter.com/maureencodes) for introducing me to this great tool.

What other handy dandy tools have you found for testing for different accessibility issues?
