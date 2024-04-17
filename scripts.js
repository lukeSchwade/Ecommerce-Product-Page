// const openNavButton = document.querySelector("#open-nav-btn");
// const closeNavButton = document.querySelector("#close-nav-btn");
const sideNav = document.getElementById("side-nav-bar");

// openNavButton.addEventListener("click", () => {
//     openNav();
// });

// closeNavButton.addEventListener("click", () => {
//     closeNav();
// })

const closeNav = () => {
    sideNav.classList.add("hidden-nav");
}

const openNav = () => {
    sideNav.classList.remove("hidden-nav");
}


const minusBtn = document.querySelector("#minus-button");
const plusBtn = document.querySelector("#plus-button");

const currentOrderQuantity = document.getElementById("shop-quantity");

minusBtn.addEventListener("click", () => {
    //filter negative numbers
    let currentTotal = getCurrentTotal();
    if (currentTotal > 0) {
        updateQuantity (-1, currentTotal);
    }
});

plusBtn.addEventListener("click", () => {
    let currentTotal = getCurrentTotal();
    updateQuantity(1, currentTotal);
});
  
const updateQuantity = (input, currentTotal) => {
    let total = input + currentTotal;
    document.getElementById("shop-quantity").textContent = total.toString();
}
const getCurrentTotal = () => {
    return parseInt(currentOrderQuantity.textContent);

}
const addCartBtn = document.querySelector(".cart-btn");

addCartBtn.addEventListener("click", () => {
    //reset cart counter
    resetQuantity();
    //move the number of items to cart
    addToCart()
    //make the cart icon shake
    animateCart();
});

const resetQuantity = () => {
    currentOrderQuantity.textContent = "0";
}
const addToCart = () => {

}

const animateCart = () => {

}