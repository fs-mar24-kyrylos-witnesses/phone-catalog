import { Color } from '../types/Color';
import { ProductInfo } from '../types/ProductInfo';

export function getNewColorSlug(product: ProductInfo, color: Color) {
  return `${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`;
}

// add some type or smth
export function getNewRamSlug(product: ProductInfo, ram: string) {
  return `${product.namespaceId}-${ram.toLowerCase()}-${product.color}`;
}
