
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
        <h2>${jsonCartCanape.name}</h2>
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
//fuction validation champ prénom 
form.firstName.addEventListener('change', function () {

  validfirstName(this);
});



//fuction validation champ nom 
form.lastName.addEventListener('change', function () {

  validlastName(this);
});


//fuction validation champ address
form.address.addEventListener('change', function () {

  validaddress(this);
});



// fuction validation champ city
form.city.addEventListener('change', function () {

  validcity(this);
});



// fuction validation champ email
form.email.addEventListener('change', function (event) {
  event.stopPropagation();
  event.preventDefault();
  validEmail(this);
});


// validation de la commande
document.getElementById('order').addEventListener('click', function (event) {
  event.stopPropagation();
  event.preventDefault();
  contact = createContactObject(form);
  products = createArrayProductID(cart);
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
      localStorage.removeItem('cart');
      document.location.href=`./confirmation.html?orderId=${jsonres.orderId}`; 
    })
    .catch(function (err) {
      alert("Impossible de passer la commande");
      console.log(err);
    });
});

