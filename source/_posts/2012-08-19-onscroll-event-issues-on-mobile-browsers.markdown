---
layout: post
title: "onscroll Event Issues on Mobile Browsers"
date: 2012-08-19
comments: true
categories: [Mobile, Browsers, JavaScript]
---

All browsers fire an `onscroll` event on the `window` object whenever the window is scrolled.  On desktop browsers this event is fired continuously as the user scrolls, but on most all mobile browsers the event is not fired until the *scrolling action* comes to a complete stop.
<!--more-->
You can see this by scrolling in the example below:

<iframe style="width: 100%; height: 300px;" src="http://jsfiddle.net/tj_vantoll/p4pww/13/embedded/result,html,js,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

The `onscroll` event count and the value of `window.scrollY` ([the number of pixels the document has been scrolled vertically](https://developer.mozilla.org/en-US/docs/DOM/window.scrollY)) displayed on the top of the screen in the example are updated in an `onscroll` event handler.

If you're viewing this on any desktop browser you'll see that as you scroll the `onscroll` event is continuously firing, `window.scrollY` is continuously updating, and the blue box (which is present so you can visibly tell whether the browser re-paints the screen) is continuously moving.

### Enter Mobile

If you try the same demo on iOS Safari (5.0), the default Android browser <= 2.3, Opera Mobile, or IE on Windows Phone 7 you'll notice something quite different.  As you scroll the `onscroll` event isn't fired, `window.scrollY` isn't updated, and the blue box does not move until the scrolling has come to a complete stop.

You can see this in the video below (the video shows iOS Safari but the same behavior occurs in the other listed browsers):

<iframe width="420" height="315" src="http://www.youtube.com/embed/5-vOJEP3x28" frameborder="0" allowfullscreen></iframe>

### Why

These mobile browsers simply do not fire the `onscroll` event until scrolling has completely stopped.  This includes not only the touch based scrolling itself, but additionally any momentum that the user gives on the scroll.  The event will not fire until it stops.  This is a problem if you want to apply a visual change to the screen as the user scrolls.

### Other Mobile Browsers

Firefox for Android does fire the `onscroll` event and updates `window.clientY` as you scroll, but strangely it doesn't re-paint the screen for any changes that have been applied.

The Android browser in Ice Cream Sandwich fires the event but doesn't feel very responsive and only sporadically re-paints the DOM to move the blue box.  Luckily, Jelly Bean's Android browser handles this example perfectly; everything is updated and rendered smoothly as the user scrolls.

### The Problem

In my case I wanted to apply a change to the DOM for every pixel that the user scrolled, exactly like moving the blue box in the example above.

So the question is, can we work around this limitation and get desktop `onscroll` functionality in a mobile friendly way?

### Workaround Attempt - setInterval

My first attempt was to set an interval that did what I wanted to do in the `onscroll` event.  Yes the code will run continuously instead of just when the user scrolls, but it's somewhere to start.

<pre class="language-javascript"><code>
setInterval(function() {
	// Logic
}, 20);
</code></pre>

The problem with this approach is that iOS Safari, Android <= 2.3, and Opera Mobile do not run any functions queued through `setInterval` or `setTimeout` while a scroll is being performed.  The execution will simply be paused until the scroll has completed.

Here's an example that simply appends an asterisk to a div every 500 milliseconds using `setInterval`:

<iframe style="width: 100%; height: 300px;" src="http://jsfiddle.net/tj_vantoll/NfkEg/7/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

If you're viewing this in a desktop browser and you scroll, you can see that the asterisks will continue to be created.

However, on the affected mobile browsers (iOS Safari, Android <= 2.3, Opera Mobile), because the function queued through `setInterval` is paused, asterisk creation stops the moment you start scrolling and doesn't resume until you stop.

This video shows this behavior on iOS Safari (5.0):

<iframe width="560" height="315" src="http://www.youtube.com/embed/XkLvV9aPcYQ" frameborder="0" allowfullscreen></iframe>

This example works perfectly (scrolling doesn't stop asterisk creation) on the default Ice Cream Sandwich / Jelly Bean browser, Firefox for Android, and IE for Windows Phone 7.

### Workaround Attempt 2 - Use Touch Events

Since the `setInterval` approach failed on the big mobile browsers my next thought was to use touch events instead.

Most mobile browsers fire [Apple's flavor](http://blog.jquery.com/2012/04/10/getting-touchy-about-patents/) of [touch events](https://developer.mozilla.org/en-US/docs/DOM/Touch_events) as the user interacts with the screen via touch (the notable exception being Window's Mobile since Microsoft has their own touch model).

In particular the `ontouchmove` event is fired as the user moves their finger (or stylus, etc) across the screen.  Since users on touch devices need to move their finger across the screen to scroll, this seemed like the perfect alternative to `onscroll`.

Therefore I modified my example to use `ontouchmove` instead of `onscroll`:

<iframe style="width: 100%; height: 300px;" src="http://jsfiddle.net/tj_vantoll/RFdve/10/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

If you scroll on the above example on a desktop browser nothing will be updated since the counters are being driven by the `ontouchmove` event.  On mobile browsers a wide variety of things happen:

* Android: The `ontouchmove` event does get fired as the user moves the screen.  However the DOM updates are very sporadic and feel very jerky.  This is true of the default Android browser in Gingerbread, Ice Cream Sandwich, and Jelly Bean although it gets better in later versions.
* Firefox for Android: The `ontouchmove` events fires but DOM updates made in the `ontouchmove` event take effect sporadicly if at all.  Everything feels very jerky at best.
* Opera Mobile: `ontouchmove` events occur but DOM changes are not applied until scrolling is complete.
* iOS Safari: On `ontouchmove` event is fired as the screen is moved and the DOM does get re-painted.  This is only mobile browser where this approach made a substantial difference.  

One consistent issue with this approach is that the `ontouchmove` event is only fired when the user's finger remains on the screen.  Meaning, if the user gives any momentum to the scroll, `ontouchmove` events will not be fired while the window is scrolling and their finger is not on the screen.

You can see this in the video below:

<iframe width="420" height="315" src="http://www.youtube.com/embed/wied94KmwKw" frameborder="0" allowfullscreen></iframe>

So what does all of this mean about using the `ontouchmove` event to mimic desktop `onscroll` functionality?   At the moment there are too many inconsistencies to rely on this behavior in any way.  If you only need to support iOS Safari this approach works reasonably.

### Workaround Attempt 3 - Don't *Really* Scroll

Another *solution* out there is to disable native scrolling altogether and use JavaScript to mimic scrolling instead.

<pre class="language-javascript"><code>
$('window').on('touchmove', function(event) {
    //Prevent the window from being scrolled.
    event.preventDefault();

    //Do something like call window.scrollTo to mimic the scrolling
    //request the user made.
});
</code></pre>

Unfortunately such techniques are usually utilized to create fixed height/width scrolling areas and are not intended (nor especially practical) for full screens.  If you are only interested in a scrolling event for a small section of the page you might want to look into something such as [iScroll 4](http://cubiq.org/iscroll-4).

### Conclusion

Unlike desktop browsers, most all mobile browsers simply do not fire an `onscroll` event until the scrolling action comes to a complete stop.

The only mobile browser that handled this event elegantly in my testing was Android's Jelly Bean browser.  Therefore, if you need any sort of cross browser support you're simply out of luck; there is simply no cross browser viable workaround to mimic the desktop behavior.  If you have had success implementing this by some other means please let me know in the comments.

### Disclaimer

I haven't been able to test this in Chrome for Android and I know there are other mobile browsers that I'm missing.  If someone else has this capability I'd love to know how they handle these situations.

Also while I did verify these findings on physical devices for Firefox for Android, Android 2.3's default browser, and Safari on iOS 5; the rest of my testing was limited to simulators / emulators.  From past experience I know that simulator / emulator testing is no substitute for the real thing.  Therefore, if you find any discrepancies in my findings please let me know in the comments so I can update the post.
