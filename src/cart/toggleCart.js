import { getElement } from '../utils.js';

const cartToggle = getElement('.toggle-container');
const closeCart = getElement('.cart-close');
const cartOverlay = getElement('.cart-overlay');
const cart = getElement('.cart');
export const openCart = () => {
  cartOverlay.classList.add('show');
};

cartToggle.addEventListener('click', openCart);
closeCart.addEventListener('click', () => {
  cartOverlay.classList.remove('show');
});
window.addEventListener('click', (e) => {
  if (
    !e.target.classList.contains('fa-shopping-cart') &&
    !e.target.classList.contains('cart-item-count') &&
    !e.target.classList.contains('addToCartBtn') &&
    !e.target.classList.contains('cart-item-remove-btn') &&
    !cart.contains(e.target)
  ) {
    cartOverlay.classList.remove('show');
  }
});
