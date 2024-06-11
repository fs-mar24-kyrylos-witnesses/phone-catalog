import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/core';
import { Navigation } from 'swiper/modules';

import './Slider.scss';
import '../../prepare-styles/variables.scss';
import { Product } from '../../types/Product';

import { SliderCard } from '../SliderCard';

type SliderProps = {
  titleName: string;
  products: Product[];
  discount?: boolean;
};

const breakpoints = {
  desktop: 1000,
  tablet: 640,
};

export const Slider: React.FC<SliderProps> = ({
  products,
  titleName,
  discount,
}) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(2);

  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width >= breakpoints.desktop) {
      setSlidesPerView(4);
    } else if (width >= breakpoints.tablet) {
      setSlidesPerView(3);
    } else {
      setSlidesPerView(2);
    }
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const goNext = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.activeIndex;
      const totalSlides = swiperRef.current.slides.length;
      const step = slidesPerView;
      let nextIndex = currentIndex + step;

      if (nextIndex >= totalSlides) {
        nextIndex = nextIndex - totalSlides;
      }

      swiperRef.current.slideTo(nextIndex, 300);
    }
  };

  const goPrev = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.activeIndex;
      const totalSlides = swiperRef.current.slides.length;
      const step = Math.ceil(12 / slidesPerView);
      let prevIndex = currentIndex - step;
      if (prevIndex < 0) {
        prevIndex += totalSlides;
      }
      swiperRef.current.slideTo(prevIndex, 300);
    }
  };

  return (
    <div className="slider">
      <div className="slider__wrapper">
        <h2 className="section-title">{titleName}</h2>
        <div className="slider__button--wrapper">
          <button onClick={goPrev} className="slider__button-prev"></button>

          <button onClick={goNext} className="slider__button-next"></button>
        </div>
      </div>

      <Swiper
        onSwiper={swiperInstance => {
          swiperRef.current = swiperInstance;
        }}
        modules={[Navigation]}
        slidesPerView={slidesPerView}
        spaceBetween={16}
        loop
        className="swiper-container"
      >
        {products.map(product => {
          return (
            <SwiperSlide key={product.id}>
              <div className="slider-card--container">
                <SliderCard
                  product={product}
                  category={product.category}
                  discount={discount}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
