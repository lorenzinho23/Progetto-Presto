let navbar = document.querySelector("#navbar");
let links = document.querySelectorAll(".nav-link");
let logo = document.querySelector("#logo");
let logoMenu = document.querySelector(".logo-menu");
let containerFluid = document.querySelector(".container-fluid");

window.addEventListener("scroll", function () {
  let scrolled = window.scrollY;

  if (scrolled > 0) {
    navbar.classList.remove("bg-black");
    navbar.classList.add("bg-orange");
    containerFluid.classList.remove("bg-black");
    containerFluid.classList.add("bg-orange");
    navbar.style.height = "50px";
    links.forEach((link) => {
      link.style.color = "var(--black)";
    });
    logo.src = "media/logo_black.png";
    logoMenu.src = "media/menu-black.png";
  } else {
    navbar.classList.add("bg-black");
    navbar.classList.remove("bg-orange");
    containerFluid.classList.add("bg-black");
    containerFluid.classList.remove("bg-orange");
    navbar.style.height = "70px";
    links.forEach((link) => {
      link.style.color = "var(--orange)";
    });
    logo.src = "media/logo_orange.png";
    logoMenu.src = "media/menu-orange.png";
  }
});

let opener = document.querySelector(".opener");

let teachers = [
  {
    name: "Lorenzo",
    description: "Addetto alle spedizioni e logistica",
    url: "./media/member1.png",
  },
  {
    name: "Marco",
    description: "Responsabile Customer Care",
    url: "./media/member2.png",
  },
  {
    name: "Riccardo",
    description: "Addetto alla gestione degli annunci",
    url: "./media/member3.png",
  },
  {
    name: "Simona",
    description: "Responsabile sicurezza e qualità",
    url: "./media/member4.png",
  },
];

let circle = document.querySelector(".circle");
teachers.forEach((teacher) => {
  let div = document.createElement("div");
  div.classList.add("moved");
  div.style.backgroundImage = `url(${teacher.url})`;
  div.style.backgroundSize = "cover";
  circle.appendChild(div);
});

let movedDivs = document.querySelectorAll(".moved");

let check = false;

let flipCard = document.querySelector(".flip-card");

opener.addEventListener("click", () => {
  if (check == false) {
    opener.style.transform = "rotate(45deg)";

    let distance = window.innerWidth <= 768 ? 100 : 150;

    movedDivs.forEach((moved, i) => {
      let angle = (360 * i) / movedDivs.length;
      moved.style.transform = `rotate(${angle}deg) translate(${distance}px) rotate(-${angle}deg)`;
    });

    check = true;
  } else {
    check = false;
    opener.style.transform = "";

    movedDivs.forEach((moved) => {
      moved.style.transform = "";
    });

    flipCard.classList.add("d-none");
  }
});

let innerFace = document.querySelector(".inner-face");
let nameTeacher = document.querySelector(".inner-back .h4");
let descriptionTeacher = document.querySelector(".inner-back .lead");
movedDivs.forEach((moved, i) => {
  moved.addEventListener("click", () => {
    flipCard.classList.remove("d-none");
    let docente = teachers[i];
    innerFace.style.backgroundImage = `url(${docente.url})`;
    nameTeacher.innerHTML = docente.name;
    descriptionTeacher.innerHTML = docente.description;
  });
});
