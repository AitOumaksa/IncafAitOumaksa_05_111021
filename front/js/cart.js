
// Récupération du pannier
let cart = getCart();

// affichage du panier sur la page HTML
for (let jsonCartCanape of cart) {

  document.getElementById('cart__items').innerHTML += `<article class="cart__item" data-color="${jsonCartCanape.color}" data-id="${jsonCartCanape.id}">
    <div class="cart__item__img">
      <img src="${jsonCartCanape.imageUrl}" alt="${jsonCartCanape.altTxt}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${jsonCartCanape.name}(${jsonCartCanape.color})</h2>
        <p>${jsonCartCanape.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${jsonCartCanape.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
}
//Affichage de la quantité et du prix total du panier sur la page HTML
updateQuantityPriceHtml(calculTotalQuantity(cart), calculTotalPrice(cart));

// Mise à jour en cas de la modification de la quantité commandée par article
document.querySelectorAll('.itemQuantity').forEach(element => {
  element.addEventListener('change', function (event) {
    event.stopPropagation();
    event.preventDefault();
    updateCartCanapeQuantity(cart, this.closest(".cart__item").dataset.id, this.closest(".cart__item").dataset.color, this.value);
    updateQuantityPriceHtml(calculTotalQuantity(cart), calculTotalPrice(cart));
  });
});

// Suppression d'un article lorsqu'on clic sur "supprimer"
document.querySelectorAll('.deleteItem').forEach(element => {
  element.addEventListener('click', function (event) {
    event.stopPropagation();
    event.preventDefault();
    deleteCartCanape(cart,this.closest(".cart__item").dataset.id, this.closest(".cart__item").dataset.color);
    this.closest("#cart__items").removeChild(this.closest(".cart__item"));
    updateQuantityPriceHtml(calculTotalQuantity(cart), calculTotalPrice(cart));
  });

});


//Validation de formulaire
let form = document.querySelector('.cart__order__form');

//Validation de champ First name en cas de changement
form.firstName.addEventListener('change', function () {
  validfirstName(this);
});

//Validation de champ last name en cas de changement
form.lastName.addEventListener('change', function () {
  validlastName(this);
});

//Validation de champ Adress en cas de changement
form.address.addEventListener('change', function () {
  validaddress(this);
});

//Validation de champ city en cas de changement
form.city.addEventListener('change', function () {
  validcity(this);
});



//Validation de champ Email en cas de changement
form.email.addEventListener('change', function (event) {
  event.stopPropagation();
  event.preventDefault();
  validEmail(this);
});

document.querySelector('.cart__order__form').addEventListener('submit', function (event) {
  event.stopPropagation();
  event.preventDefault();
  if (getCart() != '') {
    if (validfirstName(form.firstName) && validlastName(form.lastName) && validaddress(form.address) && validcity(form.city) && validEmail(form.email)) {
      contact = createContactObject(form);
      products = createArrayProductID(cart);
      console.log(JSON.stringify({
        contact: createContactObject(form), products: createArrayProductID(cart)
      }));
      // Envoyer la requéte HTTP poste pour la validation de la commende et recevoire le l'Id de la commande
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contact: createContactObject(form), products: createArrayProductID(cart)
        })
      })
        //Récuperer la promess dans la variable res et retourne le body de res (text Json) converti en objet JS 
        .then(function (res) {
          if (res.ok) {
            //console.log(res);
            return res.json();
          }
        })
          //Récuperer l'objets JS et suprimer le panier dans le localStorage et faire une redirection vers la page cofirmation pour afficher L'id de la commande
        .then(function (jsonres) {
          //console.log(jsonres);
         localStorage.removeItem('cart');
          document.location.href = `./confirmation.html?orderId=${jsonres.orderId}`;
        })
        // Si il n'arrive pas à récuperer les promesses il va afficher le message d'erreur
        .catch(function (err) {
          alert("Impossible de passer la commande");
          console.log(err);
        })
    }
    else { alert('Veuillez vérifiez les infos du formulaire'); }
  }
  else {
    alert('Veuillez ajouter au moin un produit dans votre panier pour passer la commande');
  }

  
})



