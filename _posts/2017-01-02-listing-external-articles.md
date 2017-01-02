---
layout: post
title: Including External Articles in Your Jekyll Post List
comments: true
---

This holiday weekend I implemented a feature I’ve wanted on this site for a while now: a [“writing” page](/writing/) that includes articles I’ve written both on this blog, as well as other sites around the web.

Doing this on a Jekyll-built blog ended up being an interesting challenge, as Jekyll doesn’t have a built-in way of including articles from external publications. After some fooling around I came up with a solution that works reasonably well though, so I thought I’d share.

## The solution

Most Jekyll blogs use a loop that looks a little something like this to create a list of all posts.

<pre class="language-markup"><code class="language-markup">&lt;ul&gt;
  {% raw %}{% for post in site.posts %}
    &lt;li&gt;
      &lt;a href="{{ post.url }}"&gt;{{ post.title }}&lt;/a&gt;
    &lt;/li&gt;
  {% endfor %}{% endraw %}
&lt;/ul&gt;</code></pre>

This code finds all posts in your site’s `_posts` folder, and generates a link for each. So how do you get articles that don’t live in your `_posts` folder to show up in your loop? In my case, I ended up creating a file in `_posts` for each of my external articles, and made some small alternations to my looping logic.

For example, consider this [article on contributing to open source projects](http://developer.telerik.com/featured/successfully-contribute-large-open-source-projects/) I recently wrote for the [Telerik Developer Network](http://developer.telerik.com/). To get this article to show up on my Writing page, I created a file named `2016-08-09-tdn.md` in my `_posts` folder with the following metadata.

<pre class="language-blank"><code class="language-blank">---
layout: externalpost
redirect_url: http://developer.telerik.com/featured/successfully-contribute-large-open-source-projects/
title: How to Successfully Contribute to Large Open Source Projects
---
</code></pre>

Note two things here: first how I’m giving this article a `layout` of `externalpost`, and second how I’m specifying a custom `redirect_url` property that points at the actual location of the article.

## Creating a redirect layout

The `layout` property tells Jekyll which layout in the `_layouts` folder to render a post with. To make “externalpost” work, I created a new `externalpost.html` file in my `_layouts` folder with the following contents:

<pre class="language-markup"><code class="language-markup">&lt;meta http-equiv="refresh" content="0; url={% raw %}{{ page.redirect_url }}{% endraw %}"&gt;</code></pre>

This is necessary because Jekyll will generate a post on your blog for every file in `_posts`, even if that post actually lives elsewhere. The above code ensures that anyone navigating to the metadata-only post will be automatically redirected to actual location of the article. Specifically, in the case of my open source article, it means that <https://www.tjvantoll.com/2016/12/13/tdn/> redirects to <http://developer.telerik.com/featured/successfully-contribute-large-open-source-projects/>.

## Alternating the posts loop logic

Next, I went back to my site’s loop logic and made a slight change to incorporate the new `redirect_url` metadata.

<pre class="language-markup"><code class="language-markup">&lt;ul&gt;
  {% raw %}{% for post in site.posts %}

    {% capture url_to_use %}{{ post.url" }}{% endcapture %}
    {% if post.redirect_url %}
      {% capture url_to_use %}{{ post.redirect_url" }}{% endcapture %}
    {% endif %}

    &lt;li&gt;
      &lt;a href="{{ url_to_use }}"&gt;
        {{ post.title }}
      &lt;/a&gt;
    &lt;/li&gt;
  {% endfor %}{% endraw %}
&lt;/ul&gt;</code></pre>

This small change uses Jekyll’s {% raw %}`{% capture %}`{% endraw %} syntax to create a `url_to_use` variable. If a post has a `redirect_url` metadata property the generated link will use it, else, the link will use the default Jekyll-generated URL.

And that’s it. This certainly isn’t the most elegant of solutions, as you have to manually create a file in `_posts` for every external article you want listed, but I find that it works pretty well for my purposes. If you’re curious, the full source code that builds this blog is available at <https://github.com/tjvantoll/www.tjvantoll.com>. Feel free to look through my complete implementation and apply it to your own sites.