import React from 'react';
import './SliderCard.scss';
import { Product } from '../../types/Product';
import heart from '../../assets/icons/heart.svg';
import { Link } from 'react-router-dom';

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
            <p className="card-about-characteristics-title">Screen</p>
            <p className="card-about-characteristics-value">{product.screen}</p>
          </div>
          <div className="card-about-characteristics">
            <p className="card-about-characteristics-title">Capacity</p>
            <p className="card-about-characteristics-value">
              {product.capacity}
            </p>
          </div>
          <div className="card-about-characteristics">
            <p className="card-about-characteristics-title">RAM</p>
            <p className="card-about-characteristics-value">{product.ram}</p>
          </div>
        </div>
      </Link>

      <div className="card-handle">
        <div className="card-handle-bag">
          <p className="card-handle-bag-addToBag">Add to cart</p>
        </div>
        <div className="card-handle-favs">
          <img
            className="card-handle-favs-addToFavs"
            src={heart}
            alt="Add to fav"
          />
        </div>
      </div>
    </div>
  );
};
