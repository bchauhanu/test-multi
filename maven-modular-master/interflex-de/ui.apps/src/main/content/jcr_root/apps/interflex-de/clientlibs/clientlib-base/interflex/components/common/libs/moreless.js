/**
 * Expandable text - used at Carousel
 */
$.fn.moreless = function() {
		var moreIcon = '<i class="fa fa-plus-circle"></i>',
	    lessIcon = '<i class="fa fa-minus-circle"></i>';

        $(document).on('click', '.morelink', function(e) {
            var self = $(this);

            e.preventDefault();

            self.closest('.caption-text').find('.long, .short').toggleClass('hidden');
            self.html(self.hasClass('less') ? moreIcon : lessIcon).toggleClass('less');
        });

        return this.each(function() {
            var self = $(this),
                content = self.html() + '&nbsp;<a href="" class="morelink">' + moreIcon + '</a>';
            if(self.find('.long').length > 0)
            {
                self.html(content);
            }
        });
    };