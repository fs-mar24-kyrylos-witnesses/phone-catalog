import './AboutItemPage.scss';

import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

export const AboutItemPage: React.FC<Props> = ({ categoryArea }) => {
  const normalizedCategory = categoryArea;
  const { itemId } = useParams(); // our product id
  const { fetchProductById } = useProductStore(); // func that gives product depending on the id and category
  const selectedProduct = useProductStore(state => state.selectedProduct); // finally selected product
  let productSpecs: Spec[] = [];

  // todo -- add null handler
  if (selectedProduct) {
    productSpecs = getProductSpecs(selectedProduct);
  }

  const [selectedColor, setSelectedColor] = useState(selectedProduct?.color);
  const [selectedCapacity, setSelectedCapacity] = useState(
    selectedProduct?.capacity,
  );

  useEffect(() => {
    itemId?.toString() && fetchProductById(itemId, categoryArea);
  }, [itemId, categoryArea, fetchProductById]);

  return (
    <div className="about-item-page">
      <div className="category_header-map">
        <Link to="/home">
          <img className="category_header-map-homeIcon" src={home} alt="Home" />
        </Link>
        <img
          className="category_header-map-arrowRightIcon"
          src={arrowRight}
          alt="arrow"
        />
        <Link to={`/${categoryArea}`}>
          <span className="category_header-map-categoryName">
            {normalizedCategory}
          </span>
        </Link>
        <img
          className="category_header-map-arrowRightIcon"
          src={arrowRight}
          alt="arrow"
        />
        <Link to={``}>
          <span className="category_header-map-categoryName">
            {selectedProduct?.name}
          </span>
        </Link>
      </div>

      <Link className="back-button__container" to={`/${categoryArea}`}>
        <img className="back-button__icon" src={arrowLeft} alt="arrow" />
        <span className="back-button__text">Back</span>
      </Link>

      <h2 className="main-title product-name">{selectedProduct?.name}</h2>

      <div className="photos">photos will be here</div>

      <section className="colors">
        <div className="colors__title">
          <p className="colors__title-available">Available colors</p>
          <span className="colors__title-id">ID:</span>
        </div>
        <div className="colors__selection">
          {selectedProduct?.colorsAvailable.map(color => {
            return (
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
            );
          })}
        </div>

        <div className="separator"></div>
      </section>

      <section className="capacity">
        <p className="capacity__title-available">Select capacity</p>
        <div className="capacity__selection">
          {selectedProduct?.capacityAvailable.map(capacity => {
            return (
              <button
                className={cn('capacity-button', {
                  'capacity-button--selected': capacity === selectedCapacity,
                })}
                key={capacity}
                onClick={() => setSelectedCapacity(capacity)}
              >
                {capacity}
              </button>
            );
          })}
        </div>
      </section>

      <section className="buy">
        <div className="buy__price">
          {!selectedProduct?.priceDiscount ||
          selectedProduct.priceDiscount === selectedProduct.priceRegular ? (
            <span className="buy__price-main">
              ${selectedProduct?.priceRegular}
            </span>
          ) : (
            <>
              <span className="buy__price-main">
                ${selectedProduct?.priceDiscount}
              </span>
              <span className="buy__price-discount">
                ${selectedProduct?.priceRegular}
              </span>
            </>
          )}
        </div>

        <div className="buy__buttons">
          <button className="buy__add-to-cart">Add to cart</button>

          <button className="buy__favorite">
            <div className="buy__favorite-image"></div>
          </button>
        </div>
      </section>

      <section className="short-specs"></section>

      <section className="about">
        <h3 className="about__title">About</h3>

        <div className="separator"></div>

        {selectedProduct?.description.map(section => (
          <div className="about__section" key={section.title}>
            <h4 className="about__section-title">{section.title}</h4>

            {section.text.map(text => (
              <p className="about__section-text" key={text}>
                {text}
              </p>
            ))}
          </div>
        ))}
      </section>

      <section className="specs">
        <h3 className="specs__title">Tech specs</h3>

        <div className="separator"></div>

        <ul className="specs__container">
          {productSpecs.map(spec => (
            <li className="specs__spec-section" key={spec.title}>
              <span className="specs__spec-name">{spec.title}</span>
              <span className="specs__spec-value">{spec.value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="slider">slider will be here</section>
    </div>
  );
};
