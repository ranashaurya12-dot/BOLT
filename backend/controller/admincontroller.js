import userModel from "../model/user.js";
import orderModel from "../model/order.js";
import productModel from "../model/products.js";

// ✅ Bug #3 fixed — exclude cancelled from stats
export const getStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments({ isAdmin: false });
    const totalProducts = await productModel.countDocuments();

    // ✅ exclude cancelled
    const totalOrders = await orderModel.countDocuments({
      status: { $ne: "Cancelled" }
    });

    const revenueData = await orderModel.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await userModel.find({ isAdmin: false }).select("-password");
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User Deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("user", "name email")
      .populate("products.product");
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Bug #2 fixed — block cancelled order updates
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = ["Pending", "Shipped", "Delivered", "Cancelled"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // ✅ fetch first to check status
    const order = await orderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ✅ block if cancelled
    if (order.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled orders cannot be modified",
      });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order Status Updated",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};