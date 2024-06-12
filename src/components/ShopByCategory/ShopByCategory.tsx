import { Link } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import './ShopByCategory.scss';
import { useTranslation } from 'react-i18next';

export const ShopByCategory = () => {
  const { t } = useTranslation();
  const CatalogProduct = useProductStore(state => state.catalogProducts);
  const allCategories = ['phones', 'tablets', 'accessories'];
  const allCategoriesTitle = [
    t('mobilePhones'),
    t('tablets'),
    t('accessories'),
  ];

  const countProductsByCategory = (category: string) => {
    return CatalogProduct.filter(product => product.category === category)
      .length;
  };

  const categoryCounts = allCategories.map(category => {
    return countProductsByCategory(category);
  });

  return (
    <div className="shopBy">
      <h2 className="section-title shopBy-title">{t('shopByCategory')}</h2>
      <div className="shopBy-content">
        {allCategories.map((category, index) => {
          return (
            <div key={category} className="shopBy-category">
              <Link to={`/${category}`}>
                <div
                  className={`shopBy-category-bg shopBy-category-bg-${category}`}
                ></div>
              </Link>

              <Link to={`/${category}`} className="shopBy-category-link">
                <h3
                  className={`h3 shopBy-category-title shopBy-category-title-${category}`}
                >
                  {allCategoriesTitle[index]}
                </h3>
              </Link>

              <p className="shopBy-category-count">
                {categoryCounts[index]} {t('models')}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
