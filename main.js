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

// Contatori numerici
let firstNumber = document.querySelector("#firstNumber");
let secondNumber = document.querySelector("#secondNumber");
let thirdNumber = document.querySelector("#thirdNumber");

let confirm = true;

function createInterval(n, element, time) {
  let counter = 0;

  let interval = setInterval(() => {
    if (counter < n) {
      counter++;
      element.innerHTML = counter;
    } else {
      clearInterval(interval);
    }
  }, time);

  setTimeout(() => {
    confirm = true;
  }, 8000);
}

let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && confirm) {
      createInterval(100, firstNumber, 20);
      createInterval(200, secondNumber, 10);
      createInterval(300, thirdNumber, 5);
      confirm = false;
    }
  });
});

observer.observe(firstNumber);

// Recensioni
let reviews = [
  {
    autore: "Mario",
    descrizione: "Ottimo servizio, lo consiglio a tutti!",
    voto: 5,
  },
  {
    autore: "Luigi",
    descrizione: "Non mi sono trovato bene, ordine non arrivato",
    voto: 2,
  },
  {
    autore: "Giulia",
    descrizione: "Personale cordiale e professionale.",
    voto: 4,
  },
  {
    autore: "Francesca",
    descrizione: "Servizio rapido e di qualità.",
    voto: 5,
  },
  {
    autore: "Alessandro",
    descrizione: "Molto soddisfatto, super consigliato!",
    voto: 5,
  },
];

let swiperWrapper = document.querySelector(".swiper-wrapper");

reviews.forEach((review) => {
  let slide = document.createElement("div");
  slide.classList.add("swiper-slide");
  slide.innerHTML = `
    <div class="card-review text-center">
      <p class="lead">${review.descrizione}</p>
      <p class="h4">${review.autore}</p>
      <div class="d-flex justify-content-center stars">
      </div>
    </div>
  `;
  swiperWrapper.appendChild(slide);
});

let stars = document.querySelectorAll(".stars");
stars.forEach((star, index) => {
  for (let i = 1; i <= reviews[index].voto; i++) {
    let starIcon = document.createElement("i");
    starIcon.classList.add("fa-solid", "fa-star");
    star.appendChild(starIcon);
  }

  let emptyStars = 5 - reviews[index].voto;
  for (let i = 1; i <= emptyStars; i++) {
    let starIcon = document.createElement("i");
    starIcon.classList.add("fa-regular", "fa-star");
    star.appendChild(starIcon);
  }
});

// Swiper
const swiper = new Swiper(".swiper", {
  // Optional parameters
  effect: "flip",
  grabCursor: true,
  loop: true,

  autoplay: {
    delay: 2000,
  },
});
