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
startSlider();
