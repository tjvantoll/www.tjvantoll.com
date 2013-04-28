---
layout: post
title: "Trouble with Mobile Redirects Based on Screen Width"
date: 2013-02-24
comments: true
categories: [Mobile, Browsers]
published: false
---

Do a Google search for something generic like "redirect mobile site", and you will get a lot of results that propose the following approach:

``` html
<script>
    if (screen.width < 600) {
        window.location = '/path/to/mobile/site';
    }
</script>
```

The widths used vary but are usually somewhere between 400 and 600 pixels.  The problem is that this won't redirect a number of popular mobile devices.

### Inconsistencies with screen.width

On iPhones `window.screen.width` is `320`.  This applies not only to all versions of OS and hardware, but even the orientation of the device itself (`window.screen.width` remains `320` in portrait and landscape modes).

In Android things are different.
	
* Orientation
* window.innerWidth (fails on desktop browsers)
* window.devicePixelRatio

* http://jsfiddle.net/tj_vantoll/BqEHK/11/

Apparently on Chrome, iOS's window.screen.width rules apply???