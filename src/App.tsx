import { useEffect } from 'react';
import './App.scss';

import { useProductStore } from './store/productStore';
// import { Card } from './components/Card/Card';
// import { Product } from './types/Product';

export const App = () => {
  const fetchAllProducts = useProductStore(state => state.fetchAllProducts);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="App">
      <h1>Product Catalog</h1>
    </div>
  );
};

export default App;

// export const App = () => {
//   const { fetchAllProducts, catalogProducts } = useProductStore();
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     setProducts(catalogProducts);
//     fetchAllProducts();
//   }, [fetchAllProducts, catalogProducts]);

//   return (
//     <div className="App">
//       <h1>Product Catalog</h1>
//       {products.slice(0, 2).map(product => (
//         <Card product={product} />
//       ))}
//     </div>
//   );
// };

// export default App;
