var updateOutput = function() {
	var $output = $(this).parents('section').find('.output');

	try {
		$output.html($(this).text());
	} catch(e) {}
};

$('code')
	.each(function() {
		updateOutput.apply(this);
	})
	.on('keydown', function() {
		var self = this;
		setTimeout(function() {
			updateOutput.apply(self);
		}, 50);
	})
	.on('blur', Prism.highlightAll);