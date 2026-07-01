import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      required: true,
      default: [],
    },

    video: {
      type: String,
      default: "",
    },

    stock: {
      type: Number,
      default: 1,
    },

    flavours: {
      type: [String],
      default: [], // ["Chocolate", "Vanilla", "Strawberry"]
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0, // total number of reviews
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);

export default productModel;