---
layout: post
title: Emoji and Coding
comments: true
---

Who doesn’t love emoji? As a massive emoji user on messaging and email apps, I’ve started to experiment with how I could bring my love of emoji into my day-to-day software development.

And although this started as a bit of a joke, I’ve found emoji to be legitimately valuable in my development work in some cases. Why?

We, as developers, routinely look at large amounts of text—whether it’s code, production logs, commit messages, documentation, or whatever—and Emoji inherently stand out in what is normally a wall of text. It’s far easier to pick an emoji out of a list than a random string, and that skimmability can lead to real productivity gains. Plus, even if there is no _actual_ productivity gain—using emoji is just plain fun. Here are a few of the things I’ve been playing with.

## Emoji in comments

Suppose you need to add a warning to your code, something like this:

<pre class="language-javascript"><code class="language-javascript">/**
 * WARNING:
 * Changing this code breaks the build
 */</code></pre>

I add these sorts of notes to my code all the time, but years of development have taught me that few people actually read these warnings—myself included. What would make this comment more noticeable and way more skimmable? An emoji.

<pre class="language-javascript"><code class="language-javascript">/**
 * ⚠️ WARNING:
 * Changing this code breaks the build
 */</code></pre>

Because emoji are far easier to read at a glance, I could see them being valuable if you adopt standards on your team for marking up certain common things in your comments.

<pre class="language-javascript"><code class="language-javascript">/**
 * ✅ TODOS:
 * • Unit Test
 * • Performance profiling
 */</code></pre>

And again, even if you don’t have a practical use for emoji in comments, they’re still an entertaining way to interact with coworkers.

<pre class="language-javascript"><code class="language-javascript">// Why does this cause the app to crash? 🤔</code></pre>

<pre class="language-javascript"><code class="language-javascript">// O(n²) complexity 🤓</code></pre>

And since the emoji are just in comments, there’s little risk of breaking anything.

## Emoji in commit messages

Commit messages are usually boring. But with emojis you can make them slightly less boring. I’ve been trying a one-emoji-per-commit policy lately and I haven’t been disappointed so far.

<img src="/images/posts/2016-06-10/commit-messages.png" class="plain">

Although this is again a bit of a silly example, I would again make the argument that the emoji improve the readability here. If you’re looking at a giant list of commit messages, which you often are in big projects, having an emoji in the text makes picking a single commit out of a list a heck of a lot easier. The [Atom editor by GitHub](https://atom.io/) even has an emoji guide in their [git commit message styleguide](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages).

## Emoji in code

I haven’t actually placed emojis into non-comment production code, but that doesn’t mean I couldn’t see them being valuable. Most languages support emoji use in strings, which you might find handy if you want to make your noisy production logs more skimmable.

<pre class="language-javascript"><code class="language-javascript">log("🔑 Authentication successful for user ABC123");
log("☠️ App crashed with exception code DEF456");
log("✉️ Email successfully sent to user GHI789");</code></pre>

Emoji can also make for fun examples if you’re looking to add a bit of levity to fairly uninteresting computer science topics.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Map/filter/reduce in a tweet:<br><br>map([🌽, 🐮, 🐔], cook)<br>=&gt; [🍿, 🍔, 🍳]<br><br>filter([🍿, 🍔, 🍳], isVegetarian)<br>=&gt;  [🍿, 🍳]<br><br>reduce([🍿, 🍳], eat)<br>=&gt; 💩</p>&mdash; Steven Luscher (@steveluscher) <a href="https://twitter.com/steveluscher/status/741089564329054208">June 10, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Typing emoji

In order to be productive with emoji you have to be able to type them quickly. Personally I use the `Control` + `Command` + `Space Bar` system-wide keyboard shortcut on OS X, which brings up a menu that you can use to insert emoji into most OS X applications. Here’s what the menu looks like; go ahead and judge me based on my frequently used emoji.

<img src="/images/posts/2016-06-10/emoji-keyboard.png" class="plain">

> **NOTE**: Windows 10 has [built-in emoji support in its touch keyboard](http://blog.getemoji.com/emoji-keyboard-windows), which I’ve used before and found fairly intuitive.

## Emoji and editors

Emoji are fun, but unless the tools you’re using supports them, you’re kind of out of luck. Luckily though, most editors and development tools are slowly catching up with the emoji revolution. I’m writing this blog post in Sublime Text, which supports emoji, even though the characters can look a bit distorted.

<img src="/images/posts/2016-06-10/emoji-in-sublime-text.png" class="plain">

Luckily the other editor I use, Microsoft’s new [Visual Studio Code](https://code.visualstudio.com/), handles emoji amazingly.

<img src="/images/posts/2016-06-10/emoji-in-vs-code.png" class="plain">

My terminal of choice, [iTerm2](https://www.iterm2.com/) also handles emoji well. Here’s what I see in my terminal after making a new commit:

<img src="/images/posts/2016-06-10/emoji-iterm2.png" class="plain">

That being said not every piece of software is going to support emoji perfectly. Many of us deal with legacy software that has enough trouble with characters a lot simpler than emoji. But we can change this. If you’re using a tool that doesn’t support emoji please file a ticket or bug in the appropriate place. Let’s make the emoji revolution happen 🎉
