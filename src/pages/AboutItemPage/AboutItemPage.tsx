import './AboutItemPage.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Slider } from '../../components/Slider';

import { useStore, useProductStore } from '../../store/productStore';
import { getProductSpecs } from '../../helper/getProductSpecs';

// ICONS
import home from '../../assets/icons/home.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import heart from '../../assets/icons/heart.svg';
import heartFilled from '../../assets/icons/heart-filled.svg';

// TYPES
import { Spec } from '../../types/Spec';
import { Product } from '../../types/Product';
import { Color } from '../../types/Color';

// helpers
import { getColorHex } from '../../helper/getColorHex';
import { getNewColorSlug, getNewRamSlug } from '../../helper/getNewSlug';
import { Category } from '../../types/Category';
import { ProductInfo } from '../../types/ProductInfo';
import { SkeletonDarkTheme } from '../../components/Skeleton/SkeletonDarkTheme';

type Props = {
  categoryArea: Category;
};

function normalizeCapacity(capacity: string) {
  return capacity.slice(0, capacity.length - 2) + ' ' + capacity.slice(-2);
}

// todo -- ADD PAGE CHANGE ON CAPACITY OR COLOR SWITCH

export const AboutItemPage: React.FC<Props> = ({ categoryArea }) => {
  const normalizedCategory =
    categoryArea[0].toUpperCase() + categoryArea.slice(1);

  const { itemId } = useParams(); // our product id
  const { catalogProducts, fetchProductById, getDelay, delay } =
    useProductStore(); // func that gives product depending on the id and category
  const { favourites, cartProducts, addTo, removeFrom } = useStore();

  const [selectedProduct, setSelectedProduct] = useState<
    ProductInfo | undefined
  >(undefined);
  const [productSpecs, setProductSpecs] = useState<Spec[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<Color | undefined>();
  const [selectedCapacity, setSelectedCapacity] = useState<
    string | undefined
  >();
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getDelay();
  }, [getDelay]);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchProductById(itemId || '', categoryArea).then(response => {
      setSelectedProduct(response);

      if (response) {
        setProductSpecs(getProductSpecs(response));
        setProductImages(response.images);
        setSelectedImage(response.images[0]);
        setSelectedColor(response.color);
        setSelectedCapacity(response.capacity);

        setRecommendedProducts(
          catalogProducts
            .filter(item => item.category === categoryArea)
            .sort(() => Math.random() - 0.5) // shuffling the array to take random 12 products
            .slice(0, 12),
        );
      }
    });
  }, [
    catalogProducts,
    categoryArea,
    fetchProductById,
    itemId,
    setRecommendedProducts,
  ]);

  const shortProductSpecs = productSpecs.slice(0, 4);

  const toggleFavorite = (productId: string) => {
    console.log('TOGGLING FAVORITE ', productId);
    if (favourites.includes(productId)) {
      removeFrom(productId, 'fav');
    } else {
      addTo(productId, 'fav');
    }
  };

  const toggleCart = (productId: string) => {
    console.log('TOGGLING CART ', productId);
    if (cartProducts.includes(productId)) {
      removeFrom(productId, 'cart');
    } else {
      addTo(productId, 'cart');
    }
  };

  return (
    <div className="container">
      {selectedProduct ? (
        <div className="about-item-page">
          <div className="breadcrumbs">
            <Link to="/home">
              <img className="breadcrumbs__home" src={home} alt="Home" />
            </Link>
            <img className="breadcrumbs__arrow" src={arrowRight} alt="arrow" />
            <Link to={`/${categoryArea}`}>
              <span className="breadcrumbs__text breadcrumbs__text--category small-text">
                {normalizedCategory}
              </span>
            </Link>
            <img className="breadcrumbs__arrow" src={arrowRight} alt="arrow" />
            <Link to={``}>
              <span className="breadcrumbs__text breadcrumbs__text--model small-text">
                {selectedProduct?.name}
              </span>
            </Link>
          </div>

          <Link className="back-button__container" to={`/${categoryArea}`}>
            <img className="back-button__icon" src={arrowLeft} alt="arrow" />
            <span className="back-button__text small-text">Back</span>
          </Link>

          <h2 className="product-name h2">{selectedProduct?.name}</h2>

          <div className="product-section">
            <div className="product-images">
              {productImages.map(photo => (
                <img
                  key={photo}
                  src={photo}
                  alt="Product image"
                  className={cn('product-images__image', {
                    'product-images__image--selected': selectedImage === photo,
                  })}
                  onClick={() => setSelectedImage(photo)}
                />
              ))}
            </div>

            <div className="selected-image-container">
              {productImages.map(photo => (
                <div
                  key={photo}
                  style={{ backgroundImage: `url(${photo})` }}
                  className={cn('selected-image', {
                    'selected-image--active': selectedImage === photo,
                  })}
                  aria-label="Product image"
                ></div>
              ))}
            </div>

            <div className="product-properties">
              <section className="colors">
                <div className="colors__title">
                  <p className="colors__title-available small-text">
                    Available colors
                  </p>
                  <span className="colors__title-id small-text">
                    ID: 000000
                  </span>
                </div>
                <div className="colors__selection">
                  {selectedProduct?.colorsAvailable.map(color => (
                    <Link
                      key={color}
                      to={`../${getNewColorSlug(selectedProduct, color)}`}
                      className={cn('circle-button', {
                        'circle-button--selected': color === selectedColor,
                      })}
                    >
                      <div
                        className="circle-button__color"
                        style={{ backgroundColor: getColorHex(color) }}
                      ></div>
                    </Link>
                  ))}
                </div>

                <div className="separator"></div>
              </section>

              <section className="capacity">
                <p className="capacity__title-available small-text">
                  Select capacity
                </p>
                <div className="capacity__selection">
                  {selectedProduct?.capacityAvailable.map(capacity => (
                    <Link
                      key={capacity}
                      to={`../${getNewRamSlug(selectedProduct, capacity)}`}
                    >
                      <button
                        className={cn('capacity-button', 'body-text', {
                          'capacity-button--selected':
                            capacity === selectedCapacity,
                        })}
                        onClick={() => setSelectedCapacity(capacity)}
                      >
                        {normalizeCapacity(capacity)}
                      </button>
                    </Link>
                  ))}
                </div>

                <div className="separator"></div>
              </section>

              <section className="buy">
                <div className="buy__price">
                  {!selectedProduct?.priceDiscount ||
                  selectedProduct.priceDiscount ===
                    selectedProduct.priceRegular ? (
                    <span className="buy__price-main h2">
                      ${selectedProduct?.priceRegular}
                    </span>
                  ) : (
                    <>
                      <span className="buy__price-main h2">
                        ${selectedProduct?.priceDiscount}
                      </span>
                      <span className="buy__price-discount">
                        ${selectedProduct?.priceRegular}
                      </span>
                    </>
                  )}
                </div>

                <div className="buy__buttons">
                  <button
                    className={cn('buy__add-to-cart', 'button-text', {
                      'buy__add-to-cart--selected': cartProducts.includes(
                        selectedProduct?.id || '',
                        // todo -- delete this bullshit
                      ),
                    })}
                    onClick={() => toggleCart(selectedProduct?.id || '')}
                  >
                    Add to cart
                  </button>

                  <button
                    className={cn('buy__favorite', 'button-text', {
                      'buy__favorite--selected': cartProducts.includes(
                        selectedProduct?.id || '',
                        // todo -- delete this bullshit
                      ),
                    })}
                    onClick={() => toggleFavorite(selectedProduct?.id || '')}
                  >
                    <img
                      src={
                        favourites.includes(selectedProduct?.id || '')
                          ? heartFilled
                          : heart
                      }
                      alt="Add to favorite"
                    />
                  </button>
                </div>
              </section>

              <ul className="short-specs">
                {shortProductSpecs.map(spec => (
                  <li className="short-specs__spec" key={spec.title}>
                    {delay ? (
                      <SkeletonDarkTheme>
                        <Skeleton width={80} height={10} />
                      </SkeletonDarkTheme>
                    ) : (
                      <span className="short-specs__spec-name small-text">
                        {spec.title}
                      </span>
                    )}
                    {delay ? (
                      <SkeletonDarkTheme>
                        <Skeleton width={80} height={15} />
                      </SkeletonDarkTheme>
                    ) : (
                      <span className="short-specs__spec-value small-text">
                        {spec.value}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="info-section">
            <section className="about">
              <h3 className="about__title h3">About</h3>

              <div className="separator"></div>

              {selectedProduct?.description.map(section => (
                <div className="about__section" key={section.title}>
                  <h4 className="about__section-title h4">
                    {delay ? (
                      <SkeletonDarkTheme>
                        <Skeleton className="about__section-title h4" />
                      </SkeletonDarkTheme>
                    ) : (
                      section.title
                    )}
                  </h4>

                  {section.text.map(text => (
                    <p className="about__section-text body-text" key={text}>
                      {delay ? (
                        <SkeletonDarkTheme>
                          <Skeleton count={3} height={15} />
                        </SkeletonDarkTheme>
                      ) : (
                        text
                      )}
                    </p>
                  ))}
                </div>
              ))}
            </section>

            <section className="specs">
              <h3 className="specs__title h3">Tech specs</h3>

              <div className="separator"></div>

              <ul className="specs__container">
                {productSpecs.map(spec => (
                  <li className="specs__spec-section" key={spec.title}>
                    {delay ? (
                      <SkeletonDarkTheme>
                        <Skeleton width={100} height={20} />
                      </SkeletonDarkTheme>
                    ) : (
                      <span className="specs__spec-name body-text">
                        {spec.title}
                      </span>
                    )}
                    {delay ? (
                      <SkeletonDarkTheme>
                        <Skeleton width={100} height={20} />
                      </SkeletonDarkTheme>
                    ) : (
                      <span className="specs__spec-value body-text">
                        {spec.value}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="slider-section slider--no-margin">
            <Slider
              titleName="You may also like"
              products={recommendedProducts}
            ></Slider>
          </section>
        </div>
      ) : (
        <div className="no-item">
          <img
            src="./public/img/page-not-found.png"
            alt="Item not found"
            className="no-item__image"
          />
          <h2 className="no-item__message h2">
            Whoops! We couldn&#39;t find this item...
          </h2>
          <p className="no-item__description body-text">
            Are you sure it is somewhere here?
          </p>
        </div>
      )}
    </div>
  );
};
