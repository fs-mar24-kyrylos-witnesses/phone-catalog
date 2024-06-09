import { BannerSlider } from '../../components/BannerSlider';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="container__home-page">
      <h1 className="main-title">Welcome to Nice Gadgets store!</h1>

      <BannerSlider />
    </div>
  );
};
