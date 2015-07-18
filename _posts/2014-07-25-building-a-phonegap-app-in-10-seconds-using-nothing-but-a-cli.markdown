---
layout: post
title: "Building a PhoneGap App in 10 Seconds Using Nothing But a CLI"
comments: true
---

You may have seen Burke Holland's ["Building A PhoneGap App in 36 Seconds Using Nothing But a Browser"](https://medium.com/@burkeholland/building-and-deploying-a-phonegap-app-in-36-seconds-6552399c12a8) article on Medium this morning. Although most people probably viewed the post as an interesting—and surprisingly fast—way of building an app, I saw the article as a direct challenge.

You see, although I work with AppBuilder in the browser from time to time, I prefer the AppBuilder CLI. And with the CLI, I can put Burke's 36 second time to shame. Below I build a PhoneGap app, performing the same steps Burke did, in TEN seconds:

<img src="/images/posts/2014-07-25/10-seconds.gif" alt="10 seconds to build an app">

<!--more-->

## Full Disclosure

* This was done using the [Telerik AppBuilder CLI](https://github.com/Icenium/icenium-cli).
* I did **NOT** speed up the screen capture.
* I **DID** practice this a few times.
* I **DID** have to lookup the syntax for the `sed` command, because it makes no sense.
* I **DID** use the [AppBuilder Companion app](http://www.telerik.com/appbuilder/companion-app), which I had pre-installed on my iPhone.
* I **DID** rely on the Bash history for speed, which I deem fair, because that's a thing CLIs do.

With the AppBuilder CLI installed (`npm install -g appbuilder`), and with the [AppBuilder iOS app](https://itunes.apple.com/us/app/telerik-appbuilder/id527547398?mt=8) installed, you can run this yourself with the following four commands:

<pre class="language-shell"><code class="language-shell">$ appbuilder create hybrid gif --template=Blank
$ cd gif
$ sed -i '' 's/Apache Cordova/gif/g' index.html
$ appbuilder livesync ios --companion
</code></pre>

What's really cool is that as of [the last AppBuilder release](http://blogs.telerik.com/appbuilder/posts/14-07-02/telerik-appbuilder-release-sharing-projects-cordova-update-nativescript-preview-and-more), you can now share your code across the AppBuilder clients. That means, I can collborate on Burke's project from the CLI, and he can collaborate on mine from the browser—which I think is pretty cool.
