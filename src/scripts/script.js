/*global Swiper */
/*global MicroModal */
/*global AJAXform */
/*global Menu */

MicroModal.init({
  awaitCloseAnimation: true,
});

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
});

var aboutSwiper = new Swiper(".swiper-about", {
  // Optional parameters
  loop: false,
  spaceBetween: 30,
  slidesPerView: 1,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination-about",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    530: {
      slidesPerView: 2,
    },

    740: {
      slidesPerView: 3,
    },

    1075: {
      slidesPerView: 4,
    },
  },
});

heroSwiper.init;
aboutSwiper.init;

var truckingController = document.getElementById("trucking");
var vehicleController = document.getElementById("vehicle");

var truckingPrice = document.getElementById("price-trucking");
var vehiclePrice = document.getElementById("price-vehicle");

var truckingRadio = document.getElementById("trucking-radio");
var vehicleRadio = document.getElementById("vehicle-radio");

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

var callbackButtons = document.querySelectorAll("[data-callback-button]");

for (const button of callbackButtons) {
  button.addEventListener("click", () => {
    AddPolicyAction(callbackForm);
    MicroModal.show("modal-callback");
  });
}

function AddPolicyAction(form) {
  let policy = form.querySelector(".policy");
  let orderButton = form.querySelector(".button-order");

  orderButton.setAttribute("disabled", "disabled");
  policy.checked = false;

  policy.addEventListener("change", () => {
    if (policy.checked) orderButton.removeAttribute("disabled");
    else orderButton.setAttribute("disabled", "disabled");
  });
}

var callbackForm = document.getElementById("callbackForm");

AJAXform(callbackForm);

var hamburgers = document.querySelectorAll(".hamburger");

for (const hamburger of hamburgers) {
  hamburger.addEventListener("click", function () {
    Menu();
  });
}

var heroButton = document.querySelector("[data-button-nav");
heroButton.onclick = () => {
  SmoothScroll(heroButton.getAttribute("data-button-nav"));
};
