import Product from "../models/ProductModel.js";
import Review from "../models/ReviewModel.js";

export const createReview = async (req, res) => {
  const { rating, comment, productId, userId, username } = req.body;
  // console.log(req.body);

  try {
    if (!rating || !comment || !productId || !userId || !username) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    const review = await Review.create({
      rating,
      comment,
      product: productId,
      user: userId,
      username
    });

    // const product = await Product.findById(productId);
    // if (!product) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Product not found",
    //   });
    // }
    // console.log({product});

    // product.reviews.push(review._id);
    // await product.save();

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $push: { reviews: review._id },
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    console.log(product);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

export const getReview = async (req, res) => {
  try {
  } catch (error) {}
};

export const getReviews = async (req, res) => {
  try {
  } catch (error) {}
};

export const deleteReview = async (req, res) => {
  try {
  } catch (error) {}
};
