---
layout: post
title: Why Do My Emoji Look Black and White and Boring on Windows?
comments: true
---

I’ve been experimenting with [using emoji in code lately](/2016/06/10/emoji-and-coding/), and one thing that bothered me was how bad my emoji rendered on Windows on the web. For instance, I changed one section of blog to use a few emoji, and that section looked like this on OS X.

<img src="/images/posts/2016-06-15/emoji-os-x.png" class="plain">

But the exact same set of emoji looked like this on Windows.

<img src="/images/posts/2016-06-15/emoji-windows.png" class="plain">

This drove me nuts, because the characters I was using were exactly the same, and Windows has really good emoji support. After extensive googling I finally figured out what was up.

Apparently, Windows’ polished emoji live in a specific system font named “Segoe UI Emoji”. And unless you specifically target that font in CSS your emoji will fallback to the boring graphics you see in the screenshot above.

So what I did was define an `emoji` CSS class name.

<pre class="language-css"><code class="language-css">.emoji {
    font-family: "Segoe UI Emoji";
}
</code></pre>

And then made sure that every emoji I used was surrounded by a `<span>` with that class name.

<pre class="language-markup"><code class="language-markup">&lt;span class="emoji"&gt;🚀&lt;/span&gt;
</code></pre>

And with that approach my emoji looked substantially nicer on Windows.

<img src="/images/posts/2016-06-15/emoji-windows-fixed.png" class="plain">

> **NOTE**: There’s no harm in applying the “Segoe UI Emoji” font family on non-Windows operating systems; the font declaration will be ignored when the named font is not available.

Ideally browsers on Windows would automatically detect the emoji unicode range and apply the “Segoe UI Emoji” font family automatically; Firefox on Windows seems to do this already, but Edge and Chrome do not. I submitted this as a feature request both to the Microsoft Edge team ([here](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7900499)), and the Google Chrome team ([here](https://bugs.chromium.org/p/chromium/issues/detail?id=620419)), so perhaps this won’t be an issue in the future.

Until then, hopefully this post helps you get your emoji looking sharp! <span class="emoji">😎</span>
