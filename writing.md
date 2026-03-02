---
layout: page
title: "Writing"
---

Here you'll find a list of articles I've written, both on this blog and around the web. If you're looking for a quick sample of my writing style without reading my life's work, check out [The Web's Cruft Problem](http://developer.telerik.com/featured/the-webs-cruft-problem/) or [The Rise of TypeScript](https://web.archive.org/web/20170808064945/http://developer.telerik.com/featured/the-rise-of-typescript/).

My biggest writing endeavor was a [book I wrote on jQuery UI](https://www.amazon.com/jQuery-UI-Action-T-VanToll/dp/1617291935) back in 2014. I wrote up an article about [what the experience of writing a tech book is like](https://www.tjvantoll.com/2014/12/29/so-you-want-to-write-a-tech-book/), if you're curious.

<div class="blog-archives">
  {% assign current_year = "" %}
  {% for post in site.posts %}
    {% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}
    {% if current_year != this_year %}
      {% if current_year != "" %}</div>{% endif %}
      {% assign current_year = this_year %}
      <h2>{{ this_year }}</h2>
      <div class="card-grid">
    {% endif %}

    {% capture url_to_use %}{{ post.url }}{% endcapture %}
    {% if post.redirect_url %}
      {% capture url_to_use %}{{ post.redirect_url }}{% endcapture %}
    {% endif %}

    <div class="card">
      <div class="card-body">
        <div class="card-title">
          <a href="{{ url_to_use }}">{{ post.title }}</a>
        </div>
        <div class="card-meta">
          <time>{{ post.date | date: "%b %d, %Y" }}</time>
          {% if post.redirect_url %}
            <span class="card-pub-badge">{{ post.publication_name }}</span>
          {% endif %}
        </div>
      </div>
    </div>
  {% endfor %}
  {% if current_year != "" %}</div>{% endif %}
</div>
