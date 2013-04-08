$.domReady(function() {
	return; //Need to figure out shy this causes the page to 'shake' in Chrome.
	if (Modernizr.csstransforms3d && navigator.userAgent.indexOf('MSIE') == -1) {
		new PictureCube('picture-cube', 
		[
			{ src: '/images/me/2.jpg', title: 'My girlfriend Trish and I in NYC.' },
			{ src: '/images/me/1.jpg', title: 'This is me. Hi!' },
			{ src: '/images/kids/2.jpg', title: 'My son Chase being brainwashed.' },
			{ src: '/images/kids/3.jpg', title: 'My son Max, also being brainwashed.' },
			{ src: '/images/izzie/5.jpg', title: 'My favorite dog, Izzie.' },
			{ src: '/images/me/3.jpg', title: 'Trish & I with 100% more sunglasses.' }
		],
		{
			onchange: function(number, image, cube) {
				if ($('.tipsy').length > 0) {
					$('.tipsy').remove();
					$('#picture-cube figure:nth-child(' + number + ') img').tipsy('show');
				}
			}
		}
	).cycle(5000);

	$('#picture-cube img')
		.tipsy({
			gravity: 'e',
			offset: 10,
			trigger: 'manual'
		})
		.on('mouseover', function() {
			$(this).tipsy('show');
	  	})
	  	.on('mouseout', function() {
			$(this).tipsy('hide');
	  	});
	}     
});
