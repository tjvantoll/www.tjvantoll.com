---
layout: page
title: "Writing"
---

Here you’ll find a list of articles I’ve written, both on this blog and around the web. If you’re looking for a quick sample of my writing style without reading my life’s work, check out [The Web’s Cruft Problem](http://developer.telerik.com/featured/the-webs-cruft-problem/) or [The Rise of TypeScript](https://web.archive.org/web/20170808064945/http://developer.telerik.com/featured/the-rise-of-typescript/).

My biggest writing endeavor was a [book I wrote on jQuery UI](https://www.amazon.com/jQuery-UI-Action-T-VanToll/dp/1617291935) back in 2014. I wrote up an article about [what the experience of writing a tech book is like](https://www.tjvantoll.com/2014/12/29/so-you-want-to-write-a-tech-book/), if you’re curious.

<div class="blog-archives">
	{% for post in site.posts %}
		{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
		{% unless year == this_year %}
			{% assign year = this_year %}
			<h2>{{ year }}</h2>
		{% endunless %}

		<article class="main-border">

			{% capture url_to_use %}{{ post.url }}{% endcapture %}
			{% if post.redirect_url %}
				{% capture url_to_use %}{{ post.redirect_url }}{% endcapture %}
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
