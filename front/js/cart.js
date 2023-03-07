"use strict"

// 1- récupérer les datas du local Storage

function datasFromStorage() {
    for( let i = 0; i < localStorage.length; i++){
        console.log(localStorage.getItem("panier"))
}
}

datasFromStorage();

// selection de la section
let section = document.getElementById("cart__items");
console.log(section);

//creation de article
let createArticle = document.createElement("article");
createArticle.className = "cart__item";
createArticle.setAttribute("data-id","{product-ID}");
createArticle.setAttribute("data-color","product-color")

//ajout de article a la section
section.append(createArticle);

//selectionner l'article crée
let selectArticle = document.querySelector(".cart__item");

//ajout de la div cart__item__img
let cartItemImg = document.createElement("div");
cartItemImg.className = "cart__item__img";
selectArticle.appendChild(cartItemImg);

//selection de cart__item__img
let selectDiv = document.querySelector(".cart__item__img");

//creation de l'image dans la div cart__item__img
let img = document.createElement("img");
img.src = '';
img.alt = "Photographie d'un canapé";

//ajout de l'image à la div cart__item__img
selectDiv.appendChild(img);
console.log(img)

//creation de la div cart__item__content
let divCartItemContent = document.createElement("div");
divCartItemContent.className = "cart__item__content";

//ajout de cart__item__content
selectArticle.append(divCartItemContent);
console.log(divCartItemContent);

//creation de la div cart__item__content__description
let cartItemContentDescription = document.createElement("div");
cartItemContentDescription.className = "cart__item__content__description";

let h2 = document.createElement("h2");
h2.textContent ="Nom du produit";
console.log(h2)

let pColor = document.createElement("p");
pColor.textContent = "Vert";
console.log(pColor)

let pPrice = document.createElement("p");
pPrice.textContent = "42 Euros";
console.log(pPrice)

//ajout de cart__item__content__settings
let cartItemContentSettings = document.createElement("div");
cartItemContentSettings.className ="cart__item__content__settings";
console.log(cartItemContentSettings);


//ajout de cartItemContent et cartItem Settings à divCartItemContent
cartItemContentDescription.append(h2,pColor,pPrice);
divCartItemContent.append(cartItemContentDescription,cartItemContentSettings);
console.log(cartItemContentDescription);
console.log(divCartItemContent);


// ajout de la div cart__item__content__settings__quantity

let cartItemContentSettingsQuantity = document.createElement("div");
console.log(cartItemContentSettingsQuantity)
let paragraphQuantite = document.createElement("p");
paragraphQuantite.textContent = "Qté :";


// creation de l'input 

let input = document.createElement("input");
input.setAttribute("type", "number");
input.setAttribute("class", "itemQuantity");
input.setAttribute("name", "itemQuantity");
input.setAttribute("min", "1");
input.setAttribute("max", "100");
input.setAttribute("value", 42);

//creation de la div cartItemContentSetttingsQuantity
let cartItemContentSettingsDelete = document.createElement("div");
cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
console.log(cartItemContentSettingsDelete);

let pDelete = document.createElement("p");
pDelete.className = "deleteItem";
pDelete.textContent = "Supprimer";
cartItemContentSettingsDelete.append(pDelete);
console.log(pDelete)

cartItemContentSettings.append(cartItemContentSettingsQuantity,cartItemContentSettingsDelete);
cartItemContentSettingsQuantity.append(paragraphQuantite, input);
















// 2- parcourir les éléments du localStorage avec une boucle for



// 3-creer les elements necessaires dans le DOM 



// 4-inserer les datas du local Storage dans le DOM 

