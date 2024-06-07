import { Product } from '../../types/Product';

export function filter(
  products: Product[],
  searchParams: URLSearchParams,
): Product[] {
  const sort = searchParams.get('sort') || '';
  let copy = [...products];

  if (sort) {
    copy = copy.sort((a, b) => {
      switch (sort) {
        case 'alphabet':
          return a.name.localeCompare(b.name);
        case 'newest':
          return b.year - a.year;
        case 'cheapest':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }

  return copy;
}
