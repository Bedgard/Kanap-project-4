"use strict"


// récupération des données du panier 
function getCart() {
let panier = JSON.parse(localStorage.getItem("panier"));
// console.log(panier);
let panierFinal = [];
for (const sofa of panier) {
let sofaExistant = panierFinal.find((sofaExistant)=> sofaExistant.id === sofa.id && sofaExistant.couleur === sofa.couleur)
if (sofaExistant === undefined) 
{
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


//parcourir des produits du panier et ciblage sur l'API
for (const article of panier) {
    console.log(article)
     fetch(`http://localhost:3000/api/products/${article.id}`) // ciblage des données de l'API
    .then (res=> res.json()) //reponse au format Json
    .then(detailsArticle=> { 
        // console.log(detailsArticle);
  
// création des elements du DOM       
let section = document.getElementById("cart__items");
// console.log(section);

let createArticle = document.createElement("article");
createArticle.classList.add("cart__item") ;
createArticle.setAttribute("data-id",article.id);
createArticle.setAttribute("data-color",article.couleur)

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
divCartItemContent.classList.add( "cart__item__content");

//ajout de cart__item__content
createArticle.append(divCartItemContent);
// console.log(divCartItemContent);

//creation de la div cart__item__content__description
let cartItemContentDescription = document.createElement("div");
cartItemContentDescription.classList.add("cart__item__content__description");

let h2 = document.createElement("h2");
h2.textContent = detailsArticle.name;
// console.log(h2)

let pColor = document.createElement("p");
pColor.textContent = article.couleur;
// console.log(pColor)

let pPrice = document.createElement("p");
pPrice.textContent = detailsArticle.price   + " €";
// console.log(pPrice)

//creation de cart__Item__Content__Settings 
cartItemContentDescription.append(h2, pColor, pPrice);

let cartItemContentSettings = document.createElement("div");
cartItemContentSettings.classList.add("cart__item__content__settings") ;
// console.log(cartItemContentSettings);

//creation de Item Content Settings Quantity
let cartItemContentSettingsQuantity = document.createElement("div");
// console.log(cartItemContentSettingsQuantity)
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


cartItemContentSettingsQuantity.append(paragraphQuantite, input)
cartItemContentSettings.append(cartItemContentSettingsQuantity);

//creation de cart__item__content__settings__delete
let cartItemContentSettingsDelete = document.createElement("div");
cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
// console.log(cartItemContentSettingsDelete);

let pDelete = document.createElement("p");
pDelete.classList.add("deleteItem");
pDelete.textContent = "Supprimer";
cartItemContentSettingsDelete.append(pDelete);
cartItemContentSettings.append(cartItemContentSettingsDelete);
// console.log(pDelete)

divCartItemContent.append(cartItemContentDescription, cartItemContentSettings)
// ajout de createArticle a la section cart__items
section.append(createArticle);
}
)
//gestion de l'erreur
.catch(()=> alert("Désole, il y a une erreur dans l'affichage du produit."))
}

// quantite totale
function quantityTotal() {
  let total = 0

  panier.forEach(totality => {
     total+= totality.quantite 
    let totalQuantity = document.getElementById("totalQuantity") 
      totalQuantity.textContent = total
   }  
  )
  return total
  };
quantityTotal();

//prix total
function priceTotal() {

  let total = quantityTotal();
  panier.forEach(totality => {
   let totalPrice = document.getElementById("totalPrice");
   totalPrice.textContent = total * totality.price
  });
  return total 
}
priceTotal();
  
// // modifier la quantite 
// let modifyQuantite = document.querySelector(".itemQuantity");
// console.log(modifyQuantite);
_
