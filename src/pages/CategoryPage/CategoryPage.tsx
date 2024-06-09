import './CategoryPage.scss';
import { Link, useSearchParams } from 'react-router-dom';
import '../../prepare-styles/colors.scss';
import { CategoryArray } from '../../types/CategoryArray';
import home from '../../assets/icons/home.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import { SortBy } from '../../types/SortBy';
import { PerPage } from '../../types/PerPage';
import { useProductStore } from '../../store/productStore';
import { Card } from '../../components/Card/Card';
import { filter } from '../../helper/filter/filter';
import { Pagination } from '../../components/Pagination/Pagination';
import { getNumbers } from '../../helper/getNumbers/getNumbers';
import { SearchLink } from '../../helper/SearchLink/SearchLink';

type Props = {
  category: CategoryArray;
};

export const CategoryPage: React.FC<Props> = ({ category }) => {
  const { catalogProducts } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const actualProducts = catalogProducts.filter(
    item => item.category === category.path,
  );
  const filteredProducts = filter(actualProducts, searchParams);

  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || filteredProducts.length;

  const total = filteredProducts.length;

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

  return (
    <>
      <div className="main-main">
        <div className="main-container">
          <div className="category_header">
            <div className="category_header-map">
              <Link to={`/home`}>
                <img
                  className="category_header-map-homeIcon"
                  src={home}
                  alt="Home"
                />
              </Link>
              <img
                className="category_header-map-arrowRightIcon"
                src={arrowRight}
                alt="arrow"
              />
              <Link to={`/${category.path}`}>
                <span className="category_header-map-categoryName">
                  {category.name}
                </span>
              </Link>
            </div>
            <h1 className="main-title">{category.titleName}</h1>
            <p className="category_header-itemsCount">{`${actualProducts.length} models`}</p>
            <div className="category_header-sortAndPerpage">
              <div className="category_header-select">
                <span className="category_header-select-title">Sort by</span>
                <select
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
                      <SearchLink params={{ sort: field }}>{field}</SearchLink>
                    </option>
                  ))}
                </select>
              </div>
              <div className="category_header-select">
                <span className="category_header-select-title">
                  Items on page
                </span>
                <select
                  className="category_header-sort-select"
                  onChange={handlePerPage}
                  value={searchParams.get('perPage') || filteredProducts.length}
                >
                  <option
                    className="category_header-sort-option"
                    value={filteredProducts.length}
                  >
                    <SearchLink
                      params={{ perPage: filteredProducts.length.toString() }}
                    >
                      All
                    </SearchLink>
                  </option>
                  {PerPage.map(field => (
                    <option
                      className="category_header-sort-option"
                      key={field}
                      value={field}
                    >
                      <SearchLink params={{ perPage: field }}>
                        {field}
                      </SearchLink>
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
        </div>
        <Pagination
          pages={pages}
          page={page!}
          handlePageChange={handlePageChange}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </>
  );
};
