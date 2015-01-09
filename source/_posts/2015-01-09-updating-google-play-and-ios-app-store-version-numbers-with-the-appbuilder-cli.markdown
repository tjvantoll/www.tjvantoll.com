---
layout: post
title: "Updating Google Play and iOS App Store Version Numbers with the AppBuilder CLI"
date: 2015-01-09 07:50
comments: true
categories: [AppBuilder, iOS, Android]
---

I had some issues updating iOS and Android version numbers yesterday so I thought I'd write up what I learned. Here's the scenario: you already have an [AppBuilder](http://www.telerik.com/appbuilder) app deployed to the iOS app store and Google Play, and you want to increase the app's version number from 1.0 to 1.0.1.

Doing so turns out to be as simple as running two commands:

```
$ appbuilder prop set BundleVersion 1.0.1
$ appbuilder prop set AndroidVersionCode 2
```

The [**`BundleVersion`**](http://docs.telerik.com/platform/appbuilder/configuring-your-project/project-properties-general#general-project-properties-in-the-appbuilder-command-line-interface) is publicly visible version number; it's what users see in Google Play and the iOS App Store. Under the hood, `BundleVersion` changes the [`CFBundleVersion`](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/20001431-102364) in your iOS app's Info.plist, and [`android:versionName`](http://developer.android.com/guide/topics/manifest/manifest-element.html#vname) in your Android app's AndroidManifest.xml.

The [**`AndroidVersionCode`**](http://docs.telerik.com/platform/appbuilder/configuring-your-project/project-properties-for-android-devices#android-project-properties-in-the-appbuilder-command-line-interface) corresponds to [`android:versionCode`](http://developer.android.com/guide/topics/manifest/manifest-element.html#vcode) in the Android app's AndroidManifest.xml, and is an integer value that Google requires you to update with each version of your app. You can increment it by 1, 10, or 10000—as long as it goes up. Google requires this because they let you set your `android:versionName` to any random string (unlike iOS, whose `CFBundleVersion` must be a number and has [well defined rules](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/20001431-102364)).

Running the `appbuilder prop` command updates your project's .abproject with these changes, so you'll want to commit those updates to your source control program of choice.

## What's this projectVersion property?

If you're like me and peruse configuration files more than the average person, you may have noticed a `projectVersion` property in your .abproject. Ignore this property, or at least try to. It's a meta property that AppBuilder maintains for its own purposes, and is not intended to be directly edited.

In fact, the entire .abproject is not intended to be directly edited. If you need to change something you see in .abproject do so with the `appbuilder prop` command. If you don't know what the property names mean, or the supported values, run `appbuilder prop print --help`.

Some property changes do nothing more than update the appropriate value your app's .abproject, but some property changes do more. For instance, running `appbuilder prop set FrameworkVersion 3.7.0` changes the `FrameworkVersion` in .abproject, but it also upgrades the cordova.*.js scripts within your project to version 3.7.0.

## Wrapping up

I hope this was helpful. If you have any other questions about this feel free to ask in the comments. Thanks to [Iva Koevska](https://twitter.com/admatha) for setting me straight on all of this.