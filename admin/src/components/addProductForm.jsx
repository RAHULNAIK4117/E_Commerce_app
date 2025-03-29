import { useState } from "react";
import axios from "axios";

const categories = [
  "footwear",
  "electronics",
  "fashion",
  "accessories",
  "appliances",
];
const subCategories = {
  footwear: ["men", "women"],
  electronics: ["laptop", "camera"],
  fashion: ["men", "women"],
  accessories: ["smart watch accessories"],
  appliances: [],
};

const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],
    category: "",
    subCategory: "",
    brand: "",
    price: "",
    discount: "0",
    stock: "",
    size: "",
    color: "",
    warranty: "No warranty",
    returnPolicy: "10 days return policy",
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "category" && { subCategory: "" }), // Reset subCategory when category changes
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setFormData({ ...formData, images: files });
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        size: formData.size.split(",").map((s) => s.trim()),
        color: formData.color.split(",").map((c) => c.trim()),
      };

      const formDataToSend = new FormData();
      Object.keys(formattedData).forEach((key) => {
        if (key === "images") {
          formattedData.images.forEach((image) => {
            formDataToSend.append("images", image);
          });
        } else {
          formDataToSend.append(key, formattedData[key]);
        }
      });

      console.log({ formDataToSend });

      // await axios.post("https://your-api.com/products", formDataToSend);
      // alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 sm:p-8 md:p-10 lg:p-12">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Product</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {Object.keys(formData).map((field) =>
          field !== "images" ? (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600 capitalize">
                {field.replace(/([A-Z])/g, " $1")}:
              </label>
              {field === "category" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
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
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  disabled={!formData.category} // Disable if category is not selected
                >
                  <option value="">Select Subcategory</option>
                  {(subCategories[formData.category] || []).map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
              )}
            </div>
          ) : (
            <div key={field} className="col-span-2">
              <label className="block text-sm font-medium text-gray-600">
                Images:
              </label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="w-full p-4 border-2 border-dashed rounded-md flex justify-center items-center"
              >
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  Drag and drop images here or click to upload
                </label>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          )
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
