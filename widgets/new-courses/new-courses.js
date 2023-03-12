/**
 * FOR HEAAD
 * <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
 * <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
 */

// swiper
const swiper = new Swiper('.swiper', {
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    // when window width is >= 640px
    1200: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
  },
});
