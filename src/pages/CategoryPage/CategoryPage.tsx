import { Link } from 'react-router-dom';
import { CategoryArray } from '../../types/CategoryArray';

type Props = {
  category: CategoryArray;
};

export const CategoryPage: React.FC<Props> = ({ category }) => {
  return (
    <h1>
      {category.items.map(item => (
        <Link to={`${category.path}/${item.itemId}`}>{item.name}</Link>
      ))}
    </h1>
  );
};
