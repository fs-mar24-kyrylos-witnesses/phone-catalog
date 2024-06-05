import { Category } from './Category';
import { Product } from './Product';

export type CategoryArray = {
  name: string;
  path: Category;
  items: Product[];
};
