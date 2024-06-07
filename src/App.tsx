import { useEffect } from 'react';
import './App.scss';
import { useProductStore } from './store/productStore';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';
import { BannerSlider } from './components/BannerSlider';

export const App = () => {
  const fetchAllProducts = useProductStore(state => state.fetchAllProducts);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <>
      <Header />

      <Outlet />

      <BannerSlider />
      <Footer />
    </>
  );
};

export default App;
