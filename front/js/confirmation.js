
// variable globale
let orderId;

// récupération de l'Id
function takeOrderId() {
    const url_id = window.location.href; // recuperer de l'url
    const url = new URL(url_id);
    orderId = url.searchParams.get("orderId");
    return orderId;
}
// récupération de l'Id

let orderConfirmation = document.getElementById("orderId");
orderConfirmation.textContent = takeOrderId(); // injection de l'id dans le DOM