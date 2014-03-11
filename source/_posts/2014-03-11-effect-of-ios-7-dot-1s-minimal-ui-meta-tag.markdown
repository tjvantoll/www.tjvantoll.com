---
layout: post
title: "Effect of iOS 7.1's minimal-ui Meta Tag"
date: 2014-03-11
comments: true
categories: [Mobile, HTML, iOS]
---

One of the major, and [not well-received](http://www.mobilexweb.com/blog/safari-ios7-html5-problems-apis-review) changes introduced in iOS7 was the lack of a true full screen mode. Apple's answer was the introduction of a `minimal-ui` viewport property in iOS 7.1, which was released yesterday.

I wanted to quickly show the effect this property has. Adding it is as easy as appending `minimal-ui` to the `content` attribute of your site's `<meta>` tag.

``` html
<meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
```

The two images below show a before and after of applying the property to a test page.

![Without minimal-ui property status bars display](/images/posts/2014-03-11/before.png)
![With minimal-ui status bars do not show](/images/posts/2014-03-11/after.png)
