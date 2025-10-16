const slides = document.querySelectorAll('.slider-image');
const dots = document.querySelectorAll('.dot');
const slider = document.querySelector('.slider');
const totalSlides = slides.length;
let currentSlide = 0;
let interval;
let touchStartX = 0;
let touchEndX = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

function startSlider() {
  interval = setInterval(nextSlide, 4000);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(interval);
    currentSlide = i;
    showSlide(currentSlide);
    startSlider();
  });
});

// Touch event handlers for swipe support
slider.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  const minSwipeDistance = 40; // Minimum distance to consider swipe

  if (swipeDistance < -minSwipeDistance) {
    clearInterval(interval);
    nextSlide();
    startSlider();
  } else if (swipeDistance > minSwipeDistance) {
    clearInterval(interval);
    previousSlide();
    startSlider();
  }
}

// Initialize
showSlide(currentSlide);
startSlider();

