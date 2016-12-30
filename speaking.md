---
layout: page
title: "Speaking"
---

I started speaking at conferences and user groups all the way back in 2012. Over the years I’ve attended a number of awesome events, met some really cool people, and awkwardly messed with PowerPoint in front of a thousand people. Here’s a list of the events I’ve been to and the podcasts I’ve appeared on.

<div class="blog-archives">
	{% capture year %}{% endcapture %}

	{% for talk in site.data.speaking.talks %}
		{% capture talk_year %}{{ talk.date | date: "%Y" }}{% endcapture %}
		{% if year != talk_year %}
			<h2>{{ talk_year }}</h2>
		{% endif %}
		{% capture year %}{{ talk_year }}{% endcapture %}

		<article class="main-border">
			<h1><a href="{{ talk.url }}">{{ talk.name }}</a></h1>
			<time>
				{{ talk.date | date: "	<span class='month'>%b</span> <span class='day'>%d</span> <span class='year'>%Y</span>"}}
			</time>
			<footer>
				<ul>
					{% if talk.talk_venue %}
						<li>
							Presented at <a href="{{ talk.talk_venue_url }}">{{ talk.talk_venue }}</a>
							{% if talk.talk_venue_city %}
								 in {{ talk.talk_venue_city }}
							{% endif %}
						</li>
						<li>
							Resources: <a href="{{ talk.talk_slides}}">Slides</a>
							{% if talk.talk_video %}
								| <a href="{{ talk.talk_video }}">Video</a>
							{% endif %}
						</li>
					{% endif %}

					{% if talk.podcast_name %}
						<li>Podcast appearance on <a href="{{ talk.podcast_url }}">{{ talk.podcast_name }}</a></li>
					{% endif %}

					{% if talk.interview_site %}
						<li>Interview by {{ talk.interview_person }}  on <a href="{{ talk.interview_site_url }}">{{ talk.interview_site }}</a></li>
					{% endif %}
				</ul>
			</footer>
		</article>
	{% endfor %}
</div>
