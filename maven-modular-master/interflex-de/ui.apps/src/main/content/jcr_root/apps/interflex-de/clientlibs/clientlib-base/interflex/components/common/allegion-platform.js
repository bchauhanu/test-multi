$(function() {
        var contentMenu = $('#content-menu'),
            header = $('.fixed-area'),
            serviceContainer = $('.service-container');

        $.fn.hasScrollBar = function() {
            var hasScrollBar = {}, e = this.get(0);
            hasScrollBar.vertical = (e.scrollHeight > e.clientHeight) ? true : false;
            hasScrollBar.horizontal = (e.scrollWidth > e.clientWidth) ? true : false;
            return hasScrollBar;
        };

        $( document ).ready(function() {

            //Carousel + icon click function
        	$('.caption-text').moreless();
        	
        	header.stick({
                offset: {
                    top: 0
                }
            });

            if (contentMenu.length) {

                var selfTop = contentMenu.offset().top;//parseInt(self.css('top'), 10);
                var serviceContainer = $('.service-container');
				var serviceContainerTop =0;
                var overAllMinheight = contentMenu.height();
				var fMenuHeight = $('.content-menu').height();
                var contentHeight = $('.content.parsys').height();
                var newsListingHeight= $('.newsListing.multipleColumns.parbase.section').height();
                var serviceHeight= 0;
                var breadcrumb=0;
                if($('.breadcrumb-core').height()>0)
                {
					$('.content-menu').css("margin-top" , $('.breadcrumb-core').height());
                }
                if($('.servicecolumn-container').height()){
                    serviceHeight=$('.servicecolumn-container' ).height()+50;
                }
                else{
                    serviceHeight=$('.servicecolumn-container' ).height();
                }

                var actualContentHeight = contentHeight-newsListingHeight-serviceHeight;
                var heightToBeAdded = overAllMinheight-actualContentHeight+60;


                if(serviceContainer.length){
                    serviceContainerTop = serviceContainer.offset().top;
                }else{
                    serviceContainerTop = $(".footer").offset().top;
                }
                if((serviceContainerTop-selfTop)<(overAllMinheight))
                {
                    if($('.content.parsys').find('.multipleColumns.parbase.section').length>0){
                    	$(".content.parsys .service-container.container").css("margin-top" , heightToBeAdded+"px");
                    }
                    else{
						$(".row-fluid.footer-wrapper").css("margin-top" , heightToBeAdded+"px");
                    }
                }


                contentMenu.stick({
                    offset: {
                        top: contentMenu.offset().top - (header.height() + header.find('.navbar-collapse').height()),
                        bottom: function() {
                            var bottom;
                            if (contentMenu.is(':visible') && serviceContainer.length) {
                                bottom = $(document).height() - (serviceContainer.position().top)+
                                    60 + contentMenu.height();

                            }

                            return bottom;
                        }

                    }
                });
            }

            // Open / close content menu
            $('.content-menu h3').click(function() {
                $(this).parent().toggleClass('closed');
            });


             $('.radio-primary').click(function() {
                $(this).addClass('active').siblings().removeClass('active');
            });

            $(window).resize(function() {
                 if ($("div").hasClass("table-responsive")) {
                       $(".table-responsive").toggleClass("hasHorizScroll", $(".table-responsive").hasScrollBar().horizontal);
                 }

                $('.hamburger #accordion').css({
                    'max-height': ($(window).height() - 76) + 'px'
                });
            }).resize();
        });
    });