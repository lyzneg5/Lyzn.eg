let cart = JSON.parse(localStorage.getItem("cart")) || [];
let paymentMethod = "Vodafone Cash";

/* =========================
   LOADER FIX (مهم جدًا)
========================= */
window.addEventListener("DOMContentLoaded", () => {
setTimeout(() => {
let loader = document.getElementById("loader");

if(loader){
loader.style.opacity = "0";
loader.style.transition = "0.5s";

setTimeout(()=>{
loader.style.display = "none";
},500);
}

}, 800);
});

/* =========================
   ADD TO CART
========================= */
function addToCart(name, price){
cart.push({name, price});
localStorage.setItem("cart", JSON.stringify(cart));
updateCount();
}

/* =========================
   UPDATE COUNT
========================= */
function updateCount(){
let el = document.getElementById("cartCount");
if(el){
el.innerText = cart.length;
}
}
updateCount();

/* =========================
   SLIDER
========================= */
let slider = document.getElementById("slider");

function scrollRight(){
slider.scrollLeft += 300;
}

function scrollLeft(){
slider.scrollLeft -= 300;
}

/* =========================
   RENDER CART
========================= */
function renderCart(){
let container = document.getElementById("cartItems");
if(!container) return;

let total = 0;
container.innerHTML = "";

cart.forEach(item=>{
container.innerHTML += `
<div style="
display:flex;
justify-content:space-between;
background:#1a1a1a;
margin:10px;
padding:10px;
border-radius:8px;">
<span>${item.name}</span>
<span>${item.price} EGP</span>
</div>
`;
total += item.price;
});

let totalEl = document.getElementById("total");
if(totalEl){
totalEl.innerText = "Total: " + total + " EGP";
}
}
renderCart();

/* =========================
   PAYMENT METHOD
========================= */
function setPayment(method){
paymentMethod = method;
alert("Payment selected: " + method);
}

/* =========================
   CHECKOUT (WHATSAPP)
========================= */
function checkout(){

if(cart.length === 0){
alert("Cart is empty");
return;
}

let msg = "🛒 Order:\n\n";
let total = 0;

cart.forEach(i=>{
msg += `- ${i.name} (${i.price} EGP)\n`;
total += i.price;
});

msg += "\nTotal: " + total;

msg += "\n\nPayment Method: " + paymentMethod;

msg += "\n\n💳 Payment Details:";
msg += "\nVodafone Cash: 01026133452";
msg += "\nInstaPay: 01026133452";

window.open(
"https://wa.me/201026133452?text=" + encodeURIComponent(msg),
"_blank"
);
}
