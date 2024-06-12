import './FavouritesPage.scss';
import { Link } from 'react-router-dom';
import home from '../../assets/icons/home.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import { useProductStore, useStore } from '../../store/productStore';
import { Product } from '../../types/Product';
import { Card } from '../../components/Card/Card';
import { useTranslation } from 'react-i18next';

export const FavouritesPage = () => {
  const { catalogProducts } = useProductStore();
  const { favourites, getLength } = useStore();
  const { t } = useTranslation();

  const cart: Product[] = favourites
    .map(prod => catalogProducts.find(item => prod === item.itemId))
    .filter((item): item is Product => item !== undefined);

  return (
    <div className="fav-container">
      <div className="category_header">
        <div className="category_header-map">
          <Link to={`/home`}>
            <img
              className="category_header-map-homeIcon"
              src={home}
              alt="Home"
            />
          </Link>
          <img
            className="category_header-map-arrowRightIcon"
            src={arrowRight}
            alt="arrow"
          />
          <Link to="/favourites">
            <span className="category_header-map-categoryName">
              {t('favourites')}
            </span>
          </Link>
        </div>
        <h1 className="main-title-category">{t('favourites')}</h1>
        <p className="category_header-itemsCount">{`${getLength('fav')} ${t('models')}`}</p>
      </div>
      <div className="favs">
        {cart.map(item => (
          <Card key={item.itemId} product={item} category={item.category} />
        ))}
      </div>
    </div>
  );
};
