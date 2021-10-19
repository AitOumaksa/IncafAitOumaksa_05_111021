function updateQuantityPriceHtml(totalQuantity, totalPrice) {
    document.getElementById('totalQuantity').innerHTML = totalQuantity;
    document.getElementById('totalPrice').innerHTML = totalPrice;
  }
  
  function validlastName(inputlastName) {
  
    let lastName = new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$", 'g');
  
    let p = inputlastName.nextElementSibling;
  
    if (lastName.test(inputlastName.value)) {
      p.innerHTML = ''
    }
    else {
      p.innerHTML = 'Nom Non Valide'
    }
  };
  
  
  function validfirstName(inputfirstName) {
  
    let firstName = new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$", 'g');
    let p = inputfirstName.nextElementSibling;
  
    if (firstName.test(inputfirstName.value)) {
      p.innerHTML = ''
    }
    else {
      p.innerHTML = 'Prénom Non Valide'
    }
  
  };
  
  const validaddress = function (inputaddress) {
  
    let address = new RegExp("[A-Za-z0-9'\.\-\s\,]$", 'g');
  
    let p = inputaddress.nextElementSibling;
  
    if (address.test(inputaddress.value)) {
      p.innerHTML = ''
    }
    else {
      p.innerHTML = 'Address Non Valide'
    }
  
  };
  
  function validcity(inputcity) {
  
    let city = new RegExp("^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$", 'g');
  
    let p = inputcity.nextElementSibling;
  
    if (city.test(inputcity.value)) {
      p.innerHTML = ''
    }
    else {
      p.innerHTML = 'Ville Non Valide'
    }
  };
  
  /*const validEmail = function(inputemail) {
  
     let email = new RegExp("^[\w.+-]+@[a-zA-Z0-9-]+\.[\w-.]+$", 'g');
  
   let p = inputemail.nextElementSibling;
  
   if(email.test(inputemail.value)){
    p.innerHTML = ''
   }
   else{
     p.innerHTML ='Email Non Valide'
   }
    
  };
  
  */
  
  function validEmail(inputEmailElement) {
  
    if (!inputEmailElement.checkValidity()) {
      inputEmailElement.nextElementSibling.innerHTML = inputEmailElement.validationMessage;
    }
    else {
      inputEmailElement.nextElementSibling.innerHTML = '';
    }
  }
  
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
  
  function createArrayProductID(cart) {
    let ArrayProductID = [];
    for (let jsonCartCanape of cart) {
      ArrayProductID.push(jsonCartCanape.id);
    }
    return ArrayProductID;
  }
  