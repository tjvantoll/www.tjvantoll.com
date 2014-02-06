---
layout: post
title: "Connecting AppBuilder Projects to Facebook"
date: 2014-02-06 13:08
comments: true
categories: [Telerik, AppBuilder]
---

One commonly requested, and non-trivial requirement PhoneGap/Cordova apps often have is Facebook integration. To perform the actual integration, hybrid Cordova apps have an advantage over traditional web apps: they can leverage the platform's native Facebook APIs.

The bridge between the JavaScript APIs and the native APIs takes the form of a Cordova plugin, named - crazily enough - the [Cordova Facebook Plugin](https://github.com/phonegap/phonegap-facebook-plugin). In this article we'll give a step-by-step guide to integrating this plugin into an [AppBuilder](http://www.telerik.com/appbuilder) application; then we'll see what we can do with it.

*Note: If you want to cut straight to the chase, the final example with the integration complete is available at [https://github.com/tjvantoll/Facebook-Connect](https://github.com/tjvantoll/Facebook-Connect). You can [clone this project directly in AppBuilder](http://blogs.telerik.com/appbuilder/posts/13-12-19/git-started-with-github-in-mist).*

<!--more-->

### Adding the Plugin

The first step to adding the plugin is to download it from [https://github.com/phonegap/phonegap-facebook-plugin](https://github.com/phonegap/phonegap-facebook-plugin) - just click the *Download ZIP* button.

Then, with your project open in AppBuilder, select the `Plugins` directory, and select *Add* --> *From Archive* from the menu bar.

![Location of the From Archive menu](/images/posts/2014-02-06/step-1.png)

Select the ZIP file we just downloaded and click *Upload*.

![Add from archive dialog with newly download zip selected](/images/posts/2014-02-06/step-2.png)

Now add the following two `<script>` tags to your project's `index.html` file:

``` html
<script src="cdv-plugin-fb-connect.js"></script>
<script src="facebook-js-sdk.js"></script>
```

The plugin is now a part of your project, but before we dig into the its APIs, we have a bit of configuration we have to change.

### Configuring the Plugin

In order for the Cordova plugin to speak to the native Facebook APIs, it has to know the id and name of *your* Facebook application. To get this, head over to [https://developers.facebook.com/](https://developers.facebook.com/) and login to your app's dashboard settings. (If you don't have an app built in Facebook, you'll need to create one.) Here's what my app looks like:

![The dashboard of my Facebook application](/images/posts/2014-02-06/facebook-dashboard.png)

The two things we're interested in are the **App ID** and the **Display Name**. Take note of these and head back to AppBuilder, as we need to add these configuration variables to the plugin's `plugin.xml` file. Start by opening up `plugin.xml` and removing the two `<preference>` tags shown below.

![Visualization of earlier described steps](/images/posts/2014-02-06/step-3.png)

In Cordova plugins, `plugin.xml` files' `<preference>` tags are placeholders; they're a way of indicating that you need to change these strings elsewhere in the file. In the case of this plugin, you'll find `APP_ID` and `APP_NAME` used a few times as shown in the image below. You'll need to update the placeholder values with your app's actual data.

![Visualization of earlier described steps](/images/posts/2014-02-06/step-4.png)

And that's it! We now have Facebook integrated into our app, including the ability to use the full [Facebook JavaScript SDK](https://developers.facebook.com/docs/javascript/). So what can we do with it?

### Using the Facebook JavaScript SDK

Facebook's APIs are provided through a `FB` global variable, and the first thing you must do with it is call `FB.init()`.

``` javascript
FB.init({
    appId: "204075246457176",
    nativeInterface: CDV.FB
});
```

You can see that we again need to provide our Facebook's app id. We also need to set a `nativeInterface` property to `CDV.FB`. You won't find this property on Facebook's documentation, but it's what tells the Cordova plugin to step in and do its thing.

From here, there are several things we can do, but most of them require the user to be logged into Facebook. We can check whether the user is logged in using `FB.getLoginStatus()`.

``` javascript
FB.getLoginStatus(function( response ) {
    if ( response.status === "connected" ) {
        alert( "logged in" );
    } else {
        alert( "not logged in" );
    }
});
```

Or we can just prompt the user to login with `FB.login()`. Like most of Facebook's API methods, the first argument to `FB.login()` is a callback function to run when the login completes. The second argument is an object with a single `scope` property. The `scope` property needs to contain a comma delimited list of permissions your application needs. Here, we're asking the user to give us access to their email address.

``` javascript
FB.login(function( response ) {
    // Handle the response
}, { scope: "email" });
```

*Note: Refer to Facebook's SDK documentation for a [full list of the permissions you can request](https://developers.facebook.com/docs/reference/login/extended-permissions).*

When you call `FB.login()`, if the user is *not* logged in, they'll see a Facebook login form in a popup.

![Facebook login on Nexus 7](/images/posts/2014-02-06/nexus-7-no-login.png)

If they are logged in, they'll have to confirm that they want to give your application access to the information you requested.

![Facebook login on Nexus 7](/images/posts/2014-02-06/nexus-7-login.png)

Once they have given access, you can use Facebook's API to access what you need. For example the following retrieves the id, name, and picture of the user's friends.

``` javascript
FB.api( "/me/friends", { fields: "id, name, picture" });
```

### Wrapping up

To show this API in action, I built an AppBuilder app that logs the user in, and displays their friends in a [Kendo UI Mobile ListView](http://demos.telerik.com/kendo-ui/mobile/listview/index.html). The app is available at <https://github.com/tjvantoll/Facebook-Connect>.

If you try this out, please let me know if everything works alright for you in the comments below. If there are any additional integrations or examples you'd like to see, let me know that as well.
