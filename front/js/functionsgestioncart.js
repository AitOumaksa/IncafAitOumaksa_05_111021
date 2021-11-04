
/**
 * Ajout des produits dans le panier
 * @param {object} canapeToAddToCartInfo 
 */
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

/**
 * récupère dans localStorage la valeur de la clé  nommé 'cart' (panier), et retourne son équivalent en tableau objet javascript
 * @return { Array | Object} 
 */

function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        return [];
    }
    else {
        return JSON.parse(cart);
    }
}

/**
 * Converti un tableau d'objets javascript en format JSON et l'ajoute au localStorage comme valeur de la clé nommée 'cart'
 * @param {Object} cart Tableau d'objets JS représentant le panier 
 */

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Recherche un produit dans un tableau d'objets JS représentant le panier et retourne son Index
 * @param {Object} cart Tableau d'objets JS représentant le panier 
 * @return {Integer | null} find 
 */
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

/**
 *  Calcule la quantité total des produits dans tableau d'objets JS représentant le panier 
 * @param {Object} cart Tableau d'objets JS représentant le panier 
 * @return {Integer} totalQuantity
 */
function calculTotalQuantity(cart)
{ 
    let totalQuantity =0;
    for (let jsonCartCanape of cart) {
        totalQuantity += parseInt(jsonCartCanape.quantity);
    }

    return totalQuantity;
}

/**
 * Calcule le prix total des produits dans tableau d'objets JS représentant le panier 
 * @param {Object} cart Tableau d'objets JS représentant le panier 
 * @return {Float} totalPrice 
 */

function calculTotalPrice(cart)
{ 
    let totalPrice=0;
    for (let jsonCartCanape of cart) {
        totalPrice += parseInt(jsonCartCanape.quantity)*parseInt(jsonCartCanape.price);
    }
    return totalPrice;
}

/**
 *  MAJ de la Quantité d'un produit dans le panier
 * @param {Object} cart Tableau d'objets JS représentant le panier 
 * @param {String} canapeId 
 * @param {String} canapeColor 
 * @param {Integer} quantity quantité à ajouter 
 */

function updateCartCanapeQuantity(cart,canapeId,canapeColor,quantity)
{
    let findCanape = checkCartIdColor(cart,canapeId,canapeColor);
    cart[findCanape].quantity = parseInt(quantity); 
    saveCart(cart); 
}

/**
 * supression d'un produit dans un tableau d'objets JS représentant la panier à partir de sont Id et sont couleur
 * @param {Object} cart Tableau d'objets JS représentant le panier
 * @param {String} canapeId
 * @param {String} canapeColor
 */

function deleteCartCanape(cart,canapeId,canapeColor)
{   
    let findCanape = checkCartIdColor(cart,canapeId,canapeColor);
    cart.splice(findCanape,1)
    saveCart(cart); 
}
