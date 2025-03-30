import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios';
import { backendURL } from '../App';

const EditProduct = ({ token }) => {
  const { productId } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  // State for form fields
  const [images, setImages] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [customSize, setCustomSize] = useState("");
  const [availableSizes, setAvailableSizes] = useState(["S", "M", "L", "XL"]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [customColor, setCustomColor] = useState("");
  const [availableColors, setAvailableColors] = useState(["Red", "Blue", "Green"]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("clothing");
  const [subcategory, setSubcategory] = useState("men");
  const [warranty, setWarranty] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [bestseller, setBestseller] = useState(false);

  // State for error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch product data based on productId
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/product/${productId}`);
        const product = response.data;

        // Populate form fields with fetched data
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setDiscount(product.discount);
        setStock(product.stock);
        setBrand(product.brand);
        setCategory(product.category);
        setSubcategory(product.subcategory);
        setWarranty(product.warranty);
        setReturnPolicy(product.returnPolicy);
        setBestseller(product.bestseller);
        setSelectedSizes(product.sizes);
        setSelectedColors(product.colors);
        setAvailableSizes([...new Set([...availableSizes, ...product.sizes])]);
        setAvailableColors([...new Set([...availableColors, ...product.colors])]);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError("Failed to fetch product details.");
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 4) {
      setError("You can upload a maximum of 4 images.");
      return;
    }
    setImages((prevImages) => [...prevImages, ...files]);
    setError("");
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Toggle size selection
  const toggleSizeSelection = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size) ? prevSizes.filter((s) => s !== size) : [...prevSizes, size]
    );
  };

  // Add custom size
  const handleAddCustomSize = () => {
    if (!customSize.trim()) {
      setError("Please enter a custom size.");
      return;
    }
    if (availableSizes.includes(customSize)) {
      setError("Size already exists.");
      return;
    }
    setAvailableSizes([...availableSizes, customSize]);
    setCustomSize("");
    setError("");
  };

  // Toggle color selection
  const toggleColorSelection = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color) ? prevColors.filter((c) => c !== color) : [...prevColors, color]
    );
  };

  // Add custom color
  const handleAddCustomColor = () => {
    if (!customColor.trim()) {
      setError("Please enter a custom color.");
      return;
    }
    if (availableColors.includes(customColor)) {
      setError("Color already exists.");
      return;
    }
    setAvailableColors([...availableColors, customColor]);
    setCustomColor("");
    setError("");
  };

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("stock", stock);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("warranty", warranty);
      formData.append("returnPolicy", returnPolicy);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(selectedSizes));
      formData.append("colors", JSON.stringify(selectedColors));

      // Append new images
      images.forEach((image) => {
        formData.append("images", image);
      });

      // Send the form data to the backend
      const response = await axios.put(
        `${backendURL}/api/product/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Product updated successfully:", response.data);
      setSuccess("Product updated successfully! Redirecting...");

      // Redirect to product list after 2 seconds
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (error) {
      console.error(error);
      setError(`Failed to update product: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={onSubmitHandler} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Edit Product</h2>
        {error && <p className={`text-sm mb-4 text-red-500`}>{error}</p>}
        {success && <p className={`text-sm mb-4 text-green-500`}>{success}</p>}

        {/* Image Upload Section */}
        <div className="mb-6">
          <p className="font-semibold text-gray-700 mb-2">Upload New Images</p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center flex flex-col items-center">
            <label htmlFor="imageUpload" className="cursor-pointer hover:text-blue-500 transition-all duration-300">
              <div className="flex justify-center items-center">
                <FaCloudUploadAlt className="text-4xl text-gray-500 hover:text-gray-700 transition-all duration-300" />
              </div>
              <p className="text-sm text-gray-600 mt-2">Click to upload (max 4 images)</p>
              <input type="file" id="imageUpload" hidden multiple accept="image/*" onChange={handleImageUpload} />
            </label>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images?.map((img, index) => (
                <div key={index} className="relative group">
                  <img src={URL.createObjectURL(img)} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-lg shadow-md" />
                  <button type="button" className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs rounded-full opacity-75 hover:opacity-100" onClick={() => removeImage(index)}>✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Title */}
        <div className="mb-4">
          <p className="font-semibold text-gray-700">Product Title</p>
          <input type="text" placeholder="Enter product title" required className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <p className="font-semibold text-gray-700">Product Description</p>
          <textarea placeholder="About product" required className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        {/* Price, Discount, and Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="font-semibold text-gray-700">Price</p>
            <input type="number" placeholder="Enter price" required className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div>
            <p className="font-semibold text-gray-700">Discount (%)</p>
            <input type="number" placeholder="Enter discount" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </div>
          <div>
            <p className="font-semibold text-gray-700">Stock</p>
            <input type="number" placeholder="Enter stock" required className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>
        </div>

        {/* Brand */}
        <div className="mb-4">
          <p className="font-semibold text-gray-700">Brand</p>
          <input type="text" placeholder="Enter brand name" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>

        {/* Category and Subcategory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-semibold text-gray-700">Category</p>
            <select className="w-full p-2 border border-gray-300 rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="electronics">Electronics</option>
              <option value="sports">Sports</option>
              <option value="footwear">Footwear</option>
              <option value="homeappliances">Home Appliances</option>
            </select>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Subcategory</p>
            <select className="w-full p-2 border border-gray-300 rounded-lg" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="bedroom">Bedroom</option>
              <option value="shirts">Shirts</option>
              <option value="cricket">Cricket</option>
              <option value="wearables">Wearables</option>
              <option value="audio">Audio</option>
              <option value="kitchen">Kitchen</option>
            </select>
          </div>
        </div>

        {/* Warranty and Return Policy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-semibold text-gray-700">Warranty</p>
            <input type="text" placeholder="Enter warranty details" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
          </div>
          <div>
            <p className="font-semibold text-gray-700">Return Policy</p>
            <input type="text" placeholder="Enter return policy" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={returnPolicy} onChange={(e) => setReturnPolicy(e.target.value)} />
          </div>
        </div>

        {/* Product Sizes */}
        <div className="mb-4">
          <p className="font-semibold text-gray-700">Product Sizes</p>
          <div className="flex flex-wrap gap-2">
            {availableSizes?.map((size) => (
              <div
                key={size}
                className={`border px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedSizes.includes(size) ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => toggleSizeSelection(size)}
              >
                <p className="text-center">{size}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              placeholder="Add custom size"
              value={customSize}
              onChange={(e) => setCustomSize(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <button type="button" onClick={handleAddCustomSize} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer">
              Add
            </button>
          </div>
        </div>

        {/* Product Colors */}
        <div className="mb-4">
          <p className="font-semibold text-gray-700">Product Colors</p>
          <div className="flex flex-wrap gap-2">
            {availableColors?.map((color) => (
              <div
                key={color}
                className={`border px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedColors.includes(color) ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => toggleColorSelection(color)}
              >
                <p className="text-center">{color}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              placeholder="Add custom color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <button type="button" onClick={handleAddCustomColor} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer">
              Add
            </button>
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className="mb-4 flex items-center">
          <input type="checkbox" id="bestseller" className="mr-2" checked={bestseller} onChange={(e) => setBestseller(e.target.checked)} />
          <label htmlFor="bestseller" className="text-gray-700">Add to Bestseller</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md transform hover:scale-105 cursor-pointer">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;