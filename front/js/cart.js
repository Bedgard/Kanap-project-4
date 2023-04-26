
"use strict"


let price = {}; //creation d'un objet vide qui va accueillir le prix : variable globale

function getCart() {
  let panier = JSON.parse(localStorage.getItem("panier"));// récupération des données du panier dans une fonction qui retourne un résultat 
  return panier // le mot clé return est utilisé ici pour retourner un résultat : dans notre cas, nous retournons ce qui est stocké dans la localStorage
}


const panier = getCart(); //stockage des données du localStorage dans une variable globale "panier" qui contient l'appel à la fonction 

if (panier !== null) {

  for (const article of panier) { // une boucle sur le ou les produits selectionnés de la variable panier (itération) soit GetCart qui correspond aux elements du localStorage

    fetch(`http://localhost:3000/api/products/${article.id}`) // grâce à l'id récupéré du localStorage stocké dans panier(getCart()), on peut cibler le produit correspondant pour récupérer les données du produit
      .then(res => res.json()) //reponse au format Json
      .then(detailsArticle => {
        price[article.id] = detailsArticle.price // tout d'abord, on ajoute une paire clé / valeur à notre objet "price" vide qui contient en clé l'id et en valeur le prix selectionné. De cette façon on peut donc assigner remplir le DOM 

        // création des elements du DOM    
        let section = document.getElementById("cart__items");

        let createArticle = document.createElement("article");
        createArticle.classList.add("cart__item");
        createArticle.setAttribute("data-id", article.id); // par exemple, il s'agit de récupérer la données fournie par l'API et détaillée par l'id correspondant au produit sélectionnée. Article.id = ( à l'id du panier soit l'élément contenu dans le storage)
        createArticle.setAttribute("data-color", article.couleur) // même cas ici 

        //ajout de la div cart__item__img
        let cartItemImg = document.createElement("div");
        cartItemImg.classList.add("cart__item__img");
        createArticle.appendChild(cartItemImg); // pourquoi avoir utilisé appendChild et pas append ? La différence est qu'appendChild permet de mieux cibler l'élément parent tandis que les append s'ajoute les uns à la suite des sautres comme un "after" alors que preprend est un "before"

        //creation de l'image dans la div cart__item__img
        let img = document.createElement("img");
        img.src = detailsArticle.imageUrl; // idem
        img.alt = detailsArticle.altTxt; // idem
        cartItemImg.append(img);

        let divCartItemContent = document.createElement("div");
        divCartItemContent.classList.add("cart__item__content"); // quelle est la différence entre classList.add et className ? et qu'est-ce que toggle ?

        //ajout de cart__item__content
        createArticle.append(divCartItemContent);

        //creation de la div cart__item__content__description
        let cartItemContentDescription = document.createElement("div");
        cartItemContentDescription.classList.add("cart__item__content__description");

        let h2 = document.createElement("h2");
        h2.textContent = detailsArticle.name;

        let pColor = document.createElement("p");
        pColor.textContent = article.couleur;

        let pPrice = document.createElement("p");
        pPrice.textContent = detailsArticle.price + " €";

        //creation de cart__Item__Content__Settings 
        cartItemContentDescription.append(h2, pColor, pPrice);

        let cartItemContentSettings = document.createElement("div");
        cartItemContentSettings.classList.add("cart__item__content__settings");

        //creation de Item Content Settings Quantity
        let cartItemContentSettingsQuantity = document.createElement("div");
        let paragraphQuantite = document.createElement("p");
        paragraphQuantite.textContent = "Qté :";

        //creation de l'input et des attributs 
        let input = document.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("class", "itemQuantity");
        input.setAttribute("name", "itemQuantity");
        input.setAttribute("min", "1");
        input.setAttribute("max", "100");
        input.setAttribute("value", article.quantite);
        input.addEventListener("change", updatePriceAndQuantity) // creation d'un evenement au changement de prix qui appelle la fonction callback "updatePriceAndQuantity"

        cartItemContentSettingsQuantity.append(paragraphQuantite, input)
        cartItemContentSettings.append(cartItemContentSettingsQuantity);

        //creation de cart__item__content__settings__delete
        let cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        let pDelete = document.createElement("p");
        pDelete.classList.add("deleteItem");
        pDelete.textContent = "Supprimer";
        cartItemContentSettingsDelete.append(pDelete);
        cartItemContentSettings.append(cartItemContentSettingsDelete);


        pDelete.addEventListener("click", toDelete) // ajouter un evenement à supprimer qui appelle la fonction callback "toDelete"

        divCartItemContent.append(cartItemContentDescription, cartItemContentSettings)

        // ajout de createArticle a la section cart__items
        section.append(createArticle);
        quantityTotal(); // appel de la fonction qui stocke le total
        priceTotal(); // appel de la fonction qui stocke le prix 
      }
      )
      //gestion de l'erreur
      .catch(() => alert("Désole, il y a une erreur dans l'affichage du produit."))
  }

}

// quantite totale
function quantityTotal() {
  let total = 0
  let totalQuantity = document.getElementById("totalQuantity")
  panier.forEach(totality => {
    total += totality.quantite
  }
  )
  totalQuantity.textContent = total
};

//prix total
function priceTotal() {
  let totalPrice = document.getElementById("totalPrice");
  let totalSofa = 0
  panier.forEach(sofa => {
    totalSofa += sofa.quantite * price[sofa.id]
  });
  totalPrice.textContent = totalSofa;
}

//augmenter le prix et la quantite
function updatePriceAndQuantity(e) {
  let inputQuantite = e.target // il s'agit de cibler l'élément du DOM sur l'événement 
  let article = inputQuantite.closest(".cart__item"); // il s'agit de remonter au parent de l'élément ciblé par l'événément 
  let itemToSearch = panier.find(item => item.id === article.dataset.id && article.dataset.color === item.couleur) // recupération des donnees du panier correspondants à l'ID et à la couleur
  let newQuantity = parseInt(inputQuantite.value);
  itemToSearch.quantite = newQuantity;
  quantityTotal();
  priceTotal();
  save(panier);
}

//supprimer le total et le prix
function toDelete(e) {
  let btnDelete = e.target; //cibler l'element de l'événément avec event (e)
  let article = btnDelete.closest(".cart__item");   // remonter à l'élément parent
  let itemToSearch = panier.find(item => item.id === article.dataset.id && article.dataset.color === item.couleur); // récupérer l'Id et la couleur
  itemToSearch.quantite = 0;
  article.remove(); // supprimer le produit
  quantityTotal(); // actualiser la quantité
  priceTotal(); // actualiser le prix

  //suppression des donnees du localStorage 
  let storageData = getCart();
  let DeleteToLocalStorage = storageData.findIndex(item => item.id === article.dataset.id && article.dataset.color === item.couleur)
  storageData.splice(DeleteToLocalStorage, 1); //suppresion de l'element 
  save(storageData); // renvoi du panier actualise
}

// sauvegarde des nouvelles données du panier
function save(panier) {
  const dataToSave = JSON.stringify(panier);
  localStorage.setItem("panier", dataToSave) // envoi de la quantite actualisee dans le localStorage
}

// le formulaire

//variable globale formulaire
const form = document.querySelector(".cart__order__form");
console.log(form);


function formIsNotValid(form) {
  let error = false;

  for (const [id, value] of form) {
    debugger
    if (value === "") {
      let errorMsg = document.getElementById(`${id}ErrorMsg`)
      errorMsg.textContent = "ceci est une erreur";
      error = true;
    }
  }
  return error
}

// validation du mail 
function EmailInvalid() {
  const mail = document.querySelector("#email").value;
  const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/; // introduction du regex pour valider le mail
  if (regex.test(mail) === false) {
    let emailError = document.getElementById("emailErrorMsg");
    emailError.textContent = "ceci est une erreur";
    return true
  }
  return false
}

// function order
function submitOrder(e) {
  e.preventDefault() // éviter que la page se rafraîchisse avec e.preventDefault();
  if (panier === "") {

    return alert("Please, select item to complete your order");     // traitement du cas au cas où aucun produit n'a été sélectionné
  }


  let formData = new FormData(form);

  if (formIsNotValid(formData)) { // traitement du cas où un des input n'est pas bon
    return
  }

  if (EmailInvalid()) { // traitement du cas où le mail n'est pas bon 
    return
  }

  else {
    const body = collectDataRequest(formData); // stockage des données de CollectDataRequest() dans la variable body
    fetch(`http://localhost:3000/api/products/order`,
      {
        method: "POST", // avec Fetch, il existe plusieurs méthodes. Get pour obtenir des données du serveur, et POST pour envoyer des données au serveur
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),     // stringifijer les éléments de DataRequest

      })
      .then((res) => res.json())
      .then((data) => {
        const orderId = data.orderId;
        console.log(orderId)
        window.location.href = "/html/confirmation.html" + "?orderId=" + orderId;
        return console.log(data)
      })


    alert("Your order has been dispatched") // message de confirmation pour alerter que la commande a été envoyée
  }
};

function collectDataRequest(formData) {

  const firstName = formData.get("firstName"); // selection des values du formulaire 
  const lastName = formData.get("lastName");
  const address = formData.get("address");
  const city = formData.get("city");
  const email = formData.get("email");

  const informations = {

    contact: {
      firstName: firstName, // insertion des values du formulaire dans l'objet informations
      lastName: lastName,
      address: address,
      city: city,
      email: email
    },
    products: getIdOfStorage() // appel de la fonction getIdOfStorage() qui récupère les produits correspondants sélectionnés dans le panier
  }
  return informations
}

function getIdOfStorage() {
  let array = [] // création d'un tableau vide
  for (const datas of panier) {
    array.push(datas.id); // insertion des éléments du panier selon l'id dans le tableau
  }
  return array // retourner le résultat du tableau à savoir les produits selectionnés du tableau 
}


//selection de l'événement 
let btnOrder = document.getElementById("order"); // selection du boutton
btnOrder.addEventListener("click", submitOrder); // événement qui se déclenche sur le boutton "commander" et qui appelle la fonction callback submitOrder



