//Ajout de l'objet dans le pannier
function AddToCart(canapeToAddToCartInfo) {
    let cart = getCart();
    let findCanape = checkCartIdColor(cart,canapeToAddToCartInfo.id,canapeToAddToCartInfo.color);
    if (findCanape == null) {
        cart.push(canapeToAddToCartInfo);
        saveCart(cart); 
        alert('Vous avez ajoutez ' +canapeToAddToCartInfo.quantity +' canapé  '+ canapeToAddToCartInfo.name +' '+canapeToAddToCartInfo.color+' '+'à votre panier' );
    }
    else {
        if(parseInt(cart[findCanape].quantity) + parseInt(canapeToAddToCartInfo.quantity) <= 100){ 
        cart[findCanape].quantity = parseInt(cart[findCanape].quantity) + parseInt(canapeToAddToCartInfo.quantity);
        saveCart(cart); 
        alert('Vous avez ajoutez ' +canapeToAddToCartInfo.quantity +' canapé  '+ canapeToAddToCartInfo.name +' '+canapeToAddToCartInfo.color+' '+'à votre panier' );
        }
        else{
            let canapCartMax = 100 - parseInt(cart[findCanape].quantity) ;
            alert('Vous avez '+ cart[findCanape].quantity + ' canapé ' +canapeToAddToCartInfo.name + ' '+canapeToAddToCartInfo.color +' dans votre panier et vous pouvez en rajouter au maximum ' +canapCartMax);
        }
    }
  
}
 //console.log(saveCart)

//récupère le contenu du panier nommé 'cart' qui est en format JSON et retourne son équivalent en objet javascript
function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        return [];
    }
    else {
        return JSON.parse(cart);
    }
}

//Converti un objet javascript en format JSON et l'ajoute au pannier nommé 'cart'
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}


//Vérifie si le canapé canapeToAddToCartInfo se trouve dans le tableau de canapé cart. Si roui retourne son indice dans  cart sinon retourne null
function checkCartIdColor(cart,canapeId,canapeColor) {
    let find = null;
    for (let jsonCartCanape of cart) {
        if (jsonCartCanape.id == canapeId && jsonCartCanape.color == canapeColor) {
            find = cart.indexOf(jsonCartCanape);
            break;
        }
    }
    return find;
}

// Calculer le total de la quantité 
function calculTotalQuantity(cart)
{ 
    let totalQuantity =0;
    for (let jsonCartCanape of cart) {
        totalQuantity += parseInt(jsonCartCanape.quantity);
    }

    return totalQuantity;
}
// Calculer le total de prix
function calculTotalPrice(cart)
{ 
    let totalPrice=0;
    for (let jsonCartCanape of cart) {
        totalPrice += parseInt(jsonCartCanape.quantity)*parseInt(jsonCartCanape.price);
    }
    return totalPrice;
}
// MAJ de la Quantité
function updateCartCanapeQuantity(cart,canapeId,canapeColor,quantity)
{
    let findCanape = checkCartIdColor(cart,canapeId,canapeColor);
    cart[findCanape].quantity = parseInt(quantity); 
    saveCart(cart); 
}
// supression d'article de panier
function deleteCartCanape(canapeId,canapeColor)
{
    let findCanape = checkCartIdColor(cart,canapeId,canapeColor);
    cart.splice(findCanape,1)
    saveCart(cart); 
}
