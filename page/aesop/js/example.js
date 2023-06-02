 $('#gnb #main-menu-01 li').on('click', function() {
  //       $('#wrapper').toggleClass('open');
  //       $('#gnb').toggleClass('on');
  //       $('#nav-inner').toggleClass('off');
  //     });
  //   $('a.toggle').on('click', function(){
  //       $('#nav-inner').toggleClass('off');
  //       $('#gnb').toggleClass('on');
  //       $('#wrapper').toggleClass('open');
  //   });   
    // $('#nav-inner div.panel.first ul + ul > #skin > a').on('mouseenter', function() {
    //     $('#nav-inner div.panel.second').toggleClass('off');
    //     $('#nav-inner div.panel.second > ul > #skin-care-gift').on('mouseenter', function(){
    //             $('div.panel.third').toggleClass('off');
    //         });
    // });
    $('#nav-inner div.panel.first ul + ul > li > a').on('mouseenter', function() {
        var index = $('#nav-inner div.panel.first ul + ul > li').index($(this).parent());
        var i = 'ul' + ':nth-of-type' + '(' + index + ')'; 
        $('#nav-inner div.panel.second').toggleClass('off'); 
        $('#nav-inner div.panel.second').on('mouseenter', function(){
           console.log(i);
        });
        
        // var panel2 = $('#nav-inner div.panel.second > i')
        //   for (i = 0; i < panel2.length; i++) {
        //   console.log(panel2[i]);
        // $('#nav-inner div.panel.second > i').on('mouseenter', function(){
        //     $('div.panel.third').toggleClass('off');
        // });
    });
//     $('.main-product-wrapper > .main-product.ad > div.left > div > a').on('click', function() {
//       $('.main-product-wrapper > .main-product.ad > div.left').toggleClass('on');
//       $('.main-product-wrapper > .main-product.ad > div.right').toggleClass('off');
//       $('section.main-product.ad div > div.left-detail').toggleClass('on');
//     });
//     $('.main-product-wrapper > .main-product.ad > div.right > div > a').on('click', function() {
//       $('.main-product-wrapper > .main-product.ad > div.right').toggleClass('on');
//       $('.main-product-wrapper > .main-product.ad > div.left').toggleClass('off');
//       $('section.main-product.ad div > div.right-detail').toggleClass('on');
//     });
//     $('section.main-product.ad div > div.left-detail > span >a.close').on('click', function(){
//       $('section.main-product.ad div > div.left-detail').toggleClass('on');
//       $('.main-product-wrapper > .main-product.ad > div.right').toggleClass('off');
//       $('.main-product-wrapper > .main-product.ad > div.left').toggleClass('on');
//     });
//      $('section.main-product.ad div > div.right-detail > span >a.close').on('click', function(){
//       $('section.main-product.ad div > div.right-detail').toggleClass('on');
//       $('.main-product-wrapper > .main-product.ad > div.left').toggleClass('off');
//       $('.main-product-wrapper > .main-product.ad > div.right').toggleClass('on');
//     });

// });




    // $('.main-product-wrapper > .main-product.ad > div.center > div > a').on('click', function() {
    //   $('section.details-of-stories').toggleClass('on');
    //   $('section.details-of-stories div.center-detail').toggleClass('on');
    // });
    // $('.main-product-wrapper > .main-product.ad > div.right > div > a').on('click', function() {
    //   $('section.details-of-stories').toggleClass('on');
    //   $('section.details-of-stories div.right-detail').toggleClass('on');
    // });
    // $('section.details-of-stories div.left-detail > span > a.close').on('click', function(){
    //    $('section.details-of-stories div.left-detail').removeClass('on');
    //    $('section.details-of-stories').removeClass('on');
    // });
    // $('section.details-of-stories div.center-detail > span > a.close').on('click', function(){
    //   $('section.details-of-stories div.center-detail').removeClass('on');
    //    $('section.details-of-stories').removeClass('on');
    // });
    //  $('section.details-of-stories div.right-detail > span > a.close').on('click', function(){
    //   $('section.details-of-stories div.right-detail').removeClass('on');
    //    $('section.details-of-stories').removeClass('on');
    // });

     // var main_slides = document.querySelector('.main-slide'),
    // main_slide = document.querySelectorAll('.main-slide li'),
    // currentIdx = 0,
    // main_slideCount = main_slide.length,
    // prevBtn = document.querySelector('.prev'),
    // main_slideWidth = 483.66,
    // main_slideMargin = 0,
    // nextBtn = document.querySelector('.next');

    // main_slides.style.width = main_slideWidth * main_slideCount + 'px';
    
    // function moveMain_slide(num) {
    //   main_slides.style.left = -num * 483.66 + 'px';
    //   currentIdx = num;
    // }
    // nextBtn.addEventListener('click', function(){
    //   if(currentIdx > 0){
    //   moveMain_slide(currentIdx + 1); 
    //   }else {
    //   moveMain_slide(main_slideCount - 8);
    //   }
    // }); 