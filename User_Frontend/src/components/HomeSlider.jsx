import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getBanners } from "../services/bannerServices";


const HomeSlider = () => {
  const [slides, setSlides] = useState([]);

  const fetchBanners = async () => {
    const response = await getBanners();
    // console.log({response});
    if (response && response.data) {
      setSlides(response.data);
    }

  }

  useEffect(()=>{
    fetchBanners();
  }, [])

  return (
    <div className="home-slider-container">
      <Swiper
       key={slides.length}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        pagination={{ clickable: true }}
        className="home-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <img src={slide.image} alt={slide.alt} className="w-full h-[200px] md:h-[400px] object-cover object-center " />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-prev hidden md:block">
        <FaChevronLeft />
      </div>
      <div className="custom-next hidden md:block">
        <FaChevronRight />
      </div>
    </div>
  );
};

export default HomeSlider;
