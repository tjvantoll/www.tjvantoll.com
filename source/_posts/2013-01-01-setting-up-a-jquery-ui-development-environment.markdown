---
layout: post
title: "Setting up a jQuery UI Development Environment"
comments: true
categories: JavaScript
date: 2013-01-01 21:45
published: false
---
Setting up a development environment to work on an open source project can be a daunting task if you have no experience.  This needs to be better.  Some of this may appear obvious but I'm purposely assuming that you have absolutely nothing steup.

### Getting Started
The first thing you're going to need is an HTTP server; there are a plethora of options so I'll cover some of the most common and easy.

#### Apache
The most common HTTP server is Apache which can be downloaded from [http://httpd.apache.org/download.cgi](http://httpd.apache.org/download.cgi).  It can be ran cross platform so you can use it on Windows, Mac, & Linux.  

If you're using OS X an Apache server comes preinstalled, you'll simply have to put your files in the appropriate user's Sites folder and enable Web Sharing.  There are more comprehensive instructions [here](http://docs.info.apple.com/article.html?artnum=61500).

#### LAMP
Another option is to install a full [LAMP](http://en.wikipedia.org/wiki/LAMP_(software_bundle) stack on your development machine.  This can be useful if you need to run PHP or MySQL locally.  These bundles also gives you a bundled installer and a nice GUI to start/stop the various servers it provides.  There are a lot of options but here are the big ones.

- [XAMPP](http://www.apachefriends.org/en/xampp.html) for Windows/Mac/Linux
- [MAMP](http://www.mamp.info/en/index.html) for Mac
- [WAMP](http://www.wampserver.com) for Windows

#### Python
If you have [Python](http://www.python.org/) installed it has the ability to kick up a quick HTTP server built in.  There's some instructions on how to do so [here](http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python).

### Git
Now that you have an HTTP server you're going to need to get the code locally. [jQuery](http://jquery.com), [jQuery UI](http://jqueryui.com), & [jQuery Mobile](http://jquerymobile.com) all have their source hosted on [GitHub](http://github.com), so you'll need to [setup Git](http://help.github.com/mac-set-up-git/).

Next, if you don't already one you'll need to [create a GitHub account](https://github.com/signup/free).

- GitHub (fork the repo)

- Point your local dev environment at the fork

- Make a branch

- Push the branch up

- Send pull request