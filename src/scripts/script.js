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

var aboutSwiper = new Swiper(".swiper-about", {
  // Optional parameters
  loop: false,
  spaceBetween: 30,
  slidesPerView: 4,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination-about",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

heroSwiper.init;
aboutSwiper.init;

var truckingController = document.getElementById("trucking");
var vehicleController = document.getElementById("vehicle");

var truckingPrice = document.getElementById("price-trucking");
var vehiclePrice = document.getElementById("price-vehicle");

var truckingRadio = document.getElementById("trucking-radio")
var vehicleRadio = document.getElementById("vehicle-radio")

truckingController.addEventListener("change", () => {
  if (truckingController.checked) {
    vehiclePrice.style.display = "none";
    truckingPrice.style.display = "block";

    truckingRadio.classList.add("service-card-active");
    vehicleRadio.classList.remove("service-card-active");
  }
});

vehicleController.addEventListener("change", () => {
  if (vehicleController.checked) {
    vehiclePrice.style.display = "block";
    truckingPrice.style.display = "none";

    truckingRadio.classList.remove("service-card-active");
    vehicleRadio.classList.add("service-card-active");
  }
});


var vehicles = document.querySelectorAll(".vehicle-card");

for (const vehicle of vehicles) {
  let specificationsButton = vehicle.querySelector(
    ".vehicle-specifications-button"
  );

  let isOpen = false;

  specificationsButton.addEventListener("click", () => {
    let specificationBlock = vehicle.querySelector(".vehicle-table-wrapper");

    if (!isOpen) {
      specificationBlock.style.display = "block";
      isOpen = true;
    } else {
      specificationBlock.style.display = "none";
      isOpen = false;
    }
  });
}
