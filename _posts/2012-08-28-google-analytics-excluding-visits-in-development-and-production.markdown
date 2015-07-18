---
layout: post
title: "Google Analytics - Excluding Your Own Visits in Development and Production"
comments: true
---

Googling how to exclude your own [Google Analytics](http://www.google.com/analytics/) traffic returns a plethora of results, however, nearly all of them advocate 1 of 2 approaches:

* Creating an IP filter in Google Analytics itself [(example)](http://support.google.com/analytics/bin/answer.py?hl=en&answer=1034840&rd=1).
* Creating a page that sets a cookie which tells Google Analytics to exclude the traffic [(example)](http://webmasters.stackexchange.com/questions/15552/how-do-you-exclude-yourself-from-google-analytics-on-your-website-using-cookies).

## Problems

These approaches are silly in my opinion.  IP addresses change.  In fact, most ISPs change subscriber's IP addresses quite regularly.  Furthermore, most people visit their site on a wide variety of devices in a wide variety of places.  Maintaining a list of IP addresses in Google Analytics would be a nightmare.

The cookie approach works, but it is a pain to have to create and maintain the page that sets the cookie.  It's also problematic because verifying whether the cookie is actually active is difficult.  Do you know where your browser stores your cookies and how to access them?  How about your smart phone?  Because of this you end up constantly having to create the cookie before accessing the site, which is a nuisance.

## JavaScript

Both these approaches seem especially silly considering how easy it is to simply accomplish this with JavaScript.  You can simply check for the exclusion criteria before including the Google Analytics code snippet.

<!--more-->

## Excluding localhost Traffic

If you test your site on a local server you likely don't want that traffic being logged.  Assuming that your local server is using `localhost` as the hostname the following will exclude the traffic.

<pre class="language-javascript"><code class="language-javascript">&lt;script&gt;
    if (window.location.host != 'localhost') {
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-12345678-1']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    }
&lt;/script&gt;
</code></pre>

## Excluding Production Traffic

While the above works great during development it won't help you when you're accessing your site on its live production server.  For that I would suggest using a request parameter.

For example if your site is `http://mysite.com` then you could visit `http://mysite.com?analytics=off` to exclude the logging.  The following script makes it so that any page view with the appropriate `analytics=off` request parameter is not logged.

<pre class="language-markup line-numbers"><code class="language-markup">&lt;script&gt;
    var useAnalytics = true;

    try {
        //Turn off analytics if 'analytics=off' is included as a request parameter.
        var parameters = window.location.search.split('&');
        if (parameters[0]) {
            parameters[0] = parameters[0].replace('?', '');
        }
        for (var i = 0; i &lt; parameters.length; i++) {
            var values = parameters[i].split('=');
            if (values[0] == 'analytics' && values[1] == 'off') {
                useAnalytics = false;
            }
        }
    } catch(e) {
        //Just in case something goes wrong...
        useAnalytics = true;
    }

    if (useAnalytics) {
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-12345678-1']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    }
&lt;/script&gt;
</code></pre>

With this approach you could simply create a bookmark with the request parameter in the URL and use that to access the site.

Furthermore, it would be easy to add on code to [set a cookie](https://developer.mozilla.org/en-US/docs/DOM/document.cookie) or utilize [localStorage](https://developer.mozilla.org/en-US/docs/DOM/Storage#localStorage) to save the preference so you don't have to always include the request parameter.

## Combining the Approaches

In case you want to include both of these here's a code snippet that makes it so that both `localhost` traffic and pages with a `analytics=off` request parameter are excluded.

<pre class="language-markup line-numbers"><code class="language-markup">&lt;script&gt;
    var useAnalytics = true;

    try {
        //Turn off analytics if 'analytics=off' is included as a request parameter.
        var parameters = window.location.search.split('&');
        if (parameters[0]) {
            parameters[0] = parameters[0].replace('?', '');
        }
        for (var i = 0; i &lt; parameters.length; i++) {
            var values = parameters[i].split('=');
            if (values[0] == 'analytics' && values[1] == 'off') {
                useAnalytics = false;
            }
        }

        //Turn off analytics if 'localhost' is the host
        if (window.location.host == 'localhost') {
            useAnalytics = false;
        }
    } catch(e) {
        //Just in case something goes wrong...
        useAnalytics = true;
    }

    if (useAnalytics) {
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-29179796-1']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    }
&lt;/script&gt;
</code></pre>

If you have any other recommendations for how to exclude Google Analytics traffic let me know in the comments.

## Update (January 1st, 2013)

Reader Aaron Hillyer has created a WordPress plugin to implement the request parameter exclusion approach, [check it out](http://socialmediabar.com/enhanced-google-analytics-tracking).
