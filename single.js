document.addEventListener('DOMContentLoaded', () => {
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
    interval = setInterval(nextSlide, 1000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(interval);
      currentSlide = i;
      showSlide(currentSlide);
      startSlider();
    });
  });

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    // console.log('Touch start:', touchStartX);
  }, false);

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    // console.log('Touch end:', touchEndX);
    handleGesture();
  }, false);

  function handleGesture() {
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

  showSlide(currentSlide);
  startSlider();
});
