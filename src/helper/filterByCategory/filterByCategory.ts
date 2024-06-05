import { useProductStore } from '../../store/productStore';
import { Category } from '../../types/Category';
import { CategoryArray } from '../../types/CategoryArray';

export function FilterByCategory(categoryFilt: Category) {
  const { catalogProducts } = useProductStore();

  const filtered = catalogProducts.filter(
    item => item.category === categoryFilt,
  );

  return filtered;
}

export const categories: CategoryArray[] = [
  {
    name: 'Phones',
    path: 'phones',
    items: FilterByCategory('phones'),
  },
  {
    name: 'Tablets',
    path: 'tablets',
    items: FilterByCategory('tablets'),
  },
  {
    name: 'Accessories',
    path: 'accessories',
    items: FilterByCategory('accessories'),
  },
];
