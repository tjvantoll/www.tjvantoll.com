---
layout: post
title: "An Addendum to Why Web Components Aren't Ready for Production Yet"
comments: true
---

Yesterday I [published an article on the Telerik Developer Network](http://developer.telerik.com/featured/web-components-arent-ready-production-yet/) about the state of web components. In it I argued that web components are not ready for the majority of web developers to use in production.

I was overwhelmed by the amount of feeback—positive and negative—that I received after the article went live. In my opinion this is one of the great things about writing on the web. Opinionated posts tend to attract feedback from smart people with vested interests in the technology being discussed. Although putting yourself out there for criticism is hard, it's also a spectacular way to learn. Here I want to summarize what I learned from writing about web components, and take a minute to respond to some of the criticism I received.

<!--more-->

## The Title

<blockquote class="twitter-tweet" lang="en"><p>Why Web Components Aren’t Ready for Production… Yet <a href="http://t.co/0liPap0bWx">http://t.co/0liPap0bWx</a> sensible research, dangerous title. STOP! More at <a href="https://twitter.com/forwardJS">@forwardJS</a></p>&mdash; Christian Heilmann (@codepo8) <a href="https://twitter.com/codepo8/statuses/489781679272509440">July 17, 2014</a></blockquote>

Several people said that my title was far too generic and link baity. This is somewhat fair, but I think the article gives the necessary context to explain why I chose a generic title. From the article...

> "All of Polymer’s elements, and most (all?) of the elements listed on http://customelements.io/ and http://component.kitchen/ depend on Polymer, which depends on the platform in its entirety."

Put yourselves in the shoes of a developer debating whether to use web components in your app. The first thing you're going to want to do is see an existing component, and the overwhelming majority of published components are Polymer based. Even if you don't end up using Polymer, if you use just one Polymer-based element, you are subject to the performance penalties I outline in my article.

Although the conclusion of the article is that web components aren't ready for production, that isn't necessarily because the technology behind them isn't ready. A large part of the problem is that there isn't enough documentation available to developers. What are the performance repercussions of each of the various web components polyfills? How do you build performant web components? This is research that needs to be done before the average developer can take web components seriously.

## Not all web components solutions are created equally

Several people called me out for grouping all web components solutions together. Although I acknowledged that there are alternative libraries out there, I didn't do a very good job differentiating them from Polymer in terms of performance.

<blockquote data-conversation="none" class="twitter-tweet" lang="en"><p><a href="https://twitter.com/tjvantoll">@tjvantoll</a> <a href="https://twitter.com/codepo8">@codepo8</a> <a href="https://twitter.com/slightlylate">@slightlylate</a> <a href="https://twitter.com/WebReflection">@WebReflection</a> X-Tag used only Custom Elements since day 1, judging them as one is *extremely* misleading.</p>&mdash; Daniel (@csuwildcat) <a href="https://twitter.com/csuwildcat/statuses/489790523201187842">July 17, 2014</a></blockquote>

I knew that X-Tag used a subset of web components polyfills, and I mention that in the article, but I didn't realize they *only* use custom elements. This is exactly the sort of thing I'd love to see more information on. Why did X-Tag choose to only go with custom elements? Performance? File size?

I also discovered several other projects that are web components based. [Bosonic](http://bosonic.github.io/index.html) takes a transpilation approach, and converts HTML-based web component files into JS and CSS code that works back to IE9. This is another project I'd love to hear more information about, especially their design choices.

<img src="/images/posts/2014-07-18/bosonic.png">

I was also pointed at an [alternative custom elements polyfill from Andrea Giammarchi](http://webreflection.blogspot.co.uk/2014/07/a-w3c-custom-elements-alternative.html). The polyfill is less than 2K minified and gzipped, and supports an impressive range of browsers. This is another project worth experimenting with.

## My tone

The last thing I want to discuss is my tone in the article, as that was called out by a few people.

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/tjvantoll">@tjvantoll</a> <a href="https://twitter.com/csuwildcat">@csuwildcat</a> <a href="https://twitter.com/codepo8">@codepo8</a> <a href="https://twitter.com/WebReflection">@WebReflection</a> : OK, fine, but downer pieces like yours that don&#39;t do that work don&#39;t contribute to that.</p>&mdash; Alex Russell (@slightlylate) <a href="https://twitter.com/slightlylate/statuses/489793567007571969">July 17, 2014</a></blockquote>

<blockquote class="twitter-tweet" lang="en"><p>Why Web Components aren&#39;t ready for production yet - <a href="https://twitter.com/tjvantoll">@tjvantoll</a> - <a href="http://t.co/4EEQIHtmWe">http://t.co/4EEQIHtmWe</a> Valid points, bit too negatively brought imho</p>&mdash; Leon de Rijke (@leonderijke) <a href="https://twitter.com/leonderijke/statuses/489856563327537152">July 17, 2014</a></blockquote>

I want to make it *very clear* that I am not trying to be a web component naysayer. I am excited about web components, and the article presents my honest feedback from someone that wants to move forward with them in major libraries, but ran into roadblocks. In my opinion, putting this feedback in the open starts conversations that we need to have to start seriously considering web components.

Per the feedback I received, and based on my own experience, the sanest place for developers to start is with custom elements, as it has a relatively sane polyfill. Or as [@csuwildcat](https://twitter.com/csuwildcat) puts it...

<blockquote data-conversation="none" class="twitter-tweet" lang="en"><p><a href="https://twitter.com/tjvantoll">@tjvantoll</a> <a href="https://twitter.com/WebReflection">@WebReflection</a> <a href="https://twitter.com/slightlylate">@slightlylate</a> <a href="https://twitter.com/codepo8">@codepo8</a> shout this: deploy UI as custom elements today, &amp; when Shadow DOM is native, hide the guts.</p>&mdash; Daniel (@csuwildcat) <a href="https://twitter.com/csuwildcat/statuses/489800753997828097">July 17, 2014</a></blockquote>

Consider it shouted. This is certainly something we need more people to experiment with, myself included.

## Thanks

Finally I want to thank everyone that contributed feedback in some fashion. Writing on the internet is a great way to learn from others, and that's certainly true in this case. With that in mind I want to encourage people that have used web components to share their experiences—especially those that have attempted to use them in production. Let's make this happen.

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
