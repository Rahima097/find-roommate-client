import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import slideOneImg from './../assets/slide-1.jpg'
import slideTwoImg from './../assets/slide-2.jpg'
import slideThreeImg from './../assets/slide-3.jpg'


const Banner = () => {
    return (
        <div className="w-full mx-auto">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                loop={true}
            >
                <SwiperSlide>
                    <img
                        src={slideOneImg}
                        alt="Slide 1"
                        className="w-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={slideTwoImg}
                        alt="Slide 2"
                        className="w-full object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={slideThreeImg}
                        alt="Slide 3"
                        className="w-full object-cover"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;