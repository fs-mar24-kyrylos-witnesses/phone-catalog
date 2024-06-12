import Minus from '../../assets/icons/minus.svg';
import Plus from '../../assets/icons/plus.svg';
import Union from '../../assets/icons/close.svg';

import './CartItem.scss';
import { Product } from '../../types/Product';
import { useStore } from '../../store/productStore';
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  product: Product;
  count: number;
  setCount: (count: number) => void;
};

export const CartItem: React.FC<Props> = ({ product, count, setCount }) => {
  const { removeFrom } = useStore();

  const handleIncrease = () => setCount(count + 1);
  const handleDecrease = () => setCount(count > 1 ? count - 1 : 1);

  return (
    <div className="product">
      <div className="product-info">
        <img
          className="product-info-close"
          onClick={() => removeFrom(product.itemId, 'cart')}
          src={Union}
          alt="close"
        />
        <Link to={`/${product.category}/${product.itemId}`}>
          <img className="product-info-img" src={product.image} alt="product" />
        </Link>
        <p className="product-info-title">{product.name}</p>
      </div>
      <div className="product-handle">
        <div className="product-handle-buttons">
          <div
            className={classNames('product-handle-buttons-box', {
              disabled: count === 1,
            })}
            aria-disabled={count === 1}
            onClick={() => handleDecrease()}
          >
            <img src={Minus} alt="minus" />
          </div>

          <div className="product-handle-buttons-count">
            <p className="product-handle-buttons-count-text">{count}</p>
          </div>

          <div
            className="product-handle-buttons-box"
            onClick={() => handleIncrease()}
          >
            <img src={Plus} alt="plus" />
          </div>
        </div>
        <p className="product-handle-price">{`$${product.price}`}</p>
      </div>
    </div>
  );
};
