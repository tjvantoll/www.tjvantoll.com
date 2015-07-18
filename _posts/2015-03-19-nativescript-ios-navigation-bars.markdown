---
layout: post
title: "NativeScript Quick Tip: Managing iOS Navigation Bars"
comments: true
---

I've gotten a whole lot of questions about adding navigation bars to NativeScript iOS apps, so I thought I'd write a quick post about it.

<!-- more -->

## Showing the navigation bar with a title

Let's say you have the following simple NativeScript app:

<pre class="language-markup line-numbers"><code class="language-markup">&lt;!-- main-page.xml --&gt;
&lt;Page loaded="pageLoaded"&gt;&lt;/Page&gt;</code></pre>

<pre class="language-javascript line-numbers"><code class="language-javascript">// main-page.js
function pageLoaded(args) {
    var page = args.object;
}</code></pre>

By default this app does not show a navigation bar, because that's the default iOS behavior as well. Here's how you can alter your JavaScript to show the navigation bar on iOS with a title:

<pre class="language-javascript line-numbers"><code class="language-javascript">// main-page.js
var frameModule = require("ui/frame");

exports.pageLoaded = function(args) {
	var page = args.object;

	// Make sure we're on iOS before making iOS-specific changes
	if (page.ios) {

		// Tell the frame module that the navigation bar should always display
		frameModule.topmost().ios.navBarVisibility = "always";

		// Change the UIViewController's title property
		page.ios.title = "My Awesome App";

		// Get access to the native iOS UINavigationController
		var controller = frameModule.topmost().ios.controller;

		// Call the UINavigationController's setNavigationBarHidden method
		controller.navigationBarHidden = false;
	}
};</code></pre>

Here's what this looks like:

<img src="/images/posts/2015-03-19/ios-nav-bar.png" class="plain" alt="">

All that you're doing here is invoking iOS APIs using the NativeScript runtime. `page.ios.title` sets the [`UIViewController`'s `title` property](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIViewController_Class/#//apple_ref/occ/instp/UIViewController/title); `controller.navigationBarHidden` calls the [`UINavigationController`'s `setNavigationBarHidden` method](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UINavigationController_Class/#//apple_ref/occ/instm/UINavigationController/setNavigationBarHidden:animated:). That's it.

This means that in NativeScript you're not limited to what NativeScript provides; if an API exists in iOS or Android you can just call it. Let's look at one more example.

## Changing the navigation bar's color

Let's say you want to change your navigation bar's background color. Here's how you make the navigation bar red:

<pre class="language-javascript line-numbers"><code class="language-javascript">// main-page.js
var frameModule = require("ui/frame");

exports.pageLoaded = function(args) {
	var page = args.object;

	// Make sure we're on iOS before making iOS-specific changes
	if (page.ios) {

		// Tell the frame module that the navigation bar should always display
		frameModule.topmost().ios.navBarVisibility = "always";

		// Change the UIViewController's title property
		page.ios.title = "My Awesome App";

		// Get access to the native iOS UINavigationController
		var controller = frameModule.topmost().ios.controller;

		// Access the UINavigationBar and change its barTintColorProperty
		controller.navigationBar.barTintColor = UIColor.redColor();

		// Call the UINavigationController's setNavigationBarHidden method
		controller.navigationBarHidden = false;
	}
};</code></pre>

Here's what that red navigation bar looks like:

<img src="/images/posts/2015-03-19/ios-red-nav-bar.png" class="plain" alt="">

Again, all that you're doing here is invoking iOS APIs with the NativeScript runtime. `controller.navigationBar` gets a reference to the app's [`UINavigationBar`](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UINavigationBar_Class/index.html), and `navigationBar.barTintColor = UIColor.redColor()` changes its [`barTintColor`](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UINavigationBar_Class/index.html#//apple_ref/occ/instp/UINavigationBar/barTintColor) property.

## What else can you do?

Anything iOS allows you to do. Seriously. Obviously when you make these very iOS-specific changes some knowledge of iOS is required, and some knowledge of [how NativeScript handles marshalling between Objective-C and JavaScript](http://docs.nativescript.org/runtimes/ios/marshalling/Marshalling-Overview.html) certainly helps, but I still think it's cool that you can access these native APIs so easily—in JavaScript even!

The appeal of NativeScript is that over time more and more of these common tasks are going to be abstracted into platform-agnostic modules so that you don't have to know the platform-specific details. [There are already dozen of modules out there](https://github.com/nativescript/cross-platform-modules), and new ones are being added with each release.
