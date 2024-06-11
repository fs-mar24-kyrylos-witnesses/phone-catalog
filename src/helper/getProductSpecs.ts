import { ProductInfo } from '../types/ProductInfo';
import { Spec } from '../types/Spec';

export function getProductSpecs(product: ProductInfo) {
  const specs: Spec[] = [];

  // stupid shit
  if (product.screen) {
    specs.push({ title: 'Screen', value: product.screen });
  }

  if (product.resolution) {
    specs.push({ title: 'Resolution', value: product.resolution });
  }

  if (product.processor) {
    specs.push({ title: 'Processor', value: product.processor });
  }

  if (product.ram) {
    specs.push({ title: 'RAM', value: product.ram });
  }

  // todo -- split GB and numbers
  if (product.capacity) {
    specs.push({ title: 'Built in memory', value: product.capacity });
  }

  if (product.camera) {
    specs.push({ title: 'Camera', value: product.camera });
  }

  if (product.zoom) {
    specs.push({ title: 'Zoom', value: product.zoom });
  }

  if (product.cell) {
    specs.push({ title: 'Cell', value: product.cell.join(', ') });
  }

  return specs;
}
