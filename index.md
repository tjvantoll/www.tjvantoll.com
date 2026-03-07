---
layout: empty
---

<div class="homepage">
  <div class="homepage-header">
    <img class="homepage-image"
      src="/images/me/headshot-big.jpg"
      alt="TJ VanToll">

    <h1>TJ VanToll</h1>
    <p class="homepage-tagline">Principal Developer Advocate</p>
    <p class="homepage-bio">Hi, I'm TJ 👋 I'm a software developer, tech author, speaker, and <a href="https://front-end-fire.com/">podcast host</a>. I have over 20 years of development experience, including time working on the <a href="https://jquery.com/">jQuery</a>, <a href="https://nativescript.org/">NativeScript</a>, and <a href="https://www.telerik.com/kendo-ui">Kendo UI</a> teams.</p><p class="homepage-bio">Nowadays I work as a Principal Developer Advocate for <a href="https://blues.io/">Blues</a>, and help developers build smart, connected products. This website is mostly a way for me to list all the things I've been working on.</p>
  </div>
</div>

<div class="homepage-sections">

  <div class="homepage-section">
    <h2 class="homepage-section-heading">Featured Work</h2>
    <div class="featured-grid">

      <a href="https://front-end-fire.com/" class="featured-card">
        <div class="featured-card-image featured-card-image--podcast">
          <img src="/images/homepage/front-end-fire-horizontal.svg" alt="Front-End Fire Podcast">
        </div>
        <div class="featured-card-body">
          <span class="featured-card-label">Podcast</span>
          <h3 class="featured-card-title">Front-End Fire</h3>
          <p class="featured-card-desc">A weekly podcast I run along with my cohosts Paige Niedringhaus and Jack Herrington. It’s a lot of fun! You should listen and subscribe and stuff.</p>
          <span class="featured-card-cta">Listen now →</span>
        </div>
      </a>

      <a href="https://www.youtube.com/watch?v=5fb_mx91nOs" class="featured-card">
        <div class="featured-card-image featured-card-image--video">
          <img src="/images/homepage/notecard-part3-thumbnail.jpg" alt="Building a Connected Product with Notecard: Part 3—Writing Host Firmware">
        </div>
        <div class="featured-card-body">
          <span class="featured-card-label">Latest Video</span>
          <h3 class="featured-card-title">Building a Connected Product with Notecard: Part 3—Writing Host Firmware</h3>
          <p class="featured-card-desc">This video is the latest in my series on building a real product using Notecard. This is a long one 😅</p>
          <span class="featured-card-cta">Watch now →</span>
        </div>
      </a>

    </div>
  </div>

  <div class="homepage-section">
    <h2 class="homepage-section-heading">Recent Work</h2>
    <div class="card-grid">
      {% assign all_items = site.posts | concat: site.data.videos.videos | concat: site.data.speaking.talks | sort: "date" | reverse %}
      {% assign recent_items = all_items | slice: 0, 20 %}
      {% for item in recent_items %}
        {% if item.title %}
          {% capture item_url %}{{ item.url }}{% endcapture %}
          {% if item.redirect_url %}
            {% capture item_url %}{{ item.redirect_url }}{% endcapture %}
          {% endif %}
          <div class="card">
            <div class="card-body">
              <div class="card-meta" style="margin-bottom: 0.4rem;">
                <span class="card-badge">Writing</span>
              </div>
              <div class="card-title">
                <a href="{{ item_url }}">{{ item.title }}</a>
              </div>
              <div class="card-meta">
                <time>{{ item.date | date: "%b %d, %Y" }}</time>
                {% if item.redirect_url %}
                  <span class="card-pub-badge">{{ item.publication_name }}</span>
                {% endif %}
              </div>
            </div>
          </div>
        {% elsif item.talk_venue or item.podcast_name or item.interview_site %}
          {% if item.talk_video %}
            {% assign item_url = item.talk_video %}
          {% else %}
            {% assign item_url = item.url %}
          {% endif %}
          <div class="card">
            <div class="card-body">
              <div class="card-meta" style="margin-bottom: 0.4rem;">
                <span class="card-badge">Speaking</span>
              </div>
              <div class="card-title">
                <a href="{{ item_url }}">{{ item.name }}</a>
              </div>
              <div class="card-meta">
                <time>{{ item.date | date: "%b %d, %Y" }}</time>
                {% if item.podcast_name %}
                  <span class="card-pub-badge">{{ item.podcast_name }}</span>
                {% elsif item.interview_site %}
                  <span class="card-pub-badge">{{ item.interview_site }}</span>
                {% elsif item.talk_venue %}
                  <span class="card-pub-badge">{{ item.talk_venue }}</span>
                {% endif %}
              </div>
            </div>
          </div>
        {% else %}
          <div class="card">
            <div class="card-body">
              <div class="card-meta" style="margin-bottom: 0.4rem;">
                <span class="card-badge">Video</span>
              </div>
              <div class="card-title">
                <a href="{{ item.url }}">{{ item.name }}</a>
              </div>
              <div class="card-meta">
                <time>{{ item.date | date: "%b %d, %Y" }}</time>
              </div>
            </div>
          </div>
        {% endif %}
      {% endfor %}
    </div>
  </div>

</div>
