// تحميل السلة من localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   ADD TO CART
========================= */
function addToCart(name, price) {
cart.push({ name, price });
localStorage.setItem("cart", JSON.stringify(cart));
updateCartCount();
alert(name + " added to cart");
}

/* =========================
   CART COUNT
========================= */
function updateCartCount() {
let count = document.getElementById("cartCount");
if (count) {
count.innerText = cart.length;
}
}

/* =========================
   RENDER CART PAGE
========================= */
function renderCart() {
let container = document.getElementById("cartItems");
if (!container) return;

container.innerHTML = "";
let total = 0;

cart.forEach((item, index) => {
let div = document.createElement("div");
div.className = "item";

div.innerHTML = `
<span>${item.name}</span>
<span>${item.price} EGP</span>
`;

container.appendChild(div);
total += item.price;
});

document.getElementById("total").innerText =
"Total: " + total + " EGP";
}

/* =========================
   CHECKOUT (WHATSAPP)
========================= */
function checkout() {

if (cart.length === 0) {
alert("Cart is empty");
return;
}

let message = "Order:\n\n";
let total = 0;

cart.forEach(item => {
message += `- ${item.name} (${item.price} EGP)\n`;
total += item.price;
});

message += "\nTotal: " + total + " EGP";

message += "\n\nPayment Methods:";
message += "\nVodafone Cash: 01026133452";
message += "\nInstaPay: 01026133452";

window.open(
"https://wa.me/201026133452?text=" + encodeURIComponent(message),
"_blank"
);
}

/* =========================
   INIT
========================= */
updateCartCount();
renderCart();