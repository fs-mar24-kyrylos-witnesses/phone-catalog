import React from 'react';

import Minus from '../../assets/icons/item-minus.svg';
import Plus from '../../assets/icons/item-plus.svg';
import Union from '../../assets/icons/Close.svg';
import Photo from '../../assets/icons/iphone-In-cart-Item.png';

import './CartItem.scss';

export const CartItem = () => {
  const [count, setCount] = React.useState(1);

  function handleClickPlus() {
    setCount(count + 1);
  }

  function handleClickMinus() {
    if (count > 1) {
      setCount(count - 1);
    }
  }
  return (
    <div className="card-item__container">
      <div className="card-item">
        <div className="cross">
          <img src={Union} alt="union" />
        </div>
        <div className="cart-item__img">
          <img src={Photo} alt="Photo" />
        </div>
        <p className="cart-item__name">
          Apple iPhone 14 Pro 128GB Silver (MQ023)
        </p>
        <div className="cart-item__buttons">
          <div className="cart-item__buttons-icons">
            <img
              src={Minus}
              alt="minus"
              className="cart-item__buttons-icon"
              onClick={handleClickMinus}
            />
          </div>
          <div className="cart-item__count">{count}</div>
          <div className="cart-item__buttons-icons">
            <img
              src={Plus}
              alt="plus"
              className="cart-item__buttons-icon"
              onClick={handleClickPlus}
            />
          </div>
        </div>
        <p className="cart-item__price">1000</p>
      </div>
    </div>
  );
};
