import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper/core';
import SwiperCore from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './BannerSlider.scss';
import { useRef } from 'react';

SwiperCore.use([Navigation, Pagination]);

const images = [
  '../img/banner-phones.png',
  '../img/banner-tablets.png',
  '../img/banner-accessories.png',
];

export const BannerSlider = () => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const goNext = () => {
    swiperRef.current && swiperRef.current.slideNext();
  };

  const goPrev = () => {
    swiperRef.current && swiperRef.current.slidePrev();
  };

  return (
    <>
      <div className="container">
        <div className="carousel">
          <button onClick={goPrev} className="carousel__button-prev"></button>

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
          >
            {images.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className={`carousel__image-wrapper `}>
                    <img src={image} alt="Banner" className="carousel__image" />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button onClick={goNext} className="carousel__button-next"></button>
        </div>
      </div>
    </>
  );
};
