---
layout: post
title: Logging Test Failures in a PhantomJS QUnit Runner
comments: true
---

[PhantomJS](http://phantomjs.com) provides an easy means of automating [QUnit](http://qunitjs.com) tests; it even provides a [test runner](https://github.com/ariya/phantomjs/blob/master/examples/run-qunit.js) that you can simply copy into your project to run them.

The output of said runner displays the number of tests ran and the number that passed.  For example, here's an example of the output when I use the default runner on jQuery UI's spinner test suite:

<pre class="language-shell"><code class="language-shell">tj-cpu:spinner tj$ phantomjs run-qunit.js spinner.html
Tests completed in 492 milliseconds
489 tests of 489 passed, 0 failed.
'waitFor()' finished in 587ms.
</code></pre>

Which is great, but if something fails you only get the following:

<pre class="language-shell"><code class="language-shell">tj-cpu:myproject tj$ phantomjs run-qunit.js spinner.html
'waitFor()' finished in 630ms.
Tests completed in 535 milliseconds.
486 tests of 489 passed, 3 failed.
</code></pre>

The provided runner doesn't provide any additional information about the tests that failed.  Luckily PhantomJS and QUnit make it trivial to customize the output to meet your needs.

<!--more-->

## Logging

PhantomJS's [page.onConsoleMessage](http://code.google.com/p/phantomjs/wiki/Interface#onConsoleMessage) callback can be used to redirect the browser's JavaScript console logging.  The provided test runner uses this callback to redirect the output to the command line instead of the headless browser (where you would never see it).

<pre class="language-javascript"><code class="language-javascript">// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
    console.log(msg);
};
</code></pre>

Meaning, when running QUnit tests via PhantomJS, the output of any `console.log` statements will appear on the command line.

## QUnit

QUnit provides a [comprehensive API](http://api.qunitjs.com/) including [callback hooks](http://api.qunitjs.com/category/callbacks/) for common tasks such as tests starting and finishing.  This is perfect for logging information about the tests themselves.

For example you could use the following to log the associated message for every test that fails:

<pre class="language-javascript"><code class="language-javascript">QUnit.log(function(details) {
    if (!details.result) {
        console.log(details.message);
    }
});
</code></pre>

If we apply this our failing test suite we now get the following:

<pre class="language-shell"><code class="language-shell">tj-mac:spinner tj3$ phantomjs run-qunit.js spinner.html
min from markup
stop from options
blur after many keys
'waitFor()' finished in 579ms.
Tests completed in 483 milliseconds.
486 tests of 489 passed, 3 failed.
</code></pre>

Better, but still not terribly useful.  In order to provide a useful report of failed tests you need to combine more of QUnit's API callbacks with some basic text formatting.  Here's a more comprehensive example:

<pre class="language-javascript"><code class="language-javascript">(function() {
    var module = '', 
        test = '',
        lastModuleLogged = '',
        lastTestLogged = '',
        failuresOnCurrentTest = 0,
        failureFound = false;

    QUnit.moduleStart(function(details) {
        module = details.name;
    });
    QUnit.testStart(function(details) {
        test = details.name;
    });

    QUnit.log(function(details) {
        if (!details.result) {
            if (!failureFound) {
                failureFound = true;
                console.log('');
                console.log('/*********************************************************************/');
                console.log('/************************** FAILURE SUMMARY **************************/');
                console.log('/*********************************************************************/');
            }

            if (lastModuleLogged != module) {
                console.log('');
                console.log('-----------------------------------------------------------------------');
                console.log('Module: ' + module);
            }

            if (lastTestLogged != test) {
                failuresOnCurrentTest = 1;
                console.log('-----------------------------------------------------------------------');
                console.log('Test: ' + test);
            } else {
                failuresOnCurrentTest++;
            }

            console.log(' ' + failuresOnCurrentTest + ') Message: ' + details.message);
            if (typeof details.expected !== 'undefined') {
                console.log('    Expected: ' + details.expected);
                console.log('    Actual: ' + details.actual);
            }
            if (typeof details.source !== 'undefined') {
                console.log('    Source: ' + details.source);
            }

            lastModuleLogged = module;
            lastTestLogged = test;
        }
    });

    QUnit.done(function(details) {
        if (details.failed > 0) {
            console.log('-----------------------------------------------------------------------');
            console.log('');
        }
    });
}());
</code></pre>

Now running tests with failures will produce something like the following:

<pre class="language-shell"><code class="language-shell">tj-cpu:spinner tj$ phantomjs run-qunit.js spinner.html

/*********************************************************************/
/************************** FAILURE SUMMARY **************************/
/*********************************************************************/

-----------------------------------------------------------------------
Module: spinner: core
-----------------------------------------------------------------------
Test: reading HTML5 attributes
 1) Message: min from markup
    Expected: -1000
    Actual: -100
    Source:     at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:447
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/tests/unit/spinner/spinner_core.js:137
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:134
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:277
    at process (file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:1233)
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:376
 2) Message: stop from options
    Expected: 50
    Actual: 5
    Source:     at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:447
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/tests/unit/spinner/spinner_core.js:148
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:134
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:277
    at process (file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:1233)
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:376

-----------------------------------------------------------------------
Module: spinner: events
-----------------------------------------------------------------------
Test: change
 1) Message: blur after many keys
    Source:     at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:426
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/tests/unit/spinner/spinner_events.js:130
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/ui/jquery.ui.widget.js:454
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/ui/jquery.ui.spinner.js:109
    at handlerProxy (file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/ui/jquery.ui.widget.js:371)
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/tests/jquery-1.8.0.js:3061
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/tests/jquery-1.8.0.js:2677
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/tests/jquery-1.8.0.js:2941
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/tests/jquery-1.8.0.js:3607
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/tests/jquery-1.8.0.js:611
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/tests/jquery-1.8.0.js:241
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/tests/jquery-1.8.0.js:3608
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/tests/jquery-1.8.0.js:3660
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/tests/unit/spinner/spinner_events.js:165
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:134
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:277
    at process (file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:1233)
    at file:///Applications/XAMPP/xamppfiles/htdocs/jquery/jquery-ui/external/qunit.js:376
-----------------------------------------------------------------------

'waitFor()' finished in 590ms.
Tests completed in 494 milliseconds.
486 tests of 489 passed, 3 failed.
</code></pre>

This might be a bit excessive for some but I like being able to quickly see information about what failed from the command line.  Feel free to use this and alter it to your liking.

## TAP Format

If you want to output the test results in [TAP format](http://en.wikipedia.org/wiki/Test_Anything_Protocol) the [QUnit-tap](https://github.com/twada/qunit-tap) plugin provides an excellent implementation using the same approach described above.

### Update (August 31st, 2012)

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/tjvantoll">@tjvantoll</a> did you try the phantomjs addon? <a href="https://t.co/6Orpiwda">https://t.co/6Orpiwda</a></p>&mdash; QUnit (@qunitjs) <a href="https://twitter.com/qunitjs/status/240049283997503488">August 27, 2012</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

QUnit provides its own [test runner for use with PhantomJS](https://github.com/jquery/qunit/tree/master/addons/phantomjs) which logs information on the test run using its own APIs.

One difference with doing the logging in the runner rather than in the HTML is that you will not get the console logging when you run the tests in the browser, which is usually what you want.

Either approach can be used and customized to provide the logging you'd like.
