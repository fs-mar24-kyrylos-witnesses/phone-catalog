import { useEffect } from 'react';
import './App.scss';
import { useProductStore } from './store/productStore';
import { Header } from './comonents/Header/Header';
import { Footer } from './components/Footer';

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
      <Footer />
    </>
  );
};

export default App;
