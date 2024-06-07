import React from 'react';
import './Card.scss';
import { Product } from '../../types/Product';
import heart from '../../assets/icons/heart.svg';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  category?: string;
};

export const Card: React.FC<Props> = ({ product, category }) => {
  return (
    <Link to={`/${category}/${product.itemId}`}>
      <div className="card_container">
        <div className="card_container-position">
          <img
            className="card_container-img"
            src={product.image}
            alt={product.name}
          />
        </div>

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
    </Link>
  );
};
