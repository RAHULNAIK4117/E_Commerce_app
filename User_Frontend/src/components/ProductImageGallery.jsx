import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ProductImageGallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to manually set the active index
  const goToSlide = (index) => {
    if (mainSwiper) {
      mainSwiper.slideTo(index);
      setActiveIndex(index);
    }
  };

  const images = [
    "https://images.unsplash.com/photo-1728044849316-b42a4b25e507?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://plus.unsplash.com/premium_photo-1722111091429-dd3dc55979d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1741017269648-44a2497aba20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
    "https://plus.unsplash.com/premium_photo-1686593681087-774c9c55fed2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1728044849316-b42a4b25e507?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://plus.unsplash.com/premium_photo-1722111091429-dd3dc55979d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1741017269648-44a2497aba20?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
    "https://plus.unsplash.com/premium_photo-1686593681087-774c9c55fed2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <div className="w-full ">
      {/* Main Image Slider */}
      <div className="h-[500px] ">
        <Swiper
          onSwiper={setMainSwiper} // Store Swiper instance
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Track active slide
          spaceBetween={10}
          // navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="rounded-lg  "
          style={{ height: "500px" }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="h-[500px]">
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    {/*  Thumbnail Slider with Fixed Height */}
        <div className="relative">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={6}
            freeMode={true}
            // navigation={{
            // nextEl: ".swiper-button-next",
            // prevEl: ".swiper-button-prev",
            // }}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mt-2"
            style={{
            height: "80px",
            }}
          >
            {images.map((img, index) => (
            <SwiperSlide
              key={index}
              className="cursor-pointer"
              onClick={() => goToSlide(index)}
            >
              <img
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-full object-cover rounded-lg border ${
                activeIndex === index ? "border-green-500" : "border-gray-300"
                }`}
              />
            </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Navigation Buttons */}
          {/* <div className="swiper-button-prev absolute left-0 top-0 transform bg-gray-800 text-white p-2 h-[80px] cursor-pointer z-10"></div>
          <div className="swiper-button-next absolute right-0 top-0 transform bg-gray-800 text-white p-2 h-[80px] cursor-pointer z-10"></div> */}
        </div>

        {/* Manual Controls for Setting Index */}
      {/* <div className="overflow-x-auto">
        <div className="flex gap-2 mt-3">
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${image})`,
              }}
              className={`w-20 h-20 rounded-md bg-cover flex-shrink-0 `}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ProductImageGallery;
