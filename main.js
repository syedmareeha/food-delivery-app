function renderFoodItems(category, items) {
  const section = document.getElementById(`${category}-section`);
  items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("food-card");
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="addToCart('${item.id}', '${category}')">Add to Cart</button>
    `;
    section.appendChild(card);
  });
}
function addToCart(id, category) {
  const item = foodItems[category].find(food => food.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item.name} added to cart!`);
}
window.onload = () => {
  renderFoodItems("pizza", foodItems.pizza);
  renderFoodItems("burger", foodItems.burger);
  renderFoodItems("dessert", foodItems.dessert);
};
