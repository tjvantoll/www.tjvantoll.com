---
layout: post
title: "Linting JavaScript in NativeScript Apps"
date: 2015-05-22
comments: true
categories: [NativeScript, JavaScript]
---

One of the great things about [NativeScript](https://www.nativescript.org/) is you can use the JavaScript tools you already know to help build your native iOS and Android apps. In my case I recently added two tools I was already familiar with—[JSHint](http://jshint.com/) and [JSCS](http://jscs.info/)—to my NativeScript apps to automate [linting](http://en.wikipedia.org/wiki/Lint_%28software%29). In this article I'll show you how to do it too.

<!-- more -->

## Setting up Gulp

There are a number of tools you can use to automate tasks in NativeScript apps—including [Gulp](http://gulpjs.com/), [Grunt](http://gruntjs.com/), and even [npm](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)—but I'm a fan of Gulp so that's what I'll be using in this article. First, if you don't have Gulp installed globally you'll need to grab it from npm:

<pre class="language-shell"><code>npm install -g gulp</code></pre>

Next, to start using Gulp in your NativeScript projects you need to make sure each project has a `package.json` file in its root:

<pre class="language-shell"><code>.
├── app
│   └── ...
├── package.json ────────────── here
└── platforms
    └── ...</code></pre>

If your project doesn't already have a `package.json` file, run [`npm init`](https://docs.npmjs.com/cli/init) in the project's root and npm will help you build one.

After that, install Gulp locally along with its [JSHint](https://www.npmjs.com/package/gulp-jshint) and [JSCS](https://www.npmjs.com/package/gulp-jscs) packages:

<pre class="language-shell"><code>npm install gulp gulp-jshint gulp-jscs --save-dev</code></pre>

The `--save-dev` flag tells npm to remember these dependencies in your newly created `package.json` file. If you open your project's `package.json` you should now see a `"devDependencies"` key at the bottom that looks something like this:

<pre class="language-javascript"><code>{
  ...
  "devDependencies": {
    "gulp": "^3.8.11",
    "gulp-jscs": "^1.6.0",
    "gulp-jshint": "^1.10.0"
  }
}</code></pre>

With the installation out the way, now it's time to write the code that uses these tools.

## Writing the task

To write a Gulp task that runs JSHint and JSCS you'll need to create a `gulpfile.js` file in your project's root:

<pre class="language-shell"><code>.
├── app
│   └── ...
├── gulpfile.js ────────────── here
├── package.json
└── platforms
    └── ...</code></pre>

Paste the following code into your newly created `gulpfile.js`:

<pre class="language-javascript"><code>var gulp = require("gulp");
var jscs = require("gulp-jscs");
var jshint = require("gulp-jshint");

var filesToLint = [
    "app/**/*.js",

    // Exclude node modules from linting
    "!app/node_modules/**/*.js",

    // Exclude NativeScript modules from linting
    "!app/tns_modules/**/*.js"
];

gulp.task("jscs", function() {
    gulp.src(filesToLint)
        .pipe(jscs());
});

gulp.task("jshint", function() {
    return gulp.src(filesToLint)
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task("lint", ["jshint", "jscs"]);</code></pre>

This code defines three Gulp tasks: `jscs`, `jshint`, and `lint`. As you might expect, `gulp jscs` runs JSCS, `gulp jshint` runs JSHint, and `gulp lint` runs both.

The `filesToLint` array specifies which files the linters should hit. By default this is set to lint all JavaScript files in the `app` directory—excluding any npm modules you have in the `node_modules` folder, and any NativeScript modules in `tns_modules` folder—but you may wish to customize this depending on how you've structured your app.

With the `gulpfile.js` file in place the last thing you need to do is add a few configuration files.

## Configuring JSHint and JSCS

JSHint and JSCS each have comprehensive sets of options for specifying exactly how they should lint your code. To specify these options, head back to the root of your project and create two files: `.jshintrc` and `.jscsrc`:

<pre class="language-shell"><code>.
├── app
│   └── ...
├── gulpfile.js
├── package.json
├── platforms
│   └── ...
├── .jshintrc ────────────── here
└── .jscsrc ────────────── here</code></pre>

The contents of these configuration files will depend on your personal coding preferences. I'll share my preferences if you'd like to use them as a starting point, and you can look over [JSHint's option docs](http://jshint.com/docs/options/) and [JSCS's option docs](http://jscs.info/rules.html) to configure them to your liking.

Here's my `.jshintrc`:

<pre class="language-javascript"><code>{
  "boss": true,
  "curly": true,
  "esnext": true,
  "eqeqeq": true,
  "eqnull": true,
  "expr": true,
  "immed": true,
  "noarg": true,
  "quotmark": "double",
  "smarttabs": true,
  "trailing": true,
  "unused": true
}</code></pre>

And here's my `.jscsrc`:

<pre class="language-javascript"><code>{
  "disallowMixedSpacesAndTabs": true,
  "disallowMultipleLineBreaks": true,
  "disallowMultipleSpaces": true,
  "disallowMultipleVarDecl": true,
  "disallowNamedUnassignedFunctions": true,
  "disallowNewlineBeforeBlockStatements": true,
  "disallowSpacesInCallExpression": true,
  "disallowSpacesInFunctionDeclaration": {
    "beforeOpeningRoundBrace": true
  },
  "disallowTrailingWhitespace": true,
  "esnext": true,
  "requireCommaBeforeLineBreak": true,
  "requireCurlyBraces": ["if", "else", "for", "while", "try", "catch"],
  "requireSemicolons": true,
  "requireSpaceBetweenArguments": true,
  "requireSpacesInConditionalExpression": true,
  "requireSpacesInForStatement": true,
  "requireSpacesInsideObjectBrackets": "all",
  "validateIndentation": "\t",
  "validateQuoteMarks": "\""
}</code></pre>

After you have these files in place head back to your terminal and run `gulp lint`. If all went well you should see something like this:

<pre class="language-shell"><code>$ gulp lint
[12:06:49] Using gulpfile /path/to/my-project/gulpfile.js
[12:06:49] Starting 'jshint'...
[12:06:49] Starting 'jscs'...
[12:06:49] Finished 'jscs' after 84 ms
[12:06:49] Finished 'jshint' after 305 ms
[12:06:49] Starting 'lint'...
[12:06:49] Finished 'lint' after 13 μs</code></pre>

If you head back into your app and create a problem, such as changing `var` to `vax`, `gulp lint` should now point out the error:

<pre class="language-shell"><code>$ gulp lint
[12:09:24] Using gulpfile /path/to/my-project/gulpfile.js
[12:09:24] Starting 'jshint'...
[12:09:24] Starting 'jscs'...
[12:09:24] Finished 'jscs' after 70 ms
[12:09:24] Finished 'jshint' after 255 ms
[12:09:24] Starting 'lint'...
[12:09:24] Finished 'lint' after 6.09 μs

events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: Unexpected identifier at my-file.js :
     2 |
     3 |exports.loaded = function(args) {
     4 | vax page = args.object;
--------------^
     5 | page.bindingContext = viewModel;
     6 |};</code></pre>

## Wrapping up

That's it! If you have any other questions about this setup let me know in the comments. If you're looking for an example of this setup in a real app, check out JustMeme, which is [available on GitHub](https://github.com/NativeScript/sample-JustMeme) as well as the [iOS app store](https://itunes.apple.com/us/app/justmeme/id989340374?mt=8).
