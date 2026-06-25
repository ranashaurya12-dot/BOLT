import cartModel from "../model/cart.js";
import orderModel from "../model/order.js";
import mongoose from "mongoose";

export const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cartItems = await cartModel
      .find({ user: req.user.id })
      .populate("product")
      .session(session);

    if (cartItems.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${item.product.name}`,
        });
      }
    }

    const products = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.product.price * item.quantity;
    });

    for (const item of cartItems) {
      item.product.stock -= item.quantity;
      if (item.product.stock === 0) item.product.inStock = false;
      await item.product.save({ session });
    }

    const order = await orderModel.create(
      [{ user: req.user.id, products, totalAmount }],
      { session }
    );

    await cartModel.deleteMany({ user: req.user.id }, { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Order Placed",
      order: order[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const myOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.user.id })
      .populate("products.product");

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const cancelOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await orderModel
      .findById(id)
      .populate("products.product")
      .session(session);

    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ✅ ownership check
    if (order.user.toString() !== req.user.id) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // ✅ already cancelled
    if (order.status === "Cancelled") {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Order already cancelled",
      });
    }

    // ✅ delivered cannot cancel
    if (order.status === "Delivered") {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Delivered order cannot be cancelled",
      });
    }

    // ✅ shipped cannot cancel
    if (order.status === "Shipped") {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Shipped order cannot be cancelled",
      });
    }

    // restore stock
    for (const item of order.products) {
      item.product.stock += item.quantity;
      if (item.product.stock > 0) item.product.inStock = true;
      await item.product.save({ session });
    }

    order.status = "Cancelled";
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Order Cancelled",
      order,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};