import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import "./HomeSlider.css"; // Add custom styles for navigation

const slides = [
  {
    id: 3,
    image:
      "https://api.spicezgold.com/download/file_1734524985581_NewProject(11).jpg",
    alt: "Slide 3",
  },
  {
    id: 1,
    image:
      "https://api.spicezgold.com/download/file_1734524958576_NewProject(10).jpg",
    alt: "Slide 1",
  },
  {
    id: 3,
    image:
      "https://api.spicezgold.com/download/file_1734524985581_NewProject(11).jpg",
    alt: "Slide 3",
  },
  {
    id: 2,
    image:
      "https://api.spicezgold.com/download/file_1734524971122_NewProject(8).jpg",
    alt: "Slide 2",
  },
  {
    id: 3,
    image:
      "https://api.spicezgold.com/download/file_1734524985581_NewProject(11).jpg",
    alt: "Slide 3",
  },
];

const HomeSlider = () => {
  return (
    <div className="home-slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        pagination={{ clickable: true }}
        className="home-slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img src={slide.image} alt={slide.alt} className="slider-image" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-prev">
        <FaChevronLeft />
      </div>
      <div className="custom-next">
        <FaChevronRight />
      </div>
    </div>
  );
};

export default HomeSlider;
