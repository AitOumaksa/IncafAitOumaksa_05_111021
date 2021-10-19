fetch("http://localhost:3000/api/products")
  //transforme le résultat en objet javascript json si la réponse à un codes de statut compris entre 200 et 299
  .then(function (res) {
    if (res.ok) {
      // console.log(res);

      return res.json();
    }
  })
  //récupère les objets javascript JSON correspondants aux articles envoyés par l'API (sous forme de tableau s'il y a plusieurs objets)
  .then(function (jsonListCanape) {
    console.log(jsonListCanape);
    for (let jsonCanape of jsonListCanape) {
      document.getElementById(
        "items"
      ).innerHTML += `<a href="./product.html?id=${jsonCanape._id}">
            <article>
              <img src="${jsonCanape.imageUrl}" alt="${jsonCanape.altTxt}">
              <h3 class="productName">${jsonCanape.name}</h3>
              <p class="productDescription">${jsonCanape.description}</p>
            </article>
          </a>`;
    }
  })
  .catch(function (err) {
    alert("Impossible de charger les produits");
    console.log(err);
  });
