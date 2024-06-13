import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ProductInfo } from '../types/ProductInfo';
import { Product } from '../types/Product';

import { fetchProductByIdFromApi, fetchAllProductsFromApi } from '../api/api';
import { Category } from '../types/Category';

type ProductStore = {
  catalogProducts: Product[];
  error: string;
  loading: boolean;

  isMenuOpen: boolean;
  toggleMenu: () => void;

  setCatalogProducts: (products: Product[]) => void;
  fetchAllProducts: () => Promise<void>;
  fetchProductById: (
    id: string,
    mode: Category,
  ) => Promise<ProductInfo | undefined>;
};

type Store = {
  favourites: string[];
  cartProducts: string[];

  products: Product[];
  addTo: (slug: string, type: 'fav' | 'cart') => void;
  removeFrom: (slug: string, type: 'fav' | 'cart') => void;
  getLength: (type: 'fav' | 'cart') => number;
};

export const useProductStore = create<ProductStore>(set => ({
  catalogProducts: [],
  selectedProduct: null,
  loading: false,
  error: '',
  isMenuOpen: false,

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

  fetchProductById: async (id: string, mode: Category) => {
    set({ loading: true });
    try {
      const product = await fetchProductByIdFromApi(id, mode);
      return product; // Return the product info
    } catch (error) {
      set({ error: 'Error fetching product info' });
      throw error; // Re-throw the error to handle it in the calling function
    } finally {
      set({ loading: false });
    }
  },

  setCatalogProducts: (products: Product[]) => {
    set({ catalogProducts: products });
  },

  toggleMenu: () => set(state => ({ isMenuOpen: !state.isMenuOpen })),
}));

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      favourites: [],
      cartProducts: [],

      favsProducts: [],
      bagProducts: [],

      products: [],

      addTo: (slug: string, type: 'fav' | 'cart') => {
        set(state => {
          if (type === 'fav') {
            return { favourites: [...state.favourites, slug] };
          } else {
            return { cartProducts: [...state.cartProducts, slug] };
          }
        });
      },

      removeFrom: (slug: string, type: 'fav' | 'cart') => {
        set(state => {
          if (type === 'fav') {
            return {
              favourites: state.favourites.filter(item => item !== slug),
            };
          } else {
            return {
              cartProducts: state.cartProducts.filter(item => item !== slug),
            };
          }
        });
      },

      getLength: (type: 'fav' | 'cart') => {
        const state = get();
        return type === 'fav'
          ? state.favourites.length
          : state.cartProducts.length;
      },
    }),
    {
      name: 'store',
      getStorage: () => localStorage,
    },
  ),
);
