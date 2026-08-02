fetch("./annunci.json")
  .then((response) => response.json())
  .then((data) => {
    data.sort((a, b) => a.price - b.price); // Ordino tutti i prodotti per prezzo crescente

    let radioWrapper = document.getElementById("radioWrapper");
    let cardWrapper = document.getElementById("cardWrapper");

    // CREAZIONE FILTRO CATEGORIE
    function radioCreate() {
      let categories = data.map((annuncio) => annuncio.category);

      let uniqueCategories = Array.from(new Set(categories));

      uniqueCategories.forEach((category) => {
        let radioDiv = document.createElement("div");
        radioDiv.classList.add("form-check");

        let radioInput = document.createElement("input");
        radioInput.classList.add("form-check-input");
        radioInput.type = "radio";
        radioInput.name = "categories";
        radioInput.id = `${category}`;
        radioInput.value = category;

        let radioLabel = document.createElement("label");
        radioLabel.classList.add("form-check-label");
        radioLabel.setAttribute("for", `radio${category}`);
        radioLabel.textContent = category;

        radioDiv.appendChild(radioInput);
        radioDiv.appendChild(radioLabel);
        radioWrapper.appendChild(radioDiv);
      });
    }
    radioCreate();

    function truncateString(str) {
      if (str.length > 15) {
        return str.split(" ")[0];
      }
      return str;
    }

    // CREAZIONE CARD ANNUNCI
    function showCards(array) {
      cardWrapper.innerHTML = "";
      array.forEach((annuncio) => {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card-custom");
        cardDiv.innerHTML = `
                <p class="h2" title="${annuncio.name}">${truncateString(annuncio.name)}</p>
                <p class="h4">${annuncio.category}</p>
                <p class="lead">€ ${annuncio.price}</p>
            `;
        cardWrapper.appendChild(cardDiv);
      });
    }
    showCards(data);

    let radioButtons = document.querySelectorAll(".form-check-input");
    // FILTRO ANNUNCI PER CATEGORIA
    function filterByCategory(array) {
      let category = Array.from(radioButtons).find(
        (button) => button.checked,
      ).id;

      if (category != "All") {
        let filteredCards = array.filter(
          (annuncio) => annuncio.category === category,
        );
        return filteredCards;
      } else {
        return array;
      }
    }

    radioButtons.forEach((radio) => {
      radio.addEventListener("click", () => {
        globalFilter();
      });
    });

    let priceInput = document.querySelector("#priceInput");
    let priceValue = document.querySelector("#priceValue");

    // IMPOSTA RANGE PREZZO FILTRO
    function setPriceInput() {
      let prices = data.map((annuncio) => +annuncio.price);
      prices.sort((a, b) => a - b);
      let maxPrice = Math.ceil(prices.pop());
      priceInput.max = maxPrice;
      priceInput.value = maxPrice;
      priceValue.innerHTML = maxPrice;
    }
    setPriceInput();

    // FILTRO ANNUNCI PER PREZZO
    function filterByPrice(array) {
      let filtered = array.filter(
        (annuncio) => +annuncio.price <= priceInput.value,
      );
      return filtered;
    }

    priceInput.addEventListener("input", () => {
      priceValue.innerHTML = priceInput.value;
      globalFilter();
    });

    let wordInput = document.querySelector("#wordInput");
    function filterByWord(array) {
      let filtered = array.filter((annuncio) =>
        annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()),
      );
      return filtered;
    }

    wordInput.addEventListener("input", () => {
      globalFilter();
    });

    function globalFilter() {
      let filteredByCategory = filterByCategory(data); // array filtrato per categoria
      let filteredByPrice = filterByPrice(filteredByCategory); // array filtrato per categoria e prezzo
      let filteredByWord = filterByWord(filteredByPrice); // array filtrato per categoria, prezzo e parola

      showCards(filteredByWord);
    }
  });

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
