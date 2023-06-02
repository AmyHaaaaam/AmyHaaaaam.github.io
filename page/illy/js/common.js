// common script
$(document).ready(function() {
  preventDefaultAnchor();

});
  
function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}

function setBannerSlide(selector, status, speed) {
  var $selector = $(selector);
  var numSlide = $selector.find('.slide li').length;
  var slideNow = 0;
  var slidePrev = 0;
  var slideNext = 0;
  var offsetLeft = 0;
  var boxWidth = 0;
  var barWidth = 0;
  var minOffsetLeft = 0;
  var timerId = '';
  var isTimerOn = status;
  var timerSpeed = speed;
  var timerId2 = '';
  var counter = 0;

  resetUI();
  
  showSlide(1);
  $selector.find('.indicator li a').on('click', function() {
    var index = $selector.find('.indicator li').index($(this).parent());
    showSlide(index + 1);
  });
  
  $selector.find('ul.slide').on('click', function() {
    if (isTimerOn === true) {
      clearTimeout(timerId);
      $(this).removeClass('on');
      isTimerOn = false;
    } else {
      timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
      $(this).addClass('on');
      isTimerOn = true;
    }
  });

  $(window).on('resize', function() {
    // 쓰로틀링
    if (counter > 5) {
      resetUI();
      showSlide(slideNow);
      counter = 0;
    }
    counter++;
    
    // 디바운스
    clearTimeout(timerId2);
    timerId2 = setTimeout(function() {
      resetUI();
      showSlide(slideNow);
    }, 300);
  });

  function resetUI() {
    boxWidth = $selector.find('.box').width();
    barWidth = 0;
    $selector.find('.slide li').each(function() {
      barWidth += $(this).outerWidth(true);
    });
    $selector.find('.slide').css({'width': (barWidth + 10) + 'px'});
    minOffsetLeft = boxWidth - barWidth;
  }

  function showSlide(n) {
    offsetLeft = -$selector.find('.slide li:eq(' + (n - 1) + ')').position().left;
    if (offsetLeft < minOffsetLeft) {
      offsetLeft = minOffsetLeft;
      numSlide = n;
    }
    $selector.find('.slide').css({'transition': 'left 0.5s', 'left': offsetLeft + 'px'});
    $selector.find('.indicator li').removeClass('on');
    $selector.find('.indicator li:eq(' + (n - 1) + ')').addClass('on');
    slideNow = n;
    slidePrev = (n <= 1) ? 1 : (n - 1);
    slideNext = (n >= numSlide) ? 1 : (n + 1);
  
    if (isTimerOn === true) {
      clearTimeout(timerId);
      timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
    }
  }
}




