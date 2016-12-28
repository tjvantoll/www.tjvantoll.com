---
layout: page
title: "Writing"
---

<h2 class="archive-heading main-border">Books</h2>

<div class="blog-archives">
	<h2>2014</h2>
	<article class="book-listing">
		<img class="cover" src="/images/book.jpg" alt="jQuery UI in Action cover">
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
			<li>5-star average on <a href="http://www.amazon.com/jQuery-UI-Action-T-VanToll/dp/1617291935/ref=sr_1_1?ie=UTF8&qid=1436237989&sr=8-1&keywords=jquery+ui">Amazon</a></li>
		</ul>
	</article>
</div>

<hr class="main-border">

<h2 class="archive-heading main-border">Articles</h2>

<div class="blog-archives">
	{% for post in site.posts reverse %}
		{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
		{% unless year == this_year %}
			{% assign year = this_year %}
			<h2>{{ year }}</h2>
		{% endunless %}

		<article class="main-border">

			<h1>
				{% if post.redirect_url %}
					<a href="{{ post.redirect_url }}">{{ post.title }}</a>
				{% else %}
					<a href="{{ root_url }}{{ post.url }}">{{ post.title }}</a>
				{% endif %}
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