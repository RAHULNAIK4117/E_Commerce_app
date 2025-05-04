import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ProductImageGallery = ({images}) => {
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

  const imageGallery = images?.length ? images : [
    "https://th.bing.com/th/id/R.3e77a1db6bb25f0feb27c95e05a7bc57?rik=DswMYVRRQEHbjQ&riu=http%3a%2f%2fwww.coalitionrc.com%2fwp-content%2fuploads%2f2017%2f01%2fplaceholder.jpg&ehk=AbGRPPcgHhziWn1sygs8UIL6XIb1HLfHjgPyljdQrDY%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.3e77a1db6bb25f0feb27c95e05a7bc57?rik=DswMYVRRQEHbjQ&riu=http%3a%2f%2fwww.coalitionrc.com%2fwp-content%2fuploads%2f2017%2f01%2fplaceholder.jpg&ehk=AbGRPPcgHhziWn1sygs8UIL6XIb1HLfHjgPyljdQrDY%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.3e77a1db6bb25f0feb27c95e05a7bc57?rik=DswMYVRRQEHbjQ&riu=http%3a%2f%2fwww.coalitionrc.com%2fwp-content%2fuploads%2f2017%2f01%2fplaceholder.jpg&ehk=AbGRPPcgHhziWn1sygs8UIL6XIb1HLfHjgPyljdQrDY%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.3e77a1db6bb25f0feb27c95e05a7bc57?rik=DswMYVRRQEHbjQ&riu=http%3a%2f%2fwww.coalitionrc.com%2fwp-content%2fuploads%2f2017%2f01%2fplaceholder.jpg&ehk=AbGRPPcgHhziWn1sygs8UIL6XIb1HLfHjgPyljdQrDY%3d&risl=&pid=ImgRaw&r=0",
  ];

  return (
    <div className="w-full">
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
          {imageGallery?.map((img, index) => (
            <SwiperSlide key={index} className="h-[500px]">
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-[500px] h-[500px] object-cover rounded-lg"
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
          {imageGallery?.map((img, index) => (
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
