"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*global MicroModal */

/*global ActiveXObject */
function setCursorPosition(pos, elem) {
  elem.focus();
  if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);else if (elem.createTextRange) {
    var range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
}

var len = 0;

function mask(event) {
  var matrix = "+7 (___) ___ ____",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
  if (def.length >= val.length) val = def;
  this.value = matrix.replace(/[_\d]/g, function (a) {
    return i < val.length ? val.charAt(i++) : a;
  });
  i = this.value.indexOf("_");
  if (val.length < len) i = this.value.lastIndexOf(val.substr(-1)) + 1;

  if (i != -1) {
    i < 5 && (i = 3);
    this.value = this.value.slice(0, i);
  }

  if (event.type == "blur") {
    if (this.value.length < 5) this.value = "";
  } else setCursorPosition(this.value.length, this);

  len = val.length;
}

var phoneInputs = document.querySelectorAll("input[type=tel]");

var _iterator = _createForOfIteratorHelper(phoneInputs),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var input = _step.value;
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

function CheckForm(form) {
  var formNameInput = form.querySelector("input[name=user_name]");
  var formPhoneInput = form.querySelector("input[name=user_phone]");
  var errorLabel = form.querySelector("[data-error-label]");
  formNameInput.addEventListener("click", function () {
    if (formNameInput.classList.contains("input-error")) {
      formNameInput.classList.remove("input-error");
      errorLabel.style.display = "none";
    }
  });
  formPhoneInput.addEventListener("click", function () {
    if (formPhoneInput.classList.contains("input-error")) {
      formPhoneInput.classList.remove("input-error");
      errorLabel.style.display = "none";
    }
  });
  if (ValidName(formNameInput, errorLabel) && ValidPhone(formPhoneInput, errorLabel)) return true;
  return false;
}

function ValidName(input, errorLabel) {
  var regex = /[a-zA-Zа-яА-Я]/;
  var valid = regex.test(input.value);

  if (!valid) {
    errorLabel.style.display = "block";
    errorLabel.innerText = "Вы неправильно ввели имя";
    input.classList.add("input-error");
  }

  return valid;
}

function ValidPhone(input, errorLabel) {
  var regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  var valid = regex.test(input.value);

  if (!valid) {
    errorLabel.style.display = "block";
    errorLabel.innerText = "Номер телефона введен неверно";
    input.classList.add("input-error");
  }

  return valid;
}

function AJAXform(form) {
  var formMethod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "post";
  var acceptButton = form.querySelector("button[type=button]");
  var formAction = form.getAttribute("action");
  var formInputs = form.querySelectorAll("input");
  var errorLabel = form.querySelector("[data-error-label]");

  function XMLhttp() {
    var httpRequest = new XMLHttpRequest();
    var formData = new FormData();

    for (var i = 0; i < formInputs.length; i++) {
      formData.append(formInputs[i].name, formInputs[i].value);
    }

    httpRequest.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        MicroModal.close("modal-callback");
        MicroModal.show("modal-accept");

        var _iterator2 = _createForOfIteratorHelper(formInputs),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var input = _step2.value;
            input.value = "";
            input.checked = false;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    };

    httpRequest.open(formMethod, formAction);
    httpRequest.send(formData);
  }

  acceptButton.onclick = function () {
    if (CheckForm(form)) {
      errorLabel.style.display = "none";
      XMLhttp();
    }
  };

  form.onsubmit = function () {
    return false;
  };
}

function getXmlHttp() {
  var xmlhttp;

  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }

  if (!xmlhttp && typeof XMLHttpRequest != "undefined") {
    xmlhttp = new XMLHttpRequest();
  }

  return xmlhttp;
}