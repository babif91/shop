// 🛒 My cart button
const cartBtn = document.getElementById("btncart");
if (cartBtn) {
  cartBtn.onclick = () => {
    window.location.href = "mycart.html";
  };
}

// Reset only the beer quantities when coming back
window.addEventListener('pageshow', () => {
  // Reset all individual item quantities to 0
  document.querySelectorAll('.item-qty').forEach(input => {
    input.value = 0;
  });

  // ✅ Keep "Add All to Cart" button synced with actual cart data
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

  const addAllBtn = document.getElementById('add-all-to-cart');
  if (addAllBtn) {
    addAllBtn.textContent = `Add All to Cart 🛒 (${totalQty})`;
  }

  // Also update the My Cart button count
  updateCartCount();
});

// ↩️ Go back button
const backBtn = document.getElementById("btnback");
if (backBtn) {
  backBtn.onclick = () => {
    window.history.back();
  };
}

// Update the Add All button label based on visible item quantities
function updateAddAllButton() {
  const addAllBtn = document.getElementById('add-all-to-cart');
  if (!addAllBtn) return;
  let totalQty = 0;
  document.querySelectorAll('.item-qty').forEach(input => {
    totalQty += Number(input.value);
  });
  addAllBtn.textContent = `Add All to Cart 🛒 (${totalQty})`;
}

// ➕ / ➖ Quantity buttons
document.querySelectorAll(".qty-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.closest(".item").querySelector(".item-qty");
    let value = Number(input.value);

    if (btn.classList.contains("plus")) value++;
    if (btn.classList.contains("minus") && value > 0) value--; // allow 0

    input.value = value;
    updateAddAllButton();
  });
});

// Add All to Cart button
const addAllBtn = document.getElementById("add-all-to-cart");
if (addAllBtn) {
  addAllBtn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let anyAdded = false;

    document.querySelectorAll(".item").forEach(item => {
      const name = item.dataset.name;
      const price = Number(item.dataset.price);
      const qty = Number(item.querySelector(".item-qty").value);
      if (qty > 0) {
        anyAdded = true;
        const existing = cart.find(i => i.name === name);
        if (existing) {
          existing.qty += qty;
        } else {
          cart.push({ name, price, qty });
        }
        // reset input to 0 after adding
        item.querySelector(".item-qty").value = 0;
      }
    });

    if (anyAdded) {
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      // Redirect to My Cart
      window.location.href = "mycart.html";
    }
  });
}

// Update cart count on My Cart button
function updateCartCount() {
  const cartBtn = document.getElementById("btncart");
  if (cartBtn) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
    cartBtn.textContent = `View My Cart 🛒 (${totalQty})`;
  }
}

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
      div.textContent = `${item.name} - ${item.price}¥ x${item.qty}`;

      // Add a delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.onclick = () => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
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

// ✅ Confirm payment button with sound
const confirmBtn = document.getElementById("confirm-payment");
if (confirmBtn) {
  confirmBtn.onclick = () => {
    const audio = new Audio("happycheer.wav");
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);

    alert(`Payment confirmed!\nMethod: ${paymentMethod}\nTotal: ${total}¥`);

    localStorage.removeItem("cart");
    updateCartCount();

    // Play audio and redirect after it ends or fallback
    audio.play();
    audio.onended = () => {
      window.location.href = "index.html";
    };
    setTimeout(() => {
      window.location.href = "index.html";
    }, 4000);
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