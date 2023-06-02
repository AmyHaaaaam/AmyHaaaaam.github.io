'use strict';

$(document).ready(function() {
  preventDefaultAnchor();
  var relativeTop = $(document).scrollTop();
  if (relativeTop > 100) {
    $('#header').addClass('off');
  }
  $('label > input').on('click', function(e) {
    e.preventDefault();
  });
});


function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}


function menu() {
  $('.gnb.pc #main-menu-01 li a').on('click', function() {
    var dataMenu = $(this).parent().attr('data-menu');
    var index = $('.gnb.pc #main-menu-01 li').index($(this).parent());
    var timerId = '';
    var timerId2 = '';
    var isTimerOn = false;

    $('div.panel.first ul:eq(0) li').each(function() {
      if ($(this).attr('data-menu') === dataMenu) {
        $(this).children().addClass('on');
      }
    }); 
    //console.log(dataMenu + '/' + index + '/');
    $('#wrapper').addClass('open');
    $('#nav-inner').removeClass('off');
    $('div.panel.first ul:eq(0) li:eq(' + index + ') > a').addClass('on');
    $('div.panel.first ul:eq(' + (index + 1) + ')').addClass('on');
    $('div.panel.first a.toggle').addClass('on');
    //console.log(index + 1);

    $('#main-menu-panel li a').on('mouseenter click', function() {
      var indexInNav = $('#main-menu-panel li').index($(this).parent());
      $('#nav-inner').addClass('off');
      $('#main-menu-panel li a').removeClass('on');
      $('div.panel.first ul').removeClass('on');
      $('#nav-inner').removeClass('off');
      $('#main-menu-panel li:eq(' + indexInNav + ') a').addClass('on');
      $('div.panel.first ul:eq(' + (indexInNav + 1) + ')').addClass('on');
      panel();
    });
    
    panel(); 
    

    function panel() {
      $('div.panel.second ul').removeClass('on');
      
      //second panel opening 
      $('div.panel.first ul.on > li > a').on('mouseenter click', function() {
        var dataMenuSecond = $(this).parent().attr('data-menu');
        var indexFP = $(this).parent().index();
        var indexSP = '';
        $('div.panel.second').removeClass('off');
        $('div.panel.first a.toggle').removeClass('on');
        $('div.panel.second a.toggle').removeClass('on');
        $('div.panel.second a.toggle').addClass('on');

        update();

        if (indexFP !== indexSP) {
          $('div.panel.second').addClass('off');
          $('div.panel.third').addClass('off');
        }

        function update() {
          $('div.panel.second ul').each(function() {
            if ($(this).attr('data-menu') === dataMenuSecond) {
              $(this).find('li > ul').removeClass('on');
              $(this).find('li > ul:eq(' + indexFP + ')').addClass('on');
            } 
          });
          $('div.panel.second ul > li > ul.on').each(function() {
            indexSP = $(this).parent().index();
          });
        }
      });  

      //second panel closing
      $('div.panel.first ul.on > li > a').on('mouseleave', function() {
        if (isTimerOn === true) {
          clearTimeout(timerId);
          isTimerOn = false;
        } else {
          timerId = setTimeout(function() {disappear();}, 700);
          isTimerOn = true;
        }
      });

      //third panel opening 
      $('div.panel.second ul li ul li a').on('mouseenter click', function() {
        if (isTimerOn === true) {
          clearTimeout(timerId);
          clearTimeout(timerId2);
          keepOpened();
          isTimerOn = false;
        } else {
          clearTimeout(timerId, timerId2);
          keepOpened();
          isTimerOn = true;
        } 
        //console.log(isTimerOn + ' second mouseenter');
      });
    
      //third panel closing
      $('div.panel.second ul li ul li a').on('mouseleave', function() {
        timerId2 = setTimeout(function() {disappear2();}, 1000);
        isTimerOn = true;
        //console.log(isTimerOn + ' second mouseleave');
      });
      
      //third panel stay
      $('div.panel.third ul li a').on('mouseenter click', function() {
        if (isTimerOn === true) {
          clearTimeout(timerId2);
          keepOpened();
          isTimerOn = false;
        } 
        //console.log(isTimerOn + 'third mouseenter');
    
      });
      
      $('div.panel.third').on('mouseleave', function() {
        if (isTimerOn === true) {
          clearTimeout(timerId2);
          isTimerOn = false;
        } else {
          timerId2 = setTimeout(function() {disappear2();}, 700);
          isTimerOn = true;
        }
        //console.log(isTimerOn + ' third mouseleave');
    
      });

      function disappear() {
        $('div.panel.third').addClass('off');
        $('div.panel.second a.toggle').removeClass('on');
        $('div.panel.second').addClass('off');
        $('div.panel.first a.toggle').addClass('on');
        if (isTimerOn === true) {
          clearTimeout(timerId);
        }
      }

      function keepOpened() {
        $('div.panel.third').removeClass('off');
        $('div.panel.third ul').addClass('on');
      } 

      function disappear2() {
        $('div.panel.third ul').removeClass('on');
        $('div.panel.third').addClass('off');
        if (isTimerOn === true) {
          clearTimeout(timerId2);
        }
      }
    }
  });
}

function closing() {
  $('#nav-inner div.panel a.toggle').on('click', function() {
    $('#wrapper').removeClass('open');  
    $('#nav-inner').addClass('off');  
    $('div.panel').addClass('off');
    $('div.panel ul').removeClass('on');
    $('div.panel ul li > a').removeClass('on');
    $('div.panel a.toggle').removeClass('on');
    //console.log('success');
  });
}

function menuSearch() {
  $('div.search span').on('click', function() {
    $(this).css({'top': '-2px', 'font-size': '13px'});
    $(this).parent().on('mouseleave', function() {
      $('div.search span').css({'top': '50%', 'font-size': '25px'});
    });
  });
}


function setBannerSlide(selector, status, speed) {
  var $selector = $(selector);
  var numSlide = $selector.find('.main-slide li').length;
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

  $selector.find('.slide-wrapper').append('<div class="scroll"><a href="#" class="bar"></a></div>');
  // if (isTimerOn === true) {
  //   $selector.find('a.play').addClass('on');
  // } else {
  //   $selector.find('a.play').removeClass('on');
  // }
  resetUI();
  showSlide(1);

  $selector.find('a.prev').on('click', function() {
    if (offsetLeft >= 0) {
      $selector.find('.main-slide').css({'transition': 'none'}).stop(true).animate({'left': '10px'}, 80).animate({'left': 0}, 160, function() {
        showSlide(slideNow);
      });
    } else {
      showSlide(slidePrev);
    }
  });

  $selector.find('a.next').on('click', function() {
    $selector.find('p.control > a.prev').addClass('on');
    if (offsetLeft <= minOffsetLeft) {
      $selector.find('.main-slide').css({'transition': 'none'}).stop(true).animate({'left': (minOffsetLeft - 10) + 'px'}, 80).animate({'left': minOffsetLeft + 'px'}, 160, function() {
        showSlide(slideNow);
      });
    } else {
      showSlide(slideNext);
    }
  });

  // $selector.find('a.play').on('click', function() {
  //   if (isTimerOn === true) {
  //     clearTimeout(timerId);
  //     $(this).removeClass('on');
  //     isTimerOn = false;
  //   } else {
  //     timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
  //     $(this).addClass('on');
  //     isTimerOn = true;
  //   }
  // });

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
    console.log(targetX + 'targetX');
  }

  $(window).on('resize', function() {
    // 쓰로틀링
    if (counter > 10) {
      resetUI();
      showSlide(slideNow);
      console.log(boxWidth);
      counter = 0;
    }
    counter++;

    // 디바운스
    // clearTimeout(timerId2);
    // timerId2 = setTimeout(function() {
    //   resetUI();
    //   showSlide(slideNow);
    //   console.log(boxWidth);
    // }, 300);
  });


  function resetUI() {
    boxWidth = $selector.find('.slide-wrapper').width();
    barWidth = 0;
    $selector.find('.main-slide li').each(function() {
      barWidth += $(this).outerWidth(true);
    }); //li의 outerWidth 다 더해서 막대기 길이 
    $selector.find('.main-slide').css({'width': (barWidth + 10) + 'px'});
    minOffsetLeft = boxWidth - barWidth; // 오른쪽에 공백 안생기게 
    maxOffsetX = -minOffsetLeft * (boxWidth / barWidth); 
    var scrollBarWidth = boxWidth * (boxWidth / barWidth); // 스크롤의 영역 크기 
    $selector.find('.scroll .bar').css({'width': (scrollBarWidth * 9) / 10 + 'px'});
  }

  function showSlide(n) {
    offsetLeft = -$selector.find('.main-slide li:eq(' + (n - 1) + ')').position().left;
    if (offsetLeft < minOffsetLeft) {
      offsetLeft = minOffsetLeft;
      numSlide = n;
    }
    $selector.find('.main-slide').css({'transition': 'left 0.5s', 'left': offsetLeft + 'px'});
    $selector.find('.scroll .bar').css({'transition': 'left 0.5s', 'left': (-offsetLeft * (boxWidth / barWidth) * 9) / 10 + 'px'});
    slideNow = n;
    slidePrev = (n <= 1) ? 1 : (n - 1);
    slideNext = (n >= numSlide) ? 1 : (n + 1);
    console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
    // if (isTimerOn === true) {
    //   clearTimeout(timerId);
    //   timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
    // }
  }

  function checkBannerNow() {
    $selector.find('.main-slide > li').each(function(i) {
      var startOffset = -$(this).position().left;
      var endOffset = startOffset - $(this).outerWidth(true);
      // console.log(startOffset + ' ~ ' + endOffset + ' : ' + offsetLeft);
      if (offsetLeft <= startOffset && offsetLeft > endOffset) {
        var n = i + 1;
        slideNow = n;
        slidePrev = (n <= 1) ? 1 : (n - 1);
        slideNext = (n >= numSlide) ? 1 : (n + 1);
        console.log(n);
        return false;
      }
    });
  }
}
// function setBannerSlide(selector, status, speed) {
//   var $selector = $(selector);
//   var numSlide = $selector.find('ul.main-slide li').length;
//   var slideNow = 0;
//   var slidePrev = 0;
//   var slideNext = 0;
//   var offsetLeft = 0;
//   var boxWidth = 0;
//   var barWidth = 0;
//   var minOffsetLeft = 0;
//   var counter = 0;
//   var startX = 0;
//   var delX = 0;
//   var offsetX = 0;
//   var maxOffsetX = 0;
//   var minOffsetX = 0;

//   $selector.find('.slide-wrapper').append('<div class="scroll"><a href="#" class="bar"></a></div>');

//   resetUI();

//   showSlide(1);

//   if (offsetLeft >= 0) {
//     $selector.find('p.control > a.prev').removeClass('on');
//     console.log('yay');
//   }

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
//       $selector.find('ul.main-slide').css({'transition': 'none'}).stop(true).animate({'left': (minOffsetLeft - 10) + 'px'}, 80).animate({'left': minOffsetLeft + 'px'}, 160, function() {
//         showSlide(slideNow);
//       });
//     } else {
//       showSlide(slideNext);
//     }
//   });

//   $selector.find('.scroll .bar').on('mousedown touchstart', function(e) {
//     $(this).css({'transition': 'none'});
//     if (!e.touches) e.preventDefault();
//     startX = (e.touches) ? e.touches[0].clientX : e.clientX;
//     offsetX = $(this).position().left;
    
//     document.addEventListener('mousemove', move, {passive: false});
//     document.addEventListener('touchmove', move, {passive: false});
//     console.log(startX + ' / ' + offsetX );
//     $(document).on('mouseup touchend', function() {
//       document.removeEventListener('mousemove', move);
//       document.removeEventListener('touchmove', move);
//       $(document).off('mouseup touchend');
//       if (delX < 0) {
//         showSlide(slideNow);
//       } if (delX > 0) {
//         showSlide(slideNext);
//       }
//       delX = 0;
//     });
//   });

//   function move(e) {
//     delX = ((e.touches) ? e.touches[0].clientX : e.clientX) - startX;
//     e.preventDefault();
//     var targetX = offsetX + delX;
//     if (targetX < 0) {
//       targetX = 0;
//     } else if (targetX > maxOffsetX){
//       targetX = maxOffsetX;
//     }
//     offsetLeft = -targetX * (barWidth / boxWidth);
//     $selector.find('.scroll .bar').css({'left': targetX + 'px'});
//     $selector.find('.main-slide').css({'transition': 'none', 'left': offsetLeft + 'px'});
//     console.log('targetX' + targetX + '/ offsetLeft' + offsetLeft);
//     checkBannerNow();
//   } 

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
//     boxWidth = $selector.find('.slide-wrapper').width();
//     barWidth = 0;
//     $selector.find('.slide-wrapper ul.main-slide li').each(function() {
//       barWidth += $(this).outerWidth(true);
//       //console.log(barWidth);
//     });
//     $selector.find('.slide-wrapper ul.main-slide').css({'width': (barWidth + 10) + 'px'});
//     minOffsetLeft = boxWidth - barWidth;
//     minOffsetX = -minOffsetLeft * (boxWidth / barWidth);
//     var scrollBarWidth = boxWidth * (boxWidth / barWidth);
//     $selector.find('.scroll .bar').css({'width': scrollBarWidth + 'px'});
//     //console.log(boxWidth  + '/' + barWidth + '/' + minOffsetLeft);
//   }

//   function showSlide(n) {
//     offsetLeft = -$selector.find('.slide-wrapper ul.main-slide li:eq(' + (n - 1) + ')').position().left;
//     if (offsetLeft < minOffsetLeft) {
//       offsetLeft = minOffsetLeft;
//       numSlide = n;
//     }
//     $selector.find('.slide-wrapper ul.main-slide').css({'transition': 'left 0.5s', 'left': offsetLeft + 'px'});
//     slideNow = n;
//     slidePrev = (n <= 1) ? 1 : (n - 1);
//     slideNext = (n >= numSlide) ? numSlide : (n + 1);
//     //console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
//     //console.log(offsetLeft + '/' + minOffsetLeft);  
//   }

//   function checkBannerNow() {
//     $selector.find('ul.main-slide > li').each(function(i) {
//       var startOffset = -$(this).position().left;
//       var endOffset = startOffset = $(this).outerWidth(true);

//       if (offsetLeft <= startOffset && offsetLeft > endOffset) {
//         var n = i + 1;
//         slideNow = n;
//         slidePrev = (n <= 1) ? 1 : (n - 1);
//         slideNext = (n >= numSlide) ? 1 : (n + 1);
//         console.log(n);
//         return false;
//       }
//     });
//   }
// }

function imageSlide(selector, status, speed) {
  var $selector = $(selector); 
  var numSlide = $selector.find('div.image .image-slide li').length;
  var slideNow = 0;
  var slidePrev = 0;
  var slideNext = 0;
  var slideFirst = 1;
  var timerId = '';
  var isTimerOn = status;
  var timerSpeed = speed;

  $selector.find('div.image .image-slide li').each(function(i) {
    $(this).css({'left': (i * 100) + '%', 'display': 'block'});
  });
  

  showSlide(slideFirst);

  $selector.find('div.image p.control a.prev').on('click', function() {
  $(this).stop(true).animate({'left': '-10px'}, 80).animate({'left': 0}, 160);
  showSlide(slidePrev);
});

  $selector.find('div.image p.control a.next').on('click', function() {
    $(this).stop(true).animate({'right': '-10px'}, 80).animate({'right': 0}, 160);
    showSlide(slideNext);
  });
  
  function showSlide(n) {
    if (slideNow === 0) {
      $selector.find('div.image .image-slide').css({'transition': 'none', 'left': -((n - 1) * 100) + '%'});
    } else {
      $selector.find('div.image .image-slide').css({'transition': 'left 0.5s', 'left': -((n - 1) * 100) + '%'});
    }
    
    slideNow = n;
    slidePrev = (n === 1) ? numSlide : (n - 1);
    slideNext = (n === numSlide) ? 1 : (n + 1);
    //console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
    if (isTimerOn === true) {
      clearTimeout(timerId);
      timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
      $selector.find('span > em').removeClass('on');
      $selector.find('span > em:eq(' + (n - 1) + ')').addClass('on');
    }
    }
}


function ad(main, side1, side2) {
  var main = main;
  var side1 = side1;
  var side2 = (side2 === undefined) ? side1 : side2
  
  if(side2 === undefined) {
  
  }
  $('.main-product.ad div.' + main + ' > div:first-child > a').on('click', function() {
  $('.main-product.ad div.' + main).addClass('on');
  $('.main-product.ad div.' + side1).addClass('off');
  $('.main-product.ad div.' + side2).addClass('off');
  $('.main-product.ad div.'+ main + ' > #'+ main +'-pop-up').addClass('on');

    $('#' + main + '-pop-up > span > a').on('click', function() {
      $('.main-product.ad div.' + main + ' > #'+ main +'-pop-up').removeClass('on');
      $('.main-product.ad div.' + side1).removeClass('off');
      $('.main-product.ad div.' + side2).removeClass('off');
      $('.main-product.ad div.' + main).removeClass('on');
    });
  });
}

function scrollUp() {

  var counter = 0;
  var prevScrollAmt = 0;
  var scrollAmtNow = 0;
  var isItOn = false;
  // var isItOn = 0;
  
  
  $(window).on('scroll', function() {
    prevScrollAmt = $(document).scrollTop();
    console.log(prevScrollAmt + 'prev');
    counter++;
    if (counter > 3) {
      current(); 
      counter = 0;
      //console.log(counter + '/' + scrollAmtNow);
    }
    
    if (prevScrollAmt > 30) {
      $('#header').addClass('off');
      //console.log(isItOn + 'first');
      if (scrollAmtNow > prevScrollAmt && prevScrollAmt > 200) {
        $('#header').addClass('fixed'); 
        isItOn = true;
        //console.log(isItOn + 'second');
        if (isItOn === true) {
          $('#header').addClass('fixed'); 
          //console.log(isItOn + 'third');
        } else {
          $('#header').removeClass('fixed');
          $('#header').addClass('off');
          isItOn = false;
          //console.log(isItOn + 'fourth');
        }
      } else if (prevScrollAmt > scrollAmtNow) {
        $('#header').removeClass('fixed');
        isItOn = false;
        //console.log(isItOn + 'fifth');
      }
    } else {
      $('#header').removeClass('fixed');
      $('#header').removeClass('off');
      isItOn = false;
      //console.log(isItOn + 'sixth');
    }


    function current() {
      scrollAmtNow = $(document).scrollTop();
      console.log(scrollAmtNow + 'amtnow');
    }
  });   
}     