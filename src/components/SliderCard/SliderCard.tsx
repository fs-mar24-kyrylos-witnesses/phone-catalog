import React from 'react';
import './SliderCard.scss';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import filledHeart from '../../assets/icons/heart-filled.svg';
import { useStore } from '../../store/productStore';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../UI/Icons/Icon';

type Props = {
  product: Product;
  category?: string;
  discount?: boolean;
};

export const SliderCard: React.FC<Props> = ({
  product,
  category,
  discount,
}) => {
  const { favourites, cartProducts, addTo, removeFrom } = useStore();
  const { t } = useTranslation();

  return (
    <div className="card">
      <Link to={`/${category}/${product.itemId}`}>
        <div className="card-img-wrapper">
          <img className="card-img" src={product.image} alt={product.name} />
        </div>
      </Link>

      <Link to={`/${category}/${product.itemId}`}>
        <div className="card-info">
          <p className="card-title">{`${product.name}  (iMT9G2FS/A)`}</p>
          {discount ? (
            <div className="card-info-prices">
              <p className="card-info-prices-salePrice">${product.price}</p>
              <p className="card-info-prices-fullPrice">${product.fullPrice}</p>
            </div>
          ) : (
            <div className="card-info-prices">
              <p className="card-info-prices-fullPrice-without-decoration">
                ${product.fullPrice}
              </p>
            </div>
          )}
        </div>
      </Link>
      <div className="card-divider-line"></div>

      <Link to={`/${category}/${product.itemId}`}>
        <div className="card-about">
          <div className="card-about-characteristics">
            <p className="card-about-characteristics-title">{t('screen')}</p>
            <p className="card-about-characteristics-value">{product.screen}</p>
          </div>
          <div className="card-about-characteristics">
            <p className="card-about-characteristics-title">{t('capacity')}</p>
            <p className="card-about-characteristics-value">
              {product.capacity}
            </p>
          </div>
          <div className="card-about-characteristics">
            <p className="card-about-characteristics-title">{t('RAM')}</p>
            <p className="card-about-characteristics-value">{product.ram}</p>
          </div>
        </div>
      </Link>
      <div className="card_container-handle">
        {cartProducts.includes(product.itemId) ? (
          <div
            onClick={() => removeFrom(product.itemId, 'cart')}
            className="card_container-handle-bag cart-bag"
          >
            <p className="card_container-handle-bag-addToBag cart-addToBag">
              {t('addedToCart')}
            </p>
          </div>
        ) : (
          <div
            onClick={() => addTo(product.itemId, 'cart')}
            className="card_container-handle-bag"
          >
            <p className="card_container-handle-bag-addToBag">
              {t('addToCart')}
            </p>
          </div>
        )}

        {favourites.includes(product.itemId) ? (
          <div
            onClick={() => removeFrom(product.itemId, 'fav')}
            className="card_container-handle-favs cart-filled"
          >
            <img
              className="card_container-handle-favs-addToFavs"
              src={filledHeart}
              alt="Add to fav"
            />
          </div>
        ) : (
          <div
            onClick={() => addTo(product.itemId, 'fav')}
            className="card_container-handle-favs"
          >
            <div className="card_container-handle-favs-addToFavs">
              <Icon name="heart" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
