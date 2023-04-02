"use strict";

// récupération des données de l'API
function getData() {
    return fetch("http://localhost:3000/api/products")

        .then(res => res.json())
        .catch(() => alert("Désolé, revenez plus tard..."))
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
        h3.className = "productName";
        h3.innerText = sofa.name;

        const paragraphe = document.createElement("p");
        paragraphe.className = "productDescription";
        paragraphe.innerText = sofa.description;

        article.appendChild(image);
        article.appendChild(h3);
        article.appendChild(paragraphe)

        section.appendChild(a);
        a.appendChild(article);

    }
}

//affichage des produits sur la page d'accueil

async function getProducts() {
    const sofas = await getData();
    getSofa(sofas)
}

getProducts();


