import './AboutItemPage.scss';

import { Link, useParams } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import { useEffect, useState } from 'react';
import { Category } from '../../types/Category';

import home from '../../assets/icons/home.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import cn from 'classnames';

type Props = {
  categoryArea: Category;
};

export const AboutItemPage: React.FC<Props> = ({ categoryArea }) => {
  const normalizedCategory = categoryArea;
  const { itemId } = useParams(); // our product id
  const { fetchProductById } = useProductStore(); // func that gives product depending on the id and category
  const selectedProduct = useProductStore(state => state.selectedProduct); // finally selected product

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

      <div className="colors">
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
      </div>

      <div className="separator"></div>

      <div className="capacity">
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
      </div>

      <div className="separator"></div>
    </div>
  );
};
