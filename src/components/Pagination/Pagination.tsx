import classNames from 'classnames';
import React from 'react';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import { SearchLink } from '../../helper/SearchLink/SearchLink';
import './Pagination.scss';

type Props = {
  pages: number[];
  page: string;
  handlePageChange: (page: number) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

export const Pagination: React.FC<Props> = ({
  pages,
  page,
  handlePageChange,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <div className="pagination-container">
      <ul className="pagination">
        <div className="pagination-items-box" onClick={handlePrevPage}>
          <li
            aria-disabled={+page! === 1}
            className={classNames('pagination-page-item', {
              disabled: +page! === 1,
            })}
          >
            <img src={arrowLeft} alt="left" />
          </li>
        </div>

        <div className="pagination-items">
          {pages.map(pageMap => (
            <SearchLink key={pageMap} params={{ page: pageMap.toString() }}>
              <div
                key={pageMap}
                className={classNames('pagination-items-box', {
                  active: +page! === pageMap,
                })}
              >
                <li
                  className={classNames('pagination-items-box-item', {
                    active: +page! === pageMap,
                  })}
                  onClick={() => handlePageChange(pageMap)}
                >
                  {pageMap}
                </li>
              </div>
            </SearchLink>
          ))}
        </div>

        <div className="pagination-items-box" onClick={handleNextPage}>
          <li
            className={classNames('pagination-page-item', {
              disabled: +page! === pages.length,
            })}
            aria-disabled={+page! === pages.length}
          >
            <img src={arrowRight} alt="right" />
          </li>
        </div>
      </ul>
    </div>
  );
};
