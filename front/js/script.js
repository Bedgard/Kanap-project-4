"use strict";

// récupération des données de l'API
function getData() {

    return fetch("http://localhost:3000/api/products") // la fonction getData() va nous retourner les elements de l'API. Il faudra donc la stocker dans une autre fonction ou l'appeler pour l'utiliser

        .then(res => res.json())
        .catch(() => alert("Désolé, revenez plus tard...")) // catch permet la gestion de l'erreur 
}

getData();

//intégration des données de l'API
function getSofa(sofas) {

    const section = document.getElementById("items");

    for (let sofa of sofas) {
        const a = document.createElement('a');
        a.href = "./product.html?id=" + sofa._id;

        const article = document.createElement("article");

        const image = document.createElement("img");
        image.src = sofa.imageUrl;
        image.alt = sofa.altTxt;

        const h3 = document.createElement("h3");
        h3.classList.add("productName");
        h3.innerText = sofa.name;

        const paragraphe = document.createElement("p");
        paragraphe.classList.add("productDescription");
        paragraphe.innerText = sofa.description;

        article.appendChild(image);
        article.appendChild(h3);
        article.appendChild(paragraphe)
        a.appendChild(article);

        section.appendChild(a);

    }
}

//affichage des produits sur la page d'accueil
async function getProducts() { // fonction asynchone qui est une fonction qui est appellée plus tard et qui attend la réponse de GetData() (les donnees de l'API)
    const sofas = await getData();
    getSofa(sofas)
}

getProducts(); // appel de Get Product qui stocke à la fois les éléments de l'API et qui dont injecte ces elements dans le DOM avec getsofa(); Ils sont réunis dans la même portée


