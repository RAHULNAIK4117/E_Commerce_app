import mongoose from "mongoose";
import Order from "../models/OrderModel.js";

const addOrder = async (req, res) => {
  try {
    const { user, orders, address, payment, totalPrice } = req.body;

    // console.log(req.body);

    if (!user || !orders || !address || !payment || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const newOrder = new Order({
      user,
      orders,
      address,
      payment,
      totalPrice,
    });

    await newOrder.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log("Error in adding Order!", error);
    res.status(500).json({
      success: false,
      message: "Error in adding Order",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not valid",
      });
    }

    const orders = await Order.find({ user: userId })
      .populate({
        path: "orders.product",
        select: "images title price", // Only include necessary product fields
      })
      .select("orders totalPrice user _id status createdAt")
      .lean(); // Convert to plain JavaScript objects

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.log("Error in fetching Orders!", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching Orders!",
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Order ID",
      });
    }

    const order = await Order.findOne({ _id: orderId })
      .populate({
        path: "orders.product",
        select: "images title price", // Added price as it's useful for order details
      });

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order ID not valid!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    console.log("Error in fetching Order!", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching Order!",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: order,
    });
  } catch (error) {
    console.log("Error in fetching Orders!", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching Orders!",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    if (!orderId || !orderStatus) {
      return res.status(400).json({
        success: false,
        message: "Please provide both orderId and orderStatus",
      });
    }

    const order = await Order.findByIdAndUpdate(
      { _id: orderId },
      {
        $set: { status: orderStatus },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Orders updated successfully",
      data: order,
    });
  } catch (error) {
    console.log("Error in updating Orders!", error);
    res.status(500).json({
      success: false,
      message: "Error in updating Orders!",
    });
  }
};


export { addOrder, getOrders, getOrder, getAllOrders, updateOrder,};
