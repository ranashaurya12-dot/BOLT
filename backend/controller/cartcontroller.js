import cartModel from "../model/cart.js";
import mongoose from "mongoose";
import productModel from "../model/products.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Valid Product ID is required",
      });
    }

    const qty = parseInt(quantity) || 1;

    if (qty < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product is out of stock",
      });
    }

    const existingCart = await cartModel.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existingCart) {
      if (existingCart.quantity + qty > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} items available`,
        });
      }

      existingCart.quantity += qty;
      await existingCart.save();

      return res.status(200).json({
        success: true,
        message: "Cart Updated",
        cart: existingCart,
      });
    }

    const cart = await cartModel.create({
      user: req.user.id,
      product: productId,
      quantity: qty,
    });

    return res.status(201).json({
      success: true,
      message: "Added To Cart",
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await cartModel
      .find({ user: req.user.id })
      .populate("product");

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart ID",
      });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await cartModel.findById(id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // ✅ ownership check
    if (cart.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    cart.quantity = quantity;
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart Updated",
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const removeCart = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart ID",
      });
    }

    const cart = await cartModel.findById(id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // ✅ ownership check
    if (cart.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await cartModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Item Removed",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};