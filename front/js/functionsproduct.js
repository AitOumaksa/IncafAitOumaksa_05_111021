
//crée l'objet javascript à rajouter dans le panier
function canapeToAddToCart() {
    const canapeToAddToCartInfo = {
        id : getUrlParamValue('id'),
        imageUrl : document.querySelector('.item__img img').getAttribute("src"),
        altTxt : document.querySelector('.item__img img').getAttribute("alt"),
        name : document.getElementById('title').innerHTML,
        price : document.getElementById('price').innerHTML,
        quantity : document.getElementById('quantity').value,
        color : document.getElementById('colors').value
    }
    return  canapeToAddToCartInfo;
}