
const categories = [
  { title: "Fashion", image: "https://api.spicezgold.com/download/file_1734525204708_fash.png", bgColor: "#E6F4EA" },
  { title: "Electronics", image: "https://api.spicezgold.com/download/file_1734525218436_ele.png", bgColor: "#FCEAFF" },
  { title: "Bags", image: "https://api.spicezgold.com/download/file_1734525231018_bag.png", bgColor: "#FFE6E6" },
  { title: "Footwear", image: "https://api.spicezgold.com/download/file_1734525239704_foot.png", bgColor: "#E6F0FF" },
  { title: "Groceries", image: "https://api.spicezgold.com/download/file_1734525248057_gro.png", bgColor: "#FFE6FF" },
  { title: "Beauty", image: "https://api.spicezgold.com/download/file_1734525255799_beauty.png", bgColor: "#E6F4EA" },
  { title: "Wellness", image: "https://api.spicezgold.com/download/file_1734525275367_well.png", bgColor: "#FFF3E6" },
  { title: "Jewellery", image: "https://api.spicezgold.com/download/file_1734525286186_jw.png", bgColor: "#FDE7E7" },
];

// components/CategoryCard.jsx
const CategoryCard = ({ image, title, bgColor }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-32 h-32 rounded-full shadow-md transition-transform transform hover:scale-110`}
      style={{ backgroundColor: bgColor }}
    >
      <img src={image} alt={title} className="w-12 h-12" />
      <p className="mt-2 text-sm font-semibold">{title}</p>
    </div>
  );
};

const FeaturedCategories = () => {
  return (
    <div className="my-10 w-full px-10">
      <h2 className="text-2xl font-semibold mb-6">Featured Categories</h2>
      <div className="flex flex-wrap justify-between gap-6 w-full px-10">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            image={category.image}
            bgColor={category.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
