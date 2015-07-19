---
layout: page
title: "Speaking"
comments: false
permalink: /speaking/
---

<div id="blog-archives" class="speaking">
	{% capture year %}{% endcapture %}
	{% for talk in site.data.speaking.talks %}
		{% if year != talk.year %}
			<h2>{{ talk.year }}</h2>
		{% endif %}
		{% capture year %}{{ talk.year }}{% endcapture %}
		<article>
			<h1><a href="{{ talk.url }}">{{ talk.name }}</a></h1>
			<footer>
				<ul>
					{% for event in talk.events %}
						<li>
							<span>{{ event.date }}</span>
							<a href="{{ event.url }}">{{ event.name }}</a> | 
							<address class="country-{{ event.country }}">{{ event.city }}</address> | 
							<a href="{{ event.slides }}">Slides</a>
							{% if event.video %}
								 | <a href="{{ event.video }}">Video</a>
							{% endif %}
							{% if event.feedback %}
								 | <a href="{{ event.feedback }}">Feedback</a>
							{% endif %}
						</li>
					{% endfor %}
				</ul>
			</footer>
		</article>
	{% endfor %}
</div>
