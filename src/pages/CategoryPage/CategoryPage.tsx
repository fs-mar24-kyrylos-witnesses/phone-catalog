import './CategoryPage.scss';
import { Link, useSearchParams } from 'react-router-dom';
import '../../prepare-styles/colors.scss';
import { CategoryArray } from '../../types/CategoryArray';
import home from '../../assets/icons/Home.svg';
import arrowRight from '../../assets/icons/Chevron (Arrow Right).svg';
import { SortBy } from '../../types/SortBy';
import { PerPage } from '../../types/PerPage';
import { getSearchWith } from '../../helper/getSearchWith/getSearchWith';
import { useProductStore } from '../../store/productStore';
import { Card } from '../../components/Card/Card';
import { filter } from '../../helper/filter/filter';

type Props = {
  category: CategoryArray;
};

export const CategoryPage: React.FC<Props> = ({ category }) => {
  const { catalogProducts } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const actualProducts = catalogProducts.filter(
    item => item.category === category.path,
  );

  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';
  // const page = searchParams.get('page') || '';

  // const getActivePerPage = (filt: string) =>
  //   perPage === filt ? { color: $grayPrimary } : { color: $graySecondary };

  const setSearchWith = (params: {
    sort?: string | null;
    perPage?: string | null;
    page?: string | null;
  }) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWith({ sort: event.target.value.toLowerCase() || null });
  };

  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWith({ perPage: event.target.value.toLowerCase() || null });
  };

  const filteredProducts = filter(actualProducts, searchParams);

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
                  value={sort}
                  onChange={handleSort}
                >
                  {SortBy.map(field => (
                    <option
                      className="category_header-sort-option"
                      key={field}
                      value={field}
                    >
                      {field}
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
                  value={perPage}
                  onChange={handlePerPage}
                >
                  {PerPage.map(field => (
                    <option
                      className="category_header-sort-option"
                      key={field}
                      value={field}
                    >
                      {field}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="category_product-container">
            {filteredProducts.map(item => (
              <Card key={item.itemId} product={item} category={category.path} />
            ))}
          </div>
        </div>
      </div>
    </>
    // <h1>
    //   {category.items.map(item => (
    //     <Link to={`${category.path}/${item.itemId}`}>{item.name}</Link>
    //   ))}
    // </h1>
  );
};
