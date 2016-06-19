---
layout: page
title: "Speaking"
comments: false
permalink: /speaking/
---

<div class="blog-archives speaking">
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
					{% if talk.type == "podcast" %}
						<li class="type podcast">Podcast Appearance on <a href="{{ talk.podcast_url }}">{{ talk.podcast_name }}</a> &middot; {{ talk.date }}</li>
					{% endif %}

					{% if talk.type == "interview" %}
						<li class="type interview">Interview with <a href="{{ talk.site_url }}">{{ talk.site_name }}</a> &middot; {{ talk.date }}</li>
					{% endif %}

					{% if talk.type == "conference" %}
						<li class="type conference">Conference Talk</li>
					{% endif %}

					{% if talk.type == "workshop" %}
						<li class="type workshop">Workshop</li>
					{% endif %}

					{% for event in talk.events %}
						<li>
							<span>{{ event.date }}</span>
							<a href="{{ event.url }}">{{ event.name }}</a> &middot; 
							<address>
								{{ event.city }}
							</address>
							{% if event.slides %}
								&middot; <a href="{{ event.slides }}">Slides</a>
							{% endif %}
							{% if event.video %}
								 &middot; <a href="{{ event.video }}">Video</a>
							{% endif %}
							{% if event.feedback %}
								 &middot; <a href="{{ event.feedback }}">Feedback</a>
							{% endif %}
						</li>
					{% endfor %}
				</ul>
			</footer>
		</article>
	{% endfor %}
</div>
