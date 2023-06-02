'use strict';

$(document).ready(function() {
  
  preventDefaultAnchor();

  setTimeout(function () {
      furnishing()
    }, 500);

  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });

  var relativeTop = $(document).scrollTop();
  if (relativeTop  > 100) {
    $('#gnb').addClass('off');
    //console.log('success');
  }

  $(window).on('scroll', function() {
    var scrollAmt = $(document).scrollTop();
    var left = $('#footer').offset().top;
    if (scrollAmt > left - $(window).height() + 100) {
      $('#scroll-top a').css({'background': '#000000'});
      $('#scroll-top a svg').css({'fill': '#ffffff'});
    } else {
      $('#scroll-top a').css({'background': '#f5f5f5'});
      $('#scroll-top a svg').css({'fill': '#484848'});
    }
  });
  
  //header 

  $('div.search > div:first-of-type > label > input').on('click', function() {
    $('#wrapper').addClass('open');
    $('div.search').addClass('on');
    $('div.search > div.pop-up.small').addClass('on');
    $('div.search.on > div:first-of-type > span:first-of-type > a').on('click', function() {
      $('div.search > div.pop-up.small').removeClass('on');
      $('div.search').removeClass('on');
      $('#wrapper').removeClass('open');
    });
  });

  //furnishing 

  $('a.surface').on('focusin', function() {
    $(this).find('div.hover-only').css({'display': 'block'});
  });
  $('a.surface').on('focusout', function() {
    $(this).find('div.hover-only').css({'display': 'none'});
  });

  // footer 
  $('ul.site-map > li + li > a').on('click', function() {
    $(this).parent().find('ul.detail').toggleClass('on');
    $(this).find('em').toggleClass('on');
  });



  //top-menu opening
  $('a.open').on('click', function() {
    $('#wrapper').addClass('open');
    $('#top-menu div.pop-up').addClass('on');
    $('#top-menu div.pop-up a.toggle').on('click', function() {
      $('#top-menu div.pop-up').removeClass('on');
      $('#wrapper').removeClass('open');
    });
  });

  $('label > input').on('click', function(e) {
    e.preventDefault();
  });

 
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
   var startX = 0;
  var delX = 0;
  var offsetX = 0;
  var maxOffsetX = 0;
  
  $selector.find('.box').append('<div class="scroll"><a href="#" class="bar"></a></div>');
  resetUI();

  showSlide(1);

  $selector.find('p.control > a.prev').on('click', function() {
    if (offsetLeft >= 0) {
      $selector.find('.slide').css({'transition': 'none'}).stop(true).animate({'left': '10px'}, 80).animate({'left': 0}, 160, function() {
        showSlide(slideNow);
      });
    } else {
      showSlide(slidePrev);
    }
  });

  $selector.find('p.control > a.next').on('click', function() {
    $selector.find('p.control > a.prev').addClass('on');
    if (offsetLeft <= minOffsetLeft) {
      $selector.find('.slide').css({'transition': 'none'}).stop(true).animate({'left': (minOffsetLeft - 10) + 'px'}, 80).animate({'left': minOffsetLeft + 'px'}, 160, function() {
        showSlide(slideNow);
      });
    } else {
      showSlide(slideNext);
    }
  });

  $selector.find('.scroll .bar').on('mousedown touchstart', function(e) {
    $(this).css({'transition': 'none'});
    //clearTimeout(timerId);
    if (!e.touches) e.preventDefault();
    startX = (e.touches) ? e.touches[0].clientX : e.clientX;
    offsetX = $(this).position().left;

    document.addEventListener('mousemove', move, {passive: false});
    document.addEventListener('touchmove', move, {passive: false});

    $(document).on('mouseup touchend', function() {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('touchmove', move);
      $(document).off('mouseup touchend');
      if (delX < 0) {
        showSlide(slideNow); //이동을 왼쪽으로 할 때 
      } if (delX > 0) {
        showSlide(slideNext); //이동을 오른쪽으로 할 때
      }
      delX = 0;
    });
  });

  function move(e) {
    delX = ((e.touches) ? e.touches[0].clientX : e.clientX) - startX;
    // console.log(delX + ' / ' + delY + ' / ' + direction);
    e.preventDefault();
    var targetX = offsetX + delX;
    if (targetX < 0) {
      targetX = 0;
    } else if (targetX > maxOffsetX) {
      targetX = maxOffsetX;
    }
    offsetLeft = -targetX * (barWidth / boxWidth); //barWidth boxWidth 반대로 해준게 포인트 
    $selector.find('.scroll .bar').css({'left': targetX + 'px'});
    $selector.find('.main-slide').css({'transition': 'none', 'left': offsetLeft + 'px'});
    checkBannerNow();
    //console.log(targetX + 'targetX');
  }

  $(window).on('resize', function() {
    // 쓰로틀링
    if (counter > 5) {
      resetUI();
      showSlide(slideNow);
      //console.log(boxWidth);
      counter = 0;
    }
    counter++;
  });
  
  function resetUI() {
    boxWidth = $selector.find('.box').width();
    barWidth = 0;
    $selector.find('.box ul.slide li').each(function() {
      barWidth += $(this).outerWidth(true);
      //console.log(barWidth);
    });
    $selector.find('.box ul.slide').css({'width': (barWidth + 10) + 'px'});
    minOffsetLeft = boxWidth - barWidth;
    //console.log(boxWidth  + '/' + barWidth + '/' + minOffsetLeft);
    maxOffsetX = -minOffsetLeft * (boxWidth / barWidth); 
    var scrollBarWidth = boxWidth * (boxWidth / barWidth); // 스크롤의 영역 크기 
    $selector.find('.scroll .bar').css({'width': scrollBarWidth  + 'px'});
  }

  function showSlide(n) {
    offsetLeft = -$selector.find('.box .slide li:eq(' + (n - 1) + ')').position().left;
    if (offsetLeft < minOffsetLeft) {
      offsetLeft = minOffsetLeft;
      numSlide = n;
    }
    $selector.find('.box ul.slide').css({'transition': 'left 0.5s', 'left': offsetLeft + 'px'});
    $selector.find('.scroll .bar').css({'transition': 'left 0.5s', 'left': -offsetLeft * (boxWidth / barWidth)  + 'px'});
    slideNow = n;
    slidePrev = (n <= 1) ? 1 : (n - 1);
    slideNext = (n >= numSlide) ? numSlide : (n + 1);
    //console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
    //console.log(offsetLeft + '/' + minOffsetLeft);  
  }
}

// function setBannerSlide(selector, status, speed) {
//   var $selector = $(selector);
//   var numSlide = $selector.find('.slide li').length;
//   var slideNow = 0;
//   var slidePrev = 0;
//   var slideNext = 0;
//   var offsetLeft = 0;
//   var boxWidth = 0;
//   var barWidth = 0;
//   var minOffsetLeft = 0;
//   var counter = 0;
  
//   resetUI();

//   showSlide(1);

//   $selector.find('p.control > a.prev').on('click', function() {
//     if (offsetLeft >= 0) {
//       $selector.find('.slide').css({'transition': 'none'}).stop(true).animate({'left': '10px'}, 80).animate({'left': 0}, 160, function() {
//         showSlide(slideNow);
//       });
//     } else {
//       showSlide(slidePrev);
//     }
//   });

//   $selector.find('p.control > a.next').on('click', function() {
//     $selector.find('p.control > a.prev').addClass('on');
//     if (offsetLeft <= minOffsetLeft) {
//       $selector.find('.slide').css({'transition': 'none'}).stop(true).animate({'left': (minOffsetLeft - 10) + 'px'}, 80).animate({'left': minOffsetLeft + 'px'}, 160, function() {
//         showSlide(slideNow);
//       });
//     } else {
//       showSlide(slideNext);
//     }
//   });

//   $(window).on('resize', function() {
//     // 쓰로틀링
//     if (counter > 5) {
//       resetUI();
//       showSlide(slideNow);
//       //console.log(boxWidth);
//       counter = 0;
//     }
//     counter++;
//   });
  
 
//   function resetUI() {
//     boxWidth = $selector.find('.box').width();
//     barWidth = 0;
//     $selector.find('.box ul.slide li').each(function() {
//       barWidth += $(this).outerWidth(true);
//       //console.log(barWidth);
//     });
//     $selector.find('.box ul.slide').css({'width': (barWidth + 10) + 'px'});
//     minOffsetLeft = boxWidth - barWidth;
//     //console.log(boxWidth  + '/' + barWidth + '/' + minOffsetLeft);
//   }

//   function showSlide(n) {
//     offsetLeft = -$selector.find('.box .slide li:eq(' + (n - 1) + ')').position().left;
//     if (offsetLeft < minOffsetLeft) {
//       offsetLeft = minOffsetLeft;
//       numSlide = n;
//     }
//     $selector.find('.box ul.slide').css({'transition': 'left 0.5s', 'left': offsetLeft + 'px'});
//     slideNow = n;
//     slidePrev = (n <= 1) ? 1 : (n - 1);
//     slideNext = (n >= numSlide) ? numSlide : (n + 1);
//     //console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
//     //console.log(offsetLeft + '/' + minOffsetLeft);  
//   }
// }

function scrollUp() {
  var counter = 0;
  var prevScrollAmt = 0;
  var scrollAmtNow = 0;
  var isItOn = false;
  // var isItOn = 0;
  
  
  $(window).on('scroll', function() {
    prevScrollAmt = $(document).scrollTop();
    //console.log(prevScrollAmt + 'prev');
    counter++;
    if (counter > 3) {
      current(); 
      counter = 0;
      //console.log(counter + '/' + scrollAmtNow);
    }
    
    if (prevScrollAmt > 16) {
      $('#gnb').addClass('off');
      //console.log(isItOn + 'first');
      if (scrollAmtNow > prevScrollAmt && prevScrollAmt > 20) {
        $('#gnb').addClass('fixed'); 
        isItOn = true;
        //console.log(isItOn + 'second');
        if (isItOn === true) {
          $('#gnb').addClass('fixed'); 
          //console.log(isItOn + 'third');
        } else {
          $('#gnb').removeClass('fixed');
          $('#gnb').addClass('off');
          isItOn = false;
          //console.log(isItOn + 'fourth');
        }
      } else if (prevScrollAmt > scrollAmtNow) {
        $('#gnb').removeClass('fixed');
        isItOn = false;
        //console.log(isItOn + 'fifth');
      }
    } else {
      $('#gnb').removeClass('fixed');
      $('#gnb').removeClass('off');
      isItOn = false;
      //console.log(isItOn + 'sixth');
    }

    function current() {
      scrollAmtNow = $(document).scrollTop();
      //console.log(scrollAmtNow + 'amtnow');
    }
  });   
}     

function furnishing() {
  var x = window.matchMedia("(max-width: 1023.9px)");
  var imgHeight = $('.home-furnishing dl dd.on ul li').outerHeight();
  var ulHeight = $('.home-furnishing dl dd.on ul').outerHeight(); 
   
  $('.home-furnishing dl dd.on ul li:nth-of-type(2)').css({'height': imgHeight + 'px'});
  
  mobileFunction(x);

  function mobileFunction(x) {
    if (x.matches) {
      $('.home-furnishing dl').css({'height': ulHeight + 154 + 'px'});
      $('.home-furnishing dl dd.on ul li:nth-of-type(2n) a').css({'top': -(imgHeight / 2) + 'px'});
      //console.log('matches');
    } else {
      $('.home-furnishing dl').css({'height': ulHeight + 38 + 'px'});
      $('.home-furnishing dl dd.on ul li:nth-of-type(3n + 2) a').css({'top': -(imgHeight / 2) + 'px'});
      //console.log('doesnt match');
    }
  } 
}