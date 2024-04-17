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
    //move the number of items to cart
    addToCart(parseInt(currentOrderQuantity.textContent), itemNum);
    document.querySelector("button.shop-menu-btn").focus();
    //reset cart counter
    resetQuantity();
    //make the cart icon shake TODO
    animateCart();
});



const resetQuantity = () => {
    currentOrderQuantity.textContent = "0";
}

//Add an entry to the cart
// const addToCart = (quantity, itemNum) => {
//     //Create Element
//     createElement(quantity, itemNum));
//     populateCart(quantity);
// }

//Pass number of items and the product #
const populateCart = (numItems) => {

}

const createElement = (quantity, itemNum) => {

}
let cartEmpty = document.querySelector(".cart-empty");
const checkCartEmpty = () => {
    if (cartQuantity == 0 && cartEmpty.classList.contains("hide")) {
        cartEmpty.classList.toggle("hide");
    } else {
        
    }
}
const animateCart = () => {

}

//Creating a separate object for each product in cart
// class CartEntry {
//     //default constructor
//     constructor(product)
// }

// const products = {
//     id: 1,
//     cost: 200,
// }