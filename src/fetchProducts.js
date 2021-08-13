import { allProductsUrl } from './utils.js';

const fetchProducts = async () => {
  const response = await fetch(allProductsUrl);
  return response.json();
};

export default fetchProducts;
