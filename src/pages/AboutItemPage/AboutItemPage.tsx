import './AboutItemPage.scss';

import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Slider } from '../../components/Slider';

import { useProductStore } from '../../store/productStore';
import { Category } from '../../types/Category';

import home from '../../assets/icons/home.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import arrowLeft from '../../assets/icons/arrow-left.svg';

import { getProductSpecs } from '../../helper/getProductSpecs';
import { Spec } from '../../types/Spec';

type Props = {
  categoryArea: Category;
};

function normalizeCapacity(capacity: string) {
  return capacity.slice(0, capacity.length - 2) + ' ' + capacity.slice(-2);
}

export const AboutItemPage: React.FC<Props> = ({ categoryArea }) => {
  const normalizedCategory =
    categoryArea[0].toUpperCase() + categoryArea.slice(1);

  const { catalogProducts } = useProductStore();
  const recommendedProducts = catalogProducts
    .filter(item => item.category === categoryArea)
    .sort(() => Math.random() - 0.5) // shuffling the array to take random 12 products
    .slice(0, 12);

  const { itemId } = useParams(); // our product id
  const { fetchProductById } = useProductStore(); // func that gives product depending on the id and category
  const selectedProduct = useProductStore(state => state.selectedProduct); // finally selected product
  let productSpecs: Spec[] = [];

  // todo -- add null handler
  if (selectedProduct) {
    productSpecs = getProductSpecs(selectedProduct);
  }

  const shortProductSpecs = productSpecs.slice(0, 4);

  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedCapacity, setSelectedCapacity] = useState<
    string | undefined
  >();

  useEffect(() => {
    window.scrollTo(0, 0);
    itemId?.toString() && fetchProductById(itemId, categoryArea);
  }, [itemId, categoryArea, fetchProductById]);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedColor(selectedProduct.color);
      setSelectedCapacity(selectedProduct.capacity);
    }
  }, [selectedProduct]);

  return (
    <div className="container">
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
          <div className="photos">photos will be here</div>

          <div className="product-properties">
            <section className="colors">
              <div className="colors__title">
                <p className="colors__title-available small-text">
                  Available colors
                </p>
                <span className="colors__title-id small-text">ID: 000000</span>
              </div>
              <div className="colors__selection">
                {selectedProduct?.colorsAvailable.map(color => (
                  <button
                    key={color}
                    className={cn('circle-button', {
                      'circle-button--selected': color === selectedColor,
                    })}
                    onClick={() => setSelectedColor(color)}
                  >
                    <div
                      className="circle-button__color"
                      style={{ backgroundColor: color }}
                    ></div>
                  </button>
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
                  <button
                    className={cn('capacity-button', 'body-text', {
                      'capacity-button--selected':
                        capacity === selectedCapacity,
                    })}
                    key={capacity}
                    onClick={() => setSelectedCapacity(capacity)}
                  >
                    {normalizeCapacity(capacity)}
                  </button>
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
                <button className="buy__add-to-cart button-text">
                  Add to cart
                </button>

                <button className="buy__favorite">
                  <div className="buy__favorite-image"></div>
                </button>
              </div>
            </section>

            <ul className="short-specs">
              {shortProductSpecs.map(spec => (
                <li className="short-specs__spec" key={spec.title}>
                  <span className="short-specs__spec-name small-text">
                    {spec.title}
                  </span>
                  <span className="short-specs__spec-value small-text">
                    {spec.value}
                  </span>
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
                <h4 className="about__section-title h4">{section.title}</h4>

                {section.text.map(text => (
                  <p className="about__section-text body-text" key={text}>
                    {text}
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
                  <span className="specs__spec-name body-text">
                    {spec.title}
                  </span>
                  <span className="specs__spec-value body-text">
                    {spec.value}
                  </span>
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
    </div>
  );
};
