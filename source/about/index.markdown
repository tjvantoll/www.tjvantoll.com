---
layout: page
title: "About Me"
comments: false
sharing: false
footer: true
---
<img src="/images/me/1.jpg" alt="Me!" style="float: right; margin: 10px;" />
Hi!  I'm Ted VanToll.  I'm a Web Developer working for [Liquid Web](http://liquidweb.com) in Lansing, MI.  I've been making web sites since the web was a thing and I have experience building sites ranging from major applications for Fortune 500 companies to small personal sites and everything in between.

I'm a big open source advocate and have made some minor contributions to a few open source libraries that I use.  This blog itself is open source and if you'd like to [dig around the source](https://github.com/tjvantoll/tjvantoll.github.com/tree/source) to see how I've made it you're free to.

If you're looking to contact me, email me at [tj.vantoll@gmail.com](mailto:tj.vantoll@gmail.com) or contact me via Twitter ([@tjvantoll](https://twitter.com/tjvantoll)).

<header><h1 class="entry-title">Stuff I've Made</h1></header>

Occasionally I make things.

<script>
$.domReady(function() {
	if (Modernizr.csstransforms3d) {
		new PictureCube('browser-picture-cube', 
			[
				{ src: '/images/browsers/Chrome.png', title: 'Chrome' },
				{ src: '/images/browsers/Firefox.png', title: 'Firefox' },
				{ src: '/images/browsers/IE8.png', title: 'IE8' },
				{ src: '/images/browsers/Safari.png', title: 'Safari' },
				{ src: '/images/browsers/Opera.png', title: 'Opera' },
				{ src: '/images/browsers/IE9.png', title: 'IE9' }
			]
		).cycle(2500);
	}
});
</script>
<div class="project-contents">
	<div class="image">
		<div id="browser-picture-cube"></div>
	</div>
	<div class="wording">
		<a href="https://github.com/tjvantoll/PictureCube">PictureCube</a>
		<p>3D Cube of images created and controlled by a simplistic JavaScript API.</p>
	</div>
</div>
