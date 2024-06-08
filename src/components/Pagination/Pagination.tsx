import classNames from 'classnames';
import React from 'react';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';

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
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: +page! === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          aria-disabled={+page! === 1}
          onClick={handlePrevPage}
        >
          <img src={arrowLeft} alt="left" />
        </a>
      </li>

      {pages.map(pageMap => (
        <li
          className={classNames('page-item', { active: +page! === pageMap })}
          key={pageMap}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            // href={`#${pageMap}`}
            onClick={() => handlePageChange(pageMap)}
          >
            {pageMap}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item', {
          disabled: +page! === pages.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          aria-disabled={+page! === pages.length}
          onClick={handleNextPage}
        >
          <img src={arrowRight} alt="right" />
        </a>
      </li>
    </ul>
  );

  // return (
  // <div className="category_pagination">
  //   <div className="category_pagination-button">
  //     <img src={arrowLeft} alt="left" onClick={handlePrevPage} />
  //   </div>

  //   {pages.map(page => (
  //     <div
  //       key={page}
  //       // className={className('category_pagination-pages', {
  //       //   'category_pagination-pages-active': page === currPage,
  //       // })}
  //       onClick={() => handlePageChange(page)}
  //     >
  //       <span>{page}</span>
  //     </div>
  //   ))}

  //   <div className="category_pagination-button">
  //     <img src={arrowRight} alt="right" onClick={handleNextPage} />
  //   </div>
  // </div>
  // );
};
