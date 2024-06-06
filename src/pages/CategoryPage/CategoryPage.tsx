import { Link } from 'react-router-dom';
import { CategoryArray } from '../../types/CategoryArray';
import { useProductStore } from '../../store/productStore';

type Props = {
  category: CategoryArray;
};

export const CategoryPage: React.FC<Props> = ({ category }) => {
  const { catalogProducts } = useProductStore();

  const filtered = catalogProducts.filter(
    item => item.category === category.path,
  );

  return (
    <h1>
      {filtered.map(item => (
        <Link key={item.color} to={`${category.path}/${item.itemId}`}>
          {item.name}
        </Link>
      ))}
    </h1>
  );
};
