import React from 'react';
import './Footer.scss';
import logo from '../../assets/icons/logo.svg';
import arrowUp from '../../assets/icons/arrow-up.svg';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container footer">
        <div className="footer__content">
          <div className="footer__logo-wrapper">
            <Link to="/" className="footer__logo">
              <img className="footer__img" alt="logo" src={logo} />
            </Link>
          </div>

          <div className="footer__links-block">
            <Link
              to="https://github.com/fs-mar24-kyrylos-witnesses/phone-catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              GITHUB
            </Link>

            <Link to="contacts" className="footer__link">
              CONTACTS
            </Link>

            <Link to="rights" className="footer__link">
              RIGHTS
            </Link>
          </div>

          <div className="footer__anchor">
            <span className="footer__label">Back to top</span>
            <Link
              to="#"
              onClick={() => window.scrollTo(0, 0)}
              className="footer__link footer__link--top"
            >
              <img src={arrowUp} alt="Arrow Up" className="footer__arrow" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
