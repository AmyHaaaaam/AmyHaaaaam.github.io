$(document).ready(function() {
  App.flipCard.init();
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