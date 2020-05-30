//hamburger animation

const btnHamb = document.querySelector('.navFirst__btn');
const btnHambTop = document.querySelector('span:nth-of-type(1)');
const btnHambMidle = document.querySelector('span:nth-of-type(2)');
const btnHambBottom = document.querySelector('span:nth-of-type(3)');
const navModal = document.querySelector('.navFirst__modal');
    function hamburger(){
        btnHambTop.classList.toggle('navFirst__active');
        btnHambMidle.classList.toggle('navFirst__active');
        btnHambBottom.classList.toggle('navFirst__active');
        navModal.classList.toggle('navFirst__active');
    }
btnHamb.addEventListener('click', hamburger);


// scroll
$('.menu').click(function(e){
    e.preventDefault();
    var target = $($(this).attr('href'));
    if(target.length){
      var scrollTo = target.offset().top;
      $('body, html').animate({scrollTop: scrollTo+'px'}, 1000);
    }
  });

  // *************slider***************
  //opoznienie slajdu
  const slideDelay = 2.5;
  // czas wyswietlania jednego slajdu
const slideDuration = 2;

  // wszystkie slajdy
const slides = document.querySelectorAll(".slider--pic");

  // ustalenie ilosci slajdow
const numSlides = slides.length;


  // petla dla slajdow z wykorzystaniem gsap
for (let i = 0; i < numSlides; i++) {
  TweenLite.set(slides[i], {
  backgroundColor: Math.random() * 0xffffff,
  xPercent: i * 100
});
}

const wrap = wrapPartial(-100, (numSlides - 1) * 100);
const timer = TweenLite.delayedCall(slideDelay, autoPlay);

const animation = TweenMax.to(slides, 1, {
  xPercent: "+=" + (numSlides * 100),
  ease: Linear.easeNone,
  paused: true,
  repeat: -1,
  modifiers: {
  xPercent: wrap
  }
});

const proxy = document.createElement("div");
  TweenLite.set(proxy, { x: "+=0" });
const transform = proxy._gsTransform;
let slideAnimation = TweenLite.to({}, 0.1, {});
let slideWidth = 0;
let wrapWidth = 0;

resize();

const draggable = new Draggable(proxy, {
  trigger: ".slides-container",
  throwProps: true,
  onPress: updateDraggable,
  onDrag: updateProgress,
  onThrowUpdate: updateProgress,
  snap: {
  x: snapX
  }
});

window.addEventListener("resize", resize);

  function updateDraggable() {

  timer.restart(true);
  slideAnimation.kill();
  this.update();
  }

function animateSlides(direction) {

timer.restart(true);
slideAnimation.kill();

const x = snapX(transform.x + direction * slideWidth);

slideAnimation = TweenLite.to(proxy, slideDuration, {
  x: x,
  onUpdate: updateProgress
});
}

function autoPlay() {

  if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
      timer.restart(true);
  } else {
      animateSlides(-1);
  }
}

function updateProgress() {
  animation.progress(transform.x / wrapWidth);
}

function snapX(x) {
  return Math.round(x / slideWidth) * slideWidth;
}

function resize() {

  const norm = (transform.x / wrapWidth) || 0;

  slideWidth = slides[0].offsetWidth;
  wrapWidth = slideWidth * numSlides;

  TweenLite.set(proxy, {
      x: norm * wrapWidth
  });

animateSlides(0);
slideAnimation.progress(1);
}

function wrapPartial(min, max) {
  const r = max - min;
  return function(value) {
      const v = value - min;
      return ((r + v % r) % r) + min;
  }
}