let menu = document.querySelector("#mobile-menu");
let wrapper = menu.querySelector(".mobile-menu-wrapper");

let menuItems = menu.querySelectorAll(".nav-item");

for (const item of menuItems) {
  item.addEventListener("click", () => {
    Menu();
  });
}

function Menu() {
  wrapper.classList.toggle("is-open");
}
