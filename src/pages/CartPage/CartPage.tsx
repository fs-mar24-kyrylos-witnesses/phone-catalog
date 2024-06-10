import React from 'react';
import './CartPage.scss';
import { useProductStore, useStore } from '../../store/productStore';
// import { Link } from 'react-router-dom';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import { CartItem } from '../../components/CartItem';
// import { Product } from '../../types/Product';

export const CartPage: React.FC = () => {
  const { cartProducts } = useStore();
  const { catalogProducts } = useProductStore();

  const favsProducts = cartProducts.map(favSlug =>
    catalogProducts.find(item => favSlug === item.itemId),
  );

  const getTotalPrice = () => {
    return favsProducts.reduce((acc, item) => (item ? acc + item.price : 0), 0);
  };

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
        {favsProducts.map(item => (
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
