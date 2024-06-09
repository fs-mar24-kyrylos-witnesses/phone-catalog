import React from 'react';
import './Header.scss';
import { useProductStore } from '../../store/productStore';
import { Link } from 'react-router-dom';

import logo from '../../assets/icons/logo.svg';
import like from '../../assets/icons/heart.svg';
import cart from '../../assets/icons/cart-icon.svg';
import menu from '../../assets/icons/menu.svg';

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
          <Link className="header__nav-link" to="#home">
            HOME
          </Link>
          <Link className="header__nav-link" to="#phones">
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
          <Link to="#favorites">
            <img className="header__icons__icon-like" src={like} alt="Like" />
          </Link>
        </div>
        <div className="header__icons__container header__icons__container-cart">
          <Link to="#cart">
            <img
              className="header__icons__icon-cart"
              src={cart}
              alt="Shopping Cart"
            />
          </Link>
        </div>
        <div
          className="header__icons__container header__icons__container-menu"
          onClick={toggleMenu}
        >
          <Link to="#menu">
            <img className="header__icons__icon-menu" src={menu} alt="Menu" />
          </Link>
        </div>
      </div>
    </header>
  );
};
