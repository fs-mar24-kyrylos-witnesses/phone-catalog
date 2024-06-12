import React, { useEffect, useState } from 'react';
import './CartPage.scss';
import { useProductStore, useStore } from '../../store/productStore';
// import { Link } from 'react-router-dom';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import emptyCart from '../../../public/img/cart-is-empty.png';
import { CartItem } from '../../components/CartItem';
import { Product } from '../../types/Product';

export const CartPage: React.FC = () => {
  const { catalogProducts } = useProductStore();
  const { cartProducts, getLength } = useStore();

  const cart: Product[] = cartProducts
    .map(prod => catalogProducts.find(item => prod === item.itemId))
    .filter((item): item is Product => item !== undefined);

  const [counts, setCounts] = useState(cart.map(() => 1));

  useEffect(() => {
    const newCounts = cart.map(item => {
      return counts[cart.indexOf(item)] || 1;
    });
    setCounts(newCounts);
  }, [cart, cartProducts, counts]);

  const handleCountChange = (index: number, newCount: number) => {
    const newCounts = [...counts];
    newCounts[index] = newCount;
    setCounts(newCounts);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item, index) => {
      return total + item.price * counts[index];
    }, 0);
  };

  return (
    <>
      {cartProducts.length > 0 ? (
        <div className="container-cart">
          <div className="title">
            <div onClick={() => history.go(-1)} className="title-map">
              <img className="title-map-img" src={arrowLeft} alt="arrLeft" />
              <span className="title-map-back">Back</span>
            </div>
            <h1>Cart</h1>
          </div>
          <div className="fav-items">
            {cart.map((item, index) => (
              <CartItem
                key={item?.itemId}
                product={item!}
                count={counts[index]}
                setCount={(newCount: number) =>
                  handleCountChange(index, newCount)
                }
              />
            ))}
          </div>
          <div className="checkout">
            <p className="checkout-price">{`$${getTotalPrice()}`}</p>
            <p className="checkout-total">{`Total for ${getLength('cart')} items`}</p>
            <div className="checkout-button">
              <p className="checkout-button-text">Checkout</p>
            </div>
          </div>
    <div className="container-cart">
      <div className="title">
        <div className="title-map">
          <img className="title-map-img" src={arrowLeft} alt="arrLeft" />
          <span className="title-map-back">Back</span>
        </div>
      ) : (
        <div className="emptyCartContain">
          <img className="emptyCart" src={emptyCart} alt="empty cart" />
        </div>
      )}
    </>
  );
};
