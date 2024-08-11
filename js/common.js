$(document).ready(function() {
	$('body').addClass('is-ready');

  //App.flipCard.init();
	//App.SetScreenSize.init();
	//App.ActivateLocoMotiveScroll.init();
  App.mGnb.init({
		mGnbType: 'allDepthVertical', //모바일메뉴 유형 allDepthVertical, depthOnSide, depthOnSideFixed
		//mGnbWrap: '.slideMenu', //<nav>의 클래스
		//mGnbBox: '.m-gnb', //gnb mobile ul을 감싸는 div의 클래스
		//openGnb: 'on', //gnb 오픈 시 <nav>에 붙는 클래스
		depth1: 'm-gnb-ul', //gnb 1뎁스 ul의 클래스
		//depth2: 'dep2', //gnb 2뎁스 ul의 클래스
		//depth3: 'dep3', //gnb 3뎁스 ul의 클래스
		mBtnOpen: '.btn-m-menu', //모바일 gnb를 열림 버튼
		//mBtnClose: '.slide-close', //모바일 gnb 닫기 버튼	
		//mGnbBg: '.m-gnb-bg', //모바일 gnb 배경 클래스
		//mUtil: '.m-util', //모바일 gnb내 utility 영역(예: home, login, sitemap 등)
		//setCurrent: 'current', //현재 페이지 표시할 클래스
		//setActive: 'active', //메뉴 열릴 시 표시할 클래스
		//setCollapse: 'has-dep', //하위 메뉴가 있을 시 메뉴에 붙는 클래스
		//setFixed: 'all-fixed', //gnb 오픈 시 body에 붙는 클래스(배경 스크롤 막기 위한 클래스)
		mGnbWidth: '70%', //모바일메뉴 폭
		mGnbDirection: 'right', //모바일메뉴 슬라이드 디렉션 왼쪽에서 시작하면 left, 오른쪽에서 시작하면 right
		activateLater: function() {
			// User-defined functions
		},
	});

	// 버튼 클릭 시 해당 콘텐츠로 스크롤 기능
	App.ScrollPage.init();
});
var App = new Object;
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
/*
  @brief locomotivescroll 실행함수
*/
App.ActivateLocoMotiveScroll = function() {
  return{
    init: function() {
			const scroll = new LocomotiveScroll({
				el: document.querySelector('[data-scroll-container]'),
				smooth: true
		});
			
			
    }
  }
  
}();
//======================================================================
//mobile Gnb
//======================================================================
App.mGnb = function () {
	var self;
	var settings;
	var $mGnbType, $mGnbWrap, $mGnbBox, openGnb, depth1, depth2, depth3, $mBtnOpen, $mBtnClose, $mGnbBg, $mUtil, setCurrent, setActive, setCollapse, setFixed, hideClass;
	var $mGnbWidth, $mGnbDirection;
	return {
		init: function(opt) {
			self = this;
			// 기본 옵션 정의
			settings = $.extend({
				mGnbWrap: '.slideMenu',
				mGnbBox: '.m-gnb',
				openGnb: 'on',
				depth1: 'dep1',
				depth2: 'dep2',
				depth3: 'dep3',
				mBtnOpen: '.btn-menu',
				mBtnClose: '.slide-close',	
				mGnbBg: '.m-gnb-bg',
				mUtil: '.m-util',
				setCurrent: 'current',
				setActive: 'active',
				setCollapse: 'has-dep',
				setFixed: 'all-fixed',
				hideClass: 'gnb-hide',
				mGnbWidth: '100%', //모바일메뉴 폭
				mGnbDirection: 'right', //모바일메뉴 슬라이드 디렉션 왼쪽에서 시작하면 left, 오른쪽에서 시작하면 right			
			}, opt);

			$mGnbType = settings.mGnbType;
			$mGnbWrap = $(settings.mGnbWrap);
			$mGnbBox = $(settings.mGnbBox);
			openGnb = settings.openGnb;
			depth1 = settings.depth1;
			depth2 = settings.depth2;
			depth3 = settings.depth3;
			$mBtnOpen = $(settings.mBtnOpen);
			$mBtnClose = $(settings.mBtnClose);	
			$mGnbBg = $(settings.mGnbBg);
			$mUtil = $(settings.mUtil);
			setCurrent = settings.setCurrent;
			setActive = settings.setActive;
			setCollapse = settings.setCollapse;
			setFixed = settings.setFixed;
			hideClass = settings.hideClass;
			$mGnbWidth = settings.mGnbWidth;
			$mGnbDirection = settings.mGnbDirection;

			$('body').addClass($mGnbType); //body에 타입 클래스 추가

			self.mGnbSet(opt); //모바일메뉴 기본 setting

			$mBtnOpen.click(function(e) { //모바일메뉴 열기 버튼 클릭 시
				e.preventDefault(); 
				self.slideMenuOpen(opt); //모바일메뉴 열기
			});

			$mBtnClose.click(function (e) {  //모바일메뉴 닫기 버튼 클릭 시
				e.preventDefault();
				self.slideMenuClose(opt); //모바일메뉴 닫기
			});

			self.mGnbDepthToggle(opt); //하위뎁스별 슬라이드 토글

			$mGnbWrap.css({'width': $mGnbWidth}); //모바일메뉴 폭
			$mGnbWrap.addClass($mGnbDirection); //모바일메뉴 슬라이드 디렉션

			if(opt.activateLater) { //사용자 정의 함수 실행
				opt.activateLater();
			}
		},
		mGnbSet: function(opt) { //모바일메뉴 기본 setting
			//1뎁스 메뉴에 hide 클래스로 숨김처리 된 메뉴를 자식요소도 숨김하도록 리스트 삭제
			$mGnbBox.find('.' + depth1 + ' > li').each(function() {
				if($(this).find('.' + hideClass).length > 0) {
					$(this).remove();
				}
			});
			//자식요소가 있는 리스트에 has-dep이라는 클래스 추가
			$mGnbBox.find('ul').each(function() {
				$(this).parent('li').addClass(setCollapse);
			});
			//현재 페이지 상위 메뉴 오픈
			$mGnbBox.find('.' + setCurrent).parentsUntil($mGnbWrap, 'li').addClass(setActive);
			$mGnbBox.find('li.' + setActive + ' > ul').each(function() {
				$(this).show();
			});
		},
		slideMenuOpen: function(opt) { //모바일메뉴 열기
			//열기/닫기 
			$mGnbWrap.addClass(openGnb);
			$mGnbBg.show();
			$mBtnClose.show();
			$('html, body').addClass(setFixed);

			if($mGnbType == 'depthOnSide' && $('body').hasClass('main') || $mGnbType == 'depthOnSideFixed' && $('body').hasClass('main')) { //모바일메뉴가 1depthOnSide, 1depthOnSideFixed일 때
				$('.' + depth1 + ' > li:first-of-type > a').trigger('click');
			} 
			$mGnbBox.find('li.' + setActive + ' > ul').each(function() { // 모바일 메뉴 2뎁스 노출 : pc -> mobile 리사이즈 대응
				$(this).show();
			});
			if($mGnbType == 'depthOnSideFixed') { //모바일메뉴가 depthOnSideFixed일 때
				self.setHeight(opt);
			}
			$(window).resize(function(){
				if($(window).width() > 1024){
					$mGnbWrap.removeClass(openGnb);
					$mGnbBg.hide();
					$mBtnClose.hide();
					$('html, body').removeClass(setFixed)
				}
			});
		},
		slideMenuClose: function(opt) { //모바일메뉴 닫기
			$mGnbWrap.removeClass(openGnb);
			$mGnbBg.hide();
			$mBtnClose.hide();
			$('html, body').removeClass(setFixed);
		},
		mGnbDepthToggle: function(opt) { //하위뎁스별 슬라이드 toggle
			//모바일 메뉴 제어
			var thisMenu;
			if($mGnbType == 'allDepthVertical') { //모바일메뉴가 allDepthVertical일 때
				$mGnbBox.find('.' + setCollapse).find('a[target!=_blank]').click(function (e) {
					if($(this).next('ul').length > 0) {
						e.preventDefault();
						thisMenu = $(this);
						toggleMenu();
					}
				});
			} else if($mGnbType == 'depthOnSide' || $mGnbType == 'depthOnSideFixed') { //모바일메뉴가 depthOnSide, depthOnSideFixed일 때
				$mGnbBox.find('.' + depth1 + ' > .' + setCollapse + ' > a[target!=_blank]').click(function (e) { //1뎁스 메뉴 클릭시
					if($(this).next('ul').length > 0) {
						e.preventDefault();
						$(this).next('ul').stop(true).show().parent('li').toggleClass(setActive);	
						$(this).parent('li').siblings().removeClass(setCurrent).removeClass(setActive).children('ul').stop(true).hide();
					}
				});
				$mGnbBox.find('.' + depth2 + ' .' + setCollapse + ' a[target!=_blank]').click(function (e) { //2뎁스 이하 메뉴 클릭시
					if($(this).next('ul').length > 0) {
						e.preventDefault();
						thisMenu = $(this);
						toggleMenu();
					}
				});
			}
			function toggleMenu() {
				thisMenu.next('ul').stop(true).slideToggle('fast').parent('li').toggleClass(setActive);	
				thisMenu.parent('li').siblings().removeClass(setActive).children('ul').stop(true).slideUp('fast');
			}
		},
		setHeight: function(opt) {
			var topUtilH = $($mUtil).outerHeight();// 1뎁스 고정 및 높이 인식
			//$mGnbBox.css({'top': topUtilH + 'px'});
			$mGnbBox.css({'height':'calc(100% - ' + topUtilH + 'px'});
		},
	}
}();
//======================================================================
// 버튼 클릭 시 해당 콘텐츠로 스크롤 기능
//======================================================================
App.ScrollPage = function () {
	var self;
	var settings;
	var target, fixedHeight;

	return {
		init: function (opt) {

			settings = $.extend({
				autoAddTab: false, //자동추가 해시탭일 때 true로 설정
			}, opt);

			autoAddTab = settings.autoAddTab;

			//var tabWrap = $('.hash-tab-wrap');

			$('[data-hash="menu"] a').click(function(){
				$(this).parent('li').siblings().removeClass('active');
				$(this).parent('li').addClass('active');

				/* 접근성을 위한 탭에 선택됨 표시 */
				$(this).parent('li').siblings().attr('title', '바로가기');
				$(this).attr('title','선택됨');

				target = $(this).attr('href');

				/*if(autoAddTab == false && $('body').hasClass('headerFixed')) { //해시탭유형이 스크롤시 헤더가 fixed될 때
					fixedHeight = $('.wrap > header, .bottom-header-wrap').outerHeight();
				} else {
					fixedHeight = 10;
				}*/

				fixedHeight = 0;
				
				$('html, body').stop(true).animate({
					scrollTop: $(target).offset().top - fixedHeight
				}, 500);

			});
		}
	}
}();