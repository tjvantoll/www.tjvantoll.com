/**
 * @param node {DOMNode|string} The node to turn into the cube or the id attribute of the node
 * @param images {Array} An Array of 6 Strings containing the URLs of the images to place in the cube
 */
PictureCube = function(node, images) {
	if (!node) return;

	var base = (typeof node == 'string' ? document.getElementById(node) : node);
	base.className += ' PictureCube-container';
	
	base.innerHTML = '<div class="cube show-front">' + 
		'<figure class="front"><img src="' + images[0] + '" /></figure>' + 
		'<figure class="back"><img src="' + images[1] + '" /></figure>' + 
		'<figure class="right"><img src="' + images[2] + '" /></figure>' + 
		'<figure class="left"><img src="' + images[3] + '" /></figure>' + 
		'<figure class="top"><img src="' + images[4] + '" /></figure>' + 
		'<figure class="bottom"><img src="' + images[5] + '" /></figure>' +
	'</div>';
	
	this.cube = base.childNodes[0],
		this.cycleTimeoutId = null,
		this.images = images;
	
	this.cube.setAttribute('data-cube-picture-number', 1);	
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
		}
	}(this), interval);
};

PictureCube.prototype.clearCycle = function() {
	clearTimeout(this.cycleTimeoutId);
};