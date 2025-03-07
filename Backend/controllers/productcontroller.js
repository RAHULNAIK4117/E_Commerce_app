import Product from "../models/productModel.js";

// Function to add a product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    const images = req.files.map(image => image.path);

    console.log({
      images,
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    });

    const product = new Product({
        name,
        description,
        price,
        category,
        subcategory,
        sizes,
        bestseller,
        images,
        date: Date.now(),  // Automatically set the date
    });

    await product.save();

    res.json({ success: true, message: "Product uploaded successfully!", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// function to list product

export const listproduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

// Function to remove product
export const removeproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product removed successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing product" });
  }
};

// Function to get single product info
export const singleproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching product details" });
  }
};
