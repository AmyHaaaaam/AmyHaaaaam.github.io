 // use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  // gsap code here!
  gsap.registerPlugin(ScrollTrigger);
  /*const tl = gsap.timeline();
  tl.from(".main-section01 .section-title", {xPercent: 100});
  ScrollTrigger.create({
    animation: tl,
    trigger: '.main-section01 .section-title',
    scrub: true,
    pin: true,
    markers: true,
    start: 'top top',
    //endTrigger: '.main-section02',
    end: 'top -100%',
    acticipatePin: 1
  });*/

  //let sections = gsap.utils.toArray(".main-section .section-title");
  gsap.to(".main-section01 .section-title", {
    xPercent: -100,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".main-section01",
      pin: true,
      scrub: 1,
      toggleClass: "active",
      end: () => "+=" + document.querySelector(".main-section01  .section-title").offsetWidth
    }
  });

  //main-sectino02
  let smooothTrigger= gsap.utils.toArray(".main-section02 .smooth-trigger");
  const tl = gsap.timeline({
    defaults: {
      ease: "power2.inOut",
      duration: 1.2,
    }
  });
  tl.from(smooothTrigger, {
    opacity: 0,
    stagger: .1,
  });
  tl.to(smooothTrigger, {
    opacity: 1,
    stagger: .2,
  });

  // ScrollTrigger와 함께 타임라인 실행
  ScrollTrigger.create({
    trigger: ".main-section02",
    animation: tl,
    scrub: 5,
    toggleClass: "active",
    //markers: true,
    start: "top center",
    end: "bottom 100px center",
  });

  //main-section03
  // smooth-typing 클래스가 적용된 요소들을 배열로 가져오기
  let smoothTypingTrigger = gsap.utils.toArray(".experience-list");

  // 각 요소별로 개별 ScrollTrigger 생성
  smoothTypingTrigger.forEach(function(element) {

    // ScrollTrigger를 사용하여 타임라인 실행
    ScrollTrigger.create({
      trigger: element, // 각각의 요소를 트리거로 설정
      scrub: true,
      toggleClass: "active",
      //markers: true,
      start: "top center",
      end: "bottom 100px center",
    });
  });

   //footer
  ScrollTrigger.create({
    trigger: '.footer-box', // 각각의 요소를 트리거로 설정
    scrub: true,
    toggleClass: "active",
    markers: true,
    start: "top center",
    once: true,  // 최초 1회만 실행
    onEnter: () => {  // onEnter로 스크롤이 해당 위치에 올 때 실행
      var footerBox = document.querySelector('.footer-box');
      if (footerBox.classList.contains('active')) {
        initTextTypingAnimation();
      }
    },
  });
});

// Text Typing animation
function initTextTypingAnimation() {
	
	const guide = document.getElementById('guide-text');
	const guideText = guide.getAttribute('data-content');

	guide.textContent = guideText;

	function typeText(text, elementId, speed) {
		let index = 0;
		const element = document.getElementById(elementId);
		element.textContent = ''; // 초기화

		function type() {
		if (index < text.length) {
			element.textContent += text[index];
			index++;
			setTimeout(type, speed);
		}
		}

		type();
	}
	typeText(guideText, 'guide-text', 150);
}