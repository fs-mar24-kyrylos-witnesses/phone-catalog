import React from 'react';
import './Header.scss';
import { useProductStore } from '../../store/productStore';

import logo from '../../assets/icons/Logo.svg';
import like from '../../assets/icons/heart.svg';
import cart from '../../assets/icons/Shopping bag (Cart).svg';
import menu from '../../assets/icons/Menu.svg';

export const Header: React.FC = () => {
  const isMenuOpen = useProductStore(state => state.isMenuOpen);
  const toggleMenu = useProductStore(state => state.toggleMenu);

  return (
    <header className="header">
      <div className="header__container">
        <a href="#home">
          <img src={logo} alt="NiceGadgetsLogo" className="header__logo" />
        </a>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
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
          <a href="#favorites">
            <img className="header__icons__icon-like" src={like} alt="Like" />
          </a>
        </div>
        <div className="header__icons__container header__icons__container-cart">
          <a href="#cart">
            <img
              className="header__icons__icon-cart"
              src={cart}
              alt="Shopping Cart"
            />
          </a>
        </div>
        <div
          className="header__icons__container header__icons__container-menu"
          onClick={toggleMenu}
        >
          <a href="#menu">
            <img className="header__icons__icon-menu" src={menu} alt="Menu" />
          </a>
        </div>
      </div>
    </header>
  );
};
