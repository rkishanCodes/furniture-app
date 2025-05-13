import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { SliderData } from './SliderData';

const ImageSlider = () => {
    return (
        <div className="w-[950px] h-[450px]">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full h-full"
            >
                {SliderData.map((item, i) => (
                    <SwiperSlide key={i}>
                        <img
                            src={item.image}
                            alt={`Slide ${i}`}
                            className="w-full h-[450px] object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImageSlider;