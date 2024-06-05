import { useEffect } from 'react';
import './App.scss';
import { useProductStore } from './store/productStore';
import { Header } from './comonents/Header/Header';
import { Outlet } from 'react-router-dom';

export const App = () => {
  const fetchAllProducts = useProductStore(state => state.fetchAllProducts);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <>
      <div className="App">
        <Header />
        <Outlet />
        {/* future footer */}
      </div>
    </>
  );
};

export default App;
