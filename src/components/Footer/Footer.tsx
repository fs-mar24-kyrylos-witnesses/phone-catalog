import React, { useEffect } from 'react';
import './Footer.scss';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Icon } from '../../UI/Icons/Icon';
import { Arrow } from '../../UI/Icons/arrow/arrow';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);
  return (
    <footer>
      <div className="footer">
        <div className="footer__content">
          <div className="footer__logo-wrapper">
            <Link to="/" className="footer__logo">
              <div className="header__logo">
                <Icon name={`logo`} />
              </div>
            </Link>
          </div>

          <div className="footer__links-block">
            <Link
              to="https://github.com/fs-mar24-kyrylos-witnesses/phone-catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              {t('github')}
            </Link>

            <Link to="contacts" className="footer__link">
              {t('contacts')}
            </Link>

            <Link to="rights" className="footer__link">
              {t('rights')}
            </Link>
          </div>

          <div className="footer__anchor">
            <span className="footer__label">{t('backToTop')}</span>
            <Link
              to="#"
              onClick={() => window.scrollTo(0, 0)}
              className="footer__link footer__link--top"
            >
              <Arrow direction="up" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
