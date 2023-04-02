
"use strict"

//creation d'un objet vide qui va accueillir le prix : variable globale
let price = {};

function getCart() {
  let panier = JSON.parse(localStorage.getItem("panier"));// récupération des données du panier 
  if (panier === null) {
    return null
  }

  let panierFinal = [];
  for (const sofa of panier) {
    let sofaExistant = panierFinal.find((sofaExistant) => sofaExistant.id === sofa.id && sofaExistant.couleur === sofa.couleur)
    if (sofaExistant === undefined) {
      panierFinal.push(sofa)
    }
    else {
      sofaExistant.quantite += sofa.quantite // si l'id et la couleur sont identique seule la quantité augmente
    }
  }
  return panierFinal
}

//stockage des données du panier dans une variable
const panier = getCart();
if (panier !== null) {

  for (const article of panier) {
    fetch(`http://localhost:3000/api/products/${article.id}`) // ciblage des données de l'API
      .then(res => res.json()) //reponse au format Json
      .then(detailsArticle => {
        price[article.id] = detailsArticle.price // ajout du prix à l'objet price

        // création des elements du DOM    
        let section = document.getElementById("cart__items");

        let createArticle = document.createElement("article");
        createArticle.classList.add("cart__item");
        createArticle.setAttribute("data-id", article.id);
        createArticle.setAttribute("data-color", article.couleur)

        //ajout de la div cart__item__img
        let cartItemImg = document.createElement("div");
        cartItemImg.classList.add("cart__item__img");
        createArticle.appendChild(cartItemImg);

        //creation de l'image dans la div cart__item__img
        let img = document.createElement("img");
        img.src = detailsArticle.imageUrl;
        img.alt = detailsArticle.altTxt;
        cartItemImg.append(img);

        let divCartItemContent = document.createElement("div");
        divCartItemContent.classList.add("cart__item__content");

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
        input.addEventListener("change", updatePriceAndQuantity) // creation d'un evenement au changement de prix


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

        // ajouter un evenement à supprimer
        pDelete.addEventListener("click", toDelete)

        divCartItemContent.append(cartItemContentDescription, cartItemContentSettings)
        // ajout de createArticle a la section cart__items
        section.append(createArticle);
        quantityTotal();
        priceTotal();
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
  let inputQuantite = e.target
  let article = inputQuantite.closest(".cart__item")
  let itemToSearch = panier.find(item => item.id === article.dataset.id && article.dataset.color === item.couleur) // recupération des donnees du panier correspondants à l'ID
  let newQuantity = parseInt(inputQuantite.value);
  itemToSearch.quantite = newQuantity;
  quantityTotal();
  priceTotal();
  save(panier);
}

//supprimer le total et le prix
function toDelete(e) {
  debugger
  let btnDelete = e.target; //cibler l'element avec event
  let article = btnDelete.closest(".cart__item");   // remonter à l'élément parent
  let itemToSearch = panier.find(item => item.id === article.dataset.id && article.dataset.color === item.couleur); // récupérer l'Id et la couleur
  console.log(itemToSearch)
  itemToSearch.quantite = 0;
  article.remove(); // supprimer le produit
  quantityTotal(); // actualiser la quantité
  priceTotal(); // actualiser le prix

  //suppression des donnees du localStorage 
  let storageData = JSON.parse(localStorage.getItem("panier"));
  console.log(storageData);
  let DeleteToLocalStorage = storageData.findIndex(item => item.id === article.dataset.id && article.dataset.color === item.couleur)
  console.log(DeleteToLocalStorage);
  storageData.splice(DeleteToLocalStorage, 1); //suppresion de l'element 
  localStorage.setItem('panier', JSON.stringify(storageData)); // renvoie du panier actualise
}

// sauvegarde des nouvelles données du panier
function save(panier) {
  const dataToSave = JSON.stringify(panier); // envoi de la quantite actualisee dans le localStorage
  localStorage.setItem("panier", dataToSave)
  console.log(dataToSave);
}

