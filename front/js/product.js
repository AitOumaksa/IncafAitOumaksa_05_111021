
 

fetch(`http://localhost:3000/api/products/${getUrlParamValue('id')}`)
    //transforme le résultat en objet javascript json si la réponse à un codes de statut compris entre 200 et 299
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    //récupère l'objet javascript JSON correspondant à l'article sélectionné
    .then(function (jsonCanape) {
        //console.log(jsonCanape);

        //insertion de l'objet sélection dans le code html
        document.querySelector('.item__img').innerHTML = `<img src="${jsonCanape.imageUrl}" alt="${jsonCanape.altTxt}">`;
        document.getElementById('title').innerHTML = jsonCanape.name;
        document.getElementById('price').innerHTML = jsonCanape.price;
        document.getElementById('description').innerHTML = jsonCanape.description;
        for (let color of jsonCanape.colors) {
            document.getElementById('colors').innerHTML += `<option value="${color}">${color}</option>c`;
            //console.log(color)
        }

        //écoute du boutton 'ajouter au panier' et ajout de l'article au panier en cas de clic
        document.getElementById('addToCart').addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            
            let elt = document.getElementById('quantity');
            let canapeToAddToCartObj = canapeToAddToCart();
            if(elt.reportValidity() && canapeToAddToCartObj.color != ''){
                AddToCart(canapeToAddToCartObj);
              
            }
            else{
                if(!elt.reportValidity() && canapeToAddToCartObj .color == ''){
                  alert('Veuillez choisir une quantité comprise entre 1 et 100 et une couleur ');
                }
                else{
                    if(!elt.reportValidity()){
                        alert('Veuillez choisir une quantité comprise entre 1 et 100');
                    }else{
                     alert('Choisissez une couleur');
                    }
                }
            }


            /*
            if(canapeToAddToCart().color != '' && canapeToAddToCart().quantity >0 && canapeToAddToCart().quantity <=100 ){
                AddToCart(canapeToAddToCart());
                alert('Vous avez ajoutez ' + canapeToAddToCart().quantity +' canapé' +' '+canapeToAddToCart().color+' '+'à votre panier' );
            }else{
                alert('Vous devez chousi une quantité et une couleur')
            }*/
            
        });
    })
    .catch(function (err) {
        alert("Impossible de charger les produits");
        console.log(err);
    });





