window.onload = function () {
  const order = JSON.parse(localStorage.getItem("lastOrder"));
  if (!order) {
    document.getElementById("order-summary").innerHTML = "<p>No recent order found.</p>";
    return;
  }
  document.getElementById("order-name").textContent = order.name;
  document.getElementById("order-address").textContent = order.address;
  document.getElementById("order-payment").textContent =
    order.payment === "cod" ? "Cash on Delivery" : "Credit/Debit Card";
  const summaryContainer = document.getElementById("order-summary");
  let total = 0;
  order.cart.forEach(item => {
    total += item.price * item.quantity;
    const card = document.createElement("div");
    card.classList.add("food-card");
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>₹${item.price} x ${item.quantity}</p>
    `;
    summaryContainer.appendChild(card);
  });
  document.getElementById("order-total").textContent = total;
};
