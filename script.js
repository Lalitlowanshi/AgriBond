document.addEventListener("DOMContentLoaded", () => {
    const cartBtn = document.getElementById("cart-btn");
    const cartSection = document.getElementById("cart");
    const checkoutSection = document.getElementById("checkout");

    // Importing cart operations from cart.js
    import { addToCart, updateCartDisplay } from "./cart.js";

    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (e) => {
            const productCard = e.target.closest(".product-card");
            const name = productCard.dataset.name;
            const price = parseFloat(productCard.dataset.price);
            const quantity = parseInt(productCard.querySelector(".quantity").textContent);

            addToCart({ name, price, quantity }); // Add item to cart
            updateCartDisplay(); // Update cart display
        });
    });

    const quantityButtons = document.querySelectorAll(".quantity-controls");
    quantityButtons.forEach((control) => {
        const quantity = control.querySelector(".quantity");
        const increase = control.querySelector(".increase-quantity");
        const decrease = control.querySelector(".decrease-quantity");

        increase.addEventListener("click", () => {
            quantity.textContent = parseInt(quantity.textContent) + 1;
        });

        decrease.addEventListener("click", () => {
            if (parseInt(quantity.textContent) > 1) {
                quantity.textContent = parseInt(quantity.textContent) - 1;
            }
        });
    });

    cartBtn.addEventListener("click", () => {
        cartSection.style.display = cartSection.style.display === "none" ? "block" : "none";
    });

    const checkoutBtn = document.getElementById("checkout-btn");
    checkoutBtn.addEventListener("click", () => {
        cartSection.style.display = "none";
        checkoutSection.style.display = "block";
    });

    const checkoutForm = document.getElementById("checkout-form");
    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Order confirmed! Thank you for shopping with us.");
        localStorage.removeItem("cart"); // Clear cart after checkout
        updateCartDisplay(); // Refresh cart display
        checkoutSection.style.display = "none";
    });
});
