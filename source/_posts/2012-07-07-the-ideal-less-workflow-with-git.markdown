---
layout: post
title: "The Ideal LESS Workflow with git"
date: 2012-07-07
comments: true
categories: [CSS, LESS, git]
---

LESS is a CSS pre-processor written in JavaScript.  Unlike its main competitor SASS, it has the ability to run both on the client side via a simple ```<script>``` tag, as well as server-side in Node.js.  The fact that LESS files can be processed client side is advantageous for a number of reasons:

#### **There are no dependencies.**
To develop LESS files all you need is your browser.  SASS requires Ruby to be running on your system to generate the CSS files.

While some would argue that this isn't a big deal (Ruby is pre-installed on OS X for example), it can potentially put off beginners or those not familiar with the command line.  A lot of people that write CSS wear a designer hat more than a developer hat.  Even if _you_ know what you're doing, if you're on a team with less technical people oftentimes the simplest approach will make everyone happy.

#### **You can auto-reload changes to less files without reloading the browser and without external dependencies.**
With LESS you can easily watch for changes by appending `#!watch` to the URL or by running `less.watch()` from the console.  There's no additional setup and no need to reload your browser, changes take effect automatically.

If you want files to be regenerated using SASS you must tell SASS which files to watch via the command line or use an app that does that for you.  If you want CSS changes to happen without reloading your browser you need to enlist the help of an app / extension such as [LiveReload](http://livereload.com).  While this works fine this is yet another dependency.

<!--more-->

### Production

While the ease of use during development is great, you don't want visitors to your site to incur the cost of processing the LESS files client side in a production settting.  The easy way to accomplish this is to manually run ```lessc``` from the command line to convert all LESS files into CSS files, and then updating all of your .less paths in `<link>` tags to use .css paths.

This works, but the lazy programmer in you will be looking to automate this after doing this more than once.  If you're using Git for source control one way you can accomplish this is by running a commit hook to do the generation.

### Git Commit Hooks

[Git commit hooks](http://git-scm.com/book/en/Customizing-Git-Git-Hooks) allow you to run scripts whenever a commit occurs.  A `pre-commit` hook allows you to run a script that can also optionally prevent the commit from occurring.  The `pre-commit` hook works well for generating CSS files from LESS files for a few reasons.

* Once the script is in place you no longer have to manually generate CSS files, it'll simply be done automatically when you commit changes to source control.
* The script can be setup so that if `lessc` fails the commit will be rejected.  Therefore, LESS files with invalid syntax will be kept out of source control.  

To create a Git commit hook navigate into the `.git/hooks` directory of your repository.  This folder has a number of sample hooks that you can potentially use with a `.sample` suffix.  To create a `pre-commit` script that Git will run simply create an un-prefixed copy of `pre-commit.sample`.

``` bash
cd /MyProject/.git/hooks
cp pre-commit.sample pre-commit
```

Once a `pre-commit` file exists in `.git/hooks`, Git will run it before every commit.

### The Script

There are many ways to implement a script that generates CSS files from LESS files.  This is the `pre-commit` script that I use.

``` bash The script
#!/bin/sh

# Pre-commit hook to generate .css files from .less files using lessc.
# Script assumes .less files are in a directory named "less" and will
# put the generated files in a sibling "css" directory.  The generated
# CSS will also be compressed as part of lessc.
#
# When .less files are deleted the script will delete the corresponding
# .css files if they exist.
#
# Example
# -------
#
# Before:       After:
#
# foo/          foo/
#   less/         css/
#     a.less        a.css
# bar/            less/
#   less/           a.less
#     b.less    bar/   
#                 css/
#                   b.css
#                 less
#                   b.less
#
# Loop over all files included in the commit.
for file in $( exec git diff-index --cached --name-only HEAD )
do
# We only want to take action unless the file is a LESS file.
  if [[ $file == *".less"* ]]; then

    lessFile=$file

#   Find where the corresponding CSS file should be located
#   in the file system, in this case a sibling CSS directory.
    cssFile="${lessFile/less\//css/}"
    cssFile="${cssFile/.less/.css}"

#   Determine the status of the file in the commit.
#   M = Modified, A = Added, D = deleted, R = renamed,
#   C = copied, U = Updated but unmerged
    status=$( exec git status --porcelain $lessFile )

#   If the file was deleted as part of the commit, delete the
#   corresponding CSS file.
    if [[ $status == D* ]]; then
      if [ -e "$cssFile" ]; then
        echo "Removing $cssFile"
        git rm $cssFile 
      fi
    else
#     Otherwise we must generate the CSS file. First create a
#     CSS folder to place the file in.  The -p option for mdkir
#     tells it to create parent folders if necessary.
      baseDirectory=${lessFile/less\/*/}
      mkdir -p ${baseDirectory}css

#     Log to the console that the CSS is being generated so the person
#     running the commit is aware.
      echo "Generating $cssFile from $lessFile"

#     Run lessc to do the actual generation.  If lessc fails exit
#     with a code of 1 so that the commit is rejected.  The -x option 
#     tells lessc to generate compressed CSS for production usage.
      if ! lessc -x $lessFile $cssFile; then
        exit 1
      fi

#     Add the CSS file to the commit.
      git add $cssFile
    fi
  fi
done
```

You could greatly simplify this script to simply run `lessc` on all .less files on every commit.  I go file by file because the script has to be run on a large code base where generating hundreds to thousands of CSS files on every commit isn't practical.  This script is also setup to create sibling `css` and `less` directories.  You could easily modify this to simply put the files in the same directory; I like them to be logically separated.

### Automating `<link>` File Paths

As I said, the script I use assumes that there are sibling `css` and `less` directories.  To give a concrete example of this say I have the following file system structure.

    /MyProject
        /css
            * Generated files *
        index.html
        /js
            less.js
        /less
            a.less
            b.less

To include these files I use the following locally:

``` html Local Includes
<!-- index.html -->
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet/less" href="less/a.less">
        <link rel="stylesheet/less" href="less/b.less">
        <script src="js/less.js"></script>
    </head>
    <body>
    </body>
</html>
```

And the following in production:

``` html Production Includes
<!-- index.html -->
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="css/a.css">
        <link rel="stylesheet" href="css/b.css">
    </head>
    <body>
    </body>
</html>
```

The best way to handle both development and production with minimal maintenance is to use some sort of server-side check so that you don't have to change your HTML whenever you release to production.  Here's an example of a PHP script that does this by detecting whether the host contains `localhost`.

``` html Making both imports work
<!-- index.html -->
<!DOCTYPE html>
<html>
    <head>
    	<? if (strpos($_SERVER['HTTP_HOST'], 'localhost')) { ?>
            <link rel="stylesheet/less" href="/less/a.less">
            <link rel="stylesheet/less" href="/less/b.less">
            <script src="/js/less.js"></script>
        < } else { ?>
            <link rel="stylesheet" href="/css/a.css">
            <link rel="stylesheet" href="/css/b.css">
        <? } ?>
    </head>
    <body>
    </body>
</html>
```

### Conclusion

Using LESS client side is awfully convenient, but it shouldn't be done in a production setting.  If you use LESS a lot then this is something you'll want to automate in your workflow.  In my opinion using a git `pre-commit` hook is a clean way to accomplish this.  Feel free to use my script or alter it to your liking.  If you have any other ways you automate your LESS workflow I'd love to hear about it.  Let me know in the comments.
