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

//Create an object for each Lightbox (only one for now)
class Lightbox {
    constructor(el, lightboxEl){
        //store gallery container
        this.galleryWrapper = el;
        //store main Image
        this.mainImage = el.querySelector('.main-image');
        //Store Thumbnails nodelist
        this.thumbnails = el.querySelectorAll('.thumbnail');
        //store associated lightbox
        this.lightbox = lightboxEl;
        //store slides
        this.slides = lightboxEl.getElementsByClassName('slide');
        //store mini-previews
        this.modalPreviews = lightboxEl.querySelectorAll('.modal-preview');
        //Store open state and slideIndex
        this.slideIndex = 1;
        this.isOpen = false;

        //Add Open lightbox Event listeners to Main Image
        this.mainImage.addEventListener('click', (e) => this.onClickLightbox(e));
        //Add Event Listeners to Thumbnails
        this.thumbnails.forEach((thumbnail) => {
            thumbnail.addEventListener('click', (e) => this.refocusMainImage(e));
        });
        //Add event listener for closing lightbox
        lightboxEl.querySelector('.close').addEventListener('click', () => this.closeLightbox());
        //Event listener for left and right bumpers
        this.lightbox.querySelector('.previous').addEventListener('click', () => this.changeSlide(-1));
        this.lightbox.querySelector('.next').addEventListener('click', () => this.changeSlide(1));
        //Switch images when you click on lightbox image
        this.modalPreviews.forEach((modalPreview) => {
                modalPreview.addEventListener('click', (e) => this.toSlide(extractNum(e.target.alt)));
                    //Switch to slide, based on the thumbnails
                    
               
        });
    }

    //handle onClicks for lightbox
    onClickLightbox(e, n = 1) {
        //Open Lightbox if on Desktop and it's not open already
        if (!this.isOpen && checkUserDesktop) {
            this.openLightbox();
        }
        //Switch to slide of main Image
        this.showSlide(this.slideIndex);
        //Check if it's a modal or thumbnail then run toSlide
        if (e.target.classList.contains('to-slide')){
            //switch slide to clicked Thumbnail    
            this.toSlide(n);
        }
        
    }
    //Handle Changing Main Image
    refocusMainImage(e) {
        //Reset selected statefor all thumbnails
        this.thumbnails.forEach((thumbnail) =>{
            thumbnail.classList.remove("selected-image");
        });
        e.target.classList.add("selected-image");
        //THUMBNAIL ELEMENTS MUST HAVE ONLY ONE NUMBER IN THEM
        let imageNum = extractNum(e.target.className);
        let newSrc = `./assets/images/image-product-${imageNum}.jpg`;
        this.mainImage.src = newSrc;
        this.slideIndex = imageNum;
    }
    //Open the Lightbox
    openLightbox() {
        this.lightbox.style.display = 'block';
        this.isOpen = true;


    }
    // Close lightbox
    closeLightbox() {
        this.lightbox.style.display = 'none';
        this.isOpen = false;
    }
    //change slide by +1 or -1
    changeSlide (n) {
        this.showSlide(this.slideIndex += n);
    }

    //jump to slide(when initially clicking on it)
    toSlide (n) {
        this.showSlide(this.slideIndex = n);
    }

    //Lightbox logic
    showSlide (n){        
        //DO not remove Important
        n = parseInt(n);

        //Catch overflows to go back to beginning
        if (n > this.slides.length) {
        this.slideIndex = 1;	
        };
        //Catch underflows to go to end
        if (n < 1) {
        this.slideIndex = this.slides.length;
        };
    
        for (let i = 0; i < this.slides.length; i++) {
        this.slides[i].style.display = "none";
        };
        
        for (let i = 0; i < this.modalPreviews.length; i++) {
        this.modalPreviews[i].className = this.modalPreviews[i].className.replace(' active', '');
        };
        
        this.slides[this.slideIndex - 1].style.display = 'block';
        this.modalPreviews[this.slideIndex - 1].className += ' active';
    }
    //If user clicks anywhere except on the Modal, close it

    //this.showSlide(this.slideIndex);

}

//Pull Number from theclass name
const extractNum = (inputStr) => {
    //Return first number
    let matches = inputStr.match(/(\d+)/);
    return matches[0];
}

//Create a gallery object
const galleryWrapper = document.querySelector('.gallery-wrapper');
const lightboxWrapper = document.getElementById('lightbox')
new Lightbox(galleryWrapper, lightboxWrapper);

