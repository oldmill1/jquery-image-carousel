(function($) {	
		// cache
		var container = $("#jquery_image_carousel"); 
		var slides = $("#jquery_image_carousel ul li");
		var images = $("#jquery_image_carousel ul li img"); 
		
		var nav = $(".jic_nav"); 
		var next = $(".jic_next"); 
		var prev = $(".jic_previous"); 
		
		var jQueryImageCarousel = { 
			
			init: function() { 
				// make the top slide active
				slides.first().addClass("active"); 
				
				// cache active slide 
				var activeSlide = $("#jquery_image_carousel ul li.active");
				
				// set nav positions
				jQueryImageCarousel.setNavPos( activeSlide ); 
				
				// set width of container 
				container.width(jQueryImageCarousel.getWidest(images)); 
				container.width( 	jQueryImageCarousel.getWidth(activeSlide.find("img")) ); 
				
				// hide all the slides
				slides.hide(); 
				
				// show the active slide 
				activeSlide.show();
			}, 
			
			// show the next slide 
			next: function() { 
				var active = $("#jquery_image_carousel ul li.active"); 
				var next = active.next(); 
				if ( next.length == 0 ) { 
					 jQueryImageCarousel.transition( $("#jquery_image_carousel ul li").first() ); 
				} else { 
					jQueryImageCarousel.transition( next );
				} 
			}, 
			
			// show the previos slide
			prev: function() { 
				var active = $("#jquery_image_carousel ul li.active"); 
				var prev = active.prev(); 
				if ( prev.length == 0 ) { 
					 jQueryImageCarousel.transition( $("#jquery_image_carousel ul li").last() ); 
				} else { 
					jQueryImageCarousel.transition( prev );
				} 
			}, 
			
			// transition 
			transition: function( next ) {  
				var active = $("#jquery_image_carousel ul li.active");
				var w = jQueryImageCarousel.getWidth(next.find("img"));
				var h = jQueryImageCarousel.getHeight(next.find("img"));  
				
				// try to get effect
				var effect = container.attr("class");
				if ( effect != undefined ) { 
					var selectedEffect = effect.substr(11); 
				}
				
				active.removeClass(); 
				next.addClass("active"); 
				
				var options = {};
				if ( selectedEffect === "scale" ) {
					options = { percent: 100 };
				} else if ( selectedEffect === "size" ) {
					options = { to: { width: w, height: h } };
				}
				next.show(selectedEffect); 

				active.hide(); 
				
				container.width( 	jQueryImageCarousel.getWidth(next.find("img")) ); 
				jQueryImageCarousel.setNavPos( next ); 
			},
			
			// get widest width returned 
			getWidest: function( images ) { 
				var imageWidth = 0; 
				images.each(function(index) { 
					w = $(this).attr("width"); 
					if ( w > imageWidth ) { 
						imageWidth = w; 
					} 
				}); 
				return parseInt(imageWidth); 
			},
			
			// pass a jQuery img obj. and get its height returned
			getHeight: function ( image ) { 
				return parseInt(image.attr("height")); 
			},  
			
			// pass a jQuery img obj. and get its width returned
			getWidth: function( image ) { 
				return parseInt(image.attr("width")); 
			},
			
			setNavPos: function( activeSlide ) { 
				// set pos. of next/prev buttons 
				var navTop = jQueryImageCarousel.getHeight(activeSlide.find("img")) / 2; 
				nav.css( "top", navTop ); 
				
				var imgWidth = jQueryImageCarousel.getWidth(activeSlide.find("img")); 
				
				next.css("left", imgWidth-20); 
				prev.css("right", imgWidth-20); 
				
			}, 

		}; // jQueryImageCarousel
		
		jQueryImageCarousel.init(); 
		
		$(".jic_next").click( function() {
			event.preventDefault(); 
			jQueryImageCarousel.next(); 
		}); 
		
		
		$(".jic_previous").click( function() {
			event.preventDefault(); 
			jQueryImageCarousel.prev(); 
		}); 
		
		$("#jquery_image_carousel li").click( function() {
			event.preventDefault(); 
			jQueryImageCarousel.next(); 
		}); 
	})( jQuery ); 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	