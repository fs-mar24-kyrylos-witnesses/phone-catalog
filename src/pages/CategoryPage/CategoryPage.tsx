import './CategoryPage.scss';
import { Link, useSearchParams } from 'react-router-dom';
import '../../prepare-styles/colors.scss';
import { CategoryArray } from '../../types/CategoryArray';
import { SortBy } from '../../types/SortBy';
import { PerPage } from '../../types/PerPage';
import { useProductStore } from '../../store/productStore';
import { Card } from '../../components/Card/Card';
import { filter } from '../../helper/filter/filter';
import { Pagination } from '../../components/Pagination/Pagination';
import { getNumbers } from '../../helper/getNumbers/getNumbers';
import { SearchLink } from '../../helper/SearchLink/SearchLink';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonDarkTheme } from '../../components/Skeleton/SkeletonDarkTheme';
import { Icon } from '../../UI/Icons/Icon';
import { Arrow } from '../../UI/Icons/arrow/arrow';

type Props = {
  category: CategoryArray;
};

export const CategoryPage: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { catalogProducts, getDelay, delay } = useProductStore();

  useEffect(() => {
    getDelay();
  }, [getDelay]);

  const actualProducts = catalogProducts.filter(
    item => item.category === category.path,
  );

  const filteredProducts = filter(actualProducts, searchParams);
  const total = filteredProducts.length;

  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || total.toString();

  const pagesCount = Math.ceil(total / +perPage!);
  const pages = getNumbers(1, pagesCount);
  const firstItem = (+page! - 1) * +perPage!;
  const lastItem = Math.min(+page! * +perPage!, total);
  const visibleItems = filteredProducts.slice(firstItem, lastItem);

  const handlePrevPage = () => {
    if (+page! > 1) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('page', (+page! - 1).toString());
      setSearchParams(newSearchParams.toString());
    }
  };

  const handleNextPage = () => {
    if (+page! !== pages.length) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('page', (+page! + 1).toString());
      setSearchParams(newSearchParams.toString());
    }
  };

  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('perPage', event.target.value);
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams.toString());
  };

  const handlePageChange = (selectedPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', selectedPage.toString());
    setSearchParams(newSearchParams.toString());
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('sort', event.target.value);
    setSearchParams(newSearchParams.toString());
  };
  const { t } = useTranslation();

  return (
    <>
      <div className="main-main">
        <div className="category_header">
          <div className="category_header-map">
            <Link to={`/home`}>
              <Icon name="home" />
            </Link>
            <Arrow direction="right" />
            <Link to={`/${category.path}`}>
              <span className="category_header-map-categoryName small-text">
                {category.name === 'Phones'
                  ? t('phones')
                  : category.name === 'Tablets'
                    ? t('tablets')
                    : category.name === 'Accessories'
                      ? t('accessories')
                      : category.name}
              </span>
            </Link>
          </div>
          <h1 className="main-title-category">
            {category.titleName === 'Mobile phones'
              ? t('mobilePhones')
              : category.titleName === 'Tablets'
                ? t('tablets')
                : category.titleName === 'Accessories'
                  ? t('accessories')
                  : category.titleName}
          </h1>
          <p className="category_header-itemsCount">
            {delay ? (
              <SkeletonDarkTheme>
                <Skeleton width={80} />
              </SkeletonDarkTheme>
            ) : (
              `${actualProducts.length} ${t('models')}`
            )}
          </p>
          <div className="category_header-sortAndPerpage">
            <div className="category_header-select">
              <span className="category_header-select-title">
                {t('sortBy')}
              </span>
              <select
                name="sort"
                className="category_header-sort-select"
                onChange={handleSort}
                value={searchParams.get('sort') || ''}
              >
                {SortBy.map(field => (
                  <option
                    className="category_header-sort-option"
                    key={field}
                    value={field.toLowerCase()}
                  >
                    <SearchLink params={{ sort: field }}>
                      {field === 'All'
                        ? t('all')
                        : field === 'Alphabet'
                          ? t('alphabet')
                          : field === 'Newest'
                            ? t('newest')
                            : field === 'Cheapest'
                              ? t('cheapest')
                              : field}
                    </SearchLink>
                  </option>
                ))}
              </select>
            </div>
            <div className="category_header-select">
              <span className="category_header-select-title">
                {t('itemsOnPage')}
              </span>
              <select
                name="perPage"
                className="category_header-sort-select"
                onChange={handlePerPage}
                value={searchParams.get('perPage') || total.toString()}
              >
                <option
                  className="category_header-sort-option"
                  value={filteredProducts.length}
                >
                  <SearchLink
                    params={{ perPage: filteredProducts.length.toString() }}
                  >
                    {t('all')}
                  </SearchLink>
                </option>
                {PerPage.map(field => (
                  <option
                    className="category_header-sort-option"
                    key={field}
                    value={field}
                  >
                    <SearchLink params={{ perPage: field }}>{field}</SearchLink>
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="category_product-container">
          {visibleItems.map(item => (
            <Card key={item.itemId} product={item} category={category.path} />
          ))}
        </div>
        {perPage !== total.toString() && (
          <Pagination
            pages={pages}
            page={page!}
            handlePageChange={handlePageChange}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        )}
      </div>
    </>
  );
};
