---
layout: post
title: "Hey Developers - You Should Spell Check Your Documentation"
date: 2013-09-18 09:56
comments: true
categories: [Writing]
---

As developers we write code. Therefore, the thought of using a spell checker brings to mind something like this:

<img src="/images/posts/2013-09-18/spell-check.png">

...which is why text editors don't have spell checking on by default. And that's fine when writing code, however, most developers write at least *some* documentation.

Increasingly this documentation is markdown, XML, or JSON files stored in a git repository. Therefore, you likely use the same editor to write documentation as you do to write code - and unfortunately, writing documentation without a spell checker inevitably leads to spelling errors.

Bad spelling makes your documentation look less professional, and less professional documentation reflects badly on your library, product, or whatever. Therefore I thought I'd share what I do in Sublime Text to help prevent mistakes.

<!--more-->

### What I Do

Like most editors, Sublime Text has spell checking built in, but it is turned off by default. You can turn it on by adding `"spell_check": true` to your user preferences file, which is opened with `Command` + `,` on OS X and `Control` + `,` on Windows.

Because spell checking is a configurable property, turning it on and off is a matter of toggling the property's value:

<pre class="language-javascript"><code>/* Writing docs */
"spell_check": true

/* Writing code */
"spell_check": false
</code></pre>

Like most spell checkers, you can right click misspelled words to get suggested fixes:

<img src="/images/posts/2013-09-18/corrections.png">

You can also tell Sublime to ignore certain words:

<img src="/images/posts/2013-09-18/ignore.png">

The hardest part of course is actually remembering to turn the spell checker on. But, even if you only remember occasionally, you can still catch a lot of misspellings.
