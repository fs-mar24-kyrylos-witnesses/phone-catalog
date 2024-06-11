import React from 'react';
import './CartPage.scss';
import { useStore } from '../../store/productStore';
// import { Link } from 'react-router-dom';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import { CartItem } from '../../components/CartItem';
// import { Product } from '../../types/Product';

export const CartPage: React.FC = () => {
  const { getTotalPrice, bagProducts } = useStore();

  return (
    <div className="container">
      <div className="title">
        <div className="title-map">
          <img src={arrowLeft} alt="arrLeft" />
          <p className="title-map-back">Back</p>
        </div>
        <h1>Cart</h1>
      </div>
      <div className="fav-items">
        {bagProducts.map(item => (
          <CartItem key={item?.itemId} product={item!} />
        ))}
      </div>
      <div className="checkout">
        <p className="checkout-price">{getTotalPrice()}</p>
        <div className="checkout-button">Checkout</div>
      </div>
    </div>
  );
};
