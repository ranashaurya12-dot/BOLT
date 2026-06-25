import productModel from "../model/products.js";
import mongoose from "mongoose";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const addProduct = async (req, res) => {
  try {
    // ✅ whitelist fields
    const { name, description, price, discountPrice, category, image, stock } = req.body;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const existproduct = await productModel.findOne({ name });

    if (existproduct) {
      return res.status(400).json({
        success: false,
        message: "Product already exists",
      });
    }

    const product = await productModel.create({
      name,
      description,
      price,
      discountPrice,
      category,
      image,
      stock,
    });

    res.status(201).json({
      success: true,
      message: "Product Added",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const allProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === "price-low") sortOption = { price: 1 };
    else if (sort === "price-high") sortOption = { price: -1 };
    else if (sort === "newest") sortOption = { createdAt: -1 };

    const products = await productModel.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      message: "All products list",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const { _id, createdAt, updatedAt, __v, ...safeFields } = req.body;

    // ✅ stock negative check
    if (safeFields.stock !== undefined && safeFields.stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    const product = await productModel.findByIdAndUpdate(
      id,
      { $set: safeFields },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};