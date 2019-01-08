 $.fn.stick = function(config) {
        var AFFIX_CLASSES = 'affix affix-top affix-bottom';
		
		var fMenuHeight = $('.content-menu').height();
        var contentHeight = $('.content.parsys').height();
        var newsListingHeight= $('.newsListing.multipleColumns.parbase.section').height();
        var serviceHeight= 0;
        if($('.servicecolumn-container').height()){
            serviceHeight=$('.servicecolumn-container' ).height()+50;
        }
        else{
            serviceHeight=$('.servicecolumn-container' ).height();
        }
        
        var actualContentHeight = contentHeight-newsListingHeight-serviceHeight;

        return this.each(function() {
            var self = $(this),
                parent = self.parent(),
                initialTop = parent.offset().top,
                offsetTopViewport = self.position().top - initialTop;

            self.data('config', config)
                .data('affixed', null);

            var calculate = function() {

				    var docHeight = $(document).height(),
                    configOffsetBottom = config.offset.bottom === undefined ? 0 : (typeof config.offset.bottom == 'number' ? config.offset.bottom : config.offset.bottom()),
                    offsetTop = typeof config.offset.top == 'number' ? config.offset.top : config.offset.top(),
                    offsetBottom = docHeight - configOffsetBottom,
                    scrollTop = $(document).scrollTop();
                	var modeSelfHeight;
                /*if((self.height() > 400)){
					modeSelfHeight = 274;
                }else{*/
					modeSelfHeight = self.height();
                /*}*/
                    var bottomY = modeSelfHeight + scrollTop;
				//console.log('offsetBottom - '+offsetBottom+'  bottomY - '+bottomY+'  self.height - '+self.height()+' scrollTop - '+scrollTop);
				//console.log('offsetTop'+offsetTop);
                if (scrollTop > offsetTop && ((offsetBottom && bottomY < offsetBottom) || !offsetBottom) && !self.data('affixed')) {
                    self.removeClass(AFFIX_CLASSES).addClass('affix').css('top', '');
                    self.data('affixed', true);
                }

                if (scrollTop <= offsetTop) {
                    self.removeClass(AFFIX_CLASSES).addClass('affix-top').css('top', '');
                    self.data('affixed', null);
                }

                if (bottomY >= offsetBottom && scrollTop > ($('.topContent.parsys').height()+(actualContentHeight/2))) {
                    self.removeClass(AFFIX_CLASSES).addClass('affix-bottom');
                    self.data('affixed', null);

                    // adjust position
                     if((self.height() > 400)){
                    	self.css('top', (docHeight - configOffsetBottom - modeSelfHeight - initialTop + offsetTopViewport + 200) + 'px');
                     }else{
                    	self.css('top', (docHeight - configOffsetBottom - modeSelfHeight - initialTop + offsetTopViewport) + 'px');
                     }
                }

            };

            var removeStick = function() {
                self.removeClass('affix affix-top affix-bottom');
                $(window).off('scroll', calculate);
                $(window).off('resize', calculate);

                self.removeData('stick');
            };

            $(window).on('scroll', calculate);
            $(window).resize(calculate);

            calculate();

            self.data('stick', {refresh: calculate, removeStick: removeStick});
        });
    }