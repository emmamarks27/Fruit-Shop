if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  let removeFromCart = document.getElementsByClassName('remove-from-cart');
  for (var i = 0; i < removeFromCart.length; i++) {
    var button = removeFromCart[i];
    button.addEventListener('click', removeCartItem);
  }

  var addToCartButtons = document.getElementsByClassName('add-to-cart');
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
  }
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement;
  var title = shopItem.querySelector('.shop-item-title').innerText;
  //var imgSrc = shopItem.getElementsByClassName('fruit-img')[0].src;
  var basketOuterStructure = {};
  var basketInnerStructure = {
    quantity: 0,
  };
  basketInnerStructure.quantity = 1;
  basketOuterStructure[title] = basketInnerStructure;
  basketObject = Object.assign(userBasket, basketOuterStructure);
  addItemToCart(title);
  updateCartTotal();
  return basketObject;
}

function addItemToCart(title) {
  var cartRow = document.createElement('div');
  cartRow.innerText = title;
  var cartItems = document.getElementsByClassName('cart-wrapper')[0];
  var cartItemsNames = document.getElementsByClassName('cart-item');

  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert('This item is already added to the cart.');
      return;
    }
  }

  var cartRowContents = `<div class="cart-row">
                          <span class="cart-item cart-column">${title}</span>
                          <i class="fa-solid fa-minus cart-decrease"></i>
                          <span class="cart-quantity cart-column">1</span>
                          <i class="fa-solid fa-plus cart-increase"></i>
                          <button class="remove-from-cart cart-column">
                              Remove from Cart
                            </button>
                        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName('remove-from-cart')[0]
    .addEventListener('click', removeCartItem);
  cartRow
    .getElementsByClassName('cart-increase')[0]
    .addEventListener('click', cartIncrease);
  cartRow
    .getElementsByClassName('cart-decrease')[0]
    .addEventListener('click', cartDecrease);
}

function cartIncrease(event) {
  var cartItemClicked = event.target;
  var cartItem = cartItemClicked.parentElement;
  var Quantity = cartItem.querySelector('.cart-quantity');
  var cartQuantity = parseInt(Quantity.innerText);
  var totalQuantity = cartQuantity + 1;
  Quantity.innerText = totalQuantity;
  var title = cartItem.querySelector('.cart-item').innerText;
  basketObject[title].quantity += 1;
  updateCartTotal();
}

function cartDecrease(event) {
  var cartItemClicked = event.target;
  var cartItem = cartItemClicked.parentElement;
  var Quantity = cartItem.querySelector('.cart-quantity');
  var cartQuantity = parseInt(Quantity.innerText);
  if (cartQuantity > 1) {
    var totalQuantity = cartQuantity - 1;
    Quantity.innerText = totalQuantity;
    var title = cartItem.querySelector('.cart-item').innerText;
    basketObject[title].quantity -= 1;
    updateCartTotal();
  } else {
    alert('Please delete your item from your shopping cart.');
  }
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateCartTotal();
}

function isLoaded() {
  isFullyLoaded = true;
  return isLoaded;
}

function displayFruits(fruit) {
  testFruitsContent =
    testFruitsContent +
    `<div class="fruit-section" id="id-${fruit.fruit}>
          <span class="shop-item-title"> 
            <h2 class="shop-item-title">${fruit.fruit}</h2>
          </span>      
            <img src="src/images/${fruit.fruit}.jpeg" class="fruit-img"  alt="photo of ${fruit.fruit}" ></img>  
          <button value=${fruit.fruit} class="add-to-cart">Add to cart</button>
    </div>`;
  testFruits.innerHTML = testFruitsContent;
  isLoaded();
}

function updateCartTotal() {
  var basketContainer = document.getElementsByClassName('cart-wrapper')[0];
  var cartRows = basketContainer.getElementsByClassName('cart-row');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var quantity = cartRow.querySelector('.cart-quantity');
    var quantityElement = parseInt(quantity.innerText);
    total = total + quantityElement;
  }
  var cartTotal = document.getElementById('cart-total');
  cartTotal.innerHTML = `${total}`;
}

let fruits = [
  { fruit: 'oranges', quantity: 3 },
  { fruit: 'kiwis', quantity: 12 },
  { fruit: 'bananas', quantity: 5 },
  { fruit: 'lemons', quantity: 7 },
  { fruit: 'limes', quantity: 3 },
];

let isFullyLoaded = false;
let testFruitsContent = ' ';
let testFruits = document.querySelector('.test-fruits');
fruits.forEach(displayFruits);
let userBasket = {
  fruit: '',
  quantity: 0,
};
