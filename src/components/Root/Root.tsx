import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from '../../App';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { categories } from '../../helper/filterByCategory/filterByCategory';
import { CategoryPage } from '../../pages/CategoryPage/CategoryPage';
import { AboutItemPage } from '../../pages/AboutItemPage/AboutItemPage';
import { HomePage } from '../../pages/HomePage/HomePage';
import { FavouritesPage } from '../../pages/FavouritesPage/FavouritesPage';
import { CartPage } from '../../pages/CartPage/CartPage';
import { Contacts } from '../../pages/Contacts';
import { RightsPage } from '../../pages/RightsPage/RightsPage.tsx';
import '../../utils/i18n.ts';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Navigate to={'/'} />} />
        {categories.map(category => (
          <Route key={category.path} path={category.path}>
            <Route index element={<CategoryPage category={category} />} />
            <Route
              path=":itemId?"
              element={<AboutItemPage categoryArea={category.path} />}
            />
          </Route>
        ))}
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="rights" element={<RightsPage />} />
      </Route>
    </Routes>
  </Router>
);
