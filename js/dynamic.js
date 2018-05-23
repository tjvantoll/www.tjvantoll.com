// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-29179796-1', 'auto');
ga('send', 'pageview');

// Ads
(function() {
	var isBlogPage = document.querySelector("html").getAttribute("data-comments") === "true";
	var noAds = document.querySelector("html").getAttribute("data-ads") === "false";

	if (!isBlogPage) {
		return;
	}
	if (noAds) {
		return;
	}

	var ad = document.createElement("div");
	ad.className = "ad-container";

	var paragraphs = document.querySelectorAll(".entry-content > p");
	paragraphToUse = paragraphs.length > 1 ? paragraphs[1] : paragraphs[0];
	paragraphToUse.parentNode.insertBefore(ad, paragraphToUse);

	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "//cdn.carbonads.com/carbon.js?serve=CKYI5KQW&placement=tjvantollcom";
	script.id = "_carbonads_js";
	script.async = true;
	script.onload = function() {
		ad.style.display = "block";
	};

	ad.appendChild(script);
}());

// Comments
(function () {
	var comments = document.querySelector("html").getAttribute("data-comments") === "true";
	var disqus_shortname = document.querySelector("html").getAttribute("data-disqus-shortname");
	var disqus_url = document.querySelector("html").getAttribute("data-disqus-url");

	if (comments) {
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
