
/**
 * Afficher le nombreet le prix total des produits dans le panier sur le page cart.html
 * @param {Integer} totalQuantity 
 * @param {Float} totalPrice 
 */
function updateQuantityPriceHtml(totalQuantity, totalPrice) {
    document.getElementById('totalQuantity').innerHTML = totalQuantity;
    document.getElementById('totalPrice').innerHTML = totalPrice;
  }
  
  /**
   * Validation champ last name et affichage d'un message d'erreur dans le prochaine élement HTMl
   * @param {HTMLElement} inputlastName 
   * @return {Boolean} retourne true quand c'est valider retourne false quand ce n'est pas valider
   */
  function validlastName(inputlastName) {
    let lastName = new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$", 'g');
    let p = inputlastName.nextElementSibling;  
    if (lastName.test(inputlastName.value)) {
      p.innerHTML = ''
      return true
    }
    else {
      p.innerHTML = 'Nom Non Valide'
      return false
    }
  };
  
  /**
   * Validation champ first name et affichage d'un message d'erreur dans le prochaine élement HTMl
   * @param {HTMLElement} inputfirstName 
   * @return {Boolean} retourne true quand c'est valider retourne false quand ce n'est pas valider 
   */
  function validfirstName(inputfirstName) {
    let firstName = new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$", 'g');
    let p = inputfirstName.nextElementSibling; 
    if (firstName.test(inputfirstName.value)) {
      p.innerHTML = ''
      return true
    }
    else {
      p.innerHTML = 'Prénom Non Valide';
      return false;
    }
  };
 
  /**
   * Validation champ Adress et affichage d'un message d'erreur dans le prochaine élement HTMl
   * @param {HTMLElement} inputaddress 
   * @return {Boolean} retourne true quand c'est valider retourne false quand ce n'est pas valider 
   */
  const validaddress = function (inputaddress) {
    let address = new RegExp("[A-Za-z0-9'\.\-\s\,]$", 'g');  
    let p = inputaddress.nextElementSibling;
    if (address.test(inputaddress.value)) {
      p.innerHTML = '';  
      return true
    }
    else {
      p.innerHTML = 'Address Non Valide';      
      return false
    }  
  };
  
  /**
   * Validation champ city et affichage d'un message d'erreur dans le prochaine élement HTMl
   * @param {HTMLElement} inputcity 
   * @return {Boolean} retourne true quand c'est valider retourne false quand ce n'est pas valider 
   */
  function validcity(inputcity) {
    let city = new RegExp("^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$", 'g');  
    let p = inputcity.nextElementSibling;
    if (city.test(inputcity.value)) {
      p.innerHTML = '';
      return true
    }
    else {
      p.innerHTML = 'Ville Non Valide';  
      return false
    }
  };
  
  /**
   * Validation de champ Email et affichage d'un message d'erreur dans le prochaine élement HTMl
   * @param {HTMLElement} inputEmailElement 
   * @return {Boolean} retourne true quand c'est valider retourne false quand ce n'est pas valider 
   */
  function validEmail(inputEmailElement) {
  
    if (inputEmailElement.reportValidity()) {
      inputEmailElement.nextElementSibling.innerHTML = '';
      return true
    }
    else {
      inputEmailElement.nextElementSibling.innerHTML = inputEmailElement.validationMessage;    
      return false
    }
  }

  /**
   * Crée l'objet de formulaire pour envoyer à l'Api
   * @param {Object} form 
   * @return {Object} contactObject
   */
  function createContactObject(form) {
    const contactObject = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value
    }
    return contactObject;
  }
  
  /**
   *  Crée un tableau d'Id pour envoyer à l'Api
   * @param {Array} cart 
   * @return {Array} ArrayProductID
   */
  function createArrayProductID(cart) {
    let ArrayProductID = [];
    for (let jsonCartCanape of cart) {
      ArrayProductID.push(jsonCartCanape.id);
    }
    return ArrayProductID;
  }