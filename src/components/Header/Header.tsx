import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/productStore';

export const Header: React.FC = () => {
  const { favourites, cartProducts, getLength } = useStore();

  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" to="home"></Link>

        <nav className="header__nav">
          <Link className="header__nav-link" to="home">
            HOME
          </Link>
          <Link className="header__nav-link" to="phones">
            PHONES
          </Link>
          <Link className="header__nav-link" to="tablets">
            TABLETS
          </Link>
          <Link className="header__nav-link" to="accessories">
            ACCESSORIES
          </Link>
        </nav>
      </div>

      <div className="header__icons">
        <Link to="favourites">
          <div className="header__icons__container header__icons__container-like">
            {favourites.length > 0 && (
              <>
                <div className="adding"></div>
                <span className="length">
                  {favourites.length > 0 && getLength('fav')}
                </span>
              </>
            )}
            <Link className="header__icons__icon-like" to="favourites"></Link>
          </div>
        </Link>
        <Link to="cart">
          <div className="header__icons__container header__icons__container-cart">
            {cartProducts.length > 0 && (
              <>
                <div className="adding"></div>
                <span className="length">
                  {cartProducts.length > 0 && getLength('cart')}
                </span>
              </>
            )}
            <Link className="header__icons__icon-cart" to="cart"></Link>
          </div>
        </Link>
        <div className="header__icons__container header__icons__container-menu">
          <a className="header__icons__icon-menu" href="#menu"></a>
        </div>
      </div>
    </header>
  );
};
