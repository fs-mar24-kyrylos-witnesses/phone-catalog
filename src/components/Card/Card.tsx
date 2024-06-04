import React from 'react';
import './Card.scss';
import { Product } from '../../types/Product';
import heart from '../../assets/icons/heart.svg';

type Props = {
  product: Product;
};

export const Card: React.FC<Props> = ({ product }) => {
  return (
    <div className="card_main-container">
      <div className="card_container">
        <img
          className="card_container-img"
          src={product.image}
          alt={product.name}
        />

        <div className="card_container-info">
          <p className="card_container-title">{product.name}</p>
          <div className="card_container-info-prices">
            <p className="card_container-prices-salePrice">${product.price}</p>
            <p className="card_container-prices-fullPrice">
              ${product.fullPrice}
            </p>
          </div>
        </div>

        <div className="card_container-about">
          <div className="card_container-about-characteristics">
            <p className="card_container-about-characteristics-title">Screen</p>
            <p className="card_container-about-characteristics-value">
              {product.screen}
            </p>
          </div>
          <div className="card_container-about-characteristics">
            <p className="card_container-about-characteristics-title">
              Capacity
            </p>
            <p className="card_container-about-characteristics-value">
              {product.capacity}
            </p>
          </div>
          <div className="card_container-about-characteristics">
            <p className="card_container-about-characteristics-title">RAM</p>
            <p className="card_container-about-characteristics-value">
              {product.ram}
            </p>
          </div>
        </div>
        <div className="card_container-handle">
          <div className="card_container-handle-bag">
            <p className="card_container-handle-bag-addToBag">Add to cart</p>
          </div>
          <div className="card_container-handle-favs">
            <img
              className="card_container-handle-favs-addToFavs"
              src={heart}
              alt="Add to fav"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
