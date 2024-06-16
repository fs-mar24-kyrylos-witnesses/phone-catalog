import React, { PropsWithChildren, useEffect } from 'react';
import './Card.scss';
import '../Skeleton/Skeleton.scss';
import { Product } from '../../types/Product';
import filledHeart from '../../assets/icons/heart-filled.svg';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/productStore';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../UI/Icons/Icon';
import '../../prepare-styles/colors.scss';

import { useProductStore } from '../../store/productStore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonDarkTheme } from '../Skeleton/SkeletonDarkTheme';

type Props = {
  product: Product;
  category?: string;
};

export const Card: React.FC<Props> = ({ product, category }) => {
  const { favourites, cartProducts, addTo, removeFrom } = useStore();
  const { t } = useTranslation();
  const { delay, getDelay } = useProductStore();

  useEffect(() => {
    getDelay();
  }, [getDelay]);

  function InlineWrapperWithMargin({ children }: PropsWithChildren<unknown>) {
    return <span style={{ marginRight: '0.5rem' }}>{children}</span>;
  }

  return (
    <div className="card_container">
      <Link to={`/${category}/${product.itemId}`}>
        <div className="card_container-position">
          {delay ? (
            <SkeletonDarkTheme>
              <Skeleton width={200} height={191} />
            </SkeletonDarkTheme>
          ) : (
            <img
              className="card_container-img"
              src={product.image}
              alt={product.name}
            />
          )}
        </div>
      </Link>

      <Link to={`/${category}/${product.itemId}`}>
        <div className="card_container-info">
          {delay ? (
            <p className="card_container-title">
              <SkeletonDarkTheme>
                <Skeleton width={200} height={30} />
              </SkeletonDarkTheme>
            </p>
          ) : (
            <p className="card_container-title">{product.name}</p>
          )}
          {delay ? (
            <SkeletonDarkTheme>
              <Skeleton
                count={2}
                width={80}
                height={38}
                inline
                wrapper={InlineWrapperWithMargin}
              />
            </SkeletonDarkTheme>
          ) : (
            <div className="card_container-info-prices">
              <p className="card_container-info-prices-salePrice">
                ${product.price}
              </p>
              <p className="card_container-info-prices-fullPrice">
                ${product.fullPrice}
              </p>
            </div>
          )}
        </div>
      </Link>

      <Link to={`/${category}/${product.itemId}`}>
        <div className="card_container-about">
          <div className="card_container-about-characteristics">
            {delay ? (
              <>
                <p className="card_container-about-characteristics-title">
                  <SkeletonDarkTheme>
                    <Skeleton height={13} width={70} />
                  </SkeletonDarkTheme>
                </p>
                <p className="card_container-about-characteristics-value">
                  <SkeletonDarkTheme>
                    <Skeleton height={13} width={70} />
                  </SkeletonDarkTheme>
                </p>
              </>
            ) : (
              <>
                <p className="card_container-about-characteristics-title">
                  {t('screen')}
                </p>
                <p className="card_container-about-characteristics-value">
                  {product.screen}
                </p>
              </>
            )}
          </div>
          <div className="card_container-about-characteristics">
            {delay ? (
              <>
                <p className="card_container-about-characteristics-title">
                  <SkeletonDarkTheme>
                    <Skeleton height={13} width={70} />
                  </SkeletonDarkTheme>
                </p>
                <p className="card_container-about-characteristics-value">
                  <SkeletonDarkTheme>
                    <Skeleton height={13} width={70} />
                  </SkeletonDarkTheme>
                </p>
              </>
            ) : (
              <>
                <p className="card_container-about-characteristics-title">
                  {t('capacity')}
                </p>
                <p className="card_container-about-characteristics-value">
                  {product.capacity}
                </p>
              </>
            )}
          </div>
          <div className="card_container-about-characteristics">
            {delay ? (
              <>
                <p className="card_container-about-characteristics-title">
                  <SkeletonDarkTheme>
                    <Skeleton height={13} width={70} />
                  </SkeletonDarkTheme>
                </p>
                <p className="card_container-about-characteristics-value">
                  <SkeletonDarkTheme>
                    <Skeleton height={13} width={70} />
                  </SkeletonDarkTheme>
                </p>
              </>
            ) : (
              <>
                <p className="card_container-about-characteristics-title">
                  {t('RAM')}
                </p>
                <p className="card_container-about-characteristics-value">
                  {product.ram}
                </p>
              </>
            )}
          </div>
        </div>
      </Link>
      <div className="card_container-handle">
        {delay ? (
          <div>
            <SkeletonDarkTheme>
              <Skeleton width={150} height={40} />
            </SkeletonDarkTheme>
          </div>
        ) : cartProducts.includes(product.itemId) ? (
          <div
            onClick={() => removeFrom(product.itemId, 'cart')}
            className="card_container-handle-bag cart-bag"
          >
            <p className="card_container-handle-bag-addToBag cart-addToBag">
              {t('addedToCart')}
            </p>
          </div>
        ) : (
          <div
            onClick={() => addTo(product.itemId, 'cart')}
            className="card_container-handle-bag"
          >
            <p className="card_container-handle-bag-addToBag">
              {t('addToCart')}
            </p>
          </div>
        )}

        {delay ? (
          <div>
            <SkeletonDarkTheme>
              <Skeleton height={40} width={40} />
            </SkeletonDarkTheme>
          </div>
        ) : favourites.includes(product.itemId) ? (
          <div
            onClick={() => removeFrom(product.itemId, 'fav')}
            className="card_container-handle-favs cart-filled"
          >
            <img
              className="card_container-handle-favs-addToFavs"
              src={filledHeart}
              alt="Add to fav"
            />
          </div>
        ) : (
          <div
            onClick={() => addTo(product.itemId, 'fav')}
            className="card_container-handle-favs "
          >
            <div className="card_container-handle-favs-addToFavs">
              <Icon name="heart" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
