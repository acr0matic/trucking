const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const blockID = anchor.getAttribute("href");

    SmoothScroll(blockID);
  });
}

function SmoothScroll(blockID) {
  var section = document.getElementById(blockID.substr(1));

  if (section)
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  else
    window.open(blockID, "_self");
}

