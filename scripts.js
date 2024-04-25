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

//Add number of items to cart and add cart entry
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
//create an entry for the cart
let cartEntries = [];
//Array for storing all the cart entries
const addToCart = (quantity) => {
    //Create new cart entry obj with ID matched to length of array and
    if (quantity > 0) {
        //cartEntries.push(new cartEntry(cartEntries.length, quantity))
        new cartEntry(0, quantity);

    }
}

//Creating a separate object for each product in cart
class cartEntry {
    //default constructor
    //Creates all necessary elements for a cart entry.
    constructor(entryNumber, numItems){
        //TODO THIS DOESNT WORK
        this.entryNum = entryNumber.toString;
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
        this.populateElements(numItems);
        this.appendEntry();
    }

    //Add corresponding style classes to all the elements
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
        //Appends all the elements in the branch, outwards
        this.priceContentDiv.append(this.price, this.quantity, this.finalPrice);
        this.textContainer.append(this.productTitle,this.priceContentDiv);
        this.container.append(this.productThumbnail, this.textContainer, this.deleteButton);
    }
    //Add text/image content to elements
    populateElements(numItems){
        this.productThumbnail.setAttribute("src", "./assets/images/image-product-1-thumbnail.jpg");
        this.productTitle.textContent = DBProductEntry.productName;
        this.price.textContent = DBProductEntry.calcFinalPrice;
        this.quantity.textContent = numItems;
        this.finalPrice.textContent = (DBProductEntry.calcFinalPrice * parseInt(numItems));
        this.deleteButton.setAttribute("src", "./assets/images/icon-delete.svg");
    }
// 
    //Push to DOM
    appendEntry(){
        cartList.appendChild(this.container);
    }
    //Delete this Entry from the list
    deleteEntry(){
        console.log("Delete Entry");
        //cartEntries.splice(entryNumber, 1);
        //Delete DOM branch
        cartList.removeChild(this.container);
        //Refresh cart check
        checkCartEmpty();
        document.querySelector("button.shop-menu-btn").focus();


    }
}

//Database Entry in place of a server
const DBProductEntry = {
    productID:1,
    brandName:"Sneaker Company",
    productName:"Fall Limited Edition Sneakers",
    price:250.00,
    discount:0.5,
    calcFinalPrice:125.00,
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer."
}

//MEDIA QUERIES
let checkUserDesktop = window.matchMedia("(min-width: 767px)").matches;
//LIGHTBOX CODE

let slideIndex = 1;
showSlide(slideIndex);
//Assign an event handler to main image and each thumbnail
document.querySelectorAll('.thumbnail').forEach((el) => {
    addEventListener('click', (e) => onClickLightbox(e));
});
//Add listener to 
document.querySelector('.main-image').addEventListener('click', (e) => onClickLightbox(e));

//handle onClick
const onClickLightbox = (e){
    //Open Lightbox (only if on Desktop)
    if (checkUserDesktop) {
    openLightbox;
    //Determine which frame was clicked on
    //Shift to that frame
    }
}


//Open the Lightbox
const openLightbox = () => {
        document.getElementById("lightbox").style.display = 'block';
}
// Close lightbox
const closeLightbox = () => {
    document.getElementById("lightbox").style.display = 'none';
}

//change slide
const changeSlide = (n) => {
    showSlide(slideIndex += n);
}

//Assign slide (when initially clicking on it)
const toSlide = (n) => {
    showSlide(slideIndex = n);
}

//Lightbox logic
const showSlide = (n) => {
    const slides = document.getElementsByClassName('slide');
}

//If user clicks anywhere except on the Modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      closeLightbox();
    }
  }