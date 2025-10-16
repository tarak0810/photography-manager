const slides = document.querySelectorAll('.slider-image');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let currentSlide = 0;
let interval;

// Function to show specific slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Function to go to next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Function to go to previous slide
function previousSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Start automatic slider
function startSlider() {
  interval = setInterval(nextSlide, 4000);
}

// Dot navigation
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(interval);
    currentSlide = i;
    showSlide(currentSlide);
    startSlider();
  });
});

// Touch support variables
const slider = document.querySelector('.slider');
let touchStartX = 0;
let touchEndX = 0;

// Handle touch start
slider.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

// Handle touch end
slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleGesture();
});

// Detect swipe direction
function handleGesture() {
  const swipeDistance = touchEndX - touchStartX;
  const minSwipeDistance = 40; // threshold
  if (swipeDistance < -minSwipeDistance) {
    // Swipe left
    clearInterval(interval);
    nextSlide();
    startSlider();
  } else if (swipeDistance > minSwipeDistance) {
    // Swipe right
    clearInterval(interval);
    previousSlide();
    startSlider();
  }
}

// Initialize
showSlide(currentSlide);
startSlider();
