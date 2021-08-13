import { getStorageItem, setStorageItem } from './utils.js';
let store = getStorageItem('store');

const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      fields: { featured, name, price, colors, company, image },
    } = product;
    const {
      thumbnails: {
        large: { url: img },
      },
    } = image[0];

    return {
      id,
      featured,
      name,
      price,
      colors,
      company,
      img,
    };
  });

  setStorageItem('store', store);
  return store;
};
const findProduct = (id) => {
  const product = store.find((item) => item.id === id);
  return product;
};
export { store, setupStore, findProduct };
