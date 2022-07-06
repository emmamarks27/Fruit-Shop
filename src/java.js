let fruits = [
  { fruit: 'oranges', quantity: 3 },
  { fruit: 'kiwis', quantity: 12 },
  { fruit: 'bananas', quantity: 5 },
  { fruit: 'lemons', quantity: 7 },
  { fruit: 'limes', quantity: 3 },
];

function isLoaded() {
  isFullyLoaded = true;
  return isLoaded;
}

function displayFruits(fruit) {
  testFruitsContent =
    testFruitsContent +
    `<div class="fruit-section" id="id-${fruit.fruit}><h2 id="fruit-title">${fruit.fruit}</h2>
          <img src="src/images/${fruit.fruit}.jpeg" class="fruit-img"  alt="photo of ${fruit.fruit}" ></img>
          <div id="fruit-quantity">${fruit.quantity}</div>  
          <button value=${fruit.fruit} onclick="handleAddToCart(this.value)" class="add-to-cart">Add to cart</button></div>`;
  testFruits.innerHTML = testFruitsContent;
  isLoaded();
}

let removeFromCart = document.getElementsByClassName('remove-from-cart');
for (var i = 0; i < removeFromCart.length; i++) {
  var button = removeFromCart[i];
  button.addEventListener('click', function (event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();
  });
}

function updateCartTotal() {
  var basketContainer = document.getElementsByClassName('cart-wrapper')[0];
  var cartRows = basketContainer.getElementsByClassName('cart-row');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var quantity = cartRow.getElementsByClassName('cart-quantity')[0];
    var quantityElement = parseFloat(quantity.innerText);
    console.log(quantityElement);
    total = total + quantityElement;
  }
  var cartTotal = document.getElementById('cart-total');
  cartTotal.innerHTML = `${total}`;
}

let isFullyLoaded = false;
let updateBasket = ' ';
let testFruitsContent = ' ';
let testFruits = document.querySelector('.test-fruits');
fruits.forEach(displayFruits);

let fruitButton = document.querySelector('.add-to-cart');
//fruitButton.addEventListener("click", handleAddToCart);
let basket = document.getElementById('basket');
