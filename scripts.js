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

//Functionality for increasing number of items to add to cart
const minusBtn = document.querySelector("#minus-button");
const plusBtn = document.querySelector("#plus-button");
const currentOrderQuantity = document.getElementById("shop-quantity");

minusBtn.addEventListener("click", () => {
    //do not allow negative numbers
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
    addToCart(parseInt(currentOrderQuantity.textContent));
    //reset cart counter
    currentOrderQuantity.textContent = "0";
    //make the cart icon shake and open Cart TODO
    document.querySelector("button.shop-menu-btn").focus();
    animateCart();
});

const cartCheckoutBtnWrapper = document.querySelector(".cart-checkout-btn-wrapper");
const cartEmpty = document.querySelector(".cart-empty");
const cartList = document.getElementById("cart-list");

//Update cart entries whenever user opens or views the cart
const shopCart = document.querySelector("button.shop-menu-btn");
shopCart.addEventListener("focus", () =>{
    checkCartEmpty();
});
shopCart.addEventListener("mouseover", () =>{
    checkCartEmpty()
});

const checkCartEmpty = () => {
    console.log("checkcartEmpty");
    // if cart is empty and has the tag, remove hidden tag from 'cart empty' msg
    //and hide checkout button
    if (cartList.childElementCount == 0 && cartEmpty.classList.contains("hide")) {
        cartEmpty.classList.remove("hide");
        cartCheckoutBtnWrapper.classList.add("hide");
    } else if (cartList.childElementCount > 0 && !cartEmpty.classList.contains("hide")){
        //else unhide it
        cartEmpty.classList.add("hide");
        cartCheckoutBtnWrapper.classList.remove("hide");
    } else if (cartList.childElementCount == 0){
        cartCheckoutBtnWrapper.classList.add("hide");
    }
};

const animateCart = () => {
//TODO
}


const removeDollarSignAndMakeNumber = (input) => {
    //Convert to String (just in case)
    //This doesnt work in countries where currency sign is a suffix
    return parseFloat(input.substring(1));
}
//Add an entry to the cart
const addToCart = (quantity, itemNum) => {

}
//Map of Cart Entries and associated entry number to keep track of them
const cartEntries = new Map();

//Creating a separate object for each product in cart
class cartEntry {
    //default constructor
    //Creates all necessary elements for a cart entry.
    constructor(entry){
        //Set Entry number
        this.entryNumber = entry;
        //Create and store list tag
        this.container = document.createElement("li");
        //Create Product Thumbnail
        this.productThumbnail = document.createElement("img");
        //Create Cart Container
        this.textContainer = document.createElement("div");
        //Create Product title
        this.productTitle = document.createElement("div");
        // Create Div
        this.priceContentDiv = document.createElement("div");
        //create Price
        this.price = document.createElement("span");
        //create quantity Span
        this.quantity = document.createElement("span");
        //Create final price
        this.finalPrice = document.createElement("span");
        //create Delete Entry Button and add eventListener to it
        this.deleteButton = document.createElement("img");
        this.deleteButton.addEventListener('click', (e) => this.deleteEntry(e));
        //Call all the methods to initialize entry
        this.labelElements();
        this.appendElements();
        this.populateElements();
    }

    //Add style classes to all the elements
    labelElements(){
        this.container.classList.add('flex-container', 'cart-entry');
        this.productThumbnail.classList.add('cart-thumbnail');
        this.textContainer.classList.add('cart-text-container');
        this.productTitle.classList.add('cart-product-title')
        this.price.classList.add('item-price');
        this.quantity.classList.add('quantity');
        this.finalPrice.classList.add('cart-final-price');
        this.deleteButton.classList.add('cart-delete-btn');
    }
    //organize them before pushing to client screen
    appendElements(){
        //TODO: add all the elements in their respective posiitons in the tree
        //go inwards outwards
    }
    //Add text/image content to elements
    populateElements(){
        //TODO: Add the text content of the images
    }

    //Push to DOM
    appendEntry(){

    }
    //Delete Entry from the list
    deleteEntry(){

    }
}

//Database Entry in place of a server
const productObject = {
    productID:1,
    brandName:"Sneaker Company",
    productName:"Fall Limited Edition Sneakers",
    price:250.00,
    discount:0.5,
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer."
}
