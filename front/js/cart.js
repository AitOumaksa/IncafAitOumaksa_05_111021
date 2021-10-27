
// Récupération du pannier
let cart = getCart();

console.log(cart)
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
updateQuantityPriceHtml(calculTotalQuantity(cart), calculTotalPrice(cart));



// Mise à jour en cas de la modification de la quantité commandée par article
document.querySelectorAll('.itemQuantity').forEach(element => {
  element.addEventListener('change', function (event) {
    event.stopPropagation();
    event.preventDefault();
    updateCartCanapeQuantity(cart, this.closest(".cart__item").dataset.id, this.closest(".cart__item").dataset.color, this.value);
    updateQuantityPriceHtml(calculTotalQuantity(cart), calculTotalPrice(cart));
  });
  //console.log(updateCartCanapeQuantity)
 

});

// Suppression d'un article losqu'on clic sur "supprimer"
document.querySelectorAll('.deleteItem').forEach(element => {
  element.addEventListener('click', function (event) {
    event.stopPropagation();
    event.preventDefault();
    deleteCartCanape(this.closest(".cart__item").dataset.id, this.closest(".cart__item").dataset.color);
    this.closest("#cart__items").removeChild(this.closest(".cart__item"));
    updateQuantityPriceHtml(calculTotalQuantity(cart), calculTotalPrice(cart));
  });

});


//Validation de formulaire

let form = document.querySelector('.cart__order__form');
//écouter l'évenement de validation champ first name
form.firstName.addEventListener('change', function () {

  validfirstName(this);
});



//écouter l'évenement de validation champ last name
form.lastName.addEventListener('change', function () {

  validlastName(this);
});


//écouter l'evenement de validation champ address
form.address.addEventListener('change', function () {

  validaddress(this);
});



// écouter l'évenemn de validation champ city
form.city.addEventListener('change', function () {

  validcity(this);
});



// ecouter l'évenement de validation champ email
form.email.addEventListener('change', function (event) {
  event.stopPropagation();
  event.preventDefault();
  validEmail(this);
});


document.getElementById('order').addEventListener('click', function (event) {
  event.stopPropagation();
  event.preventDefault();
  contact = createContactObject(form);
  products = createArrayProductID(cart);
  console.log(products)
  // envoyer la requéte poste pour la validation de la commende et receoire le code de la confirmation
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({contact: createContactObject(form),products: createArrayProductID(cart)
    })

  })

    .then(function (res) {
      if (res.ok) {
        //console.log(res);
        return res.json();
      }
    })
    .then(function (jsonres) {
     //console.log(jsonres);
      // supression d'article de localStorge apres la cofirmation de la commande 
      localStorage.removeItem('cart');
      //recevoir le code confirmation localiser ou va s'afficher le code cofirm
      document.location.href=`./confirmation.html?orderId=${jsonres.orderId}`; 
    })
    .catch(function (err) {
      alert("Impossible de passer la commande");
      console.log(err);
    });
});

