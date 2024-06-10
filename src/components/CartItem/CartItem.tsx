import Minus from '../../assets/icons/item-minus.svg';
import Plus from '../../assets/icons/item-plus.svg';
import Union from '../../assets/icons/close.svg';

import './CartItem.scss';
import { Product } from '../../types/Product';
import { useStore } from '../../store/productStore';
import React from 'react';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { operation, count, removeFrom } = useStore();

  return (
    <div className="product">
      <div className="product-info">
        <img
          onClick={() => removeFrom(product.itemId, 'cart')}
          src={Union}
          alt="close"
        />
        <img src={product.image} alt="product" />
        <p className="product-info-title">{product.name}</p>
      </div>
      <div className="product-handle">
        <div className="product-handle-buttons">
          <div
            className="product-handle-button-box"
            onClick={() => operation('minus')}
          >
            <img src={Minus} alt="minus" />
          </div>
          <p className="product-handle-button-count">{count}</p>
          <div
            className="product-handle-button-box"
            onClick={() => operation('plus')}
          >
            <img src={Plus} alt="plus" />
          </div>
        </div>
        <p className="product-handle-price">{product.price}</p>
      </div>
    </div>
  );
};
