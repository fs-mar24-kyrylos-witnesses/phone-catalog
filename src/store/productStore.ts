import { create, create as createZustand } from 'zustand';
import { persist } from 'zustand/middleware';

import { ProductInfo } from '../types/ProductInfo';
import { Product } from '../types/Product';

import { fetchProductByIdFromApi, fetchAllProductsFromApi } from '../api/api';
import { Category } from '../types/Category';

type ProductStore = {
  catalogProducts: Product[];
  selectedProduct: ProductInfo | null;
  error: string;
  loading: boolean;

  isMenuOpen: boolean;
  toggleMenu: () => void;

  setCatalogProducts: (products: Product[]) => void;
  setSelectedProduct: (selectedProduct: ProductInfo) => void;
  fetchAllProducts: () => Promise<void>;
  fetchProductById: (id: string, mode: Category) => Promise<void>;
};

type Store = {
  favourites: string[];
  cartProducts: string[];

  products: Product[];
  addTo: (slug: string, type: 'fav' | 'cart') => void;
  removeFrom: (slug: string, type: 'fav' | 'cart') => void;
  getLength: (type: 'fav' | 'cart') => number;
};

export const useProductStore = createZustand<ProductStore>(set => ({
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
