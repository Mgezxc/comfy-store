// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items
const cartItemCountDOM = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart');

export const addToCart = (id) => {
  let item = cart.find((product) => product.id === id);

  if (!item) {
    let product = findProduct(id);
    // add item to the cart data
    product = { ...product, amount: 1 };
    cart.push(product);
    // add item to the dom
    addToCartDOM(product);
  } else {
    // update values

    const itemCount = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    const newAmount = itemCount.find((item) => item.dataset.id === id);
    newAmount.textContent = increaseAmount(id);
  }
  // display total items
  displayTotalItems();
  // display total amount
  displayTotalAmount();
  // set cart to storage
  setStorageItem('cart', cart);
  openCart();
};

function displayTotalItems() {
  const totalItems = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = totalItems;
}
function displayTotalAmount() {
  const totalAmount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount * cartItem.price);
  }, 0);

  cartTotalDOM.textContent = `Total: ${formatPrice(totalAmount)}`;
}

function displayCartItems() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem);
  });
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
}

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', (e) => {
    const element = e.target;
    const parent = e.target.parentElement;
    const elementID = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    // remove
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(elementID);
      parent.parentElement.remove();
    }
    // increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      parent.nextElementSibling.textContent = increaseAmount(parentID);
    }
    // decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    displayTotalAmount();
    displayTotalItems();
    setStorageItem('cart', cart);
  });
}

const init = () => {
  displayTotalAmount();
  displayTotalItems();
  // get and display cart from local storage
  displayCartItems();
  setupCartFunctionality();
};
init();
