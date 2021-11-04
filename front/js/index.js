//Envoyer requéte HTTP à L'api pour récupérer les produits
fetch("http://localhost:3000/api/products")
//Récuperer la promess dans la variable res et retourne le body de res (text Json) converti en tableau d'objets JS (liste des produits) 
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  //Récuperer le tableau d'objets JS (liste des produits)  et afficher sur la page HTML
  .then(function (jsonListCanape) {
    for (let jsonCanape of jsonListCanape) {
      document.getElementById("items").innerHTML += `<a href="./product.html?id=${jsonCanape._id}">
            <article>
              <img src="${jsonCanape.imageUrl}" alt="${jsonCanape.altTxt}">
              <h3 class="productName">${jsonCanape.name}</h3>
              <p class="productDescription">${jsonCanape.description}</p>
            </article>
          </a>`;
    }
  })
  // Si il n'arrive pas à récuperer les promesses il va afficher le message d'erreur
  .catch(function (err) {
    alert("Impossible de charger les produits");
    console.log(err);
  });
