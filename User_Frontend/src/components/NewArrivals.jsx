import React from "react";

const banners = [
  { id: 101010, image: "https://api.spicezgold.com/download/file_1734525653108_NewProject(20).jpg", alt: "Grocery Sale" },
  { id: 101011, image: "https://api.spicezgold.com/download/file_1734525634299_NewProject(2).jpg", alt: "Fashion Sale" },
  { id: 101012, image: "https://api.spicezgold.com/download/file_1734525620831_NewProject(3).jpg", alt: "Dresses Sale" },
  { id: 101013, image: "https://api.spicezgold.com/download/file_1734532742018_NewProject(22).jpg", alt: "Black Friday Sale" },
];

const NewArrivals = () => {
  return (
    <div className="w-full overflow-hidden px-4 md:px-10 py-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-6 ">New Arrivals</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  "
      >

        {banners.map((banner) => (
          <div key={banner.id} className="w-full overflow-hidden h-[200px] group cursor-pointer rounded-md" >
            <img
            src={banner.image}
            alt={banner.alt}
            className="w-full h-full group-hover:scale-110 duration-200 ease-in-out "
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
