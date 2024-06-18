import React from 'react';

import { useTranslation } from 'react-i18next';

import notFound from '/img/page-not-found.png';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <img src={notFound} alt="Item not found" className="not-found__image" />
      <h2 className="not-found__message h2">{t('notFound')}</h2>
      <p className="not-found__description body-text">{t('notFoundDesc')}</p>
    </div>
  );
};
