'use strict';
//variables globales - global scop 
let sofa;
const selectColor = document.getElementById("colors");
let take_Id; 

// Obtenir l'id 
    const url_id = window.location.href;
    const url = new URL(url_id);
    const search_params = new URLSearchParams(url.search);
    if (search_params.has("id")) {
         take_Id = search_params.get("id"); // obtention de take_Id dans la portée locale - function scope -
    }

// récupération l'id 
function getDatas()
{
  return fetch(`http://localhost:3000/api/products/${take_Id}`)
  .then (res=> res.json()) //reponse au format Json
  .catch(()=> alert("Désole, il y a une  dans l'affierreurchage du produit.")) // error du serveur
}


//récupération des produits 

function getProducts()

{ 
const divImg = document.getElementsByClassName("item__img") [0];
let img = document.createElement("img");
img.src =  sofa.imageUrl;
img.alt = sofa.altTxt;
divImg.appendChild(img);


let title = document.getElementById("title");
title.textContent = sofa.name;


let price = document.getElementById("price");
price.textContent = sofa.price;


let description = document.getElementById("description");
description.textContent = sofa.description;

// récupérer les couleurs de l'API
for ( const color of sofa.colors) {
  let value = document.createElement("option");
  value.option = color;
  selectColor.appendChild(value);
  selectColor.lastElementChild.innerHTML = color;
}
}

// afficher les produits dans la page produit
async function displayProducts ()

{
  sofa = await getDatas(); // attente des données de l'API
  getProducts();  // les éléments selectionnés à partir du DOM
}

displayProducts(); // affichage du produit



// selection des donnees  
let addToCart = document.getElementById("addToCart");
let color = document.getElementById("colors"); 
let quantity = document.getElementById("quantity"); 

// creation du panier 

let cart = []; 

function array() {

  cart = [
    {     id : take_Id,
          couleur : color.value,
          quantite : parseInt(quantity.value),  // transformer un string en number
        }
  ];
 localStorage.setItem("produit", JSON.stringify(cart))
 return cart 
}



// ajout ou non du ou des produits 
function selectDatas() {

  if (color.value == null || color.value == '' )  { 
    alert("Choose a color or quantity");
  }
  
  else if (quantity.value == null || quantity.value == 0 || quantity.value > 100) 
  {
    alert("choose a quantity between 1 and 100");
  }
  else {
    alert("Your(s) product(s) has been added to the card")
 
  }
let storage= array();
console.log(storage);
}

// l'evenement click 
addToCart.addEventListener("click",selectDatas) 



// stockage des données dans le local Storage

// class Product {

//   _id =''
//   color = ''
//   quantity = 0

//   constructor (id,color,quantity) {
//       this.id = id;
//       this.color = color;
//       this.quantity = quantity
//   }
// }

// let clickCard = document.getElementById("addTocart");
// clickCard.addEventListener('click', clickOnCard); 

// let cart = [];
// function clickOnCard () {

// let quantity = Number(document.getElementById("quantity").value);


// if (quantity < 1 || quantity > 100) {
//   alert("Veuillez choisir une quantité entre 1 et 100");
//   document.getElementById.value = 1;
//   return 
// }

// const colorSelectValue = selectcolor.options[colorSelectValue.selectedIndex].value;

// if (!colorSelectValue) {
//   alert("choisissez une couleur parmi celles proposées")
//   return 
// }

// const product = new Product(take_id, colorSelectValue, quantity)
// const local = JSON.parse(localStorage.getIdem("cart"));

// if (local == null) {
//   cart.push(product)
//   alert("produit ajouté au panier")
// }

// else {
//   if (cart.length ==0)
//   cart = local
// }

// const indexOfFoundProduct = cart.findIndex(product=> product.id === take_id && product.color === colorSelectValue) 
//   if (indexOfFoundProduct >-1) {
//       cart [indexOfFoundProduct].quantity += quantity
//       alert("Quantité ajouté au panier")
//   }

// else {
// cart.push(product);
// alert("produit ajouté au panier")
// }
// }

// localStorage.setItem("cart", JSON.stringify(cart))


























