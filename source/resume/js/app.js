(function() {
    $('#me')
        .on('click', function() {
        var $this = $(this);
        if (!$this.hasClass('over')) {
            $this.addClass('over');
            setTimeout(function() {
                $this.removeClass('over');
            }, 3000);
        }
    });
    
    var cube = new PictureCube('cube',
        [
            {
                src: 'image/Chrome.png',
                title: 'Chrome'
            },
            {
                src: 'image/Firefox.png',
                title: 'Firefox'
            },
            {
                src: 'image/IE8.png',
                title: 'IE8'
            },
            {
                src: 'image/IE9.png',
                title: 'IE9'
            },
            {
                src: 'image/Opera.png',
                title: 'Opera'
            },
            {
                src: 'image/Safari.png',
                title: 'Safari'
            }
        ]
    );
    
    $('[name="choices"]').on('change', function() {
        cube.goto(parseInt($(this).val(), 10));
    });
    
    $('#cycle_button').on('click', function(event) {
        event.preventDefault();
        cube.cycle(2000);
        $('#cycle_section').show();
        $('#stop_section').hide();
    });
    
    $('#stop_button').on('click', function(event) {
        event.preventDefault();
        cube.clearCycle();
        $('#cycle_section').hide();
        $('#stop_section').show();
    });
    
    $('#cycle_section').on('change', function() {
        cube.cycle($('#slider').val());
    });
}());
