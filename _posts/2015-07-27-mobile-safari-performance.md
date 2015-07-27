---
layout: post
title: "Mobile Safari's Performance is Not the Problem"
comments: true
---

Earlier this week [Nilay Patel](https://twitter.com/reckless/) of The Verge published an article about how [“The Mobile Web Sucks”](http://www.theverge.com/2015/7/20/9002721/the-mobile-web-sucks), which caught my attention, as I had [written about the mobile web's woes](http://developer.telerik.com/featured/the-webs-cruft-problem/) just a few days before.

But although both our articles argued that reading content on the mobile web can be less than ideal, our reasoning diverged when it came to explaining why. Whereas I argued that the issue is the web's broken monetization and advertising model, Nilay argued that the issue is performance, and more specifically, “the performance of Mobile Safari”. Or in longer form:

> “The entire point of the web was to democratize and simplify publishing using standards that anyone could build on, and it has been a raging, massively disruptive success for decades now. But the iPhone's depressing combination of dominant mobile web marketshare and shitbox performance means we're all sort of ready to throw that progress away.”

I don't often take time out of my day to defend Safari, but in this case I feel the great need to take a few minutes to explain why Nilay's argument is wrong, or at the very least off base.

<!--more-->

## Developers aren't upset about Safari's performance

The biggest error Nilay makes is conflating the recent developer backlash against Safari with his own misunderstanding of performance issues on mobile. For instance he uses the recently popular [“Safari is the new IE”](http://nolanlawson.com/2015/06/30/safari-is-the-new-ie/) article and the tweet below to support his performance issue claim.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">If Apple are throttling back on web platform work in Safari, I wish they&#39;d allow other browsers on iOS so someone else can have a go</p>&mdash; Jake Archibald (@jaffathecake) <a href="https://twitter.com/jaffathecake/status/612992537238896641">June 22, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Here's the specific wording Nilay used:

> “Apple totally forbids other companies from developing alternative web rendering engines for the iPhone, so there's no competition for better performance, and no incentive for Apple to invest heavily in Safari development. In many ways, Safari is the new Internet Explorer.”

What Nilay doesn't realize is developers' animosity towards Safari is primarily driven by the slow pace of new web standards appearing in Safari, and the lack of communication about why that's the case. Not performance. Jake's tweet in particular was in response to the [somewhat lackluster list of features coming in iOS Safari in iOS 9](https://developer.apple.com/library/prerelease/mac/releasenotes/General/WhatsNewInSafari/Articles/Safari_9.html#//apple_ref/doc/uid/TP40014305-CH9-SW27), coming off of a lackluster list of features in iOS 8 a year earlier. The entire “Safari is the new IE” article is about features that the author would like to see in Safari.

Nilay is correct that web developers, myself included, would indeed love to see alternative rendering engines on iOS, and the competition would undoubtedly encourage performance improvements, but we're mostly interesting in increasing the cadence of new web features making their way to iOS.

And actually, as someone whom has developed for the mobile web since it was a thing, and someone whom browses the web on iOS and Android devices daily, I would argue that iOS Safari is the most performant mobile browser out there. Of course that's just my personal experience, which is subjective, but the thought that iOS Safari is some glaring performance outlier in the mobile browsing world is crazy.

## Why is mobile browsing slow?

However, despite misinterpreting web developers' sentiments, Nilay does make one good point about mobile browsing that I'd like to address:

> “Safari on a MacBook is simply better at rendering the web than on an iPhone of roughly equivalent computing power.”

This statement is true, or at least I would agree with it, but the reason it's true is not because iOS Safari is so much worse at rendering webpages, it's because raw computing power has almost nothing to do with the speed at which you browse the mobile web. So what are the actual bottlenecks?

### The network

The mobile web's achilles heel is the network, because as it turns out, the extra hop mobile browsers need to take to get web assets from a radio tower is an [enormous performance hit](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/). And if your site is The Verge, and you [make 181 network requests](http://www.theverge.com/2015/7/24/9031267/one-verge-article-loads-9-5mb-across-263-http-requests#317856360), you have yourself a recipe for a miserable mobile browsing experience, regardless of the browser you use to render that mess.

### Memory

Even when you're on wifi, mobile browsers have other constraints compared to their desktop counterparts, most notably memory and disk space. Even though a four-year-old MacBook and modern iPhone may have equivalent processing power, modern devices are still well behind desktops in terms of RAM and sheer storage capacity. And this has repercussions on the mobile browsing experience because of caching.

The Verge uses a lot of resources to load a simple page, but if they were to set the cache headings on those resources appropriately, the user would be spared downloading those same resources on subsequent visits to the site—at least on desktop computers. The problem is, although mobile browsers have caches too, they're [notoriously small](http://www.webperformancetoday.com/2012/07/12/early-findings-mobile-browser-cache-persistence-and-behaviour/).

Whereas desktop caches are typically measured in triple-digit MBs (my Chrome install is rocking ~400 MB right now), mobile ones are typically measured in double, or even single digit MBs. For instance iOS Safari on my iPhone, which I use daily, is inexplicably storing a mere 184 KB—even though I have over 70 GB available on the device.

![Safari data usage on my iOS device](/images/posts/2015-07-27/ios-safari-usage.jpg)

Because of the tiny caches, mobile browsers have to re-retrieve assets from the network far more often than desktop browsers do. Couple this with the network woes inherit in mobile browsing, and you might understand why desktop Safari outperforms iOS Safari on computationally equivalent devices.

### Web views

There's one other caching-related problem that people don't think of as much, and that's [web views](http://www.stevesouders.com/blog/2014/10/09/do-u-webview/). If you're like me, you usually end up on sites like The Verge by clicking links from a social feed, such as your Twitter or Facebook timelines. But you might not realize that when you open that link, you're not being taken to Chrome or Safari, you're actually viewing the site in a native-app-embeddable instance of a browser, or a web view.

This is important from a performance perspective, because web views don't have access to the browser's cache. Even if The Verge had set its cache headings perfectly, and you had the entire site cached in iOS Safari, the web view would still naively grab each and every file anew from the painfully slow mobile network.

There is some good news on this front, as both Apple and Google recently announced a feature aimed at solving this problem. (It's amazing how that happens.) Apple calls them [Safari view controllers](http://www.macstories.net/stories/ios-9-and-safari-view-controller-the-future-of-web-views/), and Google calls them [Chrome custom tabs](http://www.androidpolice.com/2015/05/28/io-2015-chrome-custom-tabs-will-add-easy-and-rich-web-content-to-any-app-with-chrome-capabilities/), but both are essentially a smarter web view that has access to things like the cache and cookies.

## The bigger picture

Even though things like the network and memory constraints certainly contribute to the mobile web's woes, I would [continue to argue that the core issue is still the web's lack of monetization options](http://developer.telerik.com/featured/the-webs-cruft-problem/). The painfully slow speed at which The Verge loads has a lot more to due with the eight ads, “Recommended” links, and other such cruft that the site uses than with network or browser limitations. But in my experience, if you confront sites with this sort of performance data they'll defend it as a necessity... which is exactly what happened for this article on Twitter.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/satefan">@satefan</a> <a href="https://twitter.com/verge">@verge</a> You realize that &quot;bloat&quot; pays the salaries of editorial, product, design, video, etc etc etc, right?</p>&mdash; nilay patel (@reckless) <a href="https://twitter.com/reckless/status/623229284040183808">July 20, 2015</a></blockquote>

The most interesting thing I've read as part of this conversation was [Les Orchard's response to the same Verge article](http://blog.lmorchard.com/2015/07/22/the-verge-web-sucks/). In it he discussed [a few ideas to let users pay for the web](http://blog.lmorchard.com/2015/07/22/the-verge-web-sucks/#maybe-paying-for-the-web-can-be-better-), the most interesting of which I thought was this:

> “[W]hat if we actually accepted the fact that ads are a way of funding the web at large, and browsers themselves offered [built-in mechanisms to support advertising that respect privacy & performance](https://ffp4g1ylyit3jdyti1hqcvtb-wpengine.netdna-ssl.com/advancingcontent/files/2015/05/How-data-is-protected-Infographic1.pdf)? Yeah, that's a bit of a change from browsers' traditional neutrality. But, it could be a better deal for publishers and users together.”

I actually *really* like this idea. iOS and Android have both heavily embraced advertising as a reality for building software on their platforms. Just check out how amazingly polished each platform's advertising marketing pages are—[here's iOS's](https://developer.apple.com/iad/); [here's Android's](https://developers.google.com/ads/). The disparity between the ease of monetization that native provides, and the nebulous, ad-ridden model that the web uses has repercussions that extend beyond content and news sites.

For example, put yourself in the shoes of a developer that wants to directly make money off software they write. Are you going to build for a native platform with clearly documented monetization options, or a platform where the only way you can make money is to add bulky ads, each of which substantially degrades the user experience?

Of course, ads are going to degrade the experience regardless of the platform, but when the platform itself controls the ads it has the ability to minimize the performance impact on the end user, something the web's ad networks are failing at horribly today. Time will tell whether letting the browser control ads has merit, but it's the best idea aimed at solving the web's advertising problem that I've heard in a while.