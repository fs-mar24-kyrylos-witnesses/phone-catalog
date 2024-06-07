import React from 'react';
import './Footer.scss';
import logo from '../../assets/icons/Logo.svg';
import arrowUp from '../../assets/icons/arrow-up.svg';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container footer">
        <div className="footer__content">
          <div className="footer__logo-wrapper">
            <a href="/" className="footer__logo">
              <img className="footer__img" alt="logo" src={logo} />
            </a>
          </div>

          <div className="footer__links-block">
            <a
              href="https://github.com/fs-mar24-kyrylos-witnesses/phone-catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              GITHUB
            </a>

            <a href="/" className="footer__link">
              CONTACTS
            </a>

            <a href="/" className="footer__link">
              RIGHTS
            </a>
          </div>

          <div className="footer__anchor">
            <span className="footer__label">Back to top</span>
            <a href="#top" className="footer__link footer__link--top">
              <img src={arrowUp} alt="Arrow Up" className="footer__arrow" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
