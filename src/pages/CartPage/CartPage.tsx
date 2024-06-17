import React, { useEffect, useState, useRef } from 'react';
import './CartPage.scss';
import { useProductStore, useStore } from '../../store/productStore';
import emptyCart from '/img/cart-is-empty.png';
import { CartItem } from '../../components/CartItem';
import { Product } from '../../types/Product';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonDarkTheme } from '../../components/Skeleton/SkeletonDarkTheme';
import { Arrow } from '../../UI/Icons/arrow/arrow';
import { Modall } from '../../components/Modal/Modal';

export const CartPage: React.FC = () => {
  const { catalogProducts } = useProductStore();
  const { cartProducts, getLength } = useStore();
  const { getDelay, delay } = useProductStore();
  const previousCartLength = useRef(0);

  useEffect(() => {
    getDelay();
  }, [getDelay]);

  const cart: Product[] = cartProducts
    .map(prod => catalogProducts.find(item => prod === item.itemId))
    .filter((item): item is Product => item !== undefined);

  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    if (cart.length !== previousCartLength.current) {
      setCounts(cart.map(() => 1));
      previousCartLength.current = cart.length;
    }
  }, [cart]);

  const handleCountChange = (index: number, newCount: number) => {
    setCounts(prevCounts => {
      const newCounts = [...prevCounts];
      newCounts[index] = newCount;
      return newCounts;
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item, index) => {
      return total + item.price * counts[index];
    }, 0);
  };

  const { t } = useTranslation();

  return (
    <>
      {cartProducts.length > 0 ? (
        <div className="container-cart">
          <div className="title">
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => history.go(-1)}
              className="title-map"
            >
              <Arrow direction="left" />
              <span className="title-map-back">{t('goBack')}</span>
            </div>
            <h1>{t('cart')}</h1>
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
            <p className="checkout-price">
              {delay ? (
                <SkeletonDarkTheme>
                  <Skeleton width={100} height={35} />
                </SkeletonDarkTheme>
              ) : (
                `$${getTotalPrice()}`
              )}
            </p>
            <p className="checkout-total">
              {delay ? (
                <SkeletonDarkTheme>
                  <Skeleton width={110} height={17} />
                </SkeletonDarkTheme>
              ) : (
                `${t('totalFor')} ${getLength('cart')} ${t('items')}`
              )}
            </p>
            <div className="checkout-button">
              <Modall />
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <img src={emptyCart} alt="Empty cart" className="empty-cart__image" />
          <h2 className="empty-cart__message h2">{t('YourCart')}</h2>
          <p className="empty-cart__description body-text">{t('LookAround')}</p>
        </div>
      )}
    </>
  );
};
