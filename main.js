let navbar = document.querySelector("#navbar");
let links = document.querySelectorAll(".nav-link");
let logo = document.querySelector("#logo");

window.addEventListener("scroll", function () {
  let scrolled = window.scrollY;

  if (scrolled > 0) {
    navbar.classList.remove("bg-black");
    navbar.classList.add("bg-orange");
    navbar.style.height = "50px";
    links.forEach((link) => {
      link.style.color = "var(--black)";
    });
    logo.src = "media/logo_black.png";
  } else {
    navbar.classList.add("bg-black");
    navbar.classList.remove("bg-orange");
    navbar.style.height = "70px";
    links.forEach((link) => {
      link.style.color = "var(--orange)";
    });
    logo.src = "media/logo_orange.png";
  }
});
