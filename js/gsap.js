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
    ease: "none",
    scrollTrigger: {
      trigger: ".main-section01",
      pin: true,
      scrub: true,
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
    scrub: true,
    toggleClass: "active",
    //markers: true,
    start: "top center",
    end: "bottom 100px center",
  });

  //main-section03
  // smooth-typing 클래스가 적용된 요소들을 배열로 가져오기
  let smoothTypingTrigger = gsap.utils.toArray(".smooth-typing");

  // 각 요소별로 개별 ScrollTrigger 생성
  smoothTypingTrigger.forEach(function(element) {
    const tl2 = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
        duration: 1.2,
      }
    });

    tl2.from(element, {
      opacity: 0,
    }).to(element, {
      opacity: 1,
    });

    // ScrollTrigger를 사용하여 타임라인 실행
    ScrollTrigger.create({
      trigger: element, // 각각의 요소를 트리거로 설정
      animation: tl2,
      scrub: true,
      toggleClass: "active",
      //markers: true,
      start: "top center",
      end: "bottom 100px center",
    });
  });
});