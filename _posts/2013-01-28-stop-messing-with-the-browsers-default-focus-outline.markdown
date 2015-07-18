---
layout: post
title: "Stop Messing with the Browser's Default Focus outline"
comments: true
---

This is the latest in my series of accessibility best practices after getting frustrated with using a keyboard on the internet.  Last time I talked about [enter submitting forms](/2013/01/01/enter-should-submit-forms-stop-messing-with-that/), this time I'm going to explain why removing the browser's default focus `outline` is a bad idea.

## Focus Rings

All browsers have a default value they apply to the currently focused item.  For example Chrome on OS X uses the following:

<pre class="language-css"><code class="language-css">:focus {
    /* -webkit-focus-ring-color = '#5B9DD9' */
    outline: -webkit-focus-ring-color auto 5px;
}
</code></pre>

<!--more-->

Firefox uses a `1px dotted #212121` outline, other browser use other values.  The focus ring looks like this for Chrome on OS X:

![Default Focus Ring in Chrome on OS X](/images/posts/2013-01-28/default.png "Default Focus Ring in Chrome on OS X")

Keyboard users **depend** on this `outline` to determine where they are on the page.  I cannot stress **depend** enough, without the `outline` you have no idea where you are.  Don't believe me?  Go to [cnn.com](http://www.cnn.com) right now.  Hit tab a few times and try to figure out where the hell you are on the page.

The `outline` *can* be removed with the following:

<pre class="language-css"><code class="language-css">:focus {
    outline: 0;
    /* or */
    outline: none;
}
</code></pre>

This is obviously bad per the reasoning above.  The HTML5 specification has [the following to say](http://www.whatwg.org/specs/web-apps/current-work/multipage/editing.html#element-level-focus-apis) about removing the default `outline`:

> “...if an alternative focusing style isn't made available instead, the page will be significantly less usable for people who primarily navigate pages using a keyboard, or those with reduced vision who use focus outlines to help them navigate the page.”

## Custom Focus Outlines

As the spec mentions, you can create your own styling for focused items instead of using the browser's default.  For example the following will change all focused links to white text on a black background:

<pre class="language-css"><code class="language-css">:link:focus, :visited:focus {
    outline: none;
    background-color: black;
    color: white;
}
</code></pre>

Although this is possible, I would **strongly** recommend simply leaving the default browser `outline` in place.  Changing the default display messes with a user's expectations, which is a big usability no no.  Furthermore, you need to make sure that whatever alternative you put in is sufficiently identifiable for users with reduced vision.

## Why do People Want it Removed?

At the [jQuery UI](http://jqueryui.com) project we get a [lot](https://github.com/jquery/jquery-ui/pull/898) [of](http://bugs.jqueryui.com/ticket/8959) [requests](http://bugs.jqueryui.com/ticket/6146) to remove the browser default `outline`s from our widgets.

  The most recent tickets have come from the [slider](http://jqueryui.com/slider) and [tabs](http://jqueryui.com/tabs) widgets.  This is what they look like on the latest Chrome on OS X:

![Focus ring on jQuery UI slider](/images/posts/2013-01-28/slider.png "Focus ring on jQuery UI slider")
![Focus ring on jQuery UI tabs](/images/posts/2013-01-28/tabs.png "Focus ring on jQuery UI tabs")

Some people find this unsightly.  Others are thrown off by the fact that the display varies on different browsers / operating systems.  While these concerns are reasonable, they do not outweigh the importance of the `outline` for keyboard users and users with reduced vision.

jQuery UI does nothing to alter the browser's default `outline` on these widgets and I encourage others to do the same.

## CSS Reset

Unfortunately one of the reasons much of the internet removes the default focus ring is because the [first version of Eric Meyer's CSS reset](http://meyerweb.com/eric/tools/css/reset/reset200802.css) included the following:

<pre class="language-css"><code class="language-css">/* remember to define focus styles! */
:focus {
    outline: 0;
}
</code></pre>

As you can see it's made abundantly clear that you should define your own focus styles, but most people simply copied and pasted the file without realizing this.

The [updated version](http://meyerweb.com/eric/tools/css/reset/index.html) of the CSS reset no longer features this, but sadly it's a bit too late for a lot of sites.

Sigh.
