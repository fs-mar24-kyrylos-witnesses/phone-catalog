import { BannerSlider } from '../../components/BannerSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Slider } from '../../components/Slider';
import { useProductStore } from '../../store/productStore';
import { Product } from '../../types/Product';
import { SliderTitle } from '../../types/SliderTitle';
import { useTranslation } from 'react-i18next';

import './HomePage.scss';

export const HomePage = () => {
  const allProducts = useProductStore(state => state.catalogProducts);
  const phones = allProducts.filter(product => product.category === 'phones');
  const newestPhones = phones
    .filter(product => product.year === 2022 || product.year === 2020)
    .slice(0, 36);

  const phonesWithBigDiscount = phones
    .sort((a, b) => {
      const discountPercentageA = ((a.fullPrice - a.price) / a.fullPrice) * 100;
      const discountPercentageB = ((b.fullPrice - b.price) / b.fullPrice) * 100;
      return discountPercentageB - discountPercentageA;
    })
    .slice(0, 36);

  const selectRandomlyEveryThird = (product: Product[]) => {
    const selectedProduct = [];
    for (let i = 0; i < product.length; i += 3) {
      const endIndex = Math.min(i + 3, product.length);
      const randomIndex = Math.floor(Math.random() * (endIndex - i)) + i;
      selectedProduct.push(product[randomIndex]);
    }
    return selectedProduct;
  };

  const selectedNewestPhones = selectRandomlyEveryThird(newestPhones);
  const selectedPhonesWithBigDiscount = selectRandomlyEveryThird(
    phonesWithBigDiscount,
  );

  const { t } = useTranslation();

  return (
    <>
      <div className="grid__home-page">
        <h1 className="main-title">{t('welcomeToNiceGadgetsStore')}</h1>
        <BannerSlider />
      </div>
      <div className="container__home-page">
        <Slider
          products={selectedNewestPhones}
          titleName={t(SliderTitle.newModels)}
          discount={false}
        />

        <ShopByCategory />

        <Slider
          products={selectedPhonesWithBigDiscount}
          titleName={t(SliderTitle.hotPrices)}
          discount={true}
        />
      </div>
    </>
  );
};
