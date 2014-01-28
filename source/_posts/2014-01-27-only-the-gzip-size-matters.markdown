---
layout: post
title: "Only the gzip Size Matters"
date: 2014-01-27 19:32
comments: true
categories: [JavaScript, Efficiency]
---

Let's just get it out there: the only size that matters for a CSS or JavaScript file is its gzipped size.

And by gzipped size I mean: the size of the file after it's compressed using [gzip](http://en.wikipedia.org/wiki/Gzip)'s compression algorithm. All browsers since IE6 have supported gzipped assets, and enabling gzip on web servers has been a [best practice](https://developers.google.com/speed/docs/best-practices/payload#GzipCompression) for years now; therefore it's relatively safe to assume that everyone who cares about the size of CSS or JavaScript files is gzipping them.

This means that if you're trying to find how big a front-end library is, the answer you need is not in Finder or Windows Explorer. While the uncompressed file size can give you a rough idea, you have no idea what the user will actually download until you gzip the files.

### Running gzip

If you're on OS X or Linux, you can run the `gzip` command on any file to compress it. For example the following shows the before and after of compressing jQuery 2.1.0.

<img src="/images/posts/2014-01-27/jquery.png" alt="Running gzip on jQuery from the command line">

There are two things to note here:

1. `gzip` made quite the difference in file size - 82K down to 29K.
2. `gzip` replaces the original file; `jquery.js` is now `jquery.js.gz`.

Because replacing the original file is a bit annoying, you can make `gzip` generate a new file with a [little shell magic](http://unix.stackexchange.com/questions/46786/how-to-tell-gzip-to-keep-original-file#answer-58814), shown below.

<img src="/images/posts/2014-01-27/jquery-new-file.png" alt="Running gzip on jQuery from the command line and generating a new file">

### Why It Matters

There is no set percentage that `gzip` will reduce the size of a JavaScript or CSS file by. There is no way to know for sure other than running `gzip`.

To show this, let's look at the [specific situation](https://twitter.com/nelsonic/status/426724640090640384) that made me feel the need to write this.

<img src="/images/posts/2014-01-27/twitter.png" alt="View of Twitter discussion of the size of the jQuery Mobile library">

414K! Yikes! But remember, this is the file size that is shown in Finder, not the size that the user is actually going to download from a server with gzip enabled.

To see what the user will actually download, we have to run `gzip`. Below we run `gzip` on each of jQuery Mobile's files.

<img src="/images/posts/2014-01-27/jquery-mobile.png" alt="Running gzip on jQuery Mobile files">

As you can see, `gzip` reduced our two files down to a combined 88K. Quite the difference! Take note of one more thing: the drastic difference running `gzip` made on `jquery.mobile.css` - 216K to 25K. A savings of 88.5%!

Why was the compression so successful here?

[jQuery Mobile 1.4](http://blog.jquerymobile.com/2013/12/23/jquery-mobile-1-4-0-released/) made a big change to the way they handle images - namely, they now embed images directly within their css file to avoid separate HTTP requests. Because of this change, [their CSS file](http://code.jquery.com/mobile/1.4.0/jquery.mobile-1.4.0.min.css) is packed full of [data URIs](https://developer.mozilla.org/en-US/docs/data_URIs).

How does this relate to `gzip`?

At a high level, the compression algorithm that runs under the hoods of `gzip` finds repeated strings and replaces them with symbols. Because of this, the files that compress best are the ones with a lot of repeated strings - such as a file with a bunch of data URIs.

Just look at all the repeated strings in jQuery Mobile's CSS. `gzip` is practically salivating.

<img src="/images/posts/2014-01-27/jquery-mobile-source.png" alt="View of jQuery mobile 1.4's CSS source">

*Note: If you concatenate your files `gzip` gets better. Bigger files = more repeated strings to substitute.*

### Wrapping Up

Anyways, the point is: if you're assessing the size of a library, framework, or whatever - run `gzip` on it first. Since it's what the user actually downloads, it's the only size that matters for front-end assets.

Because size is paramount in jQuery core, they actually make [changes](http://bugs.jquery.com/ticket/12229) to improve how well the library is optimized by `gzip`'s compression algorithm.
