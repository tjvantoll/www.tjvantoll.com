// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-29179796-1', 'auto');
ga('send', 'pageview');

// Ads
(function() {
	var isSmallScreen = window.innerWidth <= 800;
	var isBlogPage = document.querySelector(".entry-content") && !document.querySelector(".blog-index");

	if (isSmallScreen && !isBlogPage) {
		return;
	}

	var ad = document.querySelector(".ad-container");
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "https://cdn.adpacks.com/adpacks.js?legacyid=1285803&zoneid=1386&key=cb7a6f705dfe7532dde49b4c2c5adf2d&serve=C6SI42Y&placement=tjvantollcom&circle=dev";
	script.id = "_adpacks_js";
	script.async = true;
	script.onload = function() {
		if (isSmallScreen) {
			var paragraphs = document.querySelectorAll(".entry-content > p");
			paragraphToUse = paragraphs.length > 1 ? paragraphs[1] : paragraphs[0];
			paragraphToUse.parentNode.insertBefore(ad, paragraphToUse);
		}
		ad.style.display = "block";
	};
	document.querySelector(".ad-container").appendChild(script);
}());

// Comments
(function () {
	var comments = document.querySelector("html").getAttribute("data-comments");
	var disqus_shortname = document.querySelector("html").getAttribute("data-disqus-shortname");
	var disqus_url = document.querySelector("html").getAttribute("data-disqus-url");

	if (comments === "true") {
		window.disqus_config = function () {
			this.page.url = disqus_url;
			this.page.identifier = disqus_url;
		};

		var d = document, s = d.createElement("script");
		s.src = "https://" + disqus_shortname + ".disqus.com/embed.js";
		s.setAttribute("data-timestamp", +new Date());
		(d.head || d.body).appendChild(s);
	}
}());
