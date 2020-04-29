/*global Swiper */

var heroSwiper = new Swiper(".swiper-hero", {
  // Optional parameters
  loop: true,

  autoplay: {
    delay: 3000,
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

heroSwiper.init;
