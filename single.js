const slides = document.querySelectorAll('.slider-image');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let currentSlide = 0;
let interval;

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

showSlide(currentSlide);
const slider = document.querySelector('.slider');
let touchStartX = 0;
let touchEndX = 0;

// Handle swipe start
slider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

// Handle swipe end
slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
}, false);

function handleGesture() {
  if (touchEndX < touchStartX - 40) {
    // Swipe left -> next slide
    clearInterval(interval);
    nextSlide();
    startSlider();
  } else if (touchEndX > touchStartX + 40) {
    // Swipe right -> previous slide
    clearInterval(interval);
    previousSlide();
    startSlider();
  }
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

startSlider();
