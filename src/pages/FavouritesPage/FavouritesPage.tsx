import './FavouritesPage.scss';
import { Link } from 'react-router-dom';
import { useProductStore, useStore } from '../../store/productStore';
import { Product } from '../../types/Product';
import { Card } from '../../components/Card/Card';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonDarkTheme } from '../../components/Skeleton/SkeletonDarkTheme';
import { Icon } from '../../UI/Icons/Icon';
import { Arrow } from '../../UI/Icons/arrow/arrow';

export const FavouritesPage = () => {
  const { catalogProducts } = useProductStore();
  const { favourites, getLength } = useStore();
  const { t } = useTranslation();

  const cart: Product[] = favourites
    .map(prod => catalogProducts.find(item => prod === item.itemId))
    .filter((item): item is Product => item !== undefined);

  const { getDelay, delay } = useProductStore();

  useEffect(() => {
    getDelay();
  }, [getDelay]);

  return (
    <div className="fav-container">
      <div className="category_header">
        <div className="category_header-map">
          <Link to={`/home`}>
            <Icon name="home" />
          </Link>
          <Arrow direction="right" />
          <Link to="/favourites">
            <span className="category_header-map-categoryName">
              {t('favourites')}
            </span>
          </Link>
        </div>
        <h1 className="main-title-category">{t('favourites')}</h1>
        <p className="category_header-itemsCount">
          {delay ? (
            <SkeletonDarkTheme>
              <Skeleton width={80} />
            </SkeletonDarkTheme>
          ) : (
            `${getLength('fav')} ${t('models')}`
          )}
        </p>
      </div>
      <div className="favs">
        {cart.map(item => (
          <Card key={item.itemId} product={item} category={item.category} />
        ))}
      </div>
    </div>
  );
};
