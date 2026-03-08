---
layout: page
title: "Videos"
---

I make YouTube videos—mostly on Blues topics, but occasionally on other random things. My biggest endeavor lately has been an [in-depth series on building products using Blues Notecard](https://www.youtube.com/playlist?list=PLv0HV8FqacRUiTodE-IRxt-iIDeSylxze).

<div class="blog-archives">
  {% assign current_year = "" %}
  {% for video in site.data.videos.videos %}
    {% capture this_year %}{{ video.date | date: "%Y" }}{% endcapture %}
    {% if current_year != this_year %}
      {% if current_year != "" %}</div>{% endif %}
      {% assign current_year = this_year %}
      <h2>{{ this_year }}</h2>
      <div class="card-grid">
    {% endif %}

    <div class="card">
      <div class="card-body">
        <div class="card-title">
          <a href="{{ video.url }}">{{ video.name }}</a>
        </div>
        <div class="card-meta">
          <time>{{ video.date | date: "%b %d, %Y" }}</time>
        </div>
      </div>
    </div>
  {% endfor %}
  {% if current_year != "" %}</div>{% endif %}
</div>
