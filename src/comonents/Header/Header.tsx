import React from 'react';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <a className="header__logo" href="#home"></a>

        <nav className="header__nav">
          <a className="header__nav-link" href="#home">
            HOME
          </a>
          <a className="header__nav-link" href="#phones">
            PHONES
          </a>
          <a className="header__nav-link" href="#tablets">
            TABLETS
          </a>
          <a className="header__nav-link" href="#accessories">
            ACCESSORIES
          </a>
        </nav>
      </div>

      <div className="header__icons">
        <div className="header__icons__container header__icons__container-like">
          <a className="header__icons__icon-like" href="#favorites"></a>
        </div>
        <div className="header__icons__container header__icons__container-cart">
          <a className="header__icons__icon-cart" href="#cart"></a>
        </div>
        <div className="header__icons__container header__icons__container-menu">
          <a className="header__icons__icon-menu" href="#menu"></a>
        </div>
      </div>
    </header>
  );
};
