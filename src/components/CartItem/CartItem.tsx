import '../Skeleton/Skeleton.scss';

import './CartItem.scss';
import { Product } from '../../types/Product';
import { useProductStore, useStore } from '../../store/productStore';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonDarkTheme } from '../Skeleton/SkeletonDarkTheme';
import { Icon } from '../../UI/Icons/Icon';

type Props = {
  product: Product;
  count: number;
  setCount: (count: number) => void;
};

export const CartItem: React.FC<Props> = ({ product, count, setCount }) => {
  const { removeFrom } = useStore();
  const { getDelay, delay } = useProductStore();

  useEffect(() => {
    getDelay();
  }, [getDelay]);

  const handleIncrease = () => setCount(count + 1);
  const handleDecrease = () => setCount(count > 1 ? count - 1 : 1);

  return (
    <div className="product">
      <div className="product-info">
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => removeFrom(product.itemId, 'cart')}
        >
          <Icon name="close" />
        </div>
        <Link to={`/${product.category}/${product.itemId}`}>
          {delay ? (
            <SkeletonDarkTheme>
              <Skeleton width={66} height={69} />
            </SkeletonDarkTheme>
          ) : (
            <img
              className="product-info-img"
              src={product.image}
              alt="product"
            />
          )}
        </Link>
        <p className="product-info-title">
          {delay ? (
            <SkeletonDarkTheme>
              <Skeleton className="skeleton-title" />
            </SkeletonDarkTheme>
          ) : (
            product.name
          )}
        </p>
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
            <Icon name="minus" />
          </div>
          <div className="product-handle-buttons-count">
            <p className="product-handle-buttons-count-text">{count}</p>
          </div>
          <div
            className="product-handle-buttons-box"
            onClick={() => handleIncrease()}
          >
            <Icon name="plus" />
          </div>
        </div>
        <p className="product-handle-price">
          {delay ? (
            <SkeletonDarkTheme>
              <Skeleton width={60} height={30} />
            </SkeletonDarkTheme>
          ) : (
            `$${product.price * count}`
          )}
        </p>
      </div>
    </div>
  );
};
