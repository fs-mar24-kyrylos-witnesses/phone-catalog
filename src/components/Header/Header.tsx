import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <a className="header__logo" href="#home"></a>

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
        <div className="header__icons__container header__icons__container-like">
          <Link className="header__icons__icon-like" to="favourites"></Link>
        </div>
        <div className="header__icons__container header__icons__container-cart">
          <Link className="header__icons__icon-cart" to="cart"></Link>
        </div>
        <div className="header__icons__container header__icons__container-menu">
          <a className="header__icons__icon-menu" href="#menu"></a>
        </div>
      </div>
    </header>
  );
};
