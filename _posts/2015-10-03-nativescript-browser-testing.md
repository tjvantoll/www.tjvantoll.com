---
layout: post
title: Preview NativeScript Apps in a Browser with Appetize
comments: true
---

If you haven't heard of [Appetize.io](https://appetize.io) before, it's an awesome service that lets you run your native iOS and Android apps in a simulator that lives in a web browser. Using the service is as simple as uploading a `.app` or `.apk` file, but I thought I'd show you how it works in the context of a [NativeScript](https://www.nativescript.org/) app.

<!--more-->

To give you an idea of what the finished product looks like, here's what the [NativeScript Groceries sample](https://github.com/NativeScript/sample-Groceries) looks like running in Appetize:

<iframe src="https://appetize.io/embed/4q6jyttdgf0c2zg7ne9ekp96z0?device=iphone5s&scale=75&autoplay=false&orientation=portrait&deviceColor=black" width="300" height="600" frameborder="0" scrolling="no"></iframe>

<iframe src="https://appetize.io/embed/gz472kucwh88p6nxj3t4exdear?device=nexus5&scale=75&autoplay=false&orientation=portrait" width="325" height="600" frameborder="0" scrolling="no"></iframe>

## Building you app

Before heading into Appetize, you first need to generate the executables service needs, and you can do that with NativeScript's `build` command:

<pre class="language-shell"><code class="language-shell">$ tns build ios --emulator
$ tns build android --emulator</code></pre>

Providing the `--emulator` flag is important as Appetize expects an emulator build rather than a build intended for a physical device.

## Upload your app

Now that you've generated the executables, visit [Appetize.io](https://appetize.io) and click the “UPLOAD” button in the top-right corner of the screen:

![](/images/posts/2015-10-03/appetize-home.png)

On the upload page, scroll down and click the “Select file” button:

![](/images/posts/2015-10-03/appetize-step-1.png)

For Android, Appetize wants the `-debug.apk` file lives in your NativeScript project's `platforms/android/build/outputs/apk` folder:

![](/images/posts/2015-10-03/android-apk-location.png)

After the file upload completes, scroll to the bottom of Appetize's upload page, enter your email address, and hit the blue “Generate” button.

![](/images/posts/2015-10-03/appetize-step-2.png)

Appetize will send you a URL you can use to access your app. You can share that URL with your friends, coworkers, clients, or whoever else you'd like to see you app in action.

![](/images/posts/2015-10-03/appetize-email.png)

## Uploading for iOS

The process for uploading iOS apps is similar, although there is one additional step. Return to [Appetize's upload page](https://appetize.io/upload) and click the blue “Select file” button again. Next, navigate to your NativeScript project's `platforms/ios/build/emulator` folder and find the file that has the same name as your project:

![](/images/posts/2015-10-03/ios-app-location.png)

Appetize expects a `.zip` file for iOS, so right click on your application file and choose OS X's “Compress” option to create a `.zip` file with the same name:

![](/images/posts/2015-10-03/ios-app-location-2.png)

Finally, upload `platforms/ios/build/emulator/project-name.zip` and provide your email address again to get a URL to access your iOS app.

And that's it! Make sure to additionally check out [Appetize's embed documentation](https://appetize.io/embed) so you can figure out how to embed apps in a web page like I did above.


