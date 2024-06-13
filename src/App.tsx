import { useEffect } from 'react';
import './App.scss';
import { useProductStore } from './store/productStore';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';

export const App = () => {
  const fetchAllProducts = useProductStore(state => state.fetchAllProducts);

  const { theme } = useThemeStore();

  useEffect(() => {
    document.body.setAttribute('theme', theme);
  }, [theme]);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
