---
layout: page
title: "Writing"
---

Here you’ll find a list of books and articles I’ve written, both on this blog and around the web. If you’re looking for a quick sample of my writing style without reading my life’s work, check out [The Web’s Cruft Problem](http://developer.telerik.com/featured/the-webs-cruft-problem/) or [The Rise of TypeScript](http://developer.telerik.com/featured/the-rise-of-typescript/).

My biggest writing endeavor was a book I wrote on [jQuery UI](http://jqueryui.com/) back in 2014. I wrote up an article about [what the experience of writing a tech book is like](https://www.tjvantoll.com/2014/12/29/so-you-want-to-write-a-tech-book/), if you’re curious.

<div class="blog-archives">
	<h2>Books</h2>
	<article class="book-listing">
		<img class="cover" src="/images/book.jpg" alt="jQuery UI in Action cover">
		<h1>
			<a href="http://tjvantoll.com/jquery-ui-in-action.html">jQuery UI in Action</a>
		</h1>
		<time style="visibility: hidden;">
			<span class="month">OCT</span>
			<span class="day">12</span>
			<span class="year">2014</span>
		</time>
		<ul>
			<li>Published by <a href="https://manning.com/">Manning</a></li>
			<li>5-star average on <a href="http://www.amazon.com/jQuery-UI-Action-T-VanToll/dp/1617291935/ref=sr_1_1?ie=UTF8&qid=1436237989&sr=8-1&keywords=jquery+ui">Amazon</a></li>
		</ul>
	</article>
</div>

<hr class="main-border">

<div class="blog-archives">
	{% for post in site.posts reverse %}
		{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
		{% unless year == this_year %}
			{% assign year = this_year %}
			<h2>{{ year }}</h2>
		{% endunless %}

		<article class="main-border">

			{% capture url_to_use %}{{ post.url" }}{% endcapture %}
			{% if post.redirect_url %}
				{% capture url_to_use %}{{ post.redirect_url" }}{% endcapture %}
			{% endif %}

			<h1>
				<a href="{{ url_to_use }}">{{ post.title }}</a>
			</h1>
			<time>
				{{ post.date | date: " <span class='month'>%b</span> <span class='day'>%d</span> <span class='year'>%Y</span>"}}
			</time>
			{% if post.redirect_url %}
				<footer>
					<ul>
						<li>Published on <a href="{{ post.publication_url }}">{{ post.publication_name }}</a></li>
					</ul>
				</footer>
			{% endif %}
		</article>
	{% endfor %}
</div>
