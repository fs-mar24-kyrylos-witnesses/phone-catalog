import { useEffect } from 'react';
import './App.scss';

import { useProductStore } from './store/productStore';

export const App = () => {
  const { fetchAllProducts } = useProductStore();

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
