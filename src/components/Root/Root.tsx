import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from '../../App';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { categories } from '../../helper/filterByCategory/filterByCategory';
import { CategoryPage } from '../../pages/CategoryPage/CategoryPage';
import { AboutItemPage } from '../../pages/AboutItemPage/AboutItemPage';
import { HomePage } from '../../pages/HomePage/HomePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        {categories.map(category => (
          <Route key={category.path} path={category.path}>
            <Route index element={<CategoryPage category={category} />} />
            <Route
              path=":itemId?"
              element={<AboutItemPage categoryArea={category.path} />}
            />
          </Route>
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
