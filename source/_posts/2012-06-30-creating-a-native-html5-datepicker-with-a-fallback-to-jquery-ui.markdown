---
layout: post
title: "Creating a Native HTML 5 Datepicker with a Fallback to jQuery UI"
date: 2012-06-30 17:06
comments: true
categories: [jQuery UI, Browsers]
---

The recently released Chrome 20 features support for native datepickers on `<input>` nodes with a `[type=date]` attribute.  The list of browsers that support native datepickers now includes Chrome, Opera 11+, Opera Mobile, and iOS 5+ (see [caniuse.com](http://caniuse.com/#feat=input-datetime)).  Therefore, now is a great time to start using them in your web applications.

<!--more-->

### Using

Using the native datepickers is easy, just change the `type` attribute of your date inputs from `text` to `date`.

``` html Converting to a native HTML5 datepicker
<!-- Before -->
<input type="text" />

<!-- After -->
<input type="date" />
```

Here is what the user will see in supported browsers:

#### Chrome 20

![Chrome 20](/images/posts/2012-06-30/Chrome.png "Chrome 20")

#### Opera 12

![Opera 12](/images/posts/2012-06-30/Opera.png "Opera 12")

#### Opera Mobile

![Opera Mobile](/images/posts/2012-06-30/Opera Mobile.png "Opera Mobile")

#### iOS 5

![iOS 5](/images/posts/2012-06-30/iOS5.png "iOS 5")

### Advantages

Why would use the native solution?

First and foremost there are no dependencies.  There is no need to bring in a library or toolkit, it's all native.  Therefore, you save some bytes by not having to ship the JavaScript / CSS to make the datepicker work.

Furthermore you can be guaranteed that it will work perfectly on all devices that support the native datepicker.  It's not dependent on JavaScript so it'll even work for users that have JavaScript disabled.

Another key advantage is that devices can give alternative means of input for date controls.  For example note the native date control in iOS 5:

![iOS 5](/images/posts/2012-06-30/iOS5.png "iOS 5")

It will be a lot easier for the user to input a date with those controls, plus you can be guaranteed that you'll receive input in the correct format.

### Disadvantages

The main disadvantage of using a native datepicker is that you have a lot less control.  There are no hooks to control the look of the date picker; you get what the browser wants to give you.  You also have a lot less control over the behavior.  Here's a small sampling of things that jQuery UI's datepicker can do that you cannot do with the native control.

* Only allow selection on certain days of the week.
* Control the formatting of the headers in the control (Monday vs Mon vs M).
* View multiple months at the same time.

If any of this functionality is important to your application you'll probably want to stick with the jQuery UI solution.

### Best of Both Worlds

[Modernizr](http://modernizr.com) gives you the ability to detect whether the browser supports native datepickers.  The following shows how you can use the native datepicker when available, and fallback to jQuery UI's picker in unsupported browsers.

``` javascript Detect native support for datepickers and fallback to jQuery UI
if (!Moderniz.inputtypes.date) {
    $('input[type=date]').datepicker();
}
```

You can see how your browser handles this situation here:

<iframe style="width: 100%; height: 120px;" src="http://jsfiddle.net/p58bt/2/embedded/result,html,js/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Another Option

Another option I like is showing the native date picker only to users that are on touch capable devices.

``` html Native picker for supported touch users only
<input type="text" id="myDate" />

<script>
    if (Modernizr.touch && Moderniz.inputtypes.date) {
        document.getElementById('myDate').type = 'date';
    } else {
    	$('#myDate').datepicker();
    }
</script>
```

This gives touch users with `input[type=date]` support the optimized UI / keyboard and everyone else jQuery UI's picker.

### Conclusion

With Chrome adding support for native datepickers a large chunk web users now have the ability to use them.  Therefore, now is a great time to consider using them in your applications.

### Update - September 15th, 2012

I updated one of my code examples from using ```$('input').attr('type', 'date')``` to ```document.getElementById('myDate').type = 'date'``` after commenter brownieboy pointed out that jQuery actually doesn't allow you to change an input's `type`.  jQuery does this because IE <= 8 does not allow an the `type` of an input to be changed at all.  The native JS solution works just fine.
