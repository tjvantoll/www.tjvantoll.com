---
layout: post
title: "Opera Moves to WebKit - Why We Should Care"
comments: true
---

Opera [announced Wednesday](http://my.opera.com/ODIN/blog/300-million-users-and-move-to-webkit) that they are moving from their Presto rendering engine to WebKit.

The reaction I saw from most developers was mostly positive - one less rendering engine to support.

And yes, having one less rendering engine to support will make the lives of web developers easier.  But the loss of one of the web's core four rendering engines represents a slippery slope towards a WebKit monoculture.

<!--more-->

## WebKit - Our New Overlords?

On desktop there's still a healthy distribution between the 3 remaining rendering engines.  According to [StatCounter](http://gs.statcounter.com/#browser-ww-monthly-201201-201301), as of January 2013 Trident (Internet Explorer) has 30.7% of the market, Gecko (Firefox) has 21.4%, and WebKit picks up the rest:

<img src="/images/posts/2013-02-14/statcounter-desktop.png">

On mobile however, the loss of Presto gives WebKit a near monopoly:

<img src="/images/posts/2013-02-14/statcounter-mobile.png">

WebKit is, or will be, the rendering engine behind all browsers listed other than the [UC Browser](http://en.wikipedia.org/wiki/UC_Browser).  Gecko and Trident's mobile browsers are not even popular enough to be put in the key.

This is concerning.

## Why is One Rendering Engine Bad?

There seems to be a perception amongst web developers that if we had one rendering engine our lives would be so much easier.  And after years of wrestling with asinine browser differences this view is understandable.  But there are some fundamental problems with a single rendering engine having a monopoly.

### Standards

With only one rendering engine, the line between bugs and standard behavior becomes blurred.  The only way developers have to verify correctness is to refer to the appropriate specification.  Furthermore, standardization is less likely to happen in the first place.  For better or worse, when there is one rendering engine its behavior becomes the standard.

Tools are already being developed that target WebKit exclusively.  The following is from [Adobe's Edge tools](http://html.adobe.com/edge/):

> “Because you design in an environment based on WebKit, your content will display reliably across modern browsers and mobile devices.”

This sort of language is detrimental to Gecko and Trident's chances of being relevant, especially on mobile.

### Competition

Competition drives innovation.  Fewer rendering engines means less competition.

### Proprietary

Have you ever used window.showModalDialog?  It's an API [riddled with issues](http://tjvantoll.com/2012/05/02/showmodaldialog-what-it-is-and-why-you-should-never-use-it/), yet, it is now [standardized in the HTML5 specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dialogs-implemented-using-separate-documents).

Why?  When IE6 had a virtual monopoly on the browser world, a lot of applications were written that depended on the API.  And once an API is used on the web, it's almost impossible to change or remove it.

For WebKit this is less of a concern than it was with IE6, but there are still a lot of WebKit specific features that are not part of any specification ([prefixes](http://peter.sh/experiments/vendor-prefixed-css-property-overview/), for example).

## Business

From a business perspective Opera's move is an inevitability.  With the complexity of web browsers rapidly approaching Skynet, keeping up with a rendering engine that is backed by the likes of Google, Apple, Adobe, Nokia, RIM, and [many more](http://techcrunch.com/2013/02/09/apple-and-google-still-lead-webkit-development-but-more-smaller-companies-contributing/) is fighting a losing battle.

With Opera throwing their support behind WebKit as well, my primary concern is that it will become increasingly difficult for Gecko and Trident to keep up.

## Optimism

Despite this, I don't believe all is doom and gloom by any means.  This is not IE6 all over again.  WebKit is an open source project whose contributors are active participants in the web standards community.

It's also important to remember that [not all WebKits are created equally](http://quirksmode.org/webkit.html), WebKit browsers are fighting to distinguish themselves; innovation in the browser world has never been as strong as it is today.

That being said, the loss of a rendering engine is still a sad day for the web.  R.I.P. Presto.
