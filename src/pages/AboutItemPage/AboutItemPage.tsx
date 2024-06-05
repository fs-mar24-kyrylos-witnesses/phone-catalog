import { useParams } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import { useEffect } from 'react';
import { Category } from '../../types/Category';

type Props = {
  categoryArea: Category;
};

export const AboutItemPage: React.FC<Props> = ({ categoryArea }) => {
  // for Max About Page

  const { itemId } = useParams(); // our product id
  const { fetchProductById } = useProductStore(); //func that gives product depending on the id and category
  const selectedProduct = useProductStore(state => state.selectedProduct); //finally selected product

  useEffect(() => {
    itemId?.toString() && fetchProductById(itemId, categoryArea);
  }, [itemId, categoryArea, fetchProductById]);

  return <div>{selectedProduct?.capacity}</div>;
};
