---
layout: post
title: "Using Ternary Operators for More Maintainable Templates"
comments: true
---

With the rise of JavaScript MVC frameworks, writing templates has become a large part of many web developer's workflow. As such, I thought I'd share a tip that has made my templates far more readable and maintainable over the years, ternary operators.<!-- http://jsbin.com/ekiwal/3/edit -->

<i>Note: For my examples I'm using [Underscore's templates](http://underscorejs.org/#template), but this same tip applies to any templating language, even traditional server side ones like PHP.</i>

<!-- more -->

## Example

Let's say you have the following data for your application:

<pre class="language-javascript"><code class="language-javascript">var items = [
    { name: 'Clock', selected: false },
    { name: 'Chair', selected: false },
    { name: 'Radio', selected: true }
];
</code></pre>

And you want to run this data through a template to generate an HTML list. You might start with something like this:

<pre class="language-markup"><code class="language-markup">&lt;ul&gt;
    &lt;% _.each( items, function( item ) { %&gt;
        &lt;li&gt;
            &lt;%- item.name %&gt;
        &lt;/li&gt;
    &lt;% }); %&gt;
&lt;/ul&gt;
</code></pre>

This works fine.  But chances are, for a real application you'll need to do something significantly more complicated than this.  As a first step, let's say you have to add a CSS hook for selected items. You could accomplish that with an if check around each list item:

<pre class="language-markup"><code class="language-markup">&lt;ul&gt;
    &lt;% _.each( items, function( item ) { %&gt;
        &lt;% if ( item.selected ) { %&gt;
            &lt;li class="selected"&gt;
        &lt;% } else { %&gt;
            &lt;li&gt;
        &lt;% } %&gt;
            &lt;%- item.name %&gt;
        &lt;/li&gt;
    &lt;% }); %&gt;
&lt;/ul&gt;
</code></pre>

Unfortunately this adds 4 lines of code and some unfortunate indentation just to add a simple class. Another alternative is to put the if check within the attribute:

<pre class="language-markup"><code class="language-markup">&lt;ul&gt;
    &lt;% _.each( items, function( item ) { %&gt;
        &lt;li class="&lt;% if ( item.selected ) { %&gt;selected&lt;% } %&gt;"&gt;
            &lt;%- item.name %&gt;
        &lt;/li&gt;
    &lt;% }); %&gt;
&lt;/ul&gt;
</code></pre>

This isn't bad, but personally I find this code difficult to scan. I prefer to handle this situation with a ternary operator:

<pre class="language-markup"><code class="language-markup">&lt;ul&gt;
    &lt;% _.each( items, function( item ) { %&gt;
        &lt;li class="&lt;%= (item.selected) ? 'selected' : '' %&gt;"&gt;
            &lt;%- item.name %&gt;
        &lt;/li&gt;
    &lt;% }); %&gt;
&lt;/ul&gt;
</code></pre>

Yes this is a stylistic thing, but I find this clearer and more readable. This will produce an unnecessary empty class attribute on non-selected items, but I believe the readability of the code to be far more important.

For added fun, ternary operators can be nested. Say your application now has to handle deleted items:

<pre class="language-javascript"><code class="language-javascript">var items = [
    { name: 'Clock', selected: false, deleted: true },
    { name: 'Chair', selected: false, deleted: false },
    { name: 'Radio', selected: true, deleted: false }
];
</code></pre>

The following template shows how nested ternaries could be used to handle either a selected or deleted hook:

<i>Note: This assumes that the selected and deleted states will not occur at the same time.</i>

<pre class="language-markup"><code class="language-markup">&lt;ul&gt;
    &lt;% _.each( items, function( item ) { %&gt;
        &lt;li class="&lt;%= (item.selected) ? 'selected' :
                       (item.deleted) ? 'deleted' : '' %&gt;"&gt;
            &lt;%- item.name %&gt;
        &lt;/li&gt;
    &lt;% }); %&gt;
&lt;/ul&gt;
</code></pre>

Here are a couple other examples of how you could structure this check. The most important thing is to find something that works for you, or more importantly, the person who will be maintaining your code.

<pre class="language-markup"><code class="language-markup">&lt;ul&gt;
    &lt;% _.each( items, function( item ) { %&gt;
        &lt;li class="&lt;% if (item.selected) { %&gt;selected&lt;% } %&gt;
                   &lt;% if (item.deleted) { %&gt;deleted&lt;% } %&gt;"&gt;
            &lt;%- item.name %&gt;
        &lt;/li&gt;
    &lt;% }); %&gt;
&lt;/ul&gt;
</code></pre>

<pre class="language-markup"><code class="language-markup">&lt;ul&gt;
    &lt;% _.each( items, function( item ) { %&gt;
        &lt;li class="
          &lt;% if (item.selected) { %&gt; selected &lt;% } %&gt;
          &lt;% if (item.deleted)  { %&gt; deleted  &lt;% } %&gt;
        "&gt;
            &lt;%- item.name %&gt;
        &lt;/li&gt;
    &lt;% }); %&gt;
&lt;/ul&gt;
</code></pre>
