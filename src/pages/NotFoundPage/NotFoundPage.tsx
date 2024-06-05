import React from 'react';

import notFound from '/img/page-not-found.png';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found">
      <img className="not-found__img" src={notFound} />
    </div>
  );
};
