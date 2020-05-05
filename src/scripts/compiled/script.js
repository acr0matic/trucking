"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*global Swiper */

/*global MicroModal */

/*global AJAXform */
var heroSwiper = new Swiper(".swiper-hero", {
  // Optional parameters
  loop: true,
  autoplay: {
    delay: 3000
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination"
  }
});
var aboutSwiper = new Swiper(".swiper-about", {
  // Optional parameters
  loop: false,
  spaceBetween: 30,
  slidesPerView: 1,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination-about"
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    530: {
      slidesPerView: 2
    },
    740: {
      slidesPerView: 3
    },
    1075: {
      slidesPerView: 4
    }
  }
});
heroSwiper.init;
aboutSwiper.init;
var truckingController = document.getElementById("trucking");
var vehicleController = document.getElementById("vehicle");
var truckingPrice = document.getElementById("price-trucking");
var vehiclePrice = document.getElementById("price-vehicle");
var truckingRadio = document.getElementById("trucking-radio");
var vehicleRadio = document.getElementById("vehicle-radio");
truckingController.addEventListener("change", function () {
  if (truckingController.checked) {
    vehiclePrice.style.display = "none";
    truckingPrice.style.display = "block";
    truckingRadio.classList.add("service-card-active");
    vehicleRadio.classList.remove("service-card-active");
  }
});
vehicleController.addEventListener("change", function () {
  if (vehicleController.checked) {
    vehiclePrice.style.display = "block";
    truckingPrice.style.display = "none";
    truckingRadio.classList.remove("service-card-active");
    vehicleRadio.classList.add("service-card-active");
  }
});
var vehicles = document.querySelectorAll(".vehicle-card");

var _iterator = _createForOfIteratorHelper(vehicles),
    _step;

try {
  var _loop = function _loop() {
    var vehicle = _step.value;
    var specificationsButton = vehicle.querySelector(".vehicle-specifications-button");
    var isOpen = false;
    specificationsButton.addEventListener("click", function () {
      var specificationBlock = vehicle.querySelector(".vehicle-table-wrapper");

      if (!isOpen) {
        specificationBlock.style.display = "block";
        isOpen = true;
      } else {
        specificationBlock.style.display = "none";
        isOpen = false;
      }
    });
  };

  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    _loop();
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

var callbackButtons = document.querySelectorAll("[data-callback-button]");

var _iterator2 = _createForOfIteratorHelper(callbackButtons),
    _step2;

try {
  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
    var button = _step2.value;
    button.addEventListener("click", function () {
      AddPolicyAction(callbackForm);
      MicroModal.show("modal-callback");
    });
  }
} catch (err) {
  _iterator2.e(err);
} finally {
  _iterator2.f();
}

function AddPolicyAction(form) {
  var policy = form.querySelector(".policy");
  var orderButton = form.querySelector(".button-order");
  orderButton.setAttribute("disabled", "disabled");
  policy.checked = false;
  policy.addEventListener("change", function () {
    if (policy.checked) orderButton.removeAttribute("disabled");else orderButton.setAttribute("disabled", "disabled");
  });
}

var callbackForm = document.getElementById("callbackForm");
AJAXform(callbackForm); // Look for .hamburger

var hamburgers = document.querySelectorAll(".hamburger"); // On click

var _iterator3 = _createForOfIteratorHelper(hamburgers),
    _step3;

try {
  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
    var hamburger = _step3.value;
    hamburger.addEventListener("click", function () {
      OpenMenu();
    });
  }
} catch (err) {
  _iterator3.e(err);
} finally {
  _iterator3.f();
}

function OpenMenu() {
  var menu = document.querySelector("#mobile-menu");
  var wrapper = menu.querySelector(".mobile-menu-wrapper");
  wrapper.classList.toggle("is-open");
}