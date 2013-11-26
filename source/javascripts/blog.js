$.domReady(function(){
	if (document.getElementById('browser-picture-cube')) {
		new PictureCube('browser-picture-cube', 
			[
				{ src: '/images/browsers/chrome.png', title: 'Chrome' },
				{ src: '/images/browsers/firefox.png', title: 'Firefox' },
				{ src: '/images/browsers/IE8.png', title: 'IE8' },
				{ src: '/images/browsers/Safari.png', title: 'Safari' },
				{ src: '/images/browsers/Opera.png', title: 'Opera' },
				{ src: '/images/browsers/IE9.png', title: 'IE9' }
			]
		).cycle(2500);
	}

	if (document.getElementById('playground-cube')) {
		window.playgroundCube = new PictureCube('playground-cube', [
			{ src: '/images/izzie/1.jpg' },
			{ src: '/images/izzie/2.jpg' },
			{ src: '/images/izzie/3.jpg' },
			{ src: '/images/izzie/4.jpg' },
			{ src: '/images/izzie/5.jpg' },
			{ src: '/images/izzie/6.jpg' }
		]);
	}
});