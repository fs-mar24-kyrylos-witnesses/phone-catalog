import { Product } from '../types/Product';
import { Category } from '../types/Category';
import { ProductInfo } from '../types/ProductInfo';

const BASE_URL = 'api/';
const CATALOG_URL = BASE_URL + 'products.json';

const PRODUCT_URLS = {
  phones: BASE_URL + 'phones.json',
  tablets: BASE_URL + 'tablets.json',
  accessories: BASE_URL + 'accessories.json',
};

export const fetchAllProductsFromApi = async () => {
  const response = await fetch(CATALOG_URL);
  const products = (await response.json()) as Product[];
  return products;
};

export const fetchProductByIdFromApi = async (
  id: string,
  category: Category,
) => {
  const response = await fetch(PRODUCT_URLS[category]);
  const products = (await response.json()) as ProductInfo[];

  const product = products.find(product => product.id === id);
  return product;
};
