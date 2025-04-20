import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { LuLoader } from "react-icons/lu";

const categories = [
  "footwear",
  "electronics",
  "fashion",
  "accessories",
  "appliances",
  "Furniture",
  "groceries",
];
const subCategories = {
  footwear: ["Men", "Women", "Kids", "Sports", "Casual", "Formal", "Boots", "Sandals", "Sneakers"],
  electronics: ["Laptops", "Cameras", "Mobiles", "Headphones", "Speakers", "Tablets", "Monitors", "Smartwatches"],
  fashion: ["Men", "Women", "Kids", "Ethnic Wear", "Western Wear", "Sportswear", "Winter Wear", "Footwear", "Accessories"],
  accessories: ["Smart Watch Accessories", "Phone Cases", "Bags", "Wallets", "Belts", "Jewelry", "Sunglasses", "Hats"],
  appliances: ["Refrigerators", "Washing Machines", "Microwaves", "Air Conditioners", "Vacuum Cleaners", "Water Purifiers", "Heaters", "Fans"],
  furniture: [
    "Sofa", "Chair", "Table", "Bed", "Wardrobe", "Bookshelf", "TV Unit",
    "Dining Table", "Coffee Table", "Office Desk", "Recliner", "Cabinet",
    "Dresser", "Nightstand", "Ottoman"
  ],
  groceries: [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Bakery",
    "Beverages",
    "Snacks",
    "Cereals & Grains",
    "Pulses & Lentils",
    "Oil & Ghee",
    "Spices & Masalas",
    "Dry Fruits & Nuts",
    "Packaged Foods",
    "Sauces & Condiments",
    "Personal Care",
    "Cleaning & Household",
    "Baby Care",
    "Meat & Seafood",
    "Frozen Foods",
    "Organic Products"
  ]
};

const brands = {
  footwear: ["Nike", "Adidas", "Puma", "Reebok", "Skechers"],
  electronics: ["Apple", "Samsung", "Dell", "Sony", "HP"],
  fashion: ["Zara", "H&M", "Levi's", "Gucci", "Louis Vuitton"],
  accessories: ["Rolex", "Fossil", "Casio", "Titan", "Daniel Wellington"],
  appliances: ["LG", "Samsung", "Whirlpool", "Philips", "Bosch"],
  furniture: ["IKEA", "Ashley", "Wayfair", "La-Z-Boy"],
  groceries: ["Whole Foods", "Trader Joe's", "Walmart", "Kroger"]

  
};

const sizes = {
  footwear: ["6", "7", "8", "9", "10",], // Shoe sizes
  electronics: [], // No sizes for electronics
  fashion: ["S", "M", "L", "XL", "XXL"], // Clothing sizes
  accessories: [], // No sizes for accessories
  appliances: [], // No sizes for appliances
  furniture: ["Small", "Medium", "Large"],
 groceries: ["Small", "Medium", "Large"]

};

const colors = {
  footwear: ["Black", "White", "Red", "Blue", "Green"],
  electronics: ["Black", "White", "Silver", "Gray", "Blue"],
  fashion: ["Red", "Blue", "Green", "Black", "White", "Yellow", "Pink"],
  accessories: ["Black", "White", "Gold", "Silver", "Brown"],
  appliances: ["White", "Black", "Silver", "Gray"],
  furniture: ["Brown", "Black", "White", "Gray"],
  groceries: ["Red", "Green", "Yellow", "Brown"]
};

const ProductForm = ({ formTitle }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    category: "",
    subCategory: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    size: [],
    color: [],
    warranty: "No warranty",
    returnPolicy: "10 days return policy",
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.stock || isNaN(formData.stock) || formData.stock < 0)
      newErrors.stock = "Valid stock quantity is required";
    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.checked
        ? [...prev[field], value]
        : prev[field].filter((v) => v !== value),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData({ ...formData, images: [...formData.images, ...files] });
    setImagePreviews(
      [...formData.images, ...files].map((file) => {
        if (typeof file === "string") {
          return file;
        } else {
          return URL.createObjectURL(file);
        }
      })
    );
  };

  const handleClearForm = () => {
    setFormData({
      title: "",
      description: "",
      images: [],
      category: "",
      subCategory: "",
      brand: "",
      price: "",
      discount: "",
      stock: "",
      size: [],
      color: [],
      warranty: "No warranty",
      returnPolicy: "10 days return policy",
    });
    setImagePreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((image) =>
            formDataToSend.append("files", image)
          );
        } else if (key === "size" || key === "color") {
          formData[key].forEach((item) => formDataToSend.append(key, item));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      // console.log("Form Data Submitted:", formData);

      // Call API to submit form data
      let response;
      if (formTitle === "Add Product") {
        response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/add`,
          formDataToSend
        );
      } else {
        response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/update/${id}`,
          formDataToSend
        );
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setImagePreviews([]);
        setFormData({
          title: "",
          description: "",
          images: [],
          category: "",
          subCategory: "",
          brand: "",
          price: "",
          discount: "",
          stock: "",
          size: [],
          color: [],
          warranty: "No warranty",
          returnPolicy: "10 days return policy",
        });
        window.scrollTo({
          top: 0,
          left: 100,
          behavior: "smooth",
        });
      } else {
        toast.error(response.data.message);
      }
      // console.log("Response:", response);
      // alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/get/${id}`
        );
        // console.log({ product: response.data.data });
        const product = response.data.data;
        setFormData({
          title: product.title || "",
          description: product.description || "",
          images: product.images || [],
          category: product.category || "",
          subCategory: product.subCategory || "",
          brand: product.brand || "",
          price: product.price || "",
          discount: product.discount || "",
          stock: product.stock || "",
          size: product.size || [],
          color: product.color || [],
          warranty: product.warranty || "No warranty",
          returnPolicy: product.returnPolicy || "10 days return policy",
        });
        setImagePreviews(product.images || []);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">{formTitle}</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {Object.keys(formData).map((field) =>
          field !== "images" ? (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600 capitalize mb-1">
                {field.replace(/([A-Z])/g, " $1")}:
              </label>
              {field === "category" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md cursor-pointer"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              ) : field === "subCategory" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md cursor-pointer"
                  disabled={!formData.category} // Disable if category is not selected
                >
                  <option value="">Select Subcategory</option>
                  {(subCategories[formData.category] || []).map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              ) : field === "brand" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  disabled={!formData.category} // Disable if no category is selected
                >
                  <option value="">Select Brand</option>
                  {(brands[formData.category] || []).map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              ) : field === "size" ? (
                sizes[formData.category]?.map((size) => (
                  <label key={size} className="inline-flex items-center mr-2">
                    <input
                      type="checkbox"
                      checked={formData.size.includes(size)}
                      onChange={(e) => handleCheckboxChange(e, "size", size)}
                    />
                    <span className="ml-1 text-lg">{size}</span>
                  </label>
                ))
              ) : field === "color" ? (
                colors[formData.category]?.map((color) => (
                  <label key={color} className="inline-flex items-center mr-2">
                    <input
                      type="checkbox"
                      checked={formData.color.includes(color)}
                      onChange={(e) => handleCheckboxChange(e, "color", color)}
                    />
                    <span className="ml-1 text-lg">{color}</span>
                  </label>
                ))
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder={`Enter ${field.toLowerCase()}`} // Add placeholder
                />
              )}
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
              )}
            </div>
          ) : (
            <div key={field} className="col-span-full">
              <label className="block text-sm font-medium text-gray-600">
                Images:
              </label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images}</p>
              )}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          images: formData.images.filter((_, i) => i !== index),
                        });
                        setImagePreviews(
                          imagePreviews.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                    >
                      <MdOutlineDelete size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
        <div className="flex items-center gap-5 justify-between w-full col-span-full">
          <button
            type="button"
            onClick={handleClearForm}
            className="w-full bg-red-600 text-white p-2 rounded-md cursor-pointer hover:bg-red-700 transition"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md cursor-pointer hover:bg-blue-700 transition"
          >
            {loading ? (
              <LuLoader size={20} className="animate-spin mx-auto" />
            ) : (
              formTitle
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
