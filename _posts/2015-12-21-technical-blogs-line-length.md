---
layout: post
title: Technical Blogs’ Line Length Problem
comments: true
---

Studies have shown that [using ~45–75 characters in a line of text produces the most readable articles](http://baymard.com/blog/line-length-readability)—yet many technical blogs egregiously violate this recommendation. For example here are the last two articles I read today, along with arrows for where the 75th character is at on the first line:

* [Introducing Background Sync](https://developers.google.com/web/updates/2015/12/background-sync) on Google’s Developers blog. Line length is in the 100–110 character range.

![](/images/posts/2015-12-21/google-developers-blog.png)

* [Announcing TypeScript 1.7](http://blogs.msdn.com/b/typescript/archive/2015/11/30/announcing-typescript-1-7.aspx) on Microsoft’s MSDN blog. Line length is in the 110–120 character range.

![](/images/posts/2015-12-21/typescript-blog.png)

I didn’t pick these examples to single out specific blogs, but rather to present them as examples of what is the norm rather than the exception. As a quick unscientific sample, of the nine featured articles in the [lastest issue of the HTML5 Weekly newsletter](http://html5weekly.com/issues/219), only three stayed even close to the recommended range.

<table>
	<thead>
		<tr>
			<th>Title</th>
			<th># of characters in the first line of text on a 1920x1080 resolution monitor</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="https://developers.google.com/web/updates/2015/12/background-sync">Introducing Background Sync</a></td>
			<td>105</td>
		</tr>
		<tr>
			<td><a href="http://www.sitepoint.com/debugging-html5-xbox-one-ms-edge-xbox-windows-store-app-vorlon-js/">Debugging Your HTML5 in Microsoft Edge for Xbox One</a></td>
			<td>98</td>
		</tr>
		<tr>
			<td><a href="https://frontendmasters.com/courses/modern-web-apps/">Building Modern Web Apps (with React, Ampersand, ES6 and Webpack</a></td>
			<td>139</td>
		</tr>
		<tr>
			<td><a href="https://24ways.org/2015/grid-flexbox-box-alignment-our-new-system-for-layout/">Grid, Flexbox, Box Alignment: Our New System for Layout</a></td>
			<td>82</td>
		</tr>
		<tr>
			<td><a href="http://www.smashingmagazine.com/2015/12/making-accessibility-simpler/">Making Accessibility Simpler, With Ally.js</a></td>
			<td>78</td>
		</tr>
		<tr>
			<td><a href="https://github.com/google/web-starter-kit/releases/tag/v0.6.0">Web Starter Kit 0.6.0: A Boilerplate for Responsive Sites</a></td>
			<td>98</td>
		</tr>
		<tr>
			<td><a href="https://webkit.org/blog/5610/more-responsive-tapping-on-ios/">More Responsive Tapping on iOS</a></td>
			<td>79</td>
		</tr>
		<tr>
			<td><a href="http://blogs.unity3d.com/2015/12/15/updated-webgl-benchmark-results/">Updated WebGL Benchmark Results</a></td>
			<td>111</td>
		</tr>
		<tr>
			<td><a href="http://baymard.com/labs/touch-keyboard-types">Touch Keyboard Types</a></td>
			<td>99</td>
		</tr>
	</tbody>
</table>

## Who cares?

Maybe I’m just getting old, but my brain has a hard time moving from line to line in long-line-length articles without losing context. Or as [a company that has far more expertise in the area](http://baymard.com/blog/line-length-readability) puts it:

> “[I]f a line of text is too long the reader’s eyes will have a hard time focusing on the text. This is because the line length makes it difficult to gauge where the line starts and ends. Furthermore it can be difficult to continue onto the correct line in large blocks of text.”

You don’t have to look any further than the print world—and their corresponding web sites—to see this best practice of 45–75 character line lengths in action. To pick a newspaper publication at random, here’s a Washington Post article that stays right in the recommended range, just so you can visually see the difference.

![](/images/posts/2015-12-21/washington-post-article.png)

## So why do we do this?

All of this begs a question: if long-line-length articles are known to be a bad practice, why do so many technical blogs keep these long lines in place? I’ll offer three reasons:

* **1) Line length isn’t something the average person thinks or cares about.**

If you’ve read this far into the article you’re probably one of the few people that’s pedantic enough to care about manipulating line length to increase readability.

* **2) With the exponential increase in mobile devices, developers don’t think as much about providing an ideal desktop reading experience.**

If your blog’s text is responsive, you don’t really need to care about line length on mobile devices, as the text will just take up as much space as is available.

In my experience, however, technical blogs are one of the few places where desktop browsers are still extremely prevalent. This blog for example gets over 90% of its views from desktop browsers, so I personally care a lot more about the desktop experience than the mobile one.

* **3) Longer lines fit more code, and developers notoriously hate horizontally scrolling to see code.**

This is the only good argument I can come up with. In fact, I keep my own blog at the ~80–85 character mark because I write so many articles that embed code, and I want that code to fit as best as possible.

But although it is nice to fit more code on a line, it seems silly to show more code at the cost of significantly hurting the readability of text. If you’re showing so much code that you need 100+ character lines, you should probably consider linking to GitHub instead of embedding huge blocks of code.

And there are definitely examples that show it is possible to embed code and keep line lengths readable. The handful of technical blogs sites I know of that have reasonable line lengths all embed code, and they’re also some of the prettiest blogs out there—Smashing Magazine, [24 Ways](https://24ways.org/), [Medium](https://medium.com/), and the [Telerik Developer Network](http://developer.telerik.com/) come to mind. Here’s a screenshot from [a Smashing article](http://www.smashingmagazine.com/2015/12/making-accessibility-simpler/) that shows text fitting within the 75-character limit, along with some code that also looks nice:

![](/images/posts/2015-12-21/smashing-magazine-example.png)

## What to do?

Experts recommend line lengths in the 65–75 character range, but for a tech blog I think 75–90 is more appropriate to accommodate code samples. If you maintain a technical blog, pick a few lines at random, and copy and paste them into an [online character counter](http://www.charactercountonline.com/). 

If your site is using 90+ characters per line, as so many technical blogs are, consider tossing a `max-width` on the content to cap the text at some reasonable, readable width. Your pedantic readers will thank you.
