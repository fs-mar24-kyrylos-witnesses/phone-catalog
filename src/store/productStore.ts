import { create as createZustand } from 'zustand';

import { ProductInfo } from '../types/ProductInfo';
import { Product } from '../types/Product';

import { fetchProductByIdFromApi, fetchAllProductsFromApi } from '../api/api';
import { Category } from '../types/Category';

type ProductStore = {
  catalogProducts: Product[];
  selectedProduct: ProductInfo | null;
  error: string;
  loading: boolean;

  setCatalogProducts: (products: Product[]) => void;
  setSelectedProduct: (selectedProduct: ProductInfo) => void;
  fetchAllProducts: () => Promise<void>;
  fetchProductById: (id: string, mode: Category) => Promise<void>;
};

export const useProductStore = createZustand<ProductStore>(set => ({
  catalogProducts: [],
  selectedProduct: null,
  loading: false,
  error: '',

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const products = await fetchAllProductsFromApi();
      set({ catalogProducts: products });
    } catch {
      set({ error: 'Error fetching ALL products' });
    } finally {
      set({ loading: false });
    }
  },

  fetchProductById: async (id: string, category: Category) => {
    set({ loading: true });
    try {
      const product = await fetchProductByIdFromApi(id, category);
      set({ selectedProduct: product });
    } catch {
      set({ error: 'Error fetching product info' });
    } finally {
      set({ loading: false });
    }
  },

  setCatalogProducts: (products: Product[]) => {
    set({ catalogProducts: products });
  },

  setSelectedProduct: (selectedProduct: ProductInfo) =>
    set({ selectedProduct }),
}));
