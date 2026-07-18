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

    // FILTRO ANNUNCI PER CATEGORIA
    function filterByCategory(category) {
      if (category != "All") {
        let filteredCards = data.filter(
          (annuncio) => annuncio.category === category,
        );
        console.log(filteredCards);
        showCards(filteredCards);
      } else {
        showCards(data);
      }
    }

    let radioButtons = document.querySelectorAll(".form-check-input");
    radioButtons.forEach((radio) => {
      radio.addEventListener("click", () => {
        filterByCategory(radio.id);
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
    function filterByPrice() {
      let filtered = data.filter(
        (annuncio) => +annuncio.price <= priceInput.value,
      );
      showCards(filtered);
    }

    priceInput.addEventListener("input", () => {
      priceValue.innerHTML = priceInput.value;
      filterByPrice();
    });

    let wordInput = document.querySelector("#wordInput");
    function filterByWord(parola) {
      let filtered = data.filter((annuncio) =>
        annuncio.name.toLowerCase().includes(parola.toLowerCase()),
      );
      showCards(filtered);
    }

    wordInput.addEventListener("input", () => {
      filterByWord(wordInput.value);
    });
  });
