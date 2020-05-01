/*global MicroModal */
/*global ActiveXObject */

function setCursorPosition(pos, elem) {
  elem.focus();
  if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
  else if (elem.createTextRange) {
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

for (const input of phoneInputs) {
  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
}

function CheckForm(form) {
  let formNameInput = form.querySelector("input[name=user_name]");
  let formPhoneInput = form.querySelector("input[name=user_phone]");
  let errorLabel = form.querySelector("[data-error-label]");

  formNameInput.addEventListener("click", () => {
    if (formNameInput.classList.contains("input-error")) {
      formNameInput.classList.remove("input-error");
      errorLabel.style.display = "none";
    }
  });

  formPhoneInput.addEventListener("click", () => {
    if (formPhoneInput.classList.contains("input-error")) {
      formPhoneInput.classList.remove("input-error");
      errorLabel.style.display = "none";
    }
  });

  if (
    ValidName(formNameInput, errorLabel) &&
    ValidPhone(formPhoneInput, errorLabel)
  )
    return true;
  return false;
}

function ValidName(input, errorLabel) {
  let regex = /[a-zA-Zа-яА-Я]/;
  let valid = regex.test(input.value);
  if (!valid) {
    errorLabel.style.display = "block";
    errorLabel.innerText = "Вы неправильно ввели имя";
    input.classList.add("input-error");
  }
  return valid;
}

function ValidPhone(input, errorLabel) {
  let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  let valid = regex.test(input.value);
  if (!valid) {
    errorLabel.style.display = "block";
    errorLabel.innerText = "Номер телефона введен неверно";
    input.classList.add("input-error");
  }
  return valid;
}

function AJAXform(form, formMethod = "post") {
  let acceptButton = form.querySelector("button[type=button]");
  let formAction = form.getAttribute("action");
  let formInputs = form.querySelectorAll("input");
  let errorLabel = form.querySelector("[data-error-label]");

  function XMLhttp() {
    let httpRequest = new XMLHttpRequest();
    let formData = new FormData();

    for (var i = 0; i < formInputs.length; i++) {
      formData.append(formInputs[i].name, formInputs[i].value);
    }

    httpRequest.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        MicroModal.close("modal-callback");
        MicroModal.show("modal-accept");

        for (const input of formInputs) {
          input.value = "";
          input.checked = false;
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
