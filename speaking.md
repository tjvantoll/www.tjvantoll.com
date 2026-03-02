---
layout: page
title: "Speaking"
---

I started speaking at conferences and user groups in 2012. Over the years I've attended a number of awesome events, met some really cool people, and awkwardly messed with PowerPoint in front of several large crowds.

If you're looking to quickly evaluate my speaking skills, watch [Why I Was Wrong About TypeScript](https://www.youtube.com/watch?v=AQOEZVG2WY0), which I presented at [GOTO Copenhagen](https://gotocph.com/2018), and which was [JavaScript Weekly's most popular video of 2019](https://javascriptweekly.com/issues/469).

<div class="blog-archives">
  {% assign current_year = "" %}
  {% for talk in site.data.speaking.talks %}
    {% capture this_year %}{{ talk.date | date: "%Y" }}{% endcapture %}
    {% if current_year != this_year %}
      {% if current_year != "" %}</div>{% endif %}
      {% assign current_year = this_year %}
      <h2>{{ this_year }}</h2>
      <div class="card-grid">
    {% endif %}

    <div class="card">
      <div class="card-body">
        <div class="card-title">
          <a href="{{ talk.url }}">{{ talk.name }}</a>
        </div>
        <div class="card-meta">
          <time>{{ talk.date | date: "%b %d, %Y" }}</time>
          {% if talk.podcast_name %}
            <span>·</span>
            <span class="card-badge">Podcast</span>
            <span class="card-publication">{{ talk.podcast_name }}</span>
          {% elsif talk.interview_site %}
            <span>·</span>
            <span class="card-badge">Interview</span>
            <span class="card-publication">{{ talk.interview_site }}</span>
          {% elsif talk.talk_venue %}
            <span>·</span>
            <span class="card-publication">{{ talk.talk_venue }}{% if talk.talk_venue_city %}, {{ talk.talk_venue_city }}{% endif %}</span>
          {% endif %}
        </div>
        {% if talk.talk_slides or talk.talk_video %}
          <div class="card-links">
            {% if talk.talk_slides %}<a href="{{ talk.talk_slides }}">Slides</a>{% endif %}
            {% if talk.talk_video %}<a href="{{ talk.talk_video }}">Video</a>{% endif %}
          </div>
        {% endif %}
      </div>
    </div>
  {% endfor %}
  {% if current_year != "" %}</div>{% endif %}
</div>
