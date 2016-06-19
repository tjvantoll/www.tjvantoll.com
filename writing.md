---
layout: page
title: "Writing"
comments: false
---

<header class="archive-header">
	<h2 class="entry-title">Books</h2>
</header>

<div class="blog-archives">
	<h2>2014</h2>
	<article>
		<h1>
			<a href="http://tjvantoll.com/jquery-ui-in-action.html">jQuery UI in Action</a>
		</h1>
		<time>
			<span class="month">OCT</span>
			<span class="day">12</span>
			<span class="year">2014</span>
		</time>
		<ul>
			<li>Published by <a href="https://manning.com/">Manning</a></li>
			<li>5-star average on <a href="http://www.amazon.com/jQuery-UI-Action-T-VanToll/dp/1617291935/ref=sr_1_1?ie=UTF8&qid=1436237989&sr=8-1&keywords=jquery+ui">Amazon</a> (as of 2015)</li>
		</ul>
	</article>
</div>

<header class="archive-header">
	<h2 class="entry-title">Blog Posts</h2>
</header>

<div class="blog-archives">
	{% for post in site.posts reverse %}
		{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
		{% unless year == this_year %}
			{% assign year = this_year %}
			<h2>{{ year }}</h2>
		{% endunless %}
		<article>
			<h1>
				<a href="{{ root_url }}{{ post.url }}">{{post.title}}</a>
			</h1>
			<time datetime="{{ post.date | datetime | date_to_xmlschema }}" pubdate>
				{{ post.date | date: "	<span class='month'>%b</span> <span class='day'>%d</span> <span class='year'>%Y</span>"}}
			</time>
		</article>
	{% endfor %}
</div>
