import { getElement } from '../utils.js';
import display from '../displayProducts.js';
const companiesDOM = getElement('.companies');
const setupCompanies = (store) => {
  const companies = [
    'all',
    ...new Set(store.map((product) => product.company)),
  ];
  companiesDOM.innerHTML = companies
    .map((company) => {
      return `<button class="company-btn">${company}</button>`;
    })
    .join('');

  const companyBtns = [...document.querySelectorAll('.company-btn')];
  companyBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const element = e.target;
      if (element.textContent === 'all') {
        display(store, getElement('.products-container'), true);
      } else {
        const newStore = store.filter(
          (product) => element.textContent == product.company
        );
        display(newStore, getElement('.products-container'), true);
      }
    });
  });
};

export default setupCompanies;
