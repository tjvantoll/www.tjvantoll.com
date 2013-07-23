/*
 * PictureCube - https://github.com/tjvantoll/PictureCube
 * Copyright: TJ VanToll (http://tjvantoll.com) 2013
 * Released under the MIT license.
 */

/**
 * @param node {DOMNode|string} The node to turn into the cube or the id attribute of the node
 * @param images {Array} An Array of 6 Strings containing the URLs of the images to place in the cube
 * @param options {Object} Optional
 *             onchange {Function} Callback to invoke when the side of the cube is change.,
 */
window.PictureCube = function(node, images, options) {
	if (!node) return;
	options = options || {};

	var base = (typeof node == 'string' ? document.getElementById(node) : node);
	base.className += ' PictureCube-container';
	var coreClasses = ['front', 'back', 'right', 'left', 'top', 'bottom'];
	
	var html = '<div class="cube show-front">';
	for (var i = 0; i < coreClasses.length; i++) {
		html += '<figure class="' + coreClasses[i] + '">' +
			'<img src="' + images[i].src + '" title="' + images[i].title + '" />' +
			'</figure>';
	}
	
	html += '</div>';
	base.innerHTML = html;
	
	this.cube = base.childNodes[0],
		this.cycleTimeoutId = null,
		this.images = images,
		this.options = options;
	
	this.cube.setAttribute('data-cube-picture-number', 1);

	var cubeHolder = this;
	var transitionEvent = function(event) {
		var side = parseInt(event.target.getAttribute('data-cube-picture-number'), 10);
		if (!side) return;
		var image = cubeHolder.cube.childNodes[side - 1].childNodes[0];
		
		if (options.onchange) {
			options.onchange(side, image, cubeHolder);
		}
	};

	var transitionEndEvents = ['webkitTransitionEnd', 'transitionend', 'otransitionend'];
	for (var i = 0; i < transitionEndEvents.length; i++) {
		this.cube.addEventListener(transitionEndEvents[i], transitionEvent);
	}
};

/**
 * @param side {number} The number of the side to change the cube to. (1 - 6)
 */
PictureCube.prototype.goto = function(side) {
	switch(side) {
		case 1:
			this.cube.className = 'show-front';
			break;
		case 2:
			this.cube.className = 'show-back';
			break;
		case 3:
			this.cube.className = 'show-right';
			break;
		case 4:
			this.cube.className = 'show-left';
			break;
		case 5:
			this.cube.className = 'show-top';
			break;
		case 6:
			this.cube.className = 'show-bottom';
			break;											
	}
	
	this.cube.className += ' cube';
	this.cube.setAttribute('data-cube-picture-number', side);
};

/**
 * @param interval {number} The number of milliseconds between each image transition
 */
PictureCube.prototype.cycle = function(interval) {
	//Allow for consecutive calls to cycle without calling clearCycle.
	if (this.cycleTimeoutId !== null) {
		this.clearCycle();
	}

	var pictureNumber = this.cube.getAttribute('data-cube-picture-number');
	
	this.cycleTimeoutId = setInterval(function(instance) {
		return function() {
			instance.goto(pictureNumber);	
			
			pictureNumber++;
			if (pictureNumber == instance.images.length + 1) {
				pictureNumber = 1;
			}						
		};
	}(this), interval);
};

PictureCube.prototype.clearCycle = function() {
	clearTimeout(this.cycleTimeoutId);
};