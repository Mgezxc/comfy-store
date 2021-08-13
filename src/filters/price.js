import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const range = getElement('.price-filter');
const value = getElement('.price-value');
const setupPrice = (store) => {
  let maxPrice = store.map((product) => product.price);
  let minPrice = Math.min(...maxPrice) / 100;
  maxPrice = Math.max(...maxPrice) / 100;
  maxPrice = Math.ceil(maxPrice);
  minPrice = Math.ceil(minPrice);
  range.value = maxPrice;
  range.max = maxPrice;
  range.min = minPrice;
  value.textContent = `Value: $${maxPrice}`;

  range.addEventListener('input', () => {
    const price = parseInt(range.value);
    const newStore = store.filter((product) => {
      return product.price / 100 <= price;
    });
    display(newStore, getElement('.products-container'), true);
    value.textContent = `Value: $${range.value}`;
  });
};

export default setupPrice;
