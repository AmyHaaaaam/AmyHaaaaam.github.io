$(document).ready(function() {
  App.flipCard.init();
  App.Carousel.init('.portfolio-swiper');
  App.Carousel.init('.project-swiper');
	App.SetScreenSize.init();
});
var App = new Object;
/*
  @brief 카드 뒤집기 효과를 제공하는 함수
*/
App.flipCard = function () {
	var self;
	return {
		init: function () {
			self = this;

			var front = $('.portfolio .portfolio-content .title');
			var frame = $('.portfolio li');

			front.on('mouseenter focusin', function(){ 
				$(this).parent().parent('li').addClass('active');
			});

			frame.on('mouseleave focusout', function(){
				$(this).removeClass('active');
			});
		}
	}
}();
/*
  @brief 모바일에서만 동작하는 스와이퍼
*/
App.Carousel = function () {
	var self;
  var settings;
	return {
		init: function (opt) {
      var newSwiper = $(opt);
			var breakpoint = window.matchMedia( '(min-width:1024.98px)' ); 
			// PC에서만 동작하는 거라면 '(max-width: 768px)'
			// MOBILE에서만 동작하는 거라면 '(min-width: 768px)'
			// swiper가 동작하지 않을 구간의 swiper-wrapper를 css에서 display:block 처리가 필요
			
			var swiperInstance;

			var breakpointChecker = function() {
				if ( breakpoint.matches === true ) { 
					if ( swiperInstance !== undefined ) swiperInstance.destroy( true, true );
					return;
				} else if ( breakpoint.matches === false ) { 
					return enableSwiper();
				}
			};

			var enableSwiper = function() { //스와이퍼 생성
				swiperInstance = new Swiper(newSwiper, {
					slidesPerView: 'auto',
					loop: false,
					spaceBetween: 20,
				});
			};

			breakpointChecker();
		}
	}
}();
/*
  @brief fullpage같은 기능을 제공하는 함수
*/
App.ScrollPage = function () {
	var self;
	return {
		init: function () {
			self = this;

			var numPage = $('.section').length;
			var pageNow = 0;
			var pagePrev = 0;
			var pageNext = 0;
			var scrollEvent = ('onmousewheel' in window) ? 'mousewheel' : 'DOMMouseScroll';
			var isBlocked = false;

			showPage(1);

			$('.page-indicator > li > a').on('click', function() {
				var index = $('.page-indicator > li').index($(this).parent());
				showPage(index + 1);
			});
			
			
			window.addEventListener(scrollEvent, function(e) {
				e.preventDefault();
				if (isBlocked === true) return false;
				isBlocked = true;
				var delta = 0;

				if (scrollEvent === 'mousewheel') {
					delta = e.wheelDelta / -120;
				} else {
					delta = e.detail / 3;
				}

				if (delta > 0) {
					showPage(pageNext);
				} else if (delta < 0) {
					showPage(pagePrev);
				}
			}, {'passive': false});
		
		
			function showPage(n) {
				var scrollAmt = $('.section:eq(' + (n - 1) + ')').offset().top;
				$('html').stop(true).animate({'scrollTop': scrollAmt}, 600, function() {
					isBlocked = false;
				});
				$('.page-indicator > li').removeClass('on');
				$('.page-indicator > li:eq(' + (n - 1) + ')').addClass('on');
				$('.section:eq(' + (n - 1) + ')').addClass('active');
				pageNow = n;
				pagePrev = (n <= 1) ? 1 : (n - 1);
				pageNext = (n >= numPage) ? numPage : (n + 1);
			}	
		},
	}
}();
/*
  @brief 모바일에서 탑과 바텀바로 인해 100vh가 적용되지 않는 현상 해결하는 함수
  @return : 윈도우 안쪽 높이의 100분의 1을 vh변수에 담아 도큐먼트에 --vh라는 프로퍼티를 반환하여 CSS에서 사용할 수 있다.
*/
App.SetScreenSize = function() {
  return{
    init: function() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }
  
}();