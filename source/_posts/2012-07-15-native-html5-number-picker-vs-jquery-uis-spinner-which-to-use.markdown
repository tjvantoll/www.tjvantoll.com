---
layout: post
title: "Native HTML5 Number Picker and jQuery UI's Spinner - Which to Use?"
date: 2012-07-15 21:07
comments: true
categories: [JavaScript, HTML5, jQuery UI]
---

[HTML5's native number picker](http://www.w3.org/TR/html5/number-state.html#number-state) (`<input[type=number]`) and jQuery UI 1.9's spinner can both be used to create inputs for numeric data.  So which makes sense for your application?  Let's start with a brief explanation of each. 

### `input[type=number]`

HTML5 adds several new valid `type` attributes for `<input>` elements.  One of them, `number`, can be used to create a number picker.

``` html
<input type="number" />
```

This will give present the user with a number picker in supported browsers, which, as of this writing includes Chrome, Safari, Opera, iOS, Opera Mobile, and Android 4.0+ ([full support list](http://caniuse.com/#feat=input-number)).  Here's what the user will see in supported browsers:

<!--more-->

##### Chrome 20:

![Chrome](/images/posts/2012-07-15/Chrome.png "Chrome")

##### Safari 5.1.7:

![Safari](/images/posts/2012-07-15/Safari.png "Safari")

##### Opera 12.00:

![Opera](/images/posts/2012-07-15/Opera.png "Opera")

##### Opera Mobile 12:
<img alt="Opera Mobile" title="Opera Mobile" src="/images/posts/2012-07-15/Opera_Mobile.png" style="height: 250px;" />

##### iOS 5:

<img alt="iOS" title="iOS" src="/images/posts/2012-07-15/iOS.png" style="height: 200px;" />

##### Android 4.1 (Jelly Bean):

<img alt="Android" title="Android" src="/images/posts/2012-07-15/Android.png" style="height: 200px;" />

As you can see one of the nicest effects of using `[type=number]` is that mobile users will automatically be presented with a number pad to aid with entry of numeric data.  Unsupported browsers will simply treat the `input[type=number]` as a normal text input.  Firefox has [recently added a UI-less version](https://bugzilla.mozilla.org/show_bug.cgi?id=344616) of `input[type=number]` to their nightly builds so hopefully a fully enabled version will be coming soon.

You can see what your browser does below:

<iframe style="width: 100%; height: 120px;" src="http://jsfiddle.net/tj_vantoll/XMEEz/1/embedded/result,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### Additional Functionality

The native number picker supports `min`, `max`, and `step` attributes to allow you to pick the minimum value of the `<input>`, the maximum value of the `<input>`, and the amount the value should be incremented / decremented when the user spins through values (the `step` attribute defaults to `1` if not specified).

For example, on the `<input>` below the browser will enforce that the minimum value will be `2`, the maxiumum value will be `20`, and the user will step at increments of `2`.

``` html
<input type="number" min="2" max="20" step="2" />
```

You can see how this behaves in your browser below:

<iframe style="width: 100%; height: 120px;" src="http://jsfiddle.net/tj_vantoll/YmQFS/embedded/result,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Just as a word of warning, Android 4.1 and iOS 5 do not support the `min`, `max`, or `step` attributes.

#### Methods

In addition to the new attributes, supporting browsers also provide 3  JavaScript methods specifically for `input[type=number]`.

* `stepUp(n)` - Increment the `value` of the `<input>` by `n`.
* `stepDown(n)` - Decrement the `value` of the `<input>` by `n`.
* `valueAsNumber` - Retrieve the `value` of the `input` as a JavaScript `number` variable (by default retrieving the `value` of an `<input>` returns a `string`).

### jQuery UI Spinner

jQuery UI's `spinner` is a new plugin due for jQuery UI's 1.9 release (currently in beta).  The plugin by default looks and behaves much like the native number picker.

<iframe style="width: 100%; height: 120px;" src="http://jsfiddle.net/tj_vantoll/scXYB/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

It also supports setting minimum, maximum, and step values through options rather than attributes.

``` html jQuery UI Spinner
<input id="spinner" />
<script>
    $(function() {
        $('#spinner').spinner({
            min: 2,
            max: 20,
            step: 2
        });
    });
</script>
```

Example:

<iframe style="width: 100%; height: 120px;" src="http://jsfiddle.net/tj_vantoll/N7UXT/1/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Above and Beyond

What really sets jQuery UI's `spinner` apart from the native picker is that it is extensible, customizable, and it brings a number of extra features.  Here are some of the additional things that you can do.

#### Paging

`spinner` takes a `page` option that allows you to define how much the `spinner` should step when the page down / page up keys are pressed.  The example below shows a `spinner` with a `step` value of `1` and a `page` value of `10`.

<iframe style="width: 100%; height: 150px;" src="http://jsfiddle.net/tj_vantoll/EvTeQ/1/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### Mousewheel

If you want mousewheel support for a `spinner` all you need to do is include [Brandon Aaron's mousewheel plugin](https://github.com/brandonaaron/jquery-mousewheel) and you get it automatically!  Try it out on any of the `spinner` demos on this page.

#### Currency

Ever need to accept currency at certain defined increments?  This example shows a `spinner` that spins through currency values at $25 increments, all with the same clean API.

<iframe style="width: 100%; height: 150px;" src="http://jsfiddle.net/tj_vantoll/2wEe6/3/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

The formatting is localized through [Globalize.js](https://github.com/jquery/globalize/), therefore, if you want to handle different currencies all you need to do is pass in the appropriate `culture` and include the necessary JavaScript dependencies.  Here's an example of an input that takes Euros. 

<iframe style="width: 100%; height: 150px;" src="http://jsfiddle.net/tj_vantoll/ppH7g/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### Time

If you need to accept time data `spinner` can be used for that as well.

<iframe style="width: 100%; height: 150px;" src="http://jsfiddle.net/tj_vantoll/2wEe6/5/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

The `page` option discussed earlier is used nicely here to make the up / down keys control the minutes and the page up / page down keys to controls hours.  Try it out on the example above.

### 24 Hour Times

Since the `spinner` uses Globalize.js, you're free to use a time system different than the United States' nonsensical one.

<iframe style="width: 100%; height: 150px;" src="http://jsfiddle.net/tj_vantoll/Kenve/2/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Time Picker vs. `<input type="time">`

HTML5 also provides a native time picker (`input[type=time]`), but, it has [nearly no support](http://caniuse.com/#feat=input-datetime), does not yet provide localized formatting, and does not provide the stepping/paging functionality that `spinner` has baked in.  In the future it might provide a viable native solution, but for now it's best to stay away.

#### Extensible and Customizable

Because `spinner` is built on top of [jQuery UI's widget factory](http://ajpiano.com/widgetfactory), it is easily extensible.  For example, let's say you need to build an input that accepts a year in which the modern summer olympics were held.  You could do that with the following:

```javascript Extending spinner
<input />

<script>
    $.widget( "tj.olympicspicker", $.ui.spinner, {
        options: {
            min: 1896,
            max: 2012,
            step: 4
        }
    });
    $(function() {
        $('input').olympicspicker();
    });
</script>
```

<iframe style="width: 100%; height: 150px;" src="http://jsfiddle.net/tj_vantoll/EsTYd/1/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Now all your olympics pickers in your code base can share the same code!

### `<input type="number">` vs. `spinner`

Although jQuery UI's `spinner` is more advanced and customizable, for most simple applications the native number picker will work just fine.  If you simply need a field that accepts numeric data there's no need to bring in `spinner` as a dependency.  However, if you do need the ability to fine tune the behavior and look of the picker, or if you need consistent UI across all browsers, jQuery UI's `spinner` provides an excellent API to do so.

To summarize the reasons to use the native picker are:

* Easy to implement, simply give an `<input>` a `type` attribute of `number`.
* There are no dependencies, the number picker is native to the browser.
* Mobile browsers that support the native picker will optimize the touch keyboard for number input.

And the reasons to use jQuery UI's `spinner` are:

* Browser support - The `spinner` will work all the way back to IE6.
* Extremely customizable and extensible.
* Customizable handling of the page up and page down keys.
* Easily integrated mousewheel support.
* Built in custom types such as currency and time.
* Built in i18n support.

### Using jQuery UI's Spinner to Polyfill `input[type=number]`

Another option is to use the native HTML number picker when it's available, and fallback to jQuery UI's `spinner` when it's not.

``` javascript Using jQuery UI to Polyfill input[type=number]
$(function() {
    var input = document.createElement('input');
    input.setAttribute('type', 'number');

    if (input.type == 'text') {
        $('input[type=number]').spinner();
    }
});
```

The code to detect `input[type=number]` support was taken from [another number picker polyfill by jonstipe](https://github.com/jonstipe/number-polyfill).  It creates an `<input>`, changes its `type` to `number`, and sees if that change actually took effect to determine whether the browser supports the type.  You could also use the `Modernizr.inputtypes.number` check from [Modernizr](http://modernizr.com) to achieve the same thing.

The `spinner` plugin is smart enough to look for the `step`, `min`, and `max` attributes on the `<input>` so you don't have to pass those in explictly ([thanks @bassistance](https://twitter.com/bassistance/status/225532234017406977)).

The benefit of this technique is that you get the benefits of the native picker when it's available, and you can count on having a number picker in all browsers.  As a further optimization you could even use a conditional script loader such as [yepnope.js](yepnopejs.com) to bring in jQuery UI's required JavaScript and CSS only when you need it.

### Using Spinner and Getting a Number Keyboard on Mobile

If you want to use a `spinner` everywhere AND get a number keyboard on mobile things get a little trickier.  Mobile browsers look for an `<input>` to have `type=number` to provide the number keyboard.  So you think this would be as simple as creating a `spinner` on a `<input[type=number]>` node.  However, that produces the following on supporting desktop browsers.

##### Chrome 20:

![Chrome](/images/posts/2012-07-15/Chrome-Dual.png "Chrome")

##### Safari 5.1.7:

![Safari](/images/posts/2012-07-15/Safari-Dual.png "Safari")

##### Opera 12.00:

![Opera](/images/posts/2012-07-15/Opera-Dual.png "Opera")

Obviously the double arrow UI is less than ideal.  So to work around this you simply need to hide or destroy one of the sets or controls... right?  

Well it turns out hiding the native arrow controls is difficult because Chrome places the control on the inside of the `<input>` and Safari and Opera place it on the outside.  Therefore, if you try to adjust the `margin` of the `<input>` so jQuery UI's controls overlap the native ones it won't work in a cross browser friendly way.

Therefore the best approach I've came up with is to hide the `spinner`'s arrow controls when the browser creates its own.

``` javascript Number keyboard for a spinner
$(function() {
    $('input[type=number]').spinner();
    if (Modernizr.input.step) {
        $('.ui-spinner-button').hide();
        $('.ui-spinner-input').css('marginRight', 0);
    }
});
```

What this does is detect whether the browser supports the `step` attribute, if it does it removes jQuery UI's controls.  What does the `step` attribute have to do with the arrow controls?  Nothing, except that it just *happens* that the browsers the support the `step` attribute also create a native control to do the stepping.  Is this going to change in the future?  Quite possibly.

So obviously this is not ideal, and probably shouldn't be used in production code, but it works at the moment.  Have a better approach for tackling this problem?  Let me know in the comments.
