import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Products from "../assets/Products";



const FeaturedProducts = () => {

  const featuredProduct = Products.slice(0, 9)
  return (
    <div className="flex items-end space-x-6 px-4 md:px-10 py-5  ">
      {/* Swiper Section */}
      <div className="w-full md:w-3/4 ">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <div className="relative w-full ">
          <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={4}
            loop={true}
            navigation={{ nextEl: ".custom-next2", prevEl: ".custom-prev2" }}
            className=""
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {featuredProduct.map((product, index) => (
              <SwiperSlide key={index} className="p-2">
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-prev2">
            <FaChevronLeft />
          </div>
          <div className="custom-next2">
            <FaChevronRight />
          </div>
        </div>
      </div>
      <div className="hidden md:block w-1/4 h-[410px] select-none">
        <img
          src="https://api.spicezgold.com/download/file_1734526702388_gespo-black-teal-blue-colorblocked-round-neck-half-sleeve-casual-t-shirt-product-images-rvwmlodbas-0-202304131033.jpg"
          alt="Super Grocery Sale"
          className="object-cover object-top h-full w-full aspect-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default FeaturedProducts;
