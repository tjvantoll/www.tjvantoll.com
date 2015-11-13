---
layout: post
title: Stop OS X From Formatting Command-Line Flags
comments: true
---

This is an article for all command-line users on OS X. Have you ever been typing in your email client, or some other OS X application, and had this happen:

<img class="plain" src="/images/posts/2015-11-13/hyphen-to-em-dash.gif">

It’s subtle, but OS X is replacing `nativescript --version` with `nativescript —version`, or more specifically, it’s converting `--` (two hyphens) into `—` (an em-dash).

<!--more-->

## Em-dash what?

I’ll let [an actual grammar site give a good explanation of what em-dashes are](http://www.thepunctuationguide.com/em-dash.html):

> “The em dash is perhaps the most versatile punctuation mark. Depending on the context, the em dash can take the place of commas, parentheses, or colons—in each case to slightly different effect.”

Em-dashes are really commonly used in writing of all sorts, but they’ve always been a bit of a pain to type. In the day of the typewriter you actually couldn’t type an em-dash at all, so a [convention was invented](http://www.getitwriteonline.com/archive/091502enem.htm): using two hyphens in place of an em-dash.

Nowadays we obviously have computers, but our keyboards still have no key to type an em-dash. Because of this inconvenience, word processing software has preserved the convention popularized in the typewriter days: automatically changing two hyphens into an em-dash. OS X takes this a step further and implements this convention at an operating system level, which is great when you’re writing the next great novel, and not so great when you just want to type `npm --help`.

## How do I turn this behavior off?

On OS X El Capitan there’s a “Use smart quotes and dashes” check box in the **System Preferences** > **Keyboard** > **Text** menu. Uncheck this box and OS X will no longer replace two hyphens with an em-dash.

<img class="plain" src="/images/posts/2015-11-13/os-x-keyboard-settings.png">

> This setting also keeps OS X from turning straight quotes into curly quotes—aka turning &quot;fancy&quot; into “fancy”. The [history behind straight and curly quotes](http://typographyforlawyers.com/straight-and-curly-quotes.html) is very similar to the em-dash/hyphen story.

With this setting off you need to use `Option` + `Shift` + `-` to type an em-dash, which is another built-in OS X keyboard shortcut. The shortcut takes some getting used to, but if you type em-dashes a lot you’ll get it down fairly quickly—plus, you won’t have to worry about OS X messing with your formatting 🎉.


