fetch("/carShop.json")
  .then((response) => response.json())
  .then((data) => {
    const section = document.querySelector("#product");
    const productsToShow = 15;
    let productsCount = 0;

    data.map((item) => {
      if (productsCount < productsToShow) {
      //create article node
      const article = document.createElement("article");
      article.className = 'product';

      //create img node
      const img = document.createElement("img");
      img.className = 'product__img';
      img.src = item.image;
      img.alt = item.name;

      //create h3 node
      const h3 = document.createElement("h3");
      h3.className = 'product__name';
      h3.textContent = item.name;

      const circleContainer = document.createElement('div');
      circleContainer.className = 'circles';
      
      const circleBlack = document.createElement('div');
      circleBlack.className = 'circle circle-black';
      
      const circleRed = document.createElement('div');
      circleRed.className = 'circle circle-red';

      //create p node
      const pContainer = document.createElement('div');
      pContainer.className = 'product__Price__Container';
      const p = document.createElement("p");
      p.className = 'product__Price';
      p.textContent = `$${item.price}`;

      //append nodes to article
      article.appendChild(img);
      article.appendChild(h3);
      circleContainer.appendChild(circleBlack);
      circleContainer.appendChild(circleRed);
      article.appendChild(circleContainer);
      pContainer.appendChild(p);
      article.appendChild(pContainer);

      //append article to section
      section.appendChild(article);

      productsCount++;
      } else {
        // For products beyond the initial 15, hide them
        const article = document.createElement("article");
        article.className = 'product';
        article.style.display = 'none';

        const img = document.createElement("img");
        img.className = 'product__img';
        img.src = item.image;
        img.alt = item.name;

        const h3 = document.createElement("h3");
        h3.className = 'product__name';
        h3.textContent = item.name;

        const circleContainer = document.createElement('div');
        circleContainer.className = 'circles';

        const circleBlack = document.createElement('div');
        circleBlack.className = 'circle circle-black';

        const circleRed = document.createElement('div');
        circleRed.className = 'circle circle-red';

        const pContainer = document.createElement('div');
        pContainer.className = 'product__Price__Container';
        const p = document.createElement("p");
        p.className = 'product__Price';
        p.textContent = `$${item.price}`;

        article.appendChild(img);
        article.appendChild(h3);
        circleContainer.appendChild(circleBlack);
        circleContainer.appendChild(circleRed);
        article.appendChild(circleContainer);
        pContainer.appendChild(p);
        article.appendChild(pContainer);

        section.appendChild(article);
      }
    });

    const masProductosButton = document.querySelector('footer button');
    const reservaDerechos = document.querySelector('#reserva-derechos')
    masProductosButton.addEventListener('click', showMoreProducts);

    function showMoreProducts() {
      const hiddenProducts = document.querySelectorAll(".product[style='display: none;']");
      hiddenProducts.forEach(product => (product.style.display = 'block'));
      masProductosButton.style.display = 'none';
      reservaDerechos.style.display ='block';
    }

      const filteredProducts = data.filter(
        (item) =>
          item.category === "shirt" ||
          item.category === "hoddie" ||
          item.category === "sweater"
      );

      // Calcular la cantidad total disponible para cada categoría
      const categoryQuantities = {};
      filteredProducts.forEach((item) => {
        if (categoryQuantities[item.category]) {
          categoryQuantities[item.category] += item.quantity;
        } else {
          categoryQuantities[item.category] = item.quantity;
        }
      });

      // Obtener el menú desplegable
      const dropdown = document.querySelector(".dropdown ul ul");

      // Limpiar la lista desplegable
      while (dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild);
      }

      // Crear un elemento de lista para cada categoría y su cantidad disponible
      for (let category in categoryQuantities) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = `${categoryQuantities[category]} Available`;
        li.textContent = `${
          category.charAt(0).toUpperCase() + category.slice(1)
        }`;
        li.appendChild(span);
        dropdown.appendChild(li);
      }
    })
  .catch((error) => console.error("Error:", error));
