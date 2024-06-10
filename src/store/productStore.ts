import { create, create as createZustand } from 'zustand';
import { persist } from 'zustand/middleware';

import { ProductInfo } from '../types/ProductInfo';
import { Product } from '../types/Product';

import { fetchProductByIdFromApi, fetchAllProductsFromApi } from '../api/api';
import { Category } from '../types/Category';

type ProductStore = {
  catalogProducts: Product[];
  favourites: string[];
  cartProducts: string[];
  selectedProduct: ProductInfo | null;
  error: string;
  loading: boolean;

  setCatalogProducts: (products: Product[]) => void;
  setSelectedProduct: (selectedProduct: ProductInfo) => void;
  fetchAllProducts: () => Promise<void>;
  fetchProductById: (id: string, mode: Category) => Promise<void>;
};

type CartItem = {
  slug: string;
  quantity: number;
  price: number;
  sumOfPrice: number;
};

type Store = {
  favourites: string[];
  cartProducts: string[];
  cartToObject: CartItem[];
  productStore: ProductStore;

  addTo: (slug: string, type: 'fav' | 'cart') => void;
  removeFrom: (slug: string, type: 'fav' | 'cart') => void;
  getLength: (type: 'fav' | 'cart') => number;
  operation: (slug: string, type: 'plus' | 'minus') => void;
  toObject: () => void;
};

export const useProductStore = createZustand<ProductStore>(set => ({
  catalogProducts: [],
  favourites: [],
  cartProducts: [],
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

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      favourites: [],
      cartProducts: [],
      cartToObject: [],
      productStore: useProductStore(),

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

      operation: (slug: string, type: 'plus' | 'minus') => {
        set(state => {
          const updatedCartObj = state.cartToObject.map(item => {
            if (item.slug === slug) {
              const updatedQuantity =
                type === 'plus'
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 0);
              const updatedSumOfPrice = updatedQuantity * item.price;
              return {
                ...item,
                quantity: updatedQuantity,
                sumOfPrice: updatedSumOfPrice,
              };
            }
            return item;
          });
          return { cartToObject: updatedCartObj };
        });
      },

      toObject: () => {
        const state = get();
        const newObj = state.cartProducts.map(fav => {
          const price =
            state.productStore.catalogProducts.find(
              product => product.itemId === fav,
            )?.price ?? 0;

          return {
            slug: fav,
            quantity: 1,
            price: price,
            sumOfPrice: price,
          };
        });
        set({ cartToObject: newObj });
      },
    }),
    {
      name: 'store',
      getStorage: () => localStorage,
    },
  ),
);
