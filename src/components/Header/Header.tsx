import React from 'react';
import './Header.scss';
import cn from 'classnames';
import { useProductStore } from '../../store/productStore';
import { Link } from 'react-router-dom';

import logo from '../../assets/icons/logo.svg';
import like from '../../assets/icons/heart.svg';
import cart from '../../assets/icons/cart-icon.svg';
import menu from '../../assets/icons/menu.svg';
import close from '../../assets/icons/close.svg';

export const Header: React.FC = () => {
  const isMenuOpen = useProductStore(state => state.isMenuOpen);
  const toggleMenu = useProductStore(state => state.toggleMenu);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="">
          <img src={logo} alt="NiceGadgetsLogo" className="header__logo" />
        </Link>

        <nav
          className={cn('nav', {
            'nav--open': isMenuOpen,
          })}
        >
          <div className="nav__container">
            <Link className="nav__container-link" to="home">
              HOME
            </Link>

            <Link className="nav__container-link" to="phones">
              PHONES
            </Link>

            <Link className="nav__container-link" to="tablets">
              TABLETS
            </Link>

            <Link className="nav__container-link" to="accessories">
              ACCESSORIES
            </Link>
          </div>

          <div className="nav__icons">
            <Link
              className="nav__icons__container nav__icons__container-like"
              to="favorites"
            >
              <img className="nav__icons__icon-like" src={like} alt="Like" />
            </Link>

            <Link
              className="nav__icons__container nav__icons__container-cart"
              to="cart"
            >
              <img
                className="nav__icons__icon-cart"
                src={cart}
                alt="Shopping Cart"
              />
            </Link>
          </div>
        </nav>

        <div className="header__menu" onClick={toggleMenu}>
          <a className="header__menu-link" href="">
            {isMenuOpen ? (
              <img className="header__menu-icon" src={close} alt="Close" />
            ) : (
              <img src={menu} alt="Menu" />
            )}
          </a>
        </div>
      </div>
    </header>
  );
};
