//Envoyer requéte HTTP à L'api pour récupérer un produit avec son Id 
fetch(`http://localhost:3000/api/products/${getUrlParamValue('id')}`)
    //Récuperer la promess dans la variable res et retourne le body de res (text Json) converti en objet JS 
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    //Récupère l'objet javascript JSON correspondant à l'article sélectionné et l'afficher sur la page HTML
    .then(function (jsonCanape) {
        document.querySelector('.item__img').innerHTML = `<img src="${jsonCanape.imageUrl}" alt="${jsonCanape.altTxt}">`;
        document.getElementById('title').innerHTML = jsonCanape.name;
        document.getElementById('price').innerHTML = jsonCanape.price;
        document.getElementById('description').innerHTML = jsonCanape.description;
        for (let color of jsonCanape.colors) {
            document.getElementById('colors').innerHTML += `<option value="${color}">${color}</option>c`;
        }
        //écoute du boutton 'ajouter au panier' et ajout de l'article au panier en cas de clic
        document.getElementById('addToCart').addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();   
            let elt = document.getElementById('quantity');
            let canapeToAddToCartObj = canapeToAddToCart();
            if(elt.reportValidity() && elt.value != '' && canapeToAddToCartObj.color != '' ){
                AddToCart(canapeToAddToCartObj); 
            }
            else{
                if((!elt.reportValidity() || elt.value == '') && canapeToAddToCartObj.color == '' ){
                  alert('Veuillez choisir une quantité comprise entre 1 et 100 et une couleur ');
                }
                else{
                    if(!elt.reportValidity() || elt.value == ''){
                        alert('Veuillez choisir une quantité comprise entre 1 et 100');
                    }
                    else{
                           alert('Choisissez une couleur');
                    }
                }
            }
            
        });
    })
    // Si il n'arrive pas à récuperer les promesses il va afficher le message d'erreur
    .catch(function (err) {
        alert("Impossible de charger le produit");
        console.log(err);
    });





