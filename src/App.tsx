import { useEffect } from 'react';
import './App.scss';
import { useProductStore } from './store/productStore';
import { Header } from './comonents/Header/Header';

export const App = () => {
  const fetchAllProducts = useProductStore(state => state.fetchAllProducts);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <>
      <div className="App">
        <Header />
        <h1>Product Catalog</h1>
      </div>
      <div></div>
    </>
  );
};

export default App;
