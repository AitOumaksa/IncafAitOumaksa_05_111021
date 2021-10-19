
 fetch(`http://localhost:3000/api/products/${getUrlParamValue('id')}`)
    //transforme le résultat en objet javascript json si la réponse à un codes de statut compris entre 200 et 299
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    //récupère l'objet javascript JSON correspondant à l'article sélectionné
    .then(function (jsonCanape) {
        // console.log(jsonCanape);

        //insertion de l'objet sélection dans le code html
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
            AddToCart(canapeToAddToCart());
        });
    })
    .catch(function (err) {
        alert("Impossible de charger les produits");
        console.log(err);
    });





