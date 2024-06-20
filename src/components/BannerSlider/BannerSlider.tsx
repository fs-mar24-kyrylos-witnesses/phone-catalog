import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Swiper as SwiperClass } from 'swiper/core';
import SwiperCore from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './BannerSlider.scss';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '../../UI/Icons/arrow/arrow';

SwiperCore.use([Navigation, Pagination]);

const images = ['img/banner-1.png', 'img/banner-2.png', 'img/banner-3.png'];

export const BannerSlider = () => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const allCategories = ['accessories', 'phones', 'tablets'];

  const goNext = () => {
    swiperRef.current && swiperRef.current.slideNext();
  };

  const goPrev = () => {
    swiperRef.current && swiperRef.current.slidePrev();
  };

  return (
    <div className="carousel">
      <button onClick={goPrev} className="carousel__button-prev">
        <Arrow direction="left" />
      </button>

      <Swiper
        onSwiper={swiperInstance => {
          swiperRef.current = swiperInstance;
        }}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        slidesPerGroup={1}
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 5000 }}
        speed={500}
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <Link to={`/${allCategories[index]}`}>
                <div
                  className={`carousel__image-wrapper carousel__image-wrapper-${allCategories[index]}`}
                >
                  <img src={image} alt="Banner" className="carousel__image" />
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button onClick={goNext} className="carousel__button-next">
        <Arrow direction="right" />
      </button>
    </div>
  );
};
