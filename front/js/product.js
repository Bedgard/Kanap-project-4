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
  .catch(()=> alert("Désole, il y a une erreur dans l'affichage du produit.")) // error du serveur
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


function array() {
  let clePanier = "panier";
let cart = JSON.parse(localStorage.getItem(clePanier))
console.log(cart); //obtenir les éléments du panier

// creation du panier 
const sofaToAdd = {
       id : take_Id,
    couleur : color.value,
    quantite : parseInt(quantity.value), // transformer un string en number
    price : sofa.price  
}

if (cart === null) {  // si local storage ne renvoie rien, ajout du panier
  cart = [sofaToAdd];
}
else { 
let sofa =  cart.find((sofa)=> sofa.couleur === sofaToAdd.couleur && sofa.id=== sofaToAdd.id)
 if (sofa === undefined) { // si aucune correspondance n'est trouvé ajout au panier du prouit
  cart.push(sofaToAdd);
 }
 else {
sofa.quantite+= sofaToAdd.quantite; // sinon simple modification de la quantité
 }
}
  
 localStorage.setItem(clePanier, JSON.stringify(cart)) // le local storage n'admet qu'un objet JSON
 return cart 
}

// selection des donnees
function selectDatas() {

  if (color.value == null || color.value == '')  { 

    alert("Choose a color or quantity");
  }
  
  else if (quantity.value == null || quantity.value == 0 || quantity.value > 100) 
  {
    alert("choose a quantity between 1 and 100");
  }
  else {

    let storage= array();
    console.log(storage);
    alert("Your(s) product(s) has been added to the card")
 
  }

}

// l'evenement click 
addToCart.addEventListener("click",selectDatas) 















