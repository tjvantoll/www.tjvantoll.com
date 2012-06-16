---
layout: post
title: "Detecting Print Requests with JavaScript"
date: 2012-06-15
comments: true
categories: Browsers JavaScript
---
CSS has a well supported mechanism for applying changes only when the user is printing a document, [print stylesheets](http://coding.smashingmagazine.com/2011/11/24/how-to-set-up-a-print-style-sheet/).  They allow you to alter the presentation of a web page for the printer by applying rules that will only be interpreted for printing.  This is great for common tasks like hiding non-essential content, using more print friendly typography, and adjusting the layout to better suit the size and shape of paper.

Print stylesheets are great for making presentational changes for printing, but sometimes you need the full power of JavaScript.  And in order to do respond to print requests in JavaScript you need the browser to notify you that a print request occurred.

<!--more-->

### onbeforeprint and onafterprint

IE5+ fires `onbeforeprint` and `onafterprint` events before and after the user requests the page to be printed.

``` javascript onbeforeprint and onaferprint
window.onbeforeprint = function() {
    console.log('This will be called before the user prints.');
};
window.onafterprint = function() {
    console.log('This will be called after the user prints');   
};
```

These events are not part of any specification but they are very convenient.  Because of this [Firefox added support for both events in version 6](https://developer.mozilla.org/en/DOM/window.onbeforeprint#Browser_compatibility).  However, WebKit and Opera do not support the events.  Therefore, for cross browser compatibility these events aren't going to cut it.

### WebKit's Solution

WebKit has a bug (#[19937](https://bugs.webkit.org/show_bug.cgi?id=19937)) out there to implement these events, but progress has stopped because the implementation of another API made this functionality possible already - `window.matchMedia`.

### window.matchMedia

The `window.matchMedia` [API](https://developer.mozilla.org/en/DOM/window.matchMedia) provides a means of determining whether the current `document` matches a given [media query](https://developer.mozilla.org/En/CSS/Media_queries).  For example:

``` javascript window.matchMedia
if (window.matchMedia(' (min-width: 600px) ').matches) {  
    console.log('The viewport is at least 600 pixels wide');
} else { 
    console.log('The viewport is less than 600 pixels wide');
} 
```

You can also use this API to add listeners that will be fired whenever the result of the media query changes.  In the above example the `matches` criteria will be met whenever the viewport is at least 600px wide.  If you wanted to receive notifications whenever the viewport crossed the 600px threshold you could use the following.

``` javascript window.matchMedia with notifications
var mediaQueryList = window.matchMedia(' (min-width: 600px) ');
mediaQueryList.addListener(function(mql) {
    if (mql.matches) {
        console.log('The viewport is at least 600 pixels wide');
    } else {
        console.log('The viewport is less than 600 pixels wide');
    }
});
```

[If your browser supports window.matchMedia](http://caniuse.com/#feat=matchmedia) you can see this behavior live below by resizing your browser window under 600px and checking your browser's JavaScript console.

<iframe style="width: 100%; height: 200px;" src="http://jsfiddle.net/tj_vantoll/uYJxy/2/embedded/result,js,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Interestingly, it turns out you can also use this same technique to listen for the ```print``` media being applied when the user requests the document to be printed ([hat tip to Ben Wells](http://code.google.com/p/chromium/issues/detail?id=105743)):

``` javascript Using window.matchMedia to detecting print requests
var mediaQueryList = window.matchMedia('print');
mediaQueryList.addListener(function(mql) {
    if (mql.matches) {
        console.log('onbeforeprint equivalent');
    } else {
        console.log('onafterprint equivalent');
    }
});
```

This works great in Chrome 9+ and Safari 5.1 (with the exception of the fact that the [listeners fire twice in Chrome](http://code.google.com/p/chromium/issues/detail?id=105743)).  However, it doesn't work in Firefox or IE10, even though they both support ```window.matchMedia```.

### Combining the Approaches

If you combine the two approaches you can detect print requests in IE 5+, Firefox 6+, Chrome 9+, and Safari 5.1+ (unfortunately Opera doesn't support either approach).

``` javascript Cross browser print request detection
(function() {
    var beforePrint = function() {
        console.log('Functionality to run before printing.');
    };
    var afterPrint = function() {
        console.log('Functionality to run after printing');
    };

    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
            if (mql.matches) {
                beforePrint();
            } else {
                afterPrint();
            }
        });
    }

    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;
}());
```

Note that your event handlers might potentially have to deal with the fact that they're going to be called twice per print request in Chrome.

### Why Would I Use This?

For most situations print stylesheets are all you need to prepare the document for printing.  But I can think of a couple practical uses of the JavaScript event.

### Responsive Print Images

One use is substituting a higher quality image for the purposes of printing.  Traditionally [web browsers have displayed images at 72dpi and most printers can handle 300dpi+](http://www.cssnewbie.com/print-friendly-images/).  While some newer devices are able to display images at much higher resolutions, most users are still using a screen that will show web images at much lower resolutions than their printer can handle.

Therefore an image that might look just fine on the user's screen might look fuzzy and grainy when printed out.  For most images this is acceptable, but it might be an issue for prominent images on regularly printed documents, like a company logo.  You probably want that to look crisp when printed out.

The [technique to work around this](http://www.alistapart.com/articles/hiresprinting) involves loading both images, showing only the lower quality one by default, then hiding the low quality image and showing the high quality one in the print stylesheet.  The main downfall of this approach is that the end user has to download both images regardless of whether they're going to print the page.  Users on 3G devices that have no intention or capability of printing the document will still have to download your high resolution logo.

With the ability to detect print requests in JavaScript you can substitute the higher quality image on the fly when the user requests the page to be printed.

``` html Substituting higher quality images when printing
<img src="low-quality.jpg" id="company_logo" alt="My Company" />

<script>
    (function() {
        var upgradeImage = function() {
            document.getElementById('company_logo')
                .setAttribute('src', 'high-quality.png'); 
        };

        if (window.matchMedia) {
            var mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener(upgradeImage);
        }

        window.onbeforeprint = upgradeImage;
    });
</script>
```

The nice thing about this approach is that users that never print will not have to download the high quality image.  This technique also degrades nicely; users with browsers that don't support the print events will simply print the lower quality image.

### Tracking Print Requests

Print events can also be used to track the number of times users print pages within a site or application.  Because of the lack of total browser support you wouldn't capture every print request, but this would be sufficient for getting a rough idea of how often people are printing.

``` javascript Tracking Print Requests
(function() {
    var afterPrint = function() {
        // Here you would send an AJAX request to the server to track that a page
        // has been printed.  You could additionally pass the URL if you wanted to
        // track printing across an entire site or application.
    };

    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
            if (!mql.matches) {
                afterPrint();
            }
        });
    }

    window.onafterprint = afterPrint;
}());
```

### So can I use this in a "real" application?

Sure, just make sure what you're doing degrades nicely for users using a browser in which the event will not be fired.

Can you think of any other practical uses of detecting print requests in JavaScript?  If so let me know in the comments.
