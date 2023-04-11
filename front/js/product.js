'use strict';
//variables globales - global scop 
let sofa;
const selectColor = document.getElementById("colors");
let take_Id;

// Obtenir l'id 
const url_id = window.location.href; // On parle ici du BOM, l'objet window est l'objet global auquel on ajoute location.href pour récupérer L'URL
const url = new URL(url_id);
const search_params = new URLSearchParams(url.search);
if (search_params.has("id")) {
  take_Id = search_params.get("id"); // obtention de take_Id dans la portée locale - function scope - Si on l'avait seulement défini dans un scope de block on n'aurait pas pu l'utiliser à l'extérieur du scope
}

// ciblage du produit en fonction de l'id selectionné
function getDatas() {
  return fetch(`http://localhost:3000/api/products/${take_Id}`)
    .then(res => res.json()) //reponse au format Json
    .catch(() => alert("Désole, il y a une erreur dans l'affichage du produit.")) // error du serveur
}

// à partir de la fonction GetData() stocké dans sofa on ajoute et crée les éléments du DOM afin d'insérer la donnée sélectionné grâce à GetData()
function getProducts() {
  const divImg = document.getElementsByClassName("item__img")[0];
  let img = document.createElement("img");
  img.src = sofa.imageUrl; // insertion des données : on avait une variable globale let sofa qu'on a reaffecté en local et qui contient les éléments de GetData(), soit les données de l'API renseignés
  img.alt = sofa.altTxt;
  divImg.appendChild(img);

  let title = document.getElementById("title");
  title.textContent = sofa.name;

  let price = document.getElementById("price");
  price.textContent = sofa.price;

  let description = document.getElementById("description");
  description.textContent = sofa.description;

  // récupérer les couleurs de l'API
  for (const color of sofa.colors) {
    let value = document.createElement("option");
    value.option = color;
    selectColor.appendChild(value);
    selectColor.lastElementChild.innerHTML = color; // pourquoi InnerHTML et pas TextContent ?
  }
}

// afficher les produits dans la page produit
async function displayProducts() {
  sofa = await getDatas(); // attente des données de l'API : cela signifie ici que ma variable sofa qui était dans la portée globale contient localement à présent les éléments de getData(), soit le canapé sélectionné
  getProducts();  // les éléments selectionnés à partir du DOM
}

displayProducts(); // affichage du produit

// selection des donnees  
let addToCart = document.getElementById("addToCart");
let color = document.getElementById("colors"); // redondant ? Je l'ai déjà défini dans la portée globale plus : serait-il plus intelligent de mettre la selection des données en haut pour tout regrouper dans la portée globala ?
let quantity = document.getElementById("quantity");


function array() {
  let clePanier = "panier";
  let cart = JSON.parse(localStorage.getItem(clePanier)) // créer le panier mais celui est pour l'instant vide
  console.log(cart); //obtenir les éléments du panier

  // creation du panier qui va contenir à la fois l'id, la couleur, et la quantité
  const sofaToAdd = {
    id: take_Id,
    couleur: color.value,
    quantite: parseInt(quantity.value), // transformer un string en number avec ParseInt ; on aurait pu utiliser aussi Number();
  }
  // gestion des cas possibles dans l'ajout d'une élément au panier

  //  1 - le panier est vide ( le premier if )
  // 2 - on ajoute un element panier qui ne correspond pas à celui ajoute et dans ce cas on ajoute sofaToAddd (else et if )
  //  3 - on incremente une quantite d'un element identique (else)

  if (cart === null) {  // si local storage est vide, ajout du panier
    cart = [sofaToAdd];
  }
  else {
    let sofa = cart.find((sofa) => sofa.couleur === sofaToAdd.couleur && sofa.id === sofaToAdd.id)
    if (sofa === undefined) { // si le nouveau produit ajouté n'a ni le même id ni la même couleur alors on peut ajouter le nouveau produit à partir de l'objet sofaToadd 
      cart.push(sofaToAdd); // il s'agit d'ajouter les éléments du panier 
    }
    else {
      sofa.quantite += sofaToAdd.quantite; // ou bien si le produit ajouté a le même id et la même couleur, on incrémentera alors la nouvelle quantité
    }
  }

  localStorage.setItem(clePanier, JSON.stringify(cart)) // Il s'agit de deux choses : envoyer au format JSON le panier 
  return cart // nous avons une fonction qui retourne un résultat à savoir le processus final qui va contenir notre ou nos éléments du panier
}

// selection des donnees
function selectDatas() {

  if (color.value == null || color.value == '') { // si la couleur est null ou si la couleur est vide

    alert("Choose a color");
  }

  else if (quantity.value == null || quantity.value == 0 || quantity.value > 100) { // ou bien si la valeur est null ou égale à 0 ou supérieure à 100
    alert("choose a quantity between 1 and 100");
  }
  else {
    let storage = array(); // on récupérer le résultat retourné fonction array que l'on stocke dans une variable pour qu'elle soit exploitable sinon cette dernière n'est exploitée
    console.log(storage);
    alert("Your(s) product(s) has been added to the card")
  }
}

// l'evenement click 
addToCart.addEventListener("click", selectDatas) // il s'agit ici d'une fonction asynchrone à savoir que la fonction SelectData ne se déclenchera qu'au click sur "ajouter au panier"















