import React from 'react';
import './Card.scss';
import { Product } from '../../types/Product';
import heart from '../../assets/icons/heart.svg';
import filledHeart from '../../assets/icons/heart-filled.svg';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/productStore';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Product;
  category?: string;
};

export const Card: React.FC<Props> = ({ product, category }) => {
  const { favourites, cartProducts, addTo, removeFrom } = useStore();
  const { t } = useTranslation();

  return (
    <div className="card_container">
      <Link to={`/${category}/${product.itemId}`}>
        <div className="card_container-position">
          <img
            className="card_container-img"
            src={product.image}
            alt={product.name}
          />
        </div>
      </Link>

      <Link to={`/${category}/${product.itemId}`}>
        <div className="card_container-info">
          <p className="card_container-title">{product.name}</p>
          <div className="card_container-info-prices">
            <p className="card_container-info-prices-salePrice">
              ${product.price}
            </p>
            <p className="card_container-info-prices-fullPrice">
              ${product.fullPrice}
            </p>
          </div>
        </div>
      </Link>

      <Link to={`/${category}/${product.itemId}`}>
        <div className="card_container-about">
          <div className="card_container-about-characteristics">
            <p className="card_container-about-characteristics-title">
              {t('screen')}
            </p>
            <p className="card_container-about-characteristics-value">
              {product.screen}
            </p>
          </div>
          <div className="card_container-about-characteristics">
            <p className="card_container-about-characteristics-title">
              {t('capacity')}
            </p>
            <p className="card_container-about-characteristics-value">
              {product.capacity}
            </p>
          </div>
          <div className="card_container-about-characteristics">
            <p className="card_container-about-characteristics-title">
              {' '}
              {t('RAM')}
            </p>
            <p className="card_container-about-characteristics-value">
              {product.ram}
            </p>
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
            className="card_container-handle-favs "
          >
            <img
              className="card_container-handle-favs-addToFavs"
              src={heart}
              alt="Add to fav"
            />
          </div>
        )}
      </div>
    </div>
  );
};
