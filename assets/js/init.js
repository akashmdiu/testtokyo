/*
 * Copyright (c) 2021 Marketify
 * Author: Marketify
 * This file is made for CURRENT TEMPLATE
*/


jQuery(document).ready(function () {

	"use strict";

	// here all ready functions

	shane_tm_color_switcher();
	shane_tm_switcher_opener();
	shane_tm_cursor_switcher();
	shane_tm_portfolio();
	shane_tm_projects();
	shane_tm_modalbox_news();
	shane_tm_popupscroll();
	shane_tm_modalbox_contact();
	shane_tm_popupscrollcontact();
	shane_tm_nav_bg();
	shane_tm_down();
	shane_tm_hamburger();
	shane_tm_cursor();
	shane_tm_imgtosvg();
	shane_tm_popup();
	shane_tm_data_images();
	shane_tm_jarallax();
	shane_tm_owl_carousel();
	shane_tm_my_load();

});

// -----------------------------------------------------
// ---------------   FUNCTIONS    ----------------------
// -----------------------------------------------------

// -----------------------------------------------------
// ---------------------   SWITCHERS    ----------------
// -----------------------------------------------------

function shane_tm_color_switcher() {
	"use strict";

	var list = jQuery('.shane_tm_settings .shane-unlimited-colors li a');

	list.on('click', function () {
		let thisEl = jQuery(this);

		$('.shane_tm_settings .shane-unlimited-colors li').removeClass('active');
		$(this.parentNode).addClass('active');

		var elval = thisEl.attr('class');

		if (typeof (Storage) !== "undefined") {
			localStorage.setItem('shane_color', elval);
		}
		thisEl.closest('.shane_tm_all_wrap').attr('data-color', '' + elval + '');
		return false;
	});

	let shaneColor = localStorage.getItem('shane_color');
	$(`.shane-unlimited-colors a.${shaneColor}`).parent().addClass('active');
	$('.shane_tm_all_wrap').attr('data-color', '' + shaneColor + '');

}



function shane_tm_switcher_opener() {

	"use strict";

	var settings = jQuery('.shane_tm_settings');
	var button = settings.find('.link');
	var direction = settings.find('.direction li a');
	var light = settings.find('.direction li a.light');
	var dark = settings.find('.direction li a.dark');

	button.on('click', function () {
		var element = jQuery(this);
		if (element.hasClass('opened')) {
			element.removeClass('opened');
			element.closest('.shane_tm_settings').removeClass('opened');
		} else {
			element.addClass('opened');
			element.closest('.shane_tm_settings').addClass('opened');
		}
		return false;
	});

	direction.on('click', function () {
		var element = jQuery(this);
		if (!element.hasClass('active')) {
			direction.removeClass('active');
			element.addClass('active');
		}
	});

	dark.on('click', function () {
		var el = jQuery(this);
		jQuery('body').addClass('dark');
		jQuery('.shane_tm_partners').addClass('opened');
		el.closest('.shane_tm_settings').addClass('changed');
		return false;
	});

	light.on('click', function () {
		var ele = jQuery(this);
		jQuery('body').removeClass('dark');
		jQuery('.shane_tm_partners').removeClass('opened');
		ele.closest('.shane_tm_settings').removeClass('changed');
		return false;
	});
}



function shane_tm_cursor_switcher() {

	"use strict";

	var wrapper = jQuery('.shane_tm_all_wrap');
	var button = jQuery('.shane_tm_settings .cursor li a');
	var show = jQuery('.shane_tm_settings .cursor li a.show');
	var hide = jQuery('.shane_tm_settings .cursor li a.hide');

	button.on('click', function () {
		localStorage.setItem('shane_cursor', 'showme');
		var element = jQuery(this);
		if (!element.hasClass('showme')) {
			button.removeClass('showme');
			element.addClass('showme');
		}
		return false;
	});

	show.on('click', function () {
		wrapper.attr('data-magic-cursor', '');
		localStorage.setItem('magic_cursor', '')
	});
	hide.on('click', function () {
		localStorage.setItem('magic_cursor', 'hide')
		wrapper.attr('data-magic-cursor', 'hide');
	});

	let mCursor = localStorage.getItem('magic_cursor');

	if (mCursor == "hide") {
		$('.shane_tm_settings .cursor li a.show').removeClass('showme');
		$('.shane_tm_settings .cursor li a.hide').addClass('showme');
	}
	else {
		$('.shane_tm_settings .cursor li a.show').addClass('showme');
		$('.shane_tm_settings .cursor li a.hide').removeClass('showme');
	}

	wrapper.attr('data-magic-cursor', mCursor);


}




jQuery(".player").YTPlayer();


// -------------------------------------------------
// -----------------    PORTFOLIO    ---------------
// -------------------------------------------------

// filterable 

function shane_tm_portfolio() {

	"use strict";

	if (jQuery().isotope) {

		// Needed variables
		var list = jQuery('.shane_tm_portfolio .portfolio_list ul');
		var filter = jQuery('.shane_tm_portfolio .portfolio_filter ul');

		if (filter.length) {
			// Isotope Filter 
			filter.find('a').on('click', function () {
				var selector = jQuery(this).attr('data-filter');
				list.isotope({
					filter: selector,
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				});
				return false;
			});

			// Change active element class
			filter.find('a').on('click', function () {
				filter.find('a').removeClass('current');
				jQuery(this).addClass('current');
				return false;
			});
		}
	}
}

function shane_tm_projects() {

	"use strict";

	jQuery('.shane_tm_portfolio_animation_wrap').each(function () {
		jQuery(this).on('mouseenter', function () {
			
			if (jQuery(this).data('title')) {
				let catClass = '';
				if(localStorage.getItem('this_class') === '.green.shane-rounded'){
					catClass = 'shane-rounded-radius';
				}
				jQuery('.shane_tm_portfolio_titles').html(jQuery(this).data('title') + '<span class="work__cat '+ catClass+'">' + jQuery(this).data('category') + '</span>');
				jQuery('.shane_tm_portfolio_titles').addClass('visible');
			}

			jQuery(document).on('mousemove', function (e) {
				jQuery('.shane_tm_portfolio_titles').css({
					left: e.clientX - 10,
					top: e.clientY + 25
				});
			});
		}).on('mouseleave', function () {
			jQuery('.shane_tm_portfolio_titles').removeClass('visible');
		});
	});
}

// -------------------------------------------------
// -------------  MODALBOX NEWS  -------------------
// -------------------------------------------------

function shane_tm_modalbox_news() {

	"use strict";

	var modalBox = jQuery('.shane_tm_modalbox_news');
	var list = jQuery('.shane_tm_news .news_list ul li');
	var closePopup = modalBox.find('.close');

	list.each(function () {
		var element = jQuery(this);
		var details = element.find('.list_inner').html();
		var buttons = element.find('.details .title a,.shane_tm_full_link');
		var mainImage = element.find('.main');
		var imgData = mainImage.data('img-url');
		var title = element.find('.title');
		var titleHref = element.find('.title a').html();
		buttons.on('click', function () {
			jQuery('body').addClass('modal');
			modalBox.addClass('opened');
			modalBox.find('.description_wrap').html(details);
			mainImage = modalBox.find('.main');
			mainImage.css({ backgroundImage: 'url(' + imgData + ')' });
			title = modalBox.find('.title');
			title.html(titleHref);
			return false;
		});
	});
	closePopup.on('click', function () {
		modalBox.removeClass('opened');
		modalBox.find('.description_wrap').html('');
		jQuery('body').removeClass('modal');
		return false;
	});

}

// -----------------------------------------------------
// -------------    WIDGET MENU SCROLL -----------------
// -----------------------------------------------------

function shane_tm_popupscroll() {

	"use strict";

	var WW = jQuery(window).width();
	var H = jQuery(window).height();
	var scrollable = jQuery('.shane_tm_modalbox_news .scrollable');

	var popupBox = jQuery('.shane_tm_modalbox_news .description_wrap');

	if (WW >= 1200) {
		popupBox.css({ height: H - 140 });
	} else {
		popupBox.css({ height: H });
	}

	scrollable.each(function () {
		var element = jQuery(this);
		var wH = jQuery(window).height();

		element.css({ height: wH - 140 });

		if (WW >= 1200) {
			element.css({ height: wH - 140 });
		} else {
			element.css({ height: wH });
		}

		element.niceScroll({
			touchbehavior: false,
			cursorwidth: 0,
			autohidemode: true,
			cursorborder: "0px solid #fff"
		});
	});
}

// -------------------------------------------------
// -------------  MODALBOX CONTACT  ----------------
// -------------------------------------------------

function shane_tm_modalbox_contact() {

	"use strict";

	var button = jQuery('.shane_tm_talk .button a,.shane_tm_topbar .menu ul li a.modal');
	var modalBox = jQuery('.shane_tm_mobalbox_contact');
	var closePopup = modalBox.find('.close');

	button.on('click', function () {
		jQuery('body').addClass('modal');
		modalBox.addClass('opened');
		return false;
	});
	closePopup.on('click', function () {
		modalBox.removeClass('opened');
		jQuery('body').removeClass('modal');
		return false;
	});
}

// -----------------------------------------------------
// ----------    WIDGET CONTACT SCROLL -----------------
// -----------------------------------------------------

function shane_tm_popupscrollcontact() {

	"use strict";

	var WW = jQuery(window).width();
	var H = jQuery(window).height();
	var scrollable = jQuery('.shane_tm_mobalbox_contact .scrollable');

	var popupBox = jQuery('.shane_tm_mobalbox_contact .description_wrap');

	if (WW >= 1200) {
		popupBox.css({ height: H - 140 });
	} else {
		popupBox.css({ height: H });
	}

	scrollable.each(function () {
		var element = jQuery(this);
		var wH = jQuery(window).height();

		element.css({ height: wH - 140 });

		if (WW >= 1200) {
			element.css({ height: wH - 140 });
		} else {
			element.css({ height: wH });
		}

		element.niceScroll({
			touchbehavior: false,
			cursorwidth: 0,
			autohidemode: true,
			cursorborder: "0px solid #fff"
		});
	});
}

// -----------------------------------------------------
// ---------------   PRELOADER   -----------------------
// -----------------------------------------------------

function shane_tm_preloader() {

	"use strict";

	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	var preloader = $('#preloader');

	if (!isMobile) {
		setTimeout(function () {
			preloader.addClass('preloaded');
		}, 800);
		setTimeout(function () {
			preloader.remove();
		}, 2000);

	} else {
		preloader.remove();
	}
}

// -----------------------------------------------------
// -----------------   MY LOAD    ----------------------
// -----------------------------------------------------

function shane_tm_my_load() {

	"use strict";

	var speed = 500;

	setTimeout(function () { shane_tm_preloader(); }, speed);
	setTimeout(function () { jQuery('body').addClass('loaded'); }, speed + 2000);
	setTimeout(function () { jQuery('.shane_tm_down').addClass('loaded'); }, speed + 2000);
	setTimeout(function () { jQuery('.shane_tm_topbar').addClass('loaded'); }, speed + 4200);
}

// -----------------------------------------------------
// --------------   TOPBAR BACKGROUND    ---------------
// -----------------------------------------------------

function shane_tm_nav_bg() {

	"use strict";

	jQuery(window).on('scroll', function () {
		var topbar = jQuery('.shane_tm_topbar .topbar_inner');
		var WinOffset = jQuery(window).scrollTop();

		if (WinOffset >= 100) {
			topbar.addClass('opened');
		} else {
			topbar.removeClass('opened');
		}
	});
}

// -------------------------------------------------
// -----------  ANCHOR NAVIGATION ------------------
// -------------------------------------------------

jQuery('.anchor_nav').onePageNav();


// -----------------------------------------------------
// -----------------    DOWN    ------------------------
// -----------------------------------------------------

function shane_tm_down() {

	"use strict";

	jQuery('.shane_tm_talk .button a').on('click', function () {
		if ($.attr(this, 'href') !== '#') {
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top - 70
			}, 1000);
		}
		return false;
	});
}

// -----------------------------------------------------
// ---------------   MOBILE MENU    --------------------
// -----------------------------------------------------

function shane_tm_hamburger() {

	"use strict";

	var hamburger = jQuery('.hamburger');
	var mobileMenu = jQuery('.shane_tm_mobile_menu .dropdown');

	hamburger.on('click', function () {
		var element = jQuery(this);

		if (element.hasClass('is-active')) {
			element.removeClass('is-active');
			mobileMenu.slideUp();
		} else {
			element.addClass('is-active');
			mobileMenu.slideDown();
		}
		return false;
	});

	jQuery('.shane_tm_mobile_menu .dropdown .dropdown_inner ul li a').on('click', function () {
		jQuery('.hamburger').removeClass('is-active');
		jQuery('.shane_tm_mobile_menu .dropdown').slideUp();
		return false;
	});
}

// -----------------------------------------------------
// ------------------   CURSOR    ----------------------
// -----------------------------------------------------

function shane_tm_cursor() {
	"use strict";

	var myCursor = jQuery('.mouse-cursor');

	if (myCursor.length) {
		if ($("body")) {
			const e = document.querySelector(".cursor-inner"),
				t = document.querySelector(".cursor-outer");
			let n, i = 0,
				o = !1;
			window.onmousemove = function (s) {
				o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
			}, $("body").on("mouseenter", "a, .cursor-pointer", function () {
				e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
			}), $("body").on("mouseleave", "a, .cursor-pointer", function () {
				$(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
			}), e.style.visibility = "visible", t.style.visibility = "visible"
		}
	}
};

// -----------------------------------------------------
// ---------------    IMAGE TO SVG    ------------------
// -----------------------------------------------------

function shane_tm_imgtosvg() {

	"use strict";

	jQuery('img.svg').each(function () {

		var jQueryimg = jQuery(this);
		var imgClass = jQueryimg.attr('class');
		var imgURL = jQueryimg.attr('src');

		jQuery.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var jQuerysvg = jQuery(data).find('svg');

			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				jQuerysvg = jQuerysvg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			jQuerysvg = jQuerysvg.removeAttr('xmlns:a');

			// Replace image with new SVG
			jQueryimg.replaceWith(jQuerysvg);

		}, 'xml');

	});
}

// -----------------------------------------------------
// --------------------   POPUP    ---------------------
// -----------------------------------------------------

function shane_tm_popup() {

	"use strict";

	jQuery('.gallery_zoom').each(function () { // the containers for all your galleries
		jQuery(this).magnificPopup({
			delegate: 'a.zoom', // the selector for gallery item
			type: 'image',
			gallery: {
				enabled: true
			},
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});

	});
	jQuery('.popup-youtube').each(function () { // the containers for all your galleries
		jQuery(this).magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	});
}

// -----------------------------------------------------
// --------------------    WOW JS    -------------------
// -----------------------------------------------------

wow = new WOW({
	animateClass: 'animated',
	offset: 10
});
wow.init();

// -----------------------------------------------------
// ---------------   DATA IMAGES    --------------------
// -----------------------------------------------------

function shane_tm_data_images() {

	"use strict";

	var data = jQuery('*[data-img-url]');

	data.each(function () {
		var element = jQuery(this);
		var url = element.data('img-url');
		element.css({ backgroundImage: 'url(' + url + ')' });
	});
}



// -------------------------------------------------
// -------------  PROGRESS BAR  --------------------
// -------------------------------------------------

function tdProgress(container) {

	"use strict";

	container.find('.progress_inner').each(function () {
		var progress = jQuery(this);
		var pValue = parseInt(progress.data('value'), 10);
		var pColor = progress.data('color');
		var pBarWrap = progress.find('.bar');
		var pBar = progress.find('.bar_in');
		pBar.css({ width: pValue + '%', backgroundColor: pColor });
		setTimeout(function () { pBarWrap.addClass('open'); });
	});
}

jQuery('.shane_progress').each(function () {

	"use strict";

	var pWrap = jQuery(this);
	pWrap.waypoint({ handler: function () { tdProgress(pWrap); }, offset: '90%' });
});

// -----------------------------------------------------
// --------------------    JARALLAX    -----------------
// -----------------------------------------------------

function shane_tm_jarallax() {

	"use strict";

	jQuery('.jarallax').each(function () {
		var element = jQuery(this);
		var customSpeed = element.data('speed');

		if (customSpeed !== "undefined" && customSpeed !== "") {
			customSpeed = customSpeed;
		} else {
			customSpeed = 0.5;
		}

		element.jarallax({
			speed: customSpeed,
			automaticResize: true
		});
	});
}

// -----------------------------------------------------
// ----------------    OWL CAROUSEL    -----------------
// -----------------------------------------------------

function shane_tm_owl_carousel() {

	"use strict";

	var carousel = jQuery('.shane_tm_partners .owl-carousel');

	var rtlMode = false;

	if (jQuery('body').hasClass('rtl')) {
		rtlMode = 'true';
	}

	carousel.owlCarousel({
		loop: true,
		items: 4,
		lazyLoad: false,
		margin: 100,
		autoplay: true,
		autoplayTimeout: 7000,
		rtl: rtlMode,
		dots: true,
		nav: false,
		navSpeed: true,
		responsive: {
			0: { items: 1 },
			480: { items: 1 },
			768: { items: 2 },
			1040: { items: 3 },
			1200: { items: 3 },
			1600: { items: 4 },
			1920: { items: 4 }
		}
	});
	shane_tm_imgtosvg();

	var carousel2 = jQuery('.shane_tm_testimonials .owl-carousel');
	carousel2.owlCarousel({
		loop: true,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		items: 1,
		lazyLoad: true,
		autoplay: true,
		autoplayTimeout: 6000,
		smartSpeed: 2000,
		margin: 0,
		dots: true,
		nav: false,
		navSpeed: true,
		responsive: {
			0: {
				mouseDrag: false,
				touchDrag: true,
			},
			1100: {
				mouseDrag: true,
				touchDrag: true,
			}
		}
	});
	shane_tm_imgtosvg();

}

jQuery(document).ready(function(){
	"use strict";
	$('.shane_tm_settings .shane-unlimited-colors li a').on('click', function(){
		$('.shane_tm_settings .shane-unlimited-colors li').removeClass('active');
		$(this.parentNode).addClass('active');
		console.log('Clicked');
	});
});

//for theme radius
$(document).ready(function () {
	function shane_tm_addActiveRadius() {

		const radiusClass = `.shane_tm_about .about_image .main, .shane_tm_button button, .shane_tm_button a, .shane_tm_portfolio .portfolio_list li .inner .main_image, .shane_tm_portfolio .portfolio_list li .inner, .shane_tm_news ul li .list_inner, .shane_tm_contact .fields ul li input, .shane_tm_contact .fields .last textarea, .shane_tm_contact .map_wrap .map, .shane_tm_title span, .shane_tm_modalbox_about .description_wrap, .shane_tm_modalbox_news .box_inner,.typofix pre,.typofix img,.shane_tm_portfolio_titles,.work__cat,.shane_tm_modalbox_about .box_inner`;


		$('.shane-theme-radius li a').on('click', function (e) {
			e.preventDefault();
			$('.shane-theme-radius li a').removeClass('active')
			let thisClass = $(this).attr('class');
			thisClass = '.' + thisClass.replace(" ", ".");

			if (typeof (Storage) !== "undefined") {
				localStorage.setItem('this_class', thisClass);
			}

			$(this).addClass('active');

			$(radiusClass).css("border-radius", "8px");
			$('.shane_tm_modalbox_news .box_inner, .shane_tm_modalbox_about .box_inner').css("border-radius", "8px");
			$('.shane_tm_modalbox_news .description_wrap .image img').css("border-radius", "8px");
			$('.shane_tm_news ul li .details').css("border-bottom-right-radius", "8px");
			$('.shane-news-article .image').css("border-top-right-radius", "8px");
			$('.shane_tm_settings .icon,.shane-news-article .image').css("border-top-left-radius", "8px");
			$('.shane_tm_settings,.shane_tm_settings .icon,.shane_tm_news ul li .details ').css("border-bottom-left-radius", "8px");

			if (thisClass !== '.green.shane-rounded') {
				$(radiusClass).css("border-radius", "0px");
				$('.shane_tm_modalbox_news .box_inner, .shane_tm_modalbox_about .box_inner').css("border-radius", "0px");
				$('.work__cat').css("border-radius", "0px");
				$('.shane_tm_modalbox_news .description_wrap .image img').css("border-radius", "0px");
				$('.shane_tm_news ul li .details').css("border-bottom-right-radius", "0px");
				$('.shane-news-article .image').css("border-top-right-radius", "0px");
				$('.shane_tm_settings .icon,.shane-news-article .image').css("border-top-left-radius", "0px");
				$('.shane_tm_settings,.shane_tm_settings .icon,.shane_tm_news ul li .details ').css("border-bottom-left-radius", "0px");

			}
			else {
				$('.box_inner').addClass('shane-post-rounded-radius');
			}

			if(thisClass === ".green.shane-rounded"){
				localStorage.setItem('radiusClass', 'shane-radius');
				$("body").addClass(localStorage.getItem('radiusClass'));
			}
			else{
				$("body").removeClass(localStorage.getItem('radiusClass'));
				localStorage.setItem('radiusClass', '');
			}

		});
		
		$("body").addClass(localStorage.getItem('radiusClass'));

		let shaneThisClass = localStorage.getItem('this_class');

		if (!$(shaneThisClass).hasClass('active')) {
			$(shaneThisClass).addClass('active');
		}

		if (shaneThisClass !== '.green.shane-rounded') {
			$(radiusClass).css("border-radius", "0px");
			$('.work__cat').css("border-radius", "0px");
			$('.shane_tm_modalbox_news .box_inner, .shane_tm_modalbox_about .box_inner').css("border-radius", "0px");
			$('.shane_tm_modalbox_news .description_wrap .image img').css("border-radius", "0px");
			$('.shane_tm_news ul li .details').css("border-bottom-right-radius", "0px");
			$('.shane-news-article .image').css("border-top-right-radius", "0px");
			$('.shane_tm_settings .icon,.shane-news-article .image').css("border-top-left-radius", "0px");
			$('.shane_tm_settings,.shane_tm_settings .icon,.shane_tm_news ul li .details ').css("border-bottom-left-radius", "0px");
		}
		if (localStorage.getItem('this_class') === '.green.shane-rounded') {
			$('.box_inner').addClass('shane-post-rounded-radius');
		}

	}
	shane_tm_addActiveRadius();
});

$(document).ready(function () {
	$(".shane-post-item").slice(0, 2).show();
	$(".loadmore-shane, .loadmore-au").on("click", function (e) {
		e.preventDefault();
		$(".shane-post-item:hidden").slice(0, 10).slideDown();
		if ($(".shane-post-item:hidden").length == 0) {
			$(".loadmore-shane, .loadmore-au").text("No More Posts").addClass("noContent");
		}
	});

});

$(document).ready(function () {
	const checkEl = '<div class="checkmark draw"></div>';
	$('.shane-unlimited-colors li.active').append(checkEl);
	$('.shane-theme-color li a.active').parent().append(checkEl);
	$('.shane-theme-radius li a.active').parent().append(checkEl);

	function shane_tm_addCheckmark(clickElement, markSelector) {
		$(clickElement).on('click', function (e) {
			if ($(markSelector).length === 0) {
				$(this).parent().append(checkEl);
			}
			else {
				$(markSelector).remove();
				$(this).parent().append(checkEl);
			}
		});

	}

	shane_tm_addCheckmark('.shane-unlimited-colors li a', '.shane-unlimited-colors li .checkmark');
	shane_tm_addCheckmark('.shane-theme-radius li a', '.shane-theme-radius li .checkmark');


});