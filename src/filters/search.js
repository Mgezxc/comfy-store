import { getElement } from '../utils.js';
import display from '../displayProducts.js';
const products = getElement('.products-container');
const input = getElement('.search-input');
const form = getElement('.input-form');
const setupSearch = (store) => {
  // prevent enter key from submitting form
  input.setAttribute('onkeydown', 'return (event.keyCode!=13);');

  form.addEventListener('keyup', (e) => {
    e.preventDefault();
    const value = input.value.toLowerCase();
    if (value) {
      const filtered = store.filter((product) => {
        let { name } = product;
        name = name.toLowerCase();
        return name.startsWith(value);
      });
      display(filtered, products, true);
      if (filtered.length < 1) {
        products.innerHTML = `<h3 class = filter-error>sorry, no products matched your search</h3>`;
      }
    } else {
      display(store, products, true);
    }
  });
};

export default setupSearch;
