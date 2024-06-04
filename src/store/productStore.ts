import { create as createZustand } from 'zustand';

import { ProductInfo } from '../types/ProductInfo';
import { Products } from '../types/Products';

import { fetchProductByIdFromApi, fetchAllProductsFromApi } from '../api/api';
import { Category } from '../types/Category';

type ProductStore = {
  catalogProducts: Products[];
  selectedProduct: ProductInfo | null;
  error: string;
  loading: boolean;

  setCatalogProducts: (products: Products[]) => void;
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

  setCatalogProducts: (products: Products[]) => {
    set({ catalogProducts: products });
  },

  setSelectedProduct: (selectedProduct: ProductInfo) =>
    set({ selectedProduct }),
}));
