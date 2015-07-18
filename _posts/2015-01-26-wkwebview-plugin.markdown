---
layout: post
title: "Speed Up Your Cordova App with the WKWebView Plugin"
comments: true
---

I woke up this morning to discover that the Telerik marketplace had a new WKWebView plugin:

<blockquote class="twitter-tweet" lang="en"><p>Instantly speed up your PhoneGap/Cordova app on iOS 8 with the new WKWebView plugin: <a href="http://t.co/hft7Y5GDUJ">http://t.co/hft7Y5GDUJ</a></p>&mdash; Rob Lauer (@rdlauer) <a href="https://twitter.com/rdlauer/status/559713567315075072">January 26, 2015</a></blockquote>

I had written about the [performance benefits of WKWebView](http://developer.telerik.com/featured/why-ios-8s-wkwebview-is-a-big-deal-for-hybrid-development/) before, and Eddy Verbruggen—the author of the WKWebView plugin—has done [some performance benchmarks](https://twitter.com/eddyverbruggen/status/531192220498792448) as well, so I knew the plugin would give a performance boost, but I had to see the benefits for myself.

<!-- more -->

So I did. I added the plugin to a few Cordova projects with `cordova plugin add https://github.com/Telerik-Verified-Plugins/WKWebView` and to a few AppBuilder ones with `appbuilder plugin add "WKWebView Polyfill" --release`.

<blockquote>
	<ul>
		<li>The <code>--release</code> flag is necessary because the WKWebView plugin currently conflicts with AppBuilder's LiveSync functionality. LiveSync is only included on debug builds, so the <code>--release</code> flag avoids the conflict. This does mean that you need to perform builds that also include the <code>--release</code> flag to test the WKWebView—e.g. <code>appbuilder build ios --release</code> or <code>appbuilder deploy ios --release</code>.</li>
		<li>AppBuilder apps must run Cordova 3.7 to take advantage of the WKWebView plugin. You can check which version of Cordova your AppBuilder app uses with <code>appbuilder prop print FrameworkVersion</code>, and change it to 3.7 with <code>appbuilder prop set FrameworkVersion 3.7.0</code>.</li>
	</ul>
</blockquote>

Installation is the only step to run the WKWebView plugin, which is pretty awesome. You just build your app with the plugin installed and that's it.

I could immediately tell that the performance difference was *noticeable*. It wasn't life altering, but it was there. I decided to make a brief video to show the difference in action, and to convince myself the change I seeing wasn't just in my head.

In the video below I run the same app twice, once with the WKWebView plugin installed (on the right), and once with it not (on the left). I made sure this app avoided the network, and I slowed the video down to 50% speed to make it easier to watch.

<iframe width="100%" height="315" src="//www.youtube.com/embed/4jYAjhYyH74" frameborder="0" allowfullscreen></iframe>

Now, this test isn't intended to be conclusive, statistically significant, or anything like that, and your experiences may vary. However, the performance difference shown in the video is consistent with what the statistics have shown, and what I've seen from playing with the plugin today: adding the WKWebView gives your hybrid app a small performance boost, basically for free. How much of a boost your app gets depends on what you're doing, with JavaScript-processing-heavy apps getting the most help, but even mundane apps like mine stand to benefit.

There are a few caveats that keep this plugin from being a true drop-in solution—for example third-party Cordova plugins that explicitly reference the UIWebView will be problematic—so you'll want to make sure to read through [the WKWebView plugin's documentation](http://plugins.telerik.com/plugin/wkwebview) before you update your production apps.

That being said, it's my opinion that everyone with a Cordova app should try adding the plugin. Assuming you don't hit one of the edge cases, installing the plugin gives your apps a free performance boost, so why not?
