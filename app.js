// 🛒 My cart button
const cartBtn = document.getElementById("btncart");
if (cartBtn) {
  cartBtn.onclick = () => {
    window.location.href = "mycart.html";
  };
}

// ↩️ Go back button
const backBtn = document.getElementById("btnback");
if (backBtn) {
  backBtn.onclick = () => {
    window.history.back();
  };
}

// Update cart count function
function updateCartCount() {
  const cartBtn = document.getElementById("btncart");
  if (cartBtn) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBtn.textContent = `My Cart 🛒 (${totalQty})`;
  }
}

// Call once on page load
updateCartCount();

// ➕ / ➖ Quantity buttons
document.querySelectorAll(".qty-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.closest(".item").querySelector(".item-qty");
    let value = Number(input.value);

    if (btn.classList.contains("plus")) value++;
    if (btn.classList.contains("minus") && value > 0) value--; 

    input.value = value;
  });
});

// Add to Cart button
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".item");
    const name = item.dataset.name;
    const price = Number(item.dataset.price);
    const qty = Number(item.querySelector(".item-qty").value);

    if (qty === 0) return; // prevent adding zero

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ name, price, qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // Temporarily change emoji
    const original = btn.textContent;
    btn.textContent = "✔"; // show check mark
    setTimeout(() => {
      btn.textContent = original; // revert back
    }, 1000); // 1 second
  });
});

// 🛒 Show cart items on My Cart page
const myItemsDiv = document.getElementById("myitems");
if (myItemsDiv) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    myItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    let total = 0;

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.textContent = `${item.name} - ${item.price}¥ x ${item.qty}`;

      // Add a delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.onclick = () => {
        cart.splice(index, 1); // remove item
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload(); // refresh page
      };
      div.appendChild(deleteBtn);

      myItemsDiv.appendChild(div);

      total += Number(item.price) * item.qty;
    });

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("cart-total");
    totalDiv.innerHTML = `<strong>Total: ${total}¥</strong>`;
    myItemsDiv.appendChild(totalDiv);
  }
}

// ✅ Check out button
const checkOutBtn = document.getElementById("checkout");
if (checkOutBtn) {
  checkOutBtn.onclick = () => {
    window.location.href = "checkout.html";
  };
}

// 🧾 Show checkout items & total
const checkoutDiv = document.getElementById("checkout-items");
if (checkoutDiv) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    checkoutDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    let total = 0;
    cart.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("checkout-item");
      div.textContent = `${item.name} - ${item.price}¥ x${item.qty}`;
      checkoutDiv.appendChild(div);

      total += Number(item.price) * item.qty;
    });

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("checkout-total");
    totalDiv.innerHTML = `<strong>Total: ${total}¥</strong>`;
    checkoutDiv.appendChild(totalDiv);
  }
}

// ✅ Confirm payment button
const confirmBtn = document.getElementById("confirm-payment");
if (confirmBtn) {
  confirmBtn.onclick = () => {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);

    alert(`Payment confirmed!\nMethod: ${paymentMethod}\nTotal: ${total}¥`);

    // Clear cart
    localStorage.removeItem("cart");

    // Update cart count if user goes back
  function updateCartCount() {
  const cartBtn = document.getElementById("btncart");
  if (cartBtn) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0); // sum qty
    cartBtn.textContent = `My Cart 🛒 (${totalQty})`;
  }
}

    // Redirect to homepage
    window.location.href = "index.html";
  };
}

// 🍔 Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', () => {
  navLinks.classList.remove('show');
  overlay.classList.remove('show');
});
