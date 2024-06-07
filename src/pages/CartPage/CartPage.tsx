import React from 'react';
import './CartPage.scss';
import goBackIcon from '../../assets/icons/arrow-left.svg';
import { CartItem } from '../../components/CartItem/CartItem';

export const CartPage: React.FC = () => {
  return (
    <div>
      <div className="cart">
        <div className="button-go-back">
          <img src={goBackIcon} alt="Go back" className="button-go-back__img" />
          <a href=".." className="button-go-back__link">
            Go back
          </a>
        </div>

        <h1 className="cart__title">Cart</h1>
        <div className="cart__content-wrapper">
          <div className="cart__content">
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className="cart__summary">
            <div className="cart__total-price">$2000</div>
            <div className="cart__total-price--label">Total for 2 items</div>
            <button type="button" className="cart__submit-btn">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
