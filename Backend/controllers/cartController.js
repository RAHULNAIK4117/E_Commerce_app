import mongoose from "mongoose";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

const createCart = async (req, res) => {
  try {
    const { userId } = req.params;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    await cart.save();
    res.status(200).json({
      success: true,
      message: "cart created successfully.",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating cart",
    });
  }
};

const addCartProduct = async (req, res) => {
  try {
    const { userId, productId, quantity, size } = req.body;
    // console.log({ userId, productId, quantity });

    if (productId && quantity) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, products: [] });
      }

      const findCurrentProductIndex = cart.products.findIndex(
        (product) => product.productId.toString() === productId  && product.size === size
      );
      if (findCurrentProductIndex === -1) {
        cart.products.push({ productId, quantity, size});
      } else {
        cart.products[findCurrentProductIndex].quantity += quantity;
      }

      await cart.save();
    }

    const newCart = await Cart.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "prod",
              in: {
                productId: "$$prod.productId",
                quantity: "$$prod.quantity",
                size: "$$prod.size",
                details: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$productDetails",
                        as: "detail",
                        cond: { $eq: ["$$detail._id", "$$prod.productId"] },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          productDetails: 0, // Remove extra lookup array
        },
      },
    ]);

    // console.log(newCart);

    res.status(200).json({
      success: true,
      message:
        productId && quantity
          ? "Product added to cart successfully."
          : "Cart retrive successfully.",
      data: newCart,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({
      success: false,
      message: "failed to add product to cart !",
    });
  }
};

const fetchCartProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is manadatory!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "products.productId",
      select: "images title price ",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found with provided userId!",
      });
    }

    const validItems = cart.products.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.products.length) {
      cart.products = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
      size: item.size,
    }));

    res.status(200).json({
      success: true,
      message: "Cart products fetched successfully",
      data: {
        ...cart._doc,
        products: populateCartItems,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "failed to retrive products!",
    });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity,size } = req.body;
    // console.log({ userId, productId, quantity });

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found with provided userId!",
      });
    }

    const findCurrentProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present !",
      });
    }

    cart.products[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    const newCart = await Cart.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "prod",
              in: {
                productId: "$$prod.productId",
                quantity: "$$prod.quantity",
                details: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$productDetails",
                        as: "detail",
                        cond: { $eq: ["$$detail._id", "$$prod.productId"] },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          productDetails: 0, // Remove extra lookup array
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Product quantity updated successfully!",
      data: newCart,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "failed to update!",
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID required!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found with provided userId!",
      });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "failed to clear cart!",
    });
  }
};

const deleteCartProduct = async (req, res) => {
  try {
    const { userId, productId,size } = req.params;

    // console.log({ userId, productId });

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId })

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }
    // console.log({cart});
    

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    const newCart = await Cart.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "prod",
              in: {
                productId: "$$prod.productId",
                quantity: "$$prod.quantity",
                details: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$productDetails",
                        as: "detail",
                        cond: { $eq: ["$$detail._id", "$$prod.productId"] },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          productDetails: 0, // Remove extra lookup array
        },
      },
    ]);

    // console.log({newCart});
    

    res.status(200).json({
      success: true,
      message: "Product deleted from cart successfully!",
      data: newCart,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "failed to delete product !",
    });
  }
};

export {
  addCartProduct,
  fetchCartProducts,
  updateProductQuantity,
  deleteCartProduct,
  clearCart,
  createCart,
};
