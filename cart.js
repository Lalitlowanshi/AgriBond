// cart.js

export const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateCartDisplay = () => {
    const cartItems = document.getElementById("cart-items");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTax = document.getElementById("cart-tax");
    const cartTotal = document.getElementById("cart-total");
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;

    cartItems.innerHTML = "";

    if (storedCart.length === 0) {
        cartItems.innerHTML = "<li>No items in the cart.</li>";
    } else {
        storedCart.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItems.appendChild(listItem);
            subtotal += item.price * item.quantity;
        });
    }

    const tax = subtotal * 0.1;
    const total = subtotal + tax + 5;

    cartSubtotal.textContent = subtotal.toFixed(2);
    cartTax.textContent = tax.toFixed(2);
    cartTotal.textContent = total.toFixed(2);
};
