import React from 'react';
import './Header.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { useStore, useProductStore } from '../../store/productStore';

import { LanguagesSelector } from '../LanguagesSelector/LanguagesSelector';
import { useTranslation } from 'react-i18next';

import logo from '../../assets/icons/logo.svg';
import like from '../../assets/icons/heart.svg';
import cart from '../../assets/icons/cart-icon.svg';
import menu from '../../assets/icons/menu.svg';
import close from '../../assets/icons/close.svg';

export const Header: React.FC = () => {
  const { favourites, cartProducts, getLength } = useStore();

  const isMenuOpen = useProductStore(state => state.isMenuOpen);
  const toggleMenu = useProductStore(state => state.toggleMenu);
  const { t } = useTranslation();

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
              {t('home')}
            </Link>

            <Link className="nav__container-link" to="phones">
              {t('phones')}
            </Link>

            <Link className="nav__container-link" to="tablets">
              {t('tablets')}
            </Link>

            <Link className="nav__container-link" to="accessories">
              {t('accessories')}
            </Link>
          </div>

          <div className="nav__icons">
            <LanguagesSelector />
            <Link
              className="nav__icons__container nav__icons__container-like"
              to="favourites"
            >
              {favourites.length > 0 && (
                <div className="adding">
                  <span className="length">
                    {favourites.length > 0 && getLength('fav')}
                  </span>
                </div>
              )}
              <img className="nav__icons__icon-like" src={like} alt="Like" />
            </Link>

            <Link
              className="nav__icons__container nav__icons__container-cart"
              to="cart"
            >
              {cartProducts.length > 0 && (
                <div className="adding">
                  <span className="length">
                    {cartProducts.length > 0 && getLength('cart')}
                  </span>
                </div>
              )}
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
