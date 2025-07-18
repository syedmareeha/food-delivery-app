function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const card = document.createElement("div");
    card.classList.add("food-card");
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>₹${item.price} x ${item.quantity}</p>
      <div>
        <button onclick="updateQuantity('${item.id}', 'decrease')">-</button>
        <button onclick="updateQuantity('${item.id}', 'increase')">+</button>
      </div>
      <button onclick="removeFromCart('${item.id}')">Remove</button>
    `;
    cartContainer.appendChild(card);
  });
  totalEl.textContent = total;
}
function updateQuantity(id, action) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(i => i.id === id);
  if (item) {
    if (action === 'increase') {
      item.quantity += 1;
    } else if (action === 'decrease' && item.quantity > 1) {
      item.quantity -= 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}
document.getElementById("checkout-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const payment = document.getElementById("payment").value;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const order = {
    name,
    address,
    payment,
    cart,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem("lastOrder", JSON.stringify(order));
  localStorage.removeItem("cart");
  window.location.href = "order-summary.html";
});
window.onload = loadCart;
window.onload = function () {
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const form = document.getElementById("checkout-form");

  if (!cartContainer || !totalEl || !form) {
    console.error("Required elements missing in cart.html");
    return;
  }

  loadCart();
};
