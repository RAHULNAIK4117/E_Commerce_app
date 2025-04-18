import Product from "../models/ProductModel.js";
// add a products
const addProduct = async (req, res) => {
  try {
    const files = req.files?.map((image) => image.path) || [];

    // console.log({ files, body: req.body });

    const {
      title,
      description,
      category,
      subCategory,
      brand,
      price,
      discount,
      stock,
      size,
      color,
      reviews,
      rating,
      warranty,
      returnPolicy,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !files ||
      !category ||
      !brand ||
      !price ||
      !stock
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      title,
      description,
      images: files,
      category,
      subCategory,
      brand,
      price,
      discount,
      stock: Number(stock),
      size,
      color,
      reviews,
      rating,
      warranty,
      returnPolicy,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding product",
    });
  }
};

// get all products
const getProducts = async (req, res) => {
  // console.log("prams", req.query);

  try {
    const sort = req.query.sort ? JSON.parse(req.query.sort) : { title: 1 };
    const page = parseInt(req.query.page) || 1; // Current page (default 1)
    const limit = parseInt(req.query.limit) || 20; // Items per page (default 10)

    const filters = {};

    req.query.category &&
      req.query.category.length > 0 &&
      (filters.category = { $in: req.query.category });

    // req.query.subCategory &&
    //   req.query.subCategory.length > 0 &&
    //   (filters.subCategory = { $in: req.query.subCategory });

    req.query.search &&
      req.query.search.length > 0 &&
      (filters.title = { $regex: req.query.search, $options: "i" });
    // req.query.search &&
    //   req.query.search.length > 0 &&
    //   (filters.description = { $regex: req.query.search, $options: "i" });

    // console.log("sort: ", sort, "filters: ", filters);

    const total = await Product.countDocuments();

    const products = await Product.find(filters)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "products fetch successfully.",
      total,
      data: products,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
    });
  }
};

// update a product
const updateProduct = async (req, res) => {
  try {
    const newImages = req.files?.map((image) => image.path) || [];
    const newProduct = req.body;

    // console.log({ newImages, newProduct });

    const { id } = req.params;

    const updatedProductDetails = {
      ...newProduct,
      images: [
        ...newImages,
        ...(newProduct?.files ? (Array.isArray(newProduct.files) ? newProduct.files : [newProduct.files]) : []),
      ],
      stock: Number(newProduct.stock),
    };

    console.log({ updatedProductDetails });

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductDetails, {
      new: true,
    });



    // const findProduct = await Product.findById(id);
    // if (!findProduct) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Product not found",
    //   });
    // }

    // findProduct.title = title || findProduct.title;
    // findProduct.price = price === "" ? 0 : price || findProduct.price;
    // findProduct.salePrice =
    //   salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    // findProduct.description = description || findProduct.description;
    // findProduct.image = image || findProduct.image;
    // findProduct.stock = stock != null ? stock : findProduct.stock;
    // findProduct.brand = brand || findProduct.brand;
    // findProduct.category = category || findProduct.category;

    // await findProduct.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error update product",
    });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findByIdAndDelete(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Error delete product",
    });
  }
};

// get product details
const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findById(id).populate("reviews");

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "product not found!",
      });
    }

    // console.log(findProduct);
    res.status(200).json({
      success: true,
      message: "products got succcessfully.",
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error finding product",
    });
  }
};

export {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
};
