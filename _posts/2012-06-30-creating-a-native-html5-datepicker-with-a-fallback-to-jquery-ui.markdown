---
layout: post
title: Creating a Native HTML 5 Datepicker with a Fallback to jQuery UI
comments: true
---

The recently released Chrome 20 features support for native datepickers on `<input>` nodes with a `[type=date]` attribute.  The list of browsers that support native datepickers now includes Chrome, Opera 11+, Opera Mobile, and iOS 5+ (see [caniuse.com](http://caniuse.com/#feat=input-datetime)).  Therefore, now is a great time to start using them in your web applications.

<!--more-->

## Using

Using the native datepickers is easy, just change the `type` attribute of your date inputs from `text` to `date`.

<pre class="language-markup"><code class="language-markup">&lt;!-- Before --&gt;
&lt;input type="text"&gt;

&lt;!-- After --&gt;
&lt;input type="date"&gt;
</code></pre>

Here is what the user will see in supported browsers:

### Chrome 20

![Chrome 20](/images/posts/2012-06-30/Chrome.png "Chrome 20")

### Opera 12

![Opera 12](/images/posts/2012-06-30/Opera.png "Opera 12")

### Opera Mobile

![Opera Mobile](/images/posts/2012-06-30/Opera Mobile.png "Opera Mobile")

### iOS 5

![iOS 5](/images/posts/2012-06-30/iOS5.png "iOS 5")

## Advantages

Why would use the native solution?

First and foremost there are no dependencies.  There is no need to bring in a library or toolkit, it's all native.  Therefore, you save some bytes by not having to ship the JavaScript / CSS to make the datepicker work.

Furthermore you can be guaranteed that it will work perfectly on all devices that support the native datepicker.  It's not dependent on JavaScript so it'll even work for users that have JavaScript disabled.

Another key advantage is that devices can give alternative means of input for date controls.  For example note the native date control in iOS 5:

![iOS 5](/images/posts/2012-06-30/iOS5.png "iOS 5")

It will be a lot easier for the user to input a date with those controls, plus you can be guaranteed that you'll receive input in the correct format.

## Disadvantages

The main disadvantage of using a native datepicker is that you have a lot less control.  There are no hooks to control the look of the date picker; you get what the browser wants to give you.  You also have a lot less control over the behavior.  Here's a small sampling of things that jQuery UI's datepicker can do that you cannot do with the native control.

* Only allow selection on certain days of the week.
* Control the formatting of the headers in the control (Monday vs Mon vs M).
* View multiple months at the same time.

If any of this functionality is important to your application you'll probably want to stick with the jQuery UI solution.

## Best of Both Worlds

[Modernizr](http://modernizr.com) gives you the ability to detect whether the browser supports native datepickers.  The following shows how you can use the native datepicker when available, and fallback to jQuery UI's picker in unsupported browsers.

<pre class="language-javascript"><code class="language-javascript">if (!Modernizr.inputtypes.date) {
    $('input[type=date]').datepicker({
        // Consistent format with the HTML5 picker
        dateFormat: 'yy-mm-dd'
    });
}
</code></pre>

You can see how your browser handles this situation here:

{% capture demo_height %}300{% endcapture %}
{% capture demo_path %}2012-06-30/date{% endcapture %}
{% capture demo_title %}Native datepicker with fallback{% endcapture %}
{% include post/demo.html %}

## Another Option

Another option I like is showing the native date picker only to users that are on touch capable devices.

<pre class="language-markup"><code class="language-markup">&lt;input type="date"&gt;

&lt;script&gt;
    if (!Modernizr.touch || !Modernizr.inputtypes.date) {
        $('input[type=date]')
            .attr('type', 'text')
            .datepicker({
                // Consistent format with the HTML5 picker
                dateFormat: 'yy-mm-dd'
            });
    }
&lt;/script&gt;
</code></pre>

This gives touch users with `input[type=date]` support the optimized UI / keyboard and everyone else jQuery UI's picker.

## Conclusion

With Chrome adding support for native datepickers a large chunk web users now have the ability to use them.  Therefore, now is a great time to consider using them in your applications.

### Update - September 15th, 2012

I updated one of my code examples from using ```$('input').attr('type', 'date')``` to ```document.getElementById('myDate').type = 'date'``` after commenter brownieboy pointed out that jQuery actually doesn't allow you to change an input's `type`.  jQuery does this because IE <= 8 does not allow an the `type` of an input to be changed at all.  The native JS solution works just fine.

### Update - May 27th, 2014

I updated the examples to set the [`dateFormat` of the datepicker](http://api.jqueryui.com/datepicker/#option-dateFormat) to `"yy-mm-dd"`, as that's consistent with what the HTML5 picker uses. That way you get a consistent format regardless of which picker you use.
