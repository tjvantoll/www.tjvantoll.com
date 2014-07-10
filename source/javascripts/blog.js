$.domReady(function(){
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